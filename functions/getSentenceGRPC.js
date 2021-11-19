const { Query, QueryParameters, Value, Values, toUUIDString } = require("@stargate-oss/stargate-grpc-node-client");
const { getGrpcClient } = require("./utils/grpcClient");
const chalk = require('chalk')

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

exports.handler = async function (event, context) {
    console.log(chalk.cyanBright('_______getSentenceGRPC START_______'));

    const tokenrangeHigh = Math.pow(2, 62); // not sure why 64 is not working TODO: check this
    const tokenrangeLow = Math.pow(-2, 63);

    const generatedToken = getRandomArbitrary(tokenrangeLow, tokenrangeHigh);
    console.log(chalk.cyan('Generated token IS:', chalk.red(generatedToken)));

    let region = '';
    if (event.queryStringParameters.region) {
      region = event.queryStringParameters.region;
  
    } else if (event.body) {
      region = JSON.parse(event.body).region
  
    } else {
      region = 'Region NOT SET';
    }
    console.log(chalk.cyan('Client passed region IS:', chalk.red(region)));

    const startTime = new Date();
    const grpcClient = await getGrpcClient(region);

    try {
        const query = new Query();
        query.setCql('select id, num_words, sentence from naming_is_hard.sentence_by_id where token(id) > ? limit 1;');

        const generatedTokenValue = new Value();
        generatedTokenValue.setInt(generatedToken);

        const queryValues = new Values();
        queryValues.setValuesList([generatedTokenValue]);

        query.setValues(queryValues);

        const queryParameters = new QueryParameters();
        //queryParameters.setTracing(false);
        //queryParameters.setSkipMetadata(false);
        query.setParameters(queryParameters);

        const queryResult = await grpcClient.executeQuery(query);

        const resultSet = queryResult.getResultSet();
        if (resultSet) {
            // Compute time difference in milliseconds
            const endTime = new Date();
            const timeDiff = (endTime.getTime() - startTime.getTime());

            const firstRow = resultSet.getRowsList()[0];
            const id = toUUIDString(firstRow.getValuesList()[0]); // TODO: this is wrong, but getUuid on its own is not working
            const numWords = firstRow.getValuesList()[1].getInt();
            const sentence = firstRow.getValuesList()[2].getString();
            console.log(chalk.cyan('Sentence IS:', chalk.red(sentence)));

            const JSONResponse = {"data":{"local":{"values":[
                {"id": id, "numWords": numWords, "sentence": sentence}
            ]}}};

            JSONResponse.elapsed_time = timeDiff;

            return {
                statusCode: 200,
                body: JSON.stringify(JSONResponse)
            }
        }
    } catch (e) {
        console.log(e)
        return {
            statusCode: 500,
            body: JSON.stringify(e)
        }
    }
}


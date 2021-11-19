const { Query } = require("@stargate-oss/stargate-grpc-node-client");
const { getGrpcClient } = require("./utils/grpcClient");
const chalk = require('chalk')

// A helper function to get the query string param from the event or the URL params
// since requests may come from both the client and the URL
function getQueryParam(event, paramName) {
    let param = '';
    if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
        if (event.queryStringParameters[paramName] !== undefined && 
            event.queryStringParameters[paramName] !== null && 
            event.queryStringParameters[paramName] !== "") {
                param = event.queryStringParameters[paramName];
        }
        return param;

    } else if (event.body !== null && event.body !== undefined) {
        param = JSON.parse(event.body)[paramName]
        return param;
  
    } else {
        return null;
    }
}

exports.handler = async function (event, context) {
    // Get the region from the client or URL params
    const region = getQueryParam(event, 'region');
    console.log(chalk.cyan('Region param IS:', chalk.red(region)));

    // Get the function name from the client or URL params
    const functionName = getQueryParam(event, 'function');
    console.log(chalk.cyan('Function param IS:', chalk.red(functionName)));

    // Get the elapsed time from the client or URL params
    const elapsedTime = getQueryParam(event, 'elapsedTime');
    console.log(chalk.cyan('Elapsed time param IS:', chalk.red(elapsedTime)));

    // Use the region to set WHICH Astra data center/region to use for the query
    const grpcClient = await getGrpcClient(region);

    try {
        const insert = new Query();
        insert.setCql("\
            INSERT INTO naming_is_hard.stats_by_function (function_name, timestamp, data_center, elapsed_time, description) \
            VALUES ('" + functionName + "', NOW(), '" + region + "', " + elapsedTime + ", 'description') \
        ");

        await grpcClient.executeQuery(insert);

        // Read the data back out
        const read = new Query();
        read.setCql("SELECT dateOf(timestamp) FROM naming_is_hard.stats_by_function LIMIT 1");

        const queryResult = await grpcClient.executeQuery(read);

        const resultSet = queryResult.getResultSet();
        if (resultSet) {
            const firstRow = resultSet.getRowsList()[0];
            const timestamp = firstRow.getValuesList()[0].getInt();
            console.log(chalk.cyan('INSERT IS:', chalk.red("OK")));

            const JSONResponse = {"data":{"local":{"values":[
                {"timestamp": Date(timestamp)}
            ]}}};

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


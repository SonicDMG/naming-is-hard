const { Query } = require("@stargate-oss/stargate-grpc-node-client");
const { getGrpcClient } = require("./utils/grpcClient");
const chalk = require('chalk')

exports.handler = async function (event, context) {
    const grpcClient = await getGrpcClient();

    try {
        const insert = new Query();
        insert.setCql("\
            INSERT INTO naming_is_hard.stats_by_function (function_name, timestamp, data_center, elapsed_time, description) \
            VALUES ('get_stats', NOW(), 'dc1', 36, 'description') \
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


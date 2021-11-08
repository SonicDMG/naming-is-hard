const { Query } = require("@stargate-oss/stargate-grpc-node-client");
const { getGrpcClient } = require("./utils/grpcClient");

exports.handler = async function (event, context) {
    const grpcClient = await getGrpcClient();

    try {
        const query = new Query();
        //query.setCql('select title from todolist.todolist');
        query.setCql('select data_center from system.local');

        const queryResult = await grpcClient.executeQuery(
            query
        );

        const resultSet = queryResult.getResultSet();
        if (resultSet) {
            const firstRow = resultSet.getRowsList()[0];
            // We call getString() here because we know the type being returned.
            // See below for details on working with types.
            const data_center = firstRow.getValuesList()[0].getString();
            console.log(`data_center: ${data_center}`);

            return {
                statusCode: 200,
                body: JSON.stringify({"data":{"local":{"values":[{"data_center": data_center }]}}})
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


//import * as grpc from "@grpc/grpc-js";
//import { StargateClient, StargateTableBasedToken, Query, Response, promisifyStargateClient } from "@stargate-oss/stargate-grpc-node-client";
const { credentials } = require("@grpc/grpc-js");
const { StargateClient, StargateBearerToken, Query, promisifyStargateClient } = require("@stargate-oss/stargate-grpc-node-client");

const grpcEndpoint = '3f12ae31-f2da-4333-9efe-7944183c6fcc-us-east-1.apps.astra.datastax.com';

exports.handler = async function (event, context) {
    const bearerToken = new StargateBearerToken(process.env.ASTRA_DB_APPLICATION_TOKEN);
    console.log("bearer: ", bearerToken);
    const creds = credentials.combineChannelCredentials(credentials.createSsl(), bearerToken);

    // Create the gRPC client, passing it the address of the gRPC endpoint
    const stargateClient = new StargateClient(grpcEndpoint, creds);

    // Create a promisified version of the client, so we don't need to use callbacks
    const promisifiedClient = promisifyStargateClient(stargateClient);
    try {
        const query = new Query();
        query.setCql('select title from todolist.todolist');
        //query.setCql('select cluster_name from system.local');

        const queryResult = await promisifiedClient.executeQuery(
            query
        );
        console.log("queryResult", queryResult.getResultSet);

        const resultSet = queryResult.getResultSet();
        if (resultSet) {
            //const firstRow = resultSet.getRowsList()[0];

            console.log("resultSet", resultSet);
            const rowList = resultSet.getRowsList();
            console.log("rowList", rowList.length);
            const firstRow = rowList[0];
            // We call getString() here because we know the type being returned.
            // See below for details on working with types.
            const cluster_name = firstRow.getValuesList()[0].getString();
            console.log(`cluster_name: ${cluster_name}`);

            console.log("firstRow", firstRow);
            const firstRowValues = firstRow.getValuesList();
            console.log("firstRowValues", firstRowValues);
            const firstValue = firstRowValues[0].getString();
            console.log("firstValue", firstValue);

            //const responseBody = {"data":{"grpc":{"values":[{"value":"GRPC YOoo"}]}}};
            return {
                statusCode: 200,
                body: JSON.stringify(resultSet.getRowsList()[0])
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


//import * as grpc from "@grpc/grpc-js";
//import { StargateClient, StargateTableBasedToken, Query, Response, promisifyStargateClient } from "@stargate-oss/stargate-grpc-node-client";
const { credentials } = require("@grpc/grpc-js");
const { StargateClient, StargateBearerToken, Query, promisifyStargateClient } = require("@stargate-oss/stargate-grpc-node-client");

//const grpcEndpoint = '3f12ae31-f2da-4333-9efe-7944183c6fcc-us-east-1.apps.astra.datastax.com:443';
const grpcEndpoint = '4a693d8d-b3d4-4d94-ade1-f5ac66208845-us-east1.apps.astra-dev.datastax.com';

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
        //query.setCql('select title from todolist.todolist');
        query.setCql('select data_center from system.local');

        const queryResult = await promisifiedClient.executeQuery(
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


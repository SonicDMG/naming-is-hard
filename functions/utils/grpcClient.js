const { credentials } = require("@grpc/grpc-js");
const { StargateClient, StargateBearerToken, promisifyStargateClient } = require("@stargate-oss/stargate-grpc-node-client");
const chalk = require('chalk')

const getGrpcClient = async function () {
    const bearerToken = new StargateBearerToken(process.env.ASTRA_DB_APPLICATION_TOKEN);
    const creds = credentials.combineChannelCredentials(credentials.createSsl(), bearerToken);

    // Split out the GRPC Endpoint from the GraphQL endpoint programmatically to avoid hardcoding it
    // in the env file. I would like to keep using "npx astra-setup" to auto generate the env file.
    const grpcEndpoint = process.env.ASTRA_GRAPHQL_ENDPOINT.split("/")[2];
    console.log(chalk.cyan('gRPC Endpoint IS:', chalk.red(grpcEndpoint)));

    // Create the gRPC client, passing it the address of the gRPC endpoint
    const stargateClient = new StargateClient(grpcEndpoint, creds);

    console.log(chalk.cyan.bold('___gRPC Initialized___'));

    // Create a promisified version of the client, so we don't need to use callbacks
    return promisifyStargateClient(stargateClient);
};

module.exports = { getGrpcClient };
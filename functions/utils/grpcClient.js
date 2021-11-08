const { credentials } = require("@grpc/grpc-js");
const { StargateClient, StargateBearerToken, promisifyStargateClient } = require("@stargate-oss/stargate-grpc-node-client");

const getGrpcClient = async function () {
    const bearerToken = new StargateBearerToken(process.env.ASTRA_DB_APPLICATION_TOKEN);
    console.log("bearer: ", bearerToken);
    const creds = credentials.combineChannelCredentials(credentials.createSsl(), bearerToken);

    // Create the gRPC client, passing it the address of the gRPC endpoint
    const stargateClient = new StargateClient(process.env.ASTRA_GRPC_ENDPOINT, creds);

    // Create a promisified version of the client, so we don't need to use callbacks
    return promisifyStargateClient(stargateClient);
};

module.exports = { getGrpcClient };
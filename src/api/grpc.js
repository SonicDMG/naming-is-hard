const getSentence = async (region) => {
  const functionName = "getSentenceGRPC"; // The name of the function to call in the serverless backend
  // Asynchronously fetch any "shows_by_name" graphQL data from the Astra DB GraphQL API
  // using the getShowsAstra serverless function to call out to the
  // Astra/Stargate graphQL endpoint
  // https://stargate.io/docs/stargate/1.0/developers-guide/graphql.html
  const response = await fetch("/.netlify/functions/" + functionName, {
    method: "POST",
    body: JSON.stringify({ region: region.toUpperCase() }),
  });
  return await response.json();
};

export { getSentence };

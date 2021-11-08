import { useState, useEffect } from "react" 
   
function GRPC() {
  const [gqlResult, setGqlResult] = useState(null) // State to hold graphQL result data
  const [isLoading, setIsLoading] = useState(true) // State to determine when the async graphQL call is complete
  const [isError, setIsError] = useState(true) // State to determine if the graphQL payload contains an error object

  const fetchData = async () => {
    
    // Asynchronously fetch any "shows_by_name" graphQL data from the Astra DB GraphQL API
    // using the getShowsAstra serverless function to call out to the
    // Astra/Stargate graphQL endpoint
    // https://stargate.io/docs/stargate/1.0/developers-guide/graphql.html
    const response = await fetch("/.netlify/functions/getAstraInfoGRPC", {
      method: "POST",
    })
    const responseBody = await response.json()
    setGqlResult(responseBody) // on response set our graphQL result state
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Watch gqlResult for any state changes and determine if we 
  // are finishled loading the payload or if there are
  // any errors
  useEffect(() => {
    if (gqlResult !== null) {
      setIsLoading(false)

      // Check the payload for any errors https://graphql.org/learn/validation/
      // and if any exist set error state and dump the message to the console
      if ('code' in gqlResult) {
        setIsError(true)
        console.log("grpc ERROR IS: ", gqlResult)
      } else {
        setIsError(false)
      }
    }
  }, [gqlResult]) // <- watch me for state changes

  // If no result yet display loading text and return
  // This will exit the function and "skip" conditions below it
  if (isLoading) return <p>Is Loading...</p>;

  // If there is an error state display error text and return
  // This will exit the function and "skip" conditions below it
  if (isError) return <p>Error :(</p>;

  // If payload loading is complete and there are no errors
  // now check to see there is any data returned
  // (If this triggers it essentially means there are no rows returned from the data layer)
  // This will exit the function and "skip" conditions below it
  if (!gqlResult.data.local.values.length) return <p>No Data</p>;
   
  // Finally, if all other checks pass get the data
  // from the payload via gqlResult state and inject it into the DOM
  // Notice how the payload example below and the fields "title" and "releaseYear" match exactly
  // {"data":{"show_by_name":{"values":[{"title":"Stranger Things","releaseYear":2016},{"title":"Ozark","releaseYear":2017}...
  /*
  return gqlResult.data.grpc.values.map(({ value }) => (
    <div key={value}>
        <p>
        {value}
        </p>
    </div>
  ));
  */
  return gqlResult.data.local.values.map(({ data_center }) => (
    <div key={data_center}>
        <p>
        {data_center}
        </p>
    </div>
  ));

}

export default GRPC;
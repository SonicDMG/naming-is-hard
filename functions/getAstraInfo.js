const fetch = require('node-fetch')
const chalk = require('chalk')

exports.handler = async function (event) {
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

  const query = `
    query getDataCenter {
      local(value:{key: "local"}){
        values{
          data_center
        }
      }
    }
  ` 
  const url = process.env['ASTRA_GRAPHQL_ENDPOINT_' + region];
  console.log(chalk.cyan('GraphQL Endpoint IS:', chalk.red(url)));
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "x-cassandra-token": process.env.ASTRA_DB_APPLICATION_TOKEN
    },
    body: JSON.stringify({ query })
  })

  try {
    const responseBody = await response.json()
    // Compute time difference in milliseconds
    const endTime = new Date();
    const timeDiff = (endTime.getTime() - startTime.getTime()) + " ms";

    responseBody.elapsed_time = timeDiff;

    const dataCenter = responseBody.data.local.values[0].data_center
    console.log(chalk.cyan('Data Center IS:', chalk.red(dataCenter)));
    return {
      statusCode: 200,
      body: JSON.stringify(responseBody)
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    }
  }
}
const AWS = require("aws-sdk");
AWS.config.region = "ap-southeast-2";
const elasticsearch = require("elasticsearch");
const awsHttpClient = require("http-aws-es");

function createClient(esEndPoint) {
  console.log(`Connecting to ElasticSearch endpoint: ${esEndPoint}...`);
  try {
    const client = new elasticsearch.Client({
      host: esEndPoint,
      connectionClass: awsHttpClient,
      amazonES: {
        region: AWS.config.region,
        credentials: new AWS.EnvironmentCredentials('AWS')
        // credentials: new AWS.Credentials("my-access-key", "my-secret-key"),
      },
    });
    console.log(`Successfully connected to ElasticSearch endpoint!`);
    return client;
  } catch (error) {
    console.log(
      `Unable to connect to: ${esEndPoint} due to error: ${error}`
    );
  }
}

exports.createClient = createClient;

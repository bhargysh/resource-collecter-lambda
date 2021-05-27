// https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-request-signing.html#es-request-signing-node
const AWS = require("aws-sdk");

const indexDocument = async (document) => {
  console.log("INDEXING DOCUMENT...", document);
  const request = createHttpRequest(document);
  signRequestWithCreds(request);

  const client = new AWS.HttpClient();
  client.handleRequest(
    request,
    null,
    (response) => {
      console.log(response.statusCode + " " + response.statusMessage);
      const responseBody = "";
      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => {
        console.log("Response body: " + responseBody);
      });
    },
    (error) => {
      console.log("Error: " + error);
    }
  );
}

const signRequestWithCreds = (request) => {
  const credentials = new AWS.EnvironmentCredentials("AWS");
  const signer = new AWS.Signers.V4(request, "es");
  signer.addAuthorization(credentials, new Date());
}

const createHttpRequest = (document) => {
  console.log("CREATING HTTP REQUEST...");

  const domain = "bhargs-cluster";
  const endpoint = new AWS.Endpoint(domain);
  const region = "ap-southeast-2";
  const request = new AWS.HttpRequest(endpoint, region);

  const index = "node-test";
  const type = "_doc";
  const id = "1";

  request.method = "PUT";
  request.path += index + "/" + type + "/" + id;
  request.body = document;
  request.headers["host"] = domain;
  request.headers["Content-Type"] = "application/json";
  request.headers["Content-Length"] = Buffer.byteLength(request.body);
}

exports.indexDocument = indexDocument;

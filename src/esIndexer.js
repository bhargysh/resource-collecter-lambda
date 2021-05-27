// https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-request-signing.html#es-request-signing-node
const AWS = require("aws-sdk");

const indexDocument = async (document) => {
  if (document) {
    const request = createHttpRequest(document);
    const client = new AWS.HttpClient();

    console.log("Indexing document:", document);
    client.handleRequest(
      request,
      null,
      (response) => {
        console.log("Response from ES:", response.statusCode + " " + response.statusMessage);
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
  } else {
    console.log("Invalid document", document);
  }
};

const createHttpRequest = (document) => {
  console.log("Creating HTTP request...");

  const domain = "bhargs-cool-as-cluster";
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
  return request;
};

exports.indexDocument = indexDocument;

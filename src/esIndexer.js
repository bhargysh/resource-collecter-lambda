// https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-request-signing.html#es-request-signing-node
const AWS = require("aws-sdk");

function indexDocument(document, esClient) {
    console.log("INDEXING TIME", document, esClient);
  //   const endpoint = new AWS.Endpoint(domain);
  //   const request = createRequestHeaders();
  //   const credentials = new AWS.EnvironmentCredentials("AWS");
  //   const signer = new AWS.Signers.V4(request, "es");
  //   const client = new AWS.HttpClient();
  //   signer.addAuthorization(credentials, new Date());

  //   client.handleRequest(request, null, function(response) {
  //     console.log(response.statusCode + ' ' + response.statusMessage);
  //     const responseBody = '';
  //     response.on('data', function (chunk) {
  //       responseBody += chunk;
  //     });
  //     response.on('end', function (chunk) {
  //       console.log('Response body: ' + responseBody);
  //     });
  //   }, function(error) {
  //     console.log('Error: ' + error);
  //   });
}

function createRequestHeaders(domain) {
  const request = new AWS.HttpRequest(endpoint, region);
  const region = "ap-southeast-2";

  const index = "node-test";
  const type = "_doc";
  const id = "1";
  const json = {
    title: "Intro to Haskell",
    categories: ["fp", "language"],
    url: "https://marcosampellegrini.com/simple-haskell-book",
  };

  request.method = "PUT";
  request.path += index + "/" + type + "/" + id;
  request.body = JSON.stringify(document);
  request.headers["host"] = domain;
  request.headers["Content-Type"] = "application/json";
  request.headers["Content-Length"] = Buffer.byteLength(request.body);
}

exports.indexDocument = indexDocument;

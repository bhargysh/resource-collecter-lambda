// https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-request-signing.html#es-request-signing-node
const AWS = require("aws-sdk");

function indexDocument(document, esClient) {
    console.log("INDEXING TIME", document, esClient);
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

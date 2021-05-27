const AWS = require("aws-sdk");

const createHttpRequest = (document) => {
  console.log("Creating HTTP request...");

  const domain = "bhargs-cool-as-cluster";
  const endpoint = new AWS.Endpoint(domain);
  const region = "ap-southeast-2";
  const request = new AWS.HttpRequest(endpoint, region);

  const index = "node-test"; // TODO: create separate file for indexing document
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

exports.createHttpRequest = createHttpRequest;

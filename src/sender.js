const AWS = require("aws-sdk");

const sendDocument = async (request) => {
  const client = new AWS.HttpClient();

  console.log("Sending document...");
  client.handleRequest(
    request,
    null,
    (response) => {
      console.log(
        "Response from ES:",
        response.statusCode + " " + response.statusMessage
      );
      const responseBody = "";
      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => {
        console.log("Response body: " + responseBody);
      });
      console.log("Successfully sent document");
    },
    (error) => {
      console.log("Error: " + error);
    }
  );
};

exports.sendDocument = sendDocument;

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-elasticsearch-service/index.html
const { ElasticsearchServiceClient, AcceptInboundCrossClusterSearchConnectionCommand } = require("@aws-sdk/client-elasticsearch-service");

function createClient() {
  async () => {
    const config = {'region': 'ap-southeast-2'};
    const client = new ElasticsearchServiceClient(config);
    const command = new AcceptInboundCrossClusterSearchConnectionCommand({});
    try {
      const results = await client.send(command);
      console.log("RESULTS:", results);
    } catch (err) {
      console.error(err);
    }
  }
};

exports.createClient = createClient;

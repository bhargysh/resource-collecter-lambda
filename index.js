const { validateEvent } = require("./src/validator");
const { indexDocument } = require("./src/esIndexer");

exports.handler = async (event, context, callback) => {
  const payloadForES = validateEvent(event);

  await indexDocument(payloadForES);

  const response = {
    challenge: event.challenge,
  };
  return response;
};

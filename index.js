const { validateEvent } = require("./src/validator");

exports.handler = async (event, context, callback) => {
  const payloadForES = validateEvent(event);

  // TODO: send payload to indexer

  const response = {
    challenge: event.challenge,
  };
  return response;
};

const { validateEvent } = require("./src/validator");
const { sendDocument } = require("./src/sender");
const { createHttpRequest } = require("./request");

exports.handler = async (event, context, callback) => {
  const esPayload = validateEvent(event);
  const request = createHttpRequest(esPayload);

  await sendDocument(request);

  const response = {
    challenge: event.challenge,
  };
  return response;
};

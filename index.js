const { createClient } = require("./src/esClient");

exports.handler = async (event, context, callback) => {
  const channels = ["C0231DPGQ2W"];
  const channelId = event.event.channel;
  const isValidatedChannel =
    channels.includes(channelId) && event.event.channel_type === "channel";
  const urlRegex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/; //https://regexr.com/39nr7
  const containsUrl = (text) => urlRegex.test(text);
  const containsCategory = (arr) => arr.length == 3;
  const inputText = event.event.text;
  const inputArray = inputText.split(", ");
  const endpoint =
    "https://search-bhargs-cluster-kshcjbujvtfakmol4pnbnrtupi.ap-southeast-2.es.amazonaws.com";

  if (isValidatedChannel) {
    if (containsUrl(inputText) && containsCategory(inputArray)) {
      const [title, categories, url] = inputArray;
      const esPayload = JSON.stringify({
        title: title,
        categories: categories.split("/"),
        url: url,
      });
      console.log("ES PAYLOAD", esPayload);
      await createClient(endpoint);

      // TODO: asynchronously send data to ES
    } else {
      console.log(
        `Message with id: ${event.event.client_msg_id} does not contain a url or category`
      );
    }
  } else {
    console.log(`Channel with id: ${channelId} is not a valid channel`);
  }

  const response = {
    challenge: event.challenge,
  };
  return response;
};

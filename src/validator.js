const validateEvent = (slackEvent) => {
  const channels = ["C0231DPGQ2W"];
  const channelId = slackEvent.event.channel;
  const isValidatedChannel =
    channels.includes(channelId) && slackEvent.event.channel_type === "channel";
  // https://regexr.com/39nr7
  const urlRegex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  const containsUrl = (text) => urlRegex.test(text);
  const containsCategory = (arr) => arr.length == 3;
  const inputText = slackEvent.event.text;
  const parsedInput = inputText.split(", ");

  if (isValidatedChannel) {
    if (containsUrl(inputText) && containsCategory(parsedInput)) {
      const [title, categories, url] = parsedInput;
      const esPayload = JSON.stringify({
        title: title,
        categories: categories.split("/"),
        url: url,
      });
      console.log("Payload for ES", esPayload);
      return esPayload;
    } else {
      console.log(
        `Message with id: ${slackEvent.event.client_msg_id} does not contain a url or category`
      );
    }
  } else {
    console.log(`Channel with id: ${channelId} is not a valid channel`);
  }
};

exports.validateEvent = validateEvent;

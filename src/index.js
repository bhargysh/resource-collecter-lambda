exports.handler = async (event, context, callback) => {
    const channels = ['C0231DPGQ2W'];
    const isValidatedChannel = channels.includes(event.event.channel) && event.event.channel_type === 'channel';
    const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/; //https://regexr.com/39nr7
    const containsUrl = (text) => urlRegex.test(text);

    if (isValidatedChannel) {
        const inputText = event.event.text;
        if (containsUrl(inputText)) {
            const [title, categories, url] = inputText.split(", ")
            const hasCategories = categories ? categories : ""

            const esPayload = JSON.stringify({
                "title": title,
                "categories": hasCategories.split("/"),
                "url": url
            })
            console.log("ES PAYLOAD", esPayload);
            // asynchronously send data to ES
        } else {
            console.log(`Message with id: ${event.event.client_msg_id} does not contain a url`);
        }
    }

    const response = {
        challenge: event.challenge,
    };
    return response;
};

//TODO: bug when there is no category passed

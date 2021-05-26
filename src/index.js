exports.handler = async (event, context, callback) => {
    const channels = ['C0231DPGQ2W'];
    const isValidatedChannel = channels.includes(event.event.channel) && event.event.channel_type === 'channel';
    const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/; //https://regexr.com/39nr7
    const extractUrl = (text) => {
        const result = text.match(urlRegex)
    }

    const containsUrl = (text) => urlRegex.test(text);

    if (isValidatedChannel) {
        // const maybeResourceLink = extractUrl(event.event.text);
        if (containsUrl(event.event.text)) {
            console.log("YASSSS", event.event.text);
        }
    }

    const response = {
        challenge: event.challenge,
    };
    return response;
};

/* Logic
get the text from event body
if it contains a link (using regex)
    build a json payload to send to ES
    asynchronously send data to ES
else
    do nothing
*/

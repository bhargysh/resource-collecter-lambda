exports.handler = async (event) => {
    console.log("Event received 👀", event);
    const response = {
        challenge: event.challenge,
    };
    return response;
};

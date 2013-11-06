
var messageData =
{
    messageType :
    {
        message: "MSG",
        error: "ERR",
        command: "CMD"
    },
    message :
    {
        connected: "Connected",
        goodbye: "disconnected",
        toManyConnections: "Connection refused, to many connections.",
        turnStart: "turnStart",
        turnEnd: "turnEnd"
    },
    delimiter: "~",

    getSplitedOf : function(message)
    {
        var data = message.split(messageData.delimiter);

        return {type : data[0], content : message[1]};
    }
};

exports.get = messageData;

// Yes i've built a builder, screw you GUYS.

exports.get =
{
        messageType :
        {
            message: "MSG",
            error: "ERR",
            command: "CMD"
        },
        message :
        {
            connected: "Connected"
        },
        delimiter: "~",

        of : function (type)
        {
            return {
                message : type + this.delimiter,
                about : function(message)
                        {
                            return this.message + message;
                        }
            }
        }
};
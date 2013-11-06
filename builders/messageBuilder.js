// Yes i've built a builder, screw you GUYS.
var messageData = require('./MessageData').get;

exports.get =
{
        of : function (type)
        {
            return {
                message : type + messageData.delimiter,
                about : function(message)
                        {
                            return this.message + message;
                        }
            }
        }
};
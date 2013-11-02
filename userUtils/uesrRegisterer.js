var messageBuilder = require('../builders/messageBuilder.js').get;

var userRegisterer =
{
    data :
    {
        maxUsers : 2,
        loggedInUsers : []
    },

    registerUser : function (user, tryAndStartGame)
    {
        if (this.data.loggedInUsers == this.data.maxUsers)
        {
            refuseUser(user);
        }
        else
        {
            connectUser(user)
        }
    },

    unRegisterUser : function(user)
    {
        user.end
            (
                messageBuilder
                    .of(messageBuilder.messageType.message)
                    .about(messageBuilder.message.goodbye)
            )
    }
};

function refuseUser(user)
{
    user.end
        (
            messageBuilder
                .of(messageBuilder.messageType.error)
                .about(messageBuilder.message.toManyConnections)
        );
}

function connectUser(user)
{
    userRegisterer.data.loggedInUsers.push(user);

    user.write
        (
            messageBuilder
                .of(messageBuilder.messageType.message)
                .about(messageBuilder.message.connected)
        );
}

exports.get = userRegisterer;
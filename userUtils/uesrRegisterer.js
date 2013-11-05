var messageBuilder = require('../builders/messageBuilder.js').get;

var userRegisterer =
{
    data :
    {
        maxUsers : 2,
        loggedInUsers : []
    },

    events :
    {
        maxUsers: "maxUsers"
    },

    registerUser : function (user, tryAndStartGame)
    {
        if (maxReached())
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
    },

    on : function(event, callback)
    {
        events[event].push(callback);
    }
};

var events = [];

function maxReached()
{
    return userRegisterer.data.loggedInUsers == userRegisterer.data.maxUsers;
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

    if (maxReached())
    {
        fireEvent(userRegisterer.events.maxUsers);
    }
}

function refuseUser(user)
{
    user.end
        (
            messageBuilder
                .of(messageBuilder.messageType.error)
                .about(messageBuilder.message.toManyConnections)
        );
}

function fireEvent(event)
{
    if(events[event] != undefined)
    {
        callListenersOf(event)
    }
}

function callListenersOf(event)
{
    for (var index = 0; index < events.length; index++)
    {
        events[event][index]();
    }
}

exports.get = userRegisterer;
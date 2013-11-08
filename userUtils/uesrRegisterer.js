var messageBuilder = require('../builders/messageBuilder.js').get;
var messageData = require('../builders/MessageData').get;

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

    registerUser : function (user)
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
                    .of(messageData.messageType.message)
                    .about(messageData.message.goodbye)
            )
    },

    on : function(event, callback)
    {
        events[event].push(callback);
    }
};

var events = {"maxUsers":[]};

var eventData =
{
    users : userRegisterer.data.loggedInUsers
};

function maxReached()
{
    return userRegisterer.data.loggedInUsers.length == userRegisterer.data.maxUsers;
}

function connectUser(user)
{
    userRegisterer.data.loggedInUsers.push(user);

    user.write
        (
            messageBuilder
                .of(messageData.messageType.message)
                .about(messageData.message.connected)
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
                .of(messageData.messageType.error)
                .about(messageData.message.toManyConnections)
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
    for (var index = 0; index < events[event].length; index++)
    {
        events[event][index](eventData);
    }
}

exports.get = userRegisterer;
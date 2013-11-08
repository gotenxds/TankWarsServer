var messageBuilder = require('../builders/messageBuilder').get;
var messageData = require('../builders/MessageData').get;
var illegalNumberOfPlayers = require('../exceptions/IllegalNumberOfPlayers');

exports.get =
{
    startGame : function(eventData)
    {
        throwIfIllegalNumberOfPlayers(eventData.users);

        users = eventData.users;

        registerUsersToEvents();
        startGame();
    }
};
var turnTime = 30000;

var users = [];
var actions = {};
actions[messageData.messageType.command] = [];
actions[messageData.messageType.error] = [];
actions[messageData.messageType.message] = [];
function throwIfIllegalNumberOfPlayers(players)
{
    if (players.length <= 1)
    {
        throw illegalNumberOfPlayers("Not enough players");
    }
}

function registerUsersToEvents()
{
    for (var index = 0; index < users.length; index++)
    {
        var user = users[index];
        user.on('data', function(data)
        {
            receivedDataFromUser({user: user, data: data})
        });
    }
}

function startGame()
{
    sendTo(users[0], messageData.messageType.command, messageData.message.turnStart);
}

function receivedDataFromUser(data)
{
    var message = messageBuilder.getSplitedOf(data.data);
    actions[message.type][message.content](data.user);
}

function getUserAfter(user)
{
    var curUserIndex = users.indexOf(user);
    if ((users.length - 1) > curUserIndex)
    {
        return users[curUserIndex + 1];
    }

    return users[0];
}

function sendToNext(user, type, message)
{
    sendTo(getUserAfter(user), type, message);
}

function sendTo(user, type, message)
{
    user.write
        (
            messageBuilder
                .of(type)
                .about(message)
        );
}

actions[messageData.messageType.message][messageData.message.turnEnd] = function(user)
{
    sendToNext(user, messageData.messageType.command, messageData.message.turnStart);
};

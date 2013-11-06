var messageBuilder = require('../builders/messageBuilder').get;
var illegalNumberOfPlayers = require('../exceptions/IllegalNumberOfPlayers');

exports.get =
{
    startGame : function(players)
    {
        throwIfIllegalNumberOfPlayers(players);

        users = players;

        registerUsersToEvents();
    }
};

var users = [];
var actions;
actions[messageBuilder.messageType.command] = [];
actions[messageBuilder.messageType.error] = [];
actions[messageBuilder.messageType.message] = [];

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
    var nextUser = getUserAfter(user);

    nextUser.write
        (
            messageBuilder
                .of(type)
                .about(message)
        );
}

actions[messageBuilder.messageType.message][messageBuilder.message.turnEnd] = function(user)
{
    sendToNext(user, messageBuilder.messageType.command, messageBuilder.message.turnStart);
};

actions[messageBuilder.messageType.message][messageBuilder.message.hit] = function(user)
{
    sendToNext(user, messageBuilder.messageType.command, messageBuilder.message.damageTaken);
};
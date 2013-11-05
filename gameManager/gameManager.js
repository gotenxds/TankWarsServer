var illegalNumberOfPlayers = require('../exceptions/IlleagelArgumentException.js').IlleagelArgumentException;

exports.get =
{
    startGame : function(players)
    {
        throwIfIllegalNumberOfPlayers();

        users = players;

        runGameLoop();
    }
};

var users = [];

function throwIfIllegalNumberOfPlayers()
{
    if (players.length <= 1)
    {
        throw illegalNumberOfPlayers("Not enough players");
    }
}

function runGameLoop()
{
    var currentUser = users[0];
    var gameOn = true;

    while(gameOn)
    {

    }
}

function getNextUser(curUser)
{
    var indexOfNextUser = users.indexOf(curUser) + 1;

    if ((users.length) > indexOfNextUser)
    {
        return users[indexOfNextUser];
    }

    return users[0];
}


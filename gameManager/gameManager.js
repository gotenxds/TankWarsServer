var illegalNumberOfPlayers = require('../exceptions/IlleagelArgumentException.js');

exports.get =
{
    startGame : function(players)
    {
        throwIfIllegalNumberOfPlayers();

        users = players;

        runGameLoop();
    }
};

function throwIfIllegalNumberOfPlayers()
{
    if (players.length <= 1)
    {
        throw illegalNumberOfPlayers("Not enough players");
    }
}

function runGameLoop()
{}

var users = [];
var userRegisterer = require('./userUtils/uesrRegisterer.js').get;
var gameManager = require('./gameManager/gameManager').get;
var net = require('net');
var server;

initialize();

function initialize()
{
    userRegisterer.on(userRegisterer.events.maxUsers, gameManager.startGame);

    server = net.createServer(function (connection)
    {
        initializeServerDefaults(connection);
        userRegisterer.registerUser(connection);
    });

    server.listen(6000, function ()
    {
        console.log('Tank war server started listening on port 6000');
    });
}

function initializeServerDefaults(conn)
{
    conn.setEncoding('utf8');
}

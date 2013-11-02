var messageBuilder = require('./messageBuilder.js').get();
var net = require('net');

var options =
    {
        maxUsers : 2,
        loggedInUsers : []
    };

var server = net.createServer(function (connection)
{
    giveConnectedMessage(connection);
    initializeServerDefaults(connection);

    connection.on('data', recivedData);
});

function giveConnectedMessage(connection)
{
    connection.write
        (
            messageBuilder
                .of(messageBuilder.messageType.message)
                .about(messageBuilder.message.connected)
        )
}


server.listen(3000, function ()
{
    console.log('Tank war server started listening on port 3000');
});


function recivedData(data)
{
    // TO BE ADDED
}

function initializeServerDefaults(conn)
{
    conn.setEncoding('utf8');
}
var userRegisterer = require('./userUtils/uesrRegisterer.js').get;
var net = require('net');



var server = net.createServer(function (connection)
{
    initializeServerDefaults(connection);
    userRegisterer.registerUser(connection);

    // Will most probly be moved to a diffrent file.
    connection.on('data', recivedData);
});


server.listen(4001, function ()
{
    console.log('Tank war server started listening on port 4001');
});


function recivedData(data)
{
    // TxO BE ADDED
}

function initializeServerDefaults(conn)
{
    conn.setEncoding('utf8');
}
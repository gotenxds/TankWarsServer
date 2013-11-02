var net = require('net');

var server = net.createServer(function (connection)
{
    initializeServerDefaults(connection);

    connection.on('data', recivedData);

    count++;
});


server.listen(3000, function ()
{
    console.log('\033[96m server listening on *:3000\033[39m');
});


function recivedData(data)
{
    // TO BE ADDED
}

function initializeServerDefaults(conn)
{
    conn.setEncoding('utf8');
}
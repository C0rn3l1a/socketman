const net = require('net');
const c = require('ansi-colors');
const WebSocketServer = require('websocket').server;

const http = require('http');

const server = http.createServer((request, response) => {
    console.log((new Date().toISOString()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(8000, function () {
    console.log((new Date().toISOString()) + ' Server is listening on port 8080');
});

const ws_server = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(_) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

ws_server.on('request', function (request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log(`[${new Date().toISOString()}] ${c.red(`Connection from origin ${request.origin} rejected.`)}`);
        return;
    }

    const connection = request.accept();
    console.log(`[${new Date().toISOString()}] ${c.green('Connection Accepted')}`);
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            // console.log(`\'you are a ${message.utf8Data}!!\'`);
            
            let data_string = message.utf8Data;
            console.log('initial data_string : ',JSON.parse(data_string));
            if(data_string.startsWith('"')){data_string = data_string.slice(0,1);}
            if(data_string.endsWith('"')){data_string = data_string.slice(-1);}
            console.log('data_string : ',data_string);
            let answer_obj;
            try {
                JSON.parse(data_string);
                answer_obj = {is_json: true};
            } catch (error) {
                answer_obj = {is_json: false};
            }

            let answer = JSON.stringify(answer_obj);
            connection.sendUTF(answer);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });

    connection.on('close', function (reasonCode, description) {
        console.log(`[${new Date().toISOString()}] ${c.yellow(`Peer ${connection.remoteAddress} disconnected.`)}`);
    });
});
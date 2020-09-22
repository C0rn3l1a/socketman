const net = require('net');

// connect to socketman server

let clients = [];

for(const port of [3000, 8000]) {
    const client = net.createConnection({ port }, () => {
        console.log('connecting to my man socketman');
        client.write('CLIENT SAYS: Howdy partner!');
    });
    
    client.on('data', data => {
        console.log(`SERVER TOLD ME: ${data.toString()}`);
        client.end();
    });
    
    client.on('end', () => {
        console.log('CLIENT SAYS: Goodbye my boy');
    });

    clients.push(client);
}
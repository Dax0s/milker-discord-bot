const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const args = require('minimist')(process.argv.slice(2));
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

server.listen(args['port'], () => {
    console.log(`Server is running on ${ server.address().address }:${ server.address().port }`);
});
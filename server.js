require('dotenv').config();
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const nocache = require('node-nocache');

let app = express();
let routes = require('./app.routes.js');

// compress our client side content before sending it over the wire
app.use(compression());
app.use(express.json());
app.use(express.urlencoded());

// your manifest must have appropriate CORS headers, you could also use '*'
app.use(cors({ origin: '*' }));

// https://github.com/mingchen/node-nocache
app.use('/manifest.json', nocache, function (request, response) {
    response.sendFile(__dirname + '/public/manifest.json');
});

app.use('/', routes);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
    console.info(`Node Version: ${process.version}`);
    console.log('Server listening on port ' + listener.address().port);
});

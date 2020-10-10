var express = require('express')
    , app = express()
    , http = require('http')
    , url = require('url')
    , path = require('path')
    , fs = require('fs')
    , methodOverride = require('method-override')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , config = require('./config').config
    , lib = require('./lib')
    , api = require('./config').api
    ;

app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(function (req, res, next) {
    if (typeof (req.headers['content-type']) === 'undefined') {
        req.headers['content-type'] = "application/json; charset=UTF-8";
    }
    next();
});
var originsWhitelist = [
    config.clientUrl,
    config.serverUrl,
    'http://localhost:' + config.proxyPort,
    'http://localhost:4200'
];
var corsOptions = {
    origin: function (origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        isWhitelisted = true; //!!!!
        callback(null, isWhitelisted);
    },
    credentials: true
}
app.use(cors(corsOptions));


var filePath = path.join(__dirname, './routes');
fs.readdirSync(filePath).forEach(function (file) {
    require(filePath + '/' + file)(app, lib, api);
});

console.log(
    "\n" +
    "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n" +
    " Proxy Server listening on port " + config.proxyPort + "\n" +
    " Mock Server listening on port " + config.mockPort + "\n" +
    "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
);
console.log('cors:', [
    config.clientUrl
]);

var parsedServerUrl = url.parse(config.serverUrl);

function onRequest(client_req, client_res) {
    var options = {
        hostname: 'localhost',
        port: config.mockPort,
        path: client_req.url.replace(/^\/proxy/, ""),
        method: client_req.method,
        headers: client_req.headers
    };

    if (config.mockGate[url.parse(options.path).pathname]) {
        options.hostname = parsedServerUrl.hostname;
        options.port = "80";
        options.headers.Authorization = 'Basic YnJhbmlzbGF2IGFkYW1lYzp0ZXN0ZXJkZXY5';// + Buffer.from('username:pwd').toString('base64');
        // options.headers["Cookie"] = "_ga=GA1.2.410644406.1556103214; SessionID=74F2FAC455DA9531A812277D90A97FAD853C42C9; LtpaToken=AAECAzVFRjFFRTgzNUVGMjBBQTNDTj1NaWxvcyBORU1DS08vTz1Qb3NBbSBEZXY5L0M9U0tiu2+I40n46TW8uUgNG3uspHTDIQ==";
        options.headers["Host"] = "dev9ba01.posam.sk";

        options.headers["sec-fetch-mode"] = "no-cors";
        // options.headers["Content-Type"] = "application/json; encoding=UTF-8";
        options.headers["Access-Control-Allow-Origin"] = "*";
        options.headers["Access-Control-Allow-Methods"] = "*";
        options.headers["Access-Control-Allow-Credentials"] = "*";
        options.headers["Access-Control-Allow-Headers"] = "*";
        options.headers["Accept"] = "*/*";
        options.headers["Referer-Policy"] = "no-referrer";
        options.headers.referer = options.headers.origin =
            options.headers.host = config.serverUrl;
    }


    // console.dir(options)

    var proxy = http.request(options, function (res) {
        client_res.writeHead(res.statusCode, res.headers)
        res.pipe(client_res, {
            end: true
        });
    });

    client_req.pipe(proxy, {
        end: true
    });

}

http.createServer(onRequest).listen(config.proxyPort);
app.listen(config.mockPort);
// var http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end(index.html);
// }).listen(1337, "127.0.0.1");
// console.log('Server running at http://127.0.0.1:1337/');


// var http = require('http'),
// 	fs = require('fs'); 
// var app = http.createServer(function (request, response) {
// 	fs.readFile("index.html", 'utf-8', function (error, data) {
// 		response.writeHead(200, {'Content-Type': 'text/html'});
// 		response.write(data);
// 		response.end();
// 	});
// }).listen(1337, "localhost");



var http = require('http'),
	fs = require('fs'),
	express = require('express'),
	path = require('path');

var app = express();
var server = http.createServer(app);

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('index');
});

app.listen(1337, "localhost");
console.log('Server running at http://127.0.0.1:1337/');

//sys.puts('server running ' + 'now ' + Date.now());
 
// var io = require('socket.io').listen(app);
// io.sockets.on('connection', function(socket) {
//     socket.on('message_to_server', function(data) {
//         io.sockets.emit("message_to_client",{ message: data["message"] });
//     });
// });
// require express
var express = require("express");

// path module -- try to figure out where and why we use this
var path = require("path");

// create the express app
var app = express();

// static content
app.use(express.static(path.join(__dirname, "./static")));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// using socket
const server = app.listen(1399);
const io = require('socket.io')(server);
var counter = 0;
io.on('connection', function(socket) { //2

    socket.on('pushed_button', function(data) { // first receiving
        counter += 1;
        console.log(counter); //(note: this log will be on your server's terminal)

        io.emit('updated_number', {
            // socket.broadcast.emit('updated_number', {
            updatedNum: counter
        });

    });

    socket.on('reset_button', function(data) { // first receiving
        counter = 0;
        // socket.emit('updated_number', {
        //     updatedNum: counter
        // });
        io.emit('updated_number', {
            updatedNum: counter
        });
    });

});


// root route to render the index.ejs view
app.get('/', function(req, res) {
    res.render("index");
})
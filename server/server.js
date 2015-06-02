#!/usr/bin/env node
var Rx = require('rx');
var env = require('node-env-file');

var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

var DataGenerator = require('./createData');

process.env.PATH_TO_CLIENT = './client/build';
process.env.PORT = 3000;

env(process.cwd() + '/treadstone.cfg', {overwrite: true});

console.log('PATH_TO_CLIENT = ' + process.env.PATH_TO_CLIENT);
console.log('PORT = ' + process.env.PORT);

// this is relative from the gulpfile.js i.e. from where the node server has been started from
app.use(express.static(process.env.PATH_TO_CLIENT));

app.get('/hello', function (req, res) {
    res.send('Hello World!');
});

app.ws('/dashboard', function (ws, req) {

    var messages = Rx.Observable.fromEvent(ws, 'message');
    messages.subscribe(function (message) {
      var sub;
      if (message !== 'stop') {
        sub = sendDashboardData(ws)
      } else {
        if (sub) {
          sub.dispose();
        }
      }
    });
});

var server = app.listen(process.env.PORT, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

var sendDashboardData = function (ws) {
    var messages = Rx.Observable.fromEvent(ws, 'message');
    var disconnected = Rx.Observable.fromEvent(ws, 'close');

    messages.subscribe(function (message) {
        console.log('Server received message: %s', message);
    });

    var dataSource = DataGenerator.createData().controlled();
    dataSource.subscribe(function (data) {
        // add the memory info to system info
        var memoryInfo = process.memoryUsage();
        data.systemInfo.memoryTotal = memoryInfo.heapTotal;
        data.systemInfo.memoryUsed = memoryInfo.heapUsed;

        data.batch.endDate = new Date().getTime();

        ws.send(JSON.stringify(data));
    }, function (err) {
        Utils.errorHandler(err);
    }, function () {
        console.log('Stopped sending data to client')
    });

    return Rx.Observable.interval(1000)
        .takeUntil(disconnected)
        .subscribe(function () {
            dataSource.request(1);
        }, function (err) {
            Utils.errorHandler(err);
        }, function () {
            console.log('Stopped sending data to client')
        });
};

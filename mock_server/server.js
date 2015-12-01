var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.get('*', function(req, res) {

  // get json config
  var config = readConfig();

  // get filename from config
  var fileName = config[req.path];
  if (fileName == undefined || fileName == null) {
    res.sendStatus(404);
    return;
  }

  // file read options
  var options = {
    root: __dirname + '/files/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  // send file
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('Sent:', fileName);
    }
  });
});

app.post('/test', function(req, res) {
  writeConfig(req.body);
  res.sendStatus(200);
});

// config read write

function readConfig() {
  return {
    '/v1/books/fictionbooks': 'fictionbooks.json',
    '/zosmf/restjobs/jobs': 'jobs.json'
    // '/zosmf/restjobs/jobs/<jobname>/<jobid>': 'job.json'
    // '/zosmf/restjobs/jobs/<jobname>/<jobid>/files': 'jobspoolfiles.json'
    // '/zosmf/restjobs/jobs/<jobname>/<jobid>/files/<spoolfile>/records': 'jobspoolfilerecords.json'
  };
}

function writeConfig(json) {
  var fs = require('fs');
  var path = '/tmp/epcmobile-test-config.json';
  if (fs.existsSync(path)) {
    fs.unlinkSync(filePath);
  }
  fs.writeFileSync("/tmp/test-config", "Hey there!", function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}

// server setup

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

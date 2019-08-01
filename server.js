const express = require('express'),
      webpack = require('webpack'),
      webpackConfig = require('./webpack.config'),
      compiler      = webpack(webpackConfig);	

const app = express();


app.use(express.static('public'));

app.use(compiler);

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

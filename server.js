const express = require('express');


const app = express();

const webpackDevServer = require('./node_modules/webpack-dev-server/lib/Server'),
	    webpackConfig = require('./webpack.config'),
      webpack       = require('webpack'),
	    compiler      = webpack(webpackConfig);	

app.use(
	require("webpack-dev-middleware")(
    compiler, {
      noInfo    : true,
      publicPath: webpackConfig.output.publicPath	
    }
	)
);

app.use(express.static('public'));

//app.use(compiler);

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

var express = require("express"),
	restler = require("restler"),
	mu = require('mu2express');

var app = express();
app.engine('mustache', mu.engine);
app.set('view engine', 'mustache');
app.set('views', __dirname + "/views");


app.get("/:market?", function(req, res){
	console.log("Got request");
	if (req.url === '/favicon.ico') {
    	res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    	res.end();
    	return;
  	}
  	restler.get("http://bitcoincharts.com/t/weighted_prices.json").on('complete', function(bitcoin){
  		console.log("recieved data");

  		
  		var market_data = JSON.parse(bitcoin);

  		if (market = "" ){
  			res.send(market_data);
  		} else if (market_data[market] == "undefined"){
  			console.log("not valid");
  		} else {
  			var market = req.params.market.toUpperCase();

  			var week_data = market_data[market]["7d"];
  			var month_data = market_data[market]["30d"]
  			var day_data = market_data[market]["24h"]

  			res.render('index',{
  				'locals' : {
	  				'market' : market,
	  				'week'   : week_data,
	  				'month'  : month_data,
	  				'day'    : day_data,
  				}
  			});
  		}
  		
  	});
  	res.send
});

var port = process.env.PORT || 5124;
app.listen(port, function() {
	console.log("Listening on " + port);
});
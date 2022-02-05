const express = require('express');
const app = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
  });

/*app.use(express.urlencoded({
    extended: true
  }))
  const bodyParser = require('body-parser');
  //app.use(bodyParser.urlencoded({extended: false}));
  */
  const bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({
      extended: false
  }));
  

  const path = require('path');
  const public = path.join(__dirname,'public');
  app.use(express.static(public));

//app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
//app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const router = require('./routes/guestbookRoutes');
app.use('/', router);

app.listen(3001, () => {
    console.log('Server started on port 3001. Ctrl^c to quit.');
    })


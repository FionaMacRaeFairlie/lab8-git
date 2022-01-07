const express = require('express');
const app = express();


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

app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
    })


  
const express = require('express'),
  exphbs = require('express-handlebars'),
  logger = require('morgan'),
  path = require('path'),
  app = express();

app.use(logger('dev'));
app.use(express.static(path.resolve(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('get_started');
});

module.exports = app;

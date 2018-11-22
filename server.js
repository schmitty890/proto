/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const path = require('path');
const exphbs = require('express-handlebars');
const fs = require('fs');

/**
 * Get static html folder
 */
const staticHTMLFolder = './public/pages';
var staticHTMLpages = [];

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('port', 8080);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {} // no handlebar helpers currently
}));
app.set('view engine', 'handlebars');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/build', express.static(__dirname + '/build'));
// app.use('/public', express.static(__dirname + '/public'));

/**
 * Get list of all static html pages in project
 */
fs.readdir(staticHTMLFolder, (err, files) => {
  files.forEach(file => {
    file = file.split('.html')[0];
    staticHTMLpages.push(`/${file}`);
  });
});

/**
 * Get all routes
 */
require('./controllers/html-routes.js')(app);

/**
 * Check if there is a static html page, if there is show that html page, else show 404 page if no route has been hit
 */
app.get('*', function(req, res) {
  staticHTMLpages.includes(`${req.url}`) ? res.sendFile(path.join(__dirname, `public/pages${req.url}.html`)) : res.render('404');
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

var innercitydgkStats = require('../data/innercitydgk-stats.json');
var yuppyvilleStats = require('../data/yuppyville-stats.json');

module.exports = function (app) {
  // Home Page
  app.get('/', function (req, res) {
    var hbsObject = {
      yuppyvilleStats: yuppyvilleStats,
      innercitydgkStats: innercitydgkStats
    }
    // console.log(data);
    console.log(hbsObject);
    res.render('index', {
      title: 'Home',
      hbsObject: hbsObject
    });
  });
};

var testdata = require('../data/testData.json');

module.exports = function (app) {
  // Home Page
  app.get('/', function (req, res) {
    var hbsObject = {
      testdata: testdata
    }
    // console.log(hbsObject);
    res.render('index', {
      title: 'Home', // pass any value to handlebar template
      hbsObject: hbsObject
    });
  });
};

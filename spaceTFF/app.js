/*jshint esversion: 6 */

var express = require('express');
var app = express();
var nunjucks = require('nunjucks');
var cors = require('cors');

var _templates = process.env.NODE_PATH ? process.env.NODE_PATH + '/templates' : 'templates' ;
nunjucks.configure(_templates, {
    autoescape: true,
    express: app
});
app.engine( 'html', nunjucks.render );
app.set( 'view engine', 'html' );
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/customcss', express.static(__dirname + '/customcss'));
app.use(cors());

// Own Dependency
var calc = require('./calculation');
var dataStructure = require('./dataStructure');

app.get('/param', (req, res) => {
  res.json(dataStructure.parameters());
});

app.post('/results', (req, res) => {
  let askedParam = req.body.param;
  if (!askedParam) {
    var err = new Error('Missing argument');
    err.status = 400;
    return next(err);
  }

  let iter = askedParam.years;
  if (!iter || iter < 0 || iter > 1000) { iter = 50; }
  let maxPop = askedParam.maxPop || 1000000;
  if (!maxPop || maxPop < 1 || maxPop > 10000000) { maxPop = 1000000; }
  let shipProduction = askedParam.shipProduction || 0;

  res.json(calc.iterateThat([initialCondition], askedParam, iter, maxPop, shipProduction));
});

app.get('/', (req, res) => {
  "use strict";
  let initialCondition = dataStructure.blankYear();
  var param = dataStructure.parameters();
      param.probIncreaseProdOfIts = 0.3;
      param.itsIncreaseOf = 1;
        // {
        //   persPerShip: 100,
        //   engineMalfunction: 0.1,
        //   refuilingDefect: 0.02,
        //   landingFaillure: 0.05,
        //   reusabilityOfShip: 5,
        //   improvement: 0.05,
        //   firstStageEngine: 42,
        //   itsEngine: 9,
        //   touristRatio: 0.3,
        //   orbitRefulling: 4,
        //   probIncreaseProdOfIts: 0,
        //   itsIncreaseOf: 1,
        // }

  let popGrowth = calc.iterateThat([initialCondition], param, 10, 10000, 1);
  res.render('index', {
    popGrowth: popGrowth,
    param: param,
    initialCondition: [initialCondition]
  });
});

module.exports = app;

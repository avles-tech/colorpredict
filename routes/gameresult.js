var express = require('express');
var router = express.Router();
var db = require('../db.js');

router.post('/', async function async(req, res, next) {
  //res.send('respond with a resource');
  var data = req.body;
  await db.create(data);
  res.sendStatus(200);
  res.end();
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('gameresult', { title: 'Parity' });

});

/* GET home page. */
router.get('/count', function (req, res, next) {
  var data = db.count();
  var dataEx = [];
  

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      d["color"] = getColor(d['price']);
      dataEx.push(d);

    }

   

  
  res.render('gameresult', { title: 'Parity' });

});

router.get('/next', function (req, res, next) {
  var data = db.readAll();
  data = data.sort(function (a, b) { return b.period - a.period });
  var next = getColor(Math.fround(Math.tan(data[i]['price'])).toString())
});

router.get('/getalldata', function (req, res, next) {
  var data = db.readAll();
  data = data.sort(function (a, b) { return b.period - a.period });
  // res.status(200).send( {  data : data});
  //res.send("<p> some test </p>");
  var dataEx = [];
  var next = '';
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    

    d["color"] = getColor(d['price']);
    if(i != (data.length - 1)){
      d["tanColor"] = getColor(Math.fround(Math.tan(data[i+1]['price'])).toString()) ; 
    }
    else{
      
      d["tanColor"] = 'blank'
    }

    if(i =0) d['next'] = getColor(Math.fround(Math.tan(data[i]['price'])).toString())

    
   



    dataEx.push(d);

  }

  res.render('table', { data: data });

});

function getColor(price) {
  console.log(price);
  var lastDigit = price.charAt(price.length - 1);
  var color;
  if (['0', '2', '4', '6', '8'].includes(lastDigit))
    color = 'red';
  else
    color = 'green'

  return color;
}

module.exports = router;
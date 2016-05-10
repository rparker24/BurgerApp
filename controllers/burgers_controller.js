var express = require('express');
var router = express.Router();
var cat = require('../models/burger.js');

router.get('/', function(req,res) {
	res.redirect('/burgers')
});

router.get('/burgers', function(req,res) {
	cat.all(function(data){
		var hbsObject = {burgers : data}
		console.log(hbsObject)
		res.render('index', hbsObject);
	});
});

router.post('/burgers/create', function(req,res) {
	cat.create(['name', 'sleepy'], [req.body.name, req.body.sleepy], function(data){
		res.redirect('/burgers')
	});
});

router.put('/burgers/update/:id', function(req,res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	cat.update({'sleepy' : req.body.sleepy}, condition, function(data){
		res.redirect('/burgers');
	});
});

router.delete('/burgers/delete/:id', function(req,res) {
	var condition = 'id = ' + req.params.id;
	cat.delete(condition, function(data) {
		res.redirect('/burgers');
	});
});


module.exports = router;

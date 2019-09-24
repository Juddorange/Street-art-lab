const express = require('express');
const StreetArt = require('../models/StreetArt');
const Visit = require('../models/Visit');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();

// Route protected for logged in user
router.get('/my-visits', isLoggedIn, (req, res, next) => {
	console.log(req.user._id);
	Visit.find({ _user: req.user._id })
		.populate('_streetArt')
		.then((dbRes) => res.json(dbRes))
		.catch((err) => console.log(err));
});

router.post('/visits', isLoggedIn, (req, res, next) => {
	console.log('bonjour', req.body);
	const newVisit = {
		_user: req.user._id,
		_streetArt: req.body._streetArt
	};
	Visit.create(newVisit).then((dbRes) => res.json(dbRes)).catch((err) => console.log(err));
});

router.delete('/visits/:visitId', isLoggedIn, (req, res, next) => {
	Visit.findOneAndRemove({ _id: req.params.visitId, _user: req.user._id })
		.then((dbRes) => res.json(dbRes))
		.catch((err) => console.log(err));
});

module.exports = router;

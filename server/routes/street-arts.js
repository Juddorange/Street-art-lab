// server/routes/street-arts.js
const express = require('express');
const router = express.Router();
const StreetArt = require('../models/StreetArt');
const cloudinary = require('../configs/cloudinary');

router.get('/', (req, res, next) => {
	StreetArt.find()
		.then((streetArt) => {
			console.log(res), res.json(streetArt);
		})
		.catch((err) => console.log(err));
});

router.get('/:streetArtId', (req, res, next) => {
	StreetArt.findById(req.params.streetArtId)
		.then((streetArt) => res.json(streetArt))
		.catch((err) => console.log(err));
});

router.post('/', cloudinary.single('pictureUrl'), (req, res, next) => {
	const { lat, lng } = req.body;
	const newArt = {
		location: {
			coordinates: [ lng, lat ]
		},
		pictureUrl: req.file.secure_url
	};

	StreetArt.create(newArt).then((dbRes) => res.json(dbRes)).catch((err) => console.log(err));
});

module.exports = router;

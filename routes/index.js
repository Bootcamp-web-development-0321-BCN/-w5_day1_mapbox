const express = require("express");
const router = express.Router();

const Restaurant = require("./../models/Restaurant.model");
/* GET home page */

// Passport save user in req.user
router.get("/", (req, res, next) => {
	res.render("index", { user: req.user });
});

//1 Route to see map
router.get("/maps", (req, res) => {
	res.render("map");
});

//2 Route to get all restaurant data
router.get("/all-restaurants", (req, res) => {
	Restaurant.find({})
		.then((allRestaurants) => res.json(allRestaurants))
		.catch((error) => console.error(error));
});

module.exports = router;

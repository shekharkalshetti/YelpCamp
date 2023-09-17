const express = require("express");
const mongoose = require("mongoose");
const cities = require("./cities");
const path = require("path");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapboxToken = 'pk.eyJ1Ijoic2hla2traGFyIiwiYSI6ImNsbWV5eHJ3OTF0ZGUzdHM1M3dnczNlZzQifQ.pKRVEFNDOU0OEiESttUBkg';
const geocoder = mbxGeocoding({ accessToken: mapboxToken });

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database Connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 200; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			owner: "64fc53f5c8cc09a2e921ebfe",
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			// geometry: {
			// 	type: 'Point',
			// 	coordinates: await geocoder.forwardGeocode({
			// 		query: this.location,
			// 		limit: 1
			// 	}).send()
			// },
			geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae itaque iusto enim cumque eveniet quasi explicabo nulla quisquam, distinctio suscipit officia voluptates aliquid. Beatae quis error, porro sit enim a.",
			price: price,
			images: [
				{
					url: 'https://res.cloudinary.com/do1pf13qz/image/upload/v1694337991/Yelp-Camp/dxm0j4bv57wpto9h4luw.jpg',
					filename: 'Yelp-Camp/dxm0j4bv57wpto9h4luw'
				},
				{
					url: 'https://res.cloudinary.com/do1pf13qz/image/upload/v1694337986/Yelp-Camp/z1xxzoynjptfimqwzjet.jpg',
					filename: 'Yelp-Camp/z1xxzoynjptfimqwzjet'
				}
			]
		});
		await camp.save();
		// console.log(i);
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});

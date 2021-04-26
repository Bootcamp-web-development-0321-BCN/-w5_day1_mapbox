//Create a main arrow function and set the event listener to run it on load

const main = () => {
	// Set the Mapbox API access token
	mapboxgl.accessToken =
		"pk.eyJ1IjoiZmVkZW11bmllbnRlIiwiYSI6ImNrbHh6ZnA2MjB1bzYydXJ6c3Zxd3JnaG0ifQ.MYXBWDkRnwRoUQn8Dz1RRg";

	console.log("hey");

	//Create de map
	const map = new mapboxgl.Map({
		container: "map", // same id on map.hbs
		center: [2.0787281, 41.3948976], // !!!! [lng, lat]
		zoom: 13.5, // > number, > zoom in
		style: "mapbox://styles/mapbox/light-v10"
		//style: "mapbox://styles/mapbox/dark-v10"
		// style: "mapbox://styles/mapbox/light-v10"
		// style: "mapbox://styles/mapbox/streets-v11"
		// style: "mapbox://styles/mapbox/satellite-v9"
	});

	// If you want the browser geolocation
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				let pos = [position.coords.longitude, position.coords.latitude];

				//here we set the map center to our location
				map.setCenter(pos);
			},
			() => alert("Issue retrieving your location")
		);
	} else {
		alert(" Your browser doesn't support Geolocation");
	}

	//Harcode a new pin with a popup
	let popup = new mapboxgl.Popup().setHTML(
		`
		<p>Name</p>
		<p>Description</p>
		<a href="/">Go to home</a>
		`
	);

	new mapboxgl.Marker()
		.setLngLat([2.17979, 41.40106])
		.setPopup(popup)
		.addTo(map);

	//Print pins from DB
	axios
		.get("http://localhost:5000/all-restaurants")
		.then((res) => {
			//Save the array of data
			const restaurants = res.data;
			restaurants.forEach((restaurant) => {
				//create the popop info
				let popup = new mapboxgl.Popup().setHTML(
					`
					<p>${restaurant.name}</p>
					<p>${restaurant.description}</p>
					<a href="/">Go to home</a>
					`
				);

				//create the marker
				new mapboxgl.Marker({ color: "red" })
					.setLngLat(restaurant.location.reverse())
					.setPopup(popup)
					.addTo(map);
			});
		})
		.catch((err) => console.error(err));

	// Make an HTTP GET request back to our server from the view to get the list of all the restaurants
	// We use axios to make the HTTP request, but this can be done with `fetch()` as well
	// axios
	// 	.get("http://localhost:3000/all-restaurants")
	// 	.then((result) => {
	// 		result.data.forEach((restaurant) => {
	// 			new mapboxgl.Marker()
	// 				.setLngLat(restaurant.location.coordinates.reverse()) // reverse the order of Lat and Long
	// 				// .setLngLat(restaurant.location.coordinates)
	// 				.addTo(map);
	// 		});
	// 	})
	// 	.catch((err) => console.error(err));
};

window.addEventListener("load", main);

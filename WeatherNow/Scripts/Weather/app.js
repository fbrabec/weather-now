function getWeather() {
	let temperature = document.getElementById("temperature");
	let description = document.getElementById("description");
	let range = document.getElementById("range");
	let location = document.getElementById("location");

	let api = "https://api.openweathermap.org/data/2.5/weather";
	let apiKey = "5c574c89c3e7499196db85a0c82e097f";

	location.innerHTML = "Locating...";

	navigator.geolocation.getCurrentPosition(showWeather, locationError);

	function showWeather(position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

		let url = api + "?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";

		fetch(url)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				let temp = data.main.temp;
				temperature.innerHTML = temp + "° F";
				range.innerHTML = "Low: " + data.main.temp_min + "° F | High: " + data.main.temp_max + "° F";
				location.innerHTML = data.name + " (" + latitude + "°, " + longitude + "°)";
				description.innerHTML = data.weather[0].main;
			});
	}

	function locationError() {
		location.innerHTML = "Sorry. An error occurred while loading your location.";
	}
}

getWeather();
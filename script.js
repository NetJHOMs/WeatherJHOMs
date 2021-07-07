let images = {
	'Partly cloudy': './images/nublado.png',
	'Patchy light rain with thunder': './images/rayos.png',
	'Patchy rain possible': './images/colors.png',
	'Light rain shower': './images/lluvioso.png',
	Sunny: './images/soleado.png',
	'Heavy rain': './images/tormenta.png',
	Clear: './images/clear.png',
};

window.onload = async () => {
	const app = document.getElementById('app');

	let options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	async function success(pos) {
		let crd = pos.coords;

		let location = await fetch(
			`https://geocode.xyz/${crd.latitude},${crd.longitude}?geoit=json`
		).then((res) => res.json());

		let weather = await fetch(
			`https://goweather.herokuapp.com/weather/${location.city}`
		).then((res) => res.json());

		app.innerHTML += `<h1>${weather.description}</h1>`;
		app.innerHTML += `<img src='${images[weather.description]}'>`;
		app.innerHTML += `<h2>${weather.temperature} - ${weather.wind}</h2>`;
		app.innerHTML += `<h2>${location.city}</h2>`;

		console.log(weather);
		console.log(images[weather.description]);
	}

	function error(err) {
		console.warn('ERROR(' + err.code + '): ' + err.message);
		location.reload();
	}

	navigator.geolocation.getCurrentPosition(success, error, options);
};

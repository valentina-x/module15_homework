const wsUri = "wss://echo-ws-service.herokuapp.com/";

const btnSend = document.querySelector(".chat__button--send");
const btnSendGeolocation = document.querySelector(".chat__button--geo");
const chat = document.querySelector(".chat__view");

let websocket;

btnSend.addEventListener('click', sendMessage);
btnSendGeolocation.addEventListener('click', sendGeolocation);

function sendMessage() {
	const message = getTextMessage();
	if (!message) return;
	addMessageToChat(`<div class="chat__message chat__message--client">${message}</div>`);
	websocket.send(message);
}

function sendGeolocation() {
	if (!navigator.geolocation) {
		console.log('Geolocation не поддерживается вашим браузером');
	} else {
		console.log('Определение местоположения…');
		navigator.geolocation.getCurrentPosition(success, error);
	}
}

const error = () => {
	alert('Невозможно получить ваше местоположение');
}
const success = (position) => {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	addMessageToChat(`<a class="chat__message chat__message--geo" href="${link}" target="_blank">Геолокация</a>`);
}

function getTextMessage() {
	const chatText = document.querySelector('.chat__text');
	const chatTextValue = chatText.value;
	chatText.value = '';
	return chatTextValue;
}

function addMessageToChat(message) {
	chat.innerHTML += message;
}

function startWS() {
	websocket = new WebSocket(wsUri);
	websocket.onopen = function (evt) {
		console.log("CONNECTED");
	};
	websocket.onclose = function (evt) {
		console.log("DISCONNECTED");
	};
	websocket.onmessage = function (evt) {
		addMessageToChat(`<div class="chat__message chat__message--server">${evt.data}</div>`);
	};
	websocket.onerror = function (evt) {
		console.log(evt.data);
	};
}

document.addEventListener('DOMContentLoaded', startWS);
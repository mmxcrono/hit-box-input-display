/**
 * Hitbox Gamepad Input display
 *
 * TODO: Handle other gamepads
 */
var body = document.querySelector("body");
var gamepadInfo = document.getElementById("gamepad-info");
var isConnected = document.querySelectorAll(".is-connected");

var hitbox = {
	gamepadService: {
		gamepads: [],
		pollRate: 10,
		isPolling: false,

		// https://www.hitboxarcade.com/blogs/hit-box/hit-box-button-layout
		mappings: {
			"v1": [
				"A", "B", "X", "Y",
				"LB", "RB", "LT", "RT",
				"BACK", "START", "10", "11",
				"UP", "DOWN", "LEFT", "RIGHT",
				"HOME"
			]
		}
	},
};

hitbox.gamepadService.refreshGamepads = () => {
	// Set gamepads
	hitbox.gamepadService.gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : hitbox.gamepadService.gamepads || []);
}

hitbox.gamepadService.detectGamepads = () => {

	if (hitbox.gamepadService.isPolling) {
		return;
	}

	hitbox.gamepadService.isPolling = true;

	if (!('ongamepadconnected' in window)) {
		// No gamepad events available, poll instead.
		hitbox.gamepadService.detectionInterval = hitbox.gamepadService.detectionInterval ||
			setInterval(
				hitbox.gamepadService.detectGamepads,
				hitbox.gamepadService.pollRate,
			);
	}

	// Set gamepads
	hitbox.gamepadService.refreshGamepads();
	let found = false;

	for (var i = 0; i < hitbox.gamepadService.gamepads.length; i++) {
		var gp = hitbox.gamepadService.gamepads[i];

		if (gp) {
			found = true;
			// Output html
			console.log("Gamepad connected at index " + gp.index + ": " + gp.id +
				". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.");
			gamepadInfo.innerHTML = "Connected";
			isConnected.forEach((item) => {
				item.classList.toggle('connected', true);
			});
		}
	}

	if (found) {

		// Clear interval
		clearInterval(hitbox.gamepadService.detectionInterval);
		delete hitbox.gamepadService.detectionInterval;
		// Start game loop
		// hitbox.gamepadService.gameLoop();
		hitbox.gamepadService.startGameLoopInterval();
	}
	else {
		gamepadInfo.innerHTML = "Not Connected";
		isConnected.forEach((item) => {
			item.classList.remove('connected');
		});

	}

	hitbox.gamepadService.isPolling = false;
};

hitbox.gamepadService.buttonUpdate = (index, pressed) => {
	const element = hitbox.gamepadService.elements[`b-${index}`];

	if (!!element && element !== null) {
		if (pressed) {
			element.classList.toggle('pressed', true);
		}
		else {
			element.classList.remove('pressed');
		}
	}
}


hitbox.gamepadService.startGameLoopInterval = () => {

	// No gamepad events available, poll instead.
	hitbox.gamepadService.detectionInterval = hitbox.gamepadService.detectionInterval ||
		setInterval(
			hitbox.gamepadService.gameLoop,
			hitbox.gamepadService.pollRate,
		);

}

hitbox.gamepadService.gameLoop = () => {

	if (hitbox.gamepadService.isPolling) {
		return;
	}

	hitbox.gamepadService.isPolling = true;

	hitbox.gamepadService.refreshGamepads();

	if (!hitbox.gamepadService.elements) {
		hitbox.gamepadService.elements = {};

		// Use v1 for now
		for (let index = 0; index < hitbox.gamepadService.mappings["v1"].length; index++) {
			hitbox.gamepadService.elements[`b-${index}`] = document.getElementById(`b-${index}`) || false;
		}
	}

	// Support first controller only for now
	const first = hitbox.gamepadService.gamepads[0];

	for (let index = 0; index < first.buttons.length; index++) {
		hitbox.gamepadService.buttonUpdate(index, first.buttons[index].pressed);
	}

	hitbox.gamepadService.isPolling = false;

	/**
	 * Google chrome testing
	 *
	 * 				 8  16  8 9
	 * 14 13 15 12		2 3 5 4
	 * 					0 1 7 6
	 */


	// requestAnimationFrame(hitbox.gamepadService.refreshGamepads);
}


hitbox.gamepadService.eventHandlers = {

	onColorThemeChange(ev) {

		switch (ev.target.value) {

			case 'dark':
				body.classList.toggle('dark', true);
				break;
			default:
				body.classList.remove('dark');

		}
	},

	onLogoViewChange(ev) {

		const hitboxLogos = document.querySelectorAll(".hitbox-logo");

		for (let hitboxLogo of hitboxLogos) {

			switch (ev.target.value) {

				case 'vertical':
					hitboxLogo.classList.toggle('vertical', true);
					break;
				default:
					hitboxLogo.classList.remove('vertical');

			}
		}
	},

	gamepadHandler(event, connecting) {
		var gamepad = event.gamepad;
		// Note:
		// gamepad === navigator.getGamepads()[gamepad.index]

		if (connecting) {
			console.log('Setting gamepad for index ' + gamepad.index);
			hitbox.gamepadService.gamepads[gamepad.index] = gamepad;
		} else {
			console.log('Removing gamepad for index ' + gamepad.index);
			delete hitbox.gamepadService.gamepads[gamepad.index];
		}
	},

};

// Event Listeners
window.addEventListener("gamepadconnected", (e) => {
	hitbox.gamepadService.eventHandlers.gamepadHandler(e, true);
});

window.addEventListener("gamepaddisconnected", (e) => {
	hitbox.gamepadService.eventHandlers.gamepadHandler(e, false);
});

colorThemeChange = (ev) => {
	hitbox.gamepadService.eventHandlers.onColorThemeChange(ev);
}

logoViewChange = (ev) => {
	hitbox.gamepadService.eventHandlers.onLogoViewChange(ev);
}

// run
hitbox.gamepadService.detectGamepads();


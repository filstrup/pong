'use strict';

function Input() {
	window.addEventListener('keypress', function (evt) {
		var code = evt.keyCode || evt.charCode,
		event;
		if (code === 97) { // a key
			event = new CustomEvent('moveUp');
			window.dispatchEvent(event);
		}
		else if (code === 100) { // d key
			event = new CustomEvent('moveDown');
			window.dispatchEvent(event);
		}
		else if (code === 106) { // j key
			event = new CustomEvent('moveDown2');
			window.dispatchEvent(event);
		}
		else if (code === 108) { // l key
			event = new CustomEvent('moveUp2');
			window.dispatchEvent(event);
		}
	});
}

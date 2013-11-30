'use strict';

function Control(model) {
	this.model = model;
	var padSemiHeight = model.pad.height / 2;

	window.addEventListener('moveUp', function (evt) {
		var newPosition = model.pad.position[Y] - 20;
		model.pad.position[Y] = Math.max(
				newPosition,
				padSemiHeight + model.pad.height/7
		);
	});

	window.addEventListener('moveDown', function (evt) {
		var newPosition = model.pad.position[Y] + 20;
		model.pad.position[Y] = Math.min(
				newPosition,
				model.scenario.height - padSemiHeight - model.pad.height/7
		);
	});

	window.addEventListener('moveDown2', function (evt) {
		var newPosition = model.pad2.position[Y] + 20;
		model.pad2.position[Y] = Math.min(
				newPosition,
				model.scenario.height - padSemiHeight - model.pad2.height/7
		);
	});

	window.addEventListener('moveUp2', function (evt) {
		var newPosition = model.pad2.position[Y] - 20;
		model.pad2.position[Y] = Math.max(
				newPosition,
				padSemiHeight + model.pad2.height/7
		);
	});

	window.addEventListener('gameover', function onGameover(evt) {
		window.removeEventListener('gameover', onGameover);
		alert("You won!");
	});
	
	window.addEventListener('gameover2', function onGameover2(evt) {
		window.removeEventListener('gameover2', onGameover2);
		alert("You won!");
	});
}

Control.prototype.simulate = function() {
	var model = this.model,
	radius = model.ball.radius,
	ballPos = model.ball.position,
	padSemiHeight = model.pad.height / 2,
	padSemiWidth = model.pad.width / 2,
	padTopLeft = [
	              model.pad.position[X] - padSemiWidth,
	              model.pad.position[Y] - padSemiHeight
	              ],
	              SUBSTEPS, dv;

	function checkBallScenarioCollision() {
		var upCheck, downCheck;

		// check Up collision
		upCheck = (ballPos[Y] - radius <= 0);
		if (upCheck) {
			model.ball.velocity[Y] = -model.ball.velocity[Y];
		}

		// check Down collision
		downCheck = (ballPos[Y] + radius >= model.scenario.height);
		if (downCheck) {
			model.ball.velocity[Y] = -model.ball.velocity[Y];
		}
		
		//check out of game field
		
		//left
		if((ballPos[X] - radius) <= 0){
			gameoverEvent = new CustomEvent('gameover');
			window.dispatchEvent(gameoverEvent);
		}
		//right
		else if ((ballPos[X] + radius) >= model.scenario.width){
			gameoverEvent2 = new CustomEvent('gameover2');
			window.dispatchEvent(gameoverEvent2);
		}
	}

	function checkBallPadCollision() {
		var upCheck, downCheck, sideCheck, radius2;
		radius=radius/2;

		//check side collision
		if((ballPos[X] - radius + model.ball.velocity[X]) <= (model.pad.position[X] + model.pad.width/2) && (ballPos[X] - radius) >= (model.pad.position[X]))
			if((ballPos[Y] >= (model.pad.position[Y] - model.pad.height/2 - radius)) && (ballPos[Y] <= (model.pad.position[Y] + model.pad.height/2 + radius)))
				model.ball.velocity[X] = -model.ball.velocity[X];

		//check top & bot collision
		//top
		if((ballPos[Y] + radius) >= (model.pad.position[Y] - model.pad.height/2) && (ballPos[Y] + radius) <= (model.pad.position[Y]))
			if((ballPos[X] <= (model.pad.position[X] + model.pad.width/2 + radius)) && (ballPos[X] >= (model.pad.position[X] - model.pad.width/2 - radius)))
				model.ball.velocity[Y] = -model.ball.velocity[Y];
		//bot
		if((ballPos[Y] - radius) <= (model.pad.position[Y] + model.pad.height/2) && (ballPos[Y] - radius) >= (model.pad.position[Y]))
			if((ballPos[X] >= (model.pad.position[X] - model.pad.width/2 - radius)) && (ballPos[X] <= (model.pad.position[X] + model.pad.width/2 + radius)))
				model.ball.velocity[Y] = -model.ball.velocity[Y];

		//check corner collision
	}
	
	function checkBallPadCollision2() {
		var upCheck, downCheck, sideCheck, radius2;
		radius=radius/2;

		//check side collision
		if((ballPos[X] + radius + model.ball.velocity[X]) >= (model.pad2.position[X] - model.pad2.width/2) && (ballPos[X] + radius) <= (model.pad2.position[X]))
			if((ballPos[Y] >= (model.pad2.position[Y] - model.pad2.height/2 - radius)) && (ballPos[Y] <= (model.pad2.position[Y] + model.pad2.height/2 + radius)))
				model.ball.velocity[X] = -model.ball.velocity[X];

		//check top & bot collision
		//top
		if((ballPos[Y] + radius) >= (model.pad2.position[Y] - model.pad2.height/2) && (ballPos[Y] + radius) <= (model.pad2.position[Y]))
			if((ballPos[X] <= (model.pad2.position[X] + model.pad2.width/2 + radius)) && (ballPos[X] >= (model.pad2.position[X] - model.pad2.width/2 - radius)))
				model.ball.velocity[Y] = -model.ball.velocity[Y];
		//bot
		if((ballPos[Y] - radius) <= (model.pad.position[Y] + model.pad.height/2) && (ballPos[Y] - radius) >= (model.pad.position[Y]))
			if((ballPos[X] >= (model.pad.position[X] - model.pad.width/2 - radius)) && (ballPos[X] <= (model.pad.position[X] + model.pad.width/2 + radius)))
				model.ball.velocity[Y] = -model.ball.velocity[Y];

		//check corner collision
	}


	model.ball.position[X] += model.ball.velocity[X];
	model.ball.position[Y] += model.ball.velocity[Y];

	checkBallScenarioCollision();
	checkBallPadCollision();
	checkBallPadCollision2();
};

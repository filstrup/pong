function Render(model, canvas) {
	'use strict';

	canvas.width = model.scenario.width;
	canvas.height = model.scenario.height;
	canvas.style.width = canvas.width + 'px';
	canvas.style.height = canvas.height + 'px';

	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
	this.model = model;
}

Render.prototype.clear = function () {
	this.canvas.width = this.canvas.width;
};

Render.prototype.render = function () {
	var m = this.model,
	ctx = this.ctx;

	function drawPad() {
		var topLeft = [
		               m.pad.position[X] - (m.pad.width / 2),
		               m.pad.position[Y] - (m.pad.height / 2)
		               ];
		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = 'blue';
		ctx.strokeRect(
				topLeft[X], topLeft[Y],
				m.pad.width, m.pad.height
		);
		ctx.restore();
	}
	
	function drawPad2() {
		var topLeft = [
		               m.pad2.position[X] - (m.pad2.width / 2),
		               m.pad2.position[Y] - (m.pad2.height / 2)
		               ];
		ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = 'blue';
		ctx.strokeRect(
				topLeft[X], topLeft[Y],
				m.pad2.width, m.pad2.height
		);
		ctx.restore();
	}

	function drawBall() {
		ctx.save();
		ctx.beginPath();
		ctx.arc(
				m.ball.position[X], m.ball.position[Y], m.ball.radius,
				0, 2*Math.PI // this is a library (libraries are objects)
		);
		ctx.fillStyle = 'grey';
		ctx.fill();
		ctx.strokeStyle = 'black';
		ctx.stroke();
		ctx.restore();
	}

	function drawBlocks() {
		var blocks = m.scenario.blocks,
		blockWidth = m.scenario.width / blocks[0].length,
		blockHeight = m.pad.height/14,
		block, topLeft;

		ctx.save();
		ctx.beginPath();
		for (var row=0, rc=blocks.length; row < rc; row++) {
			for (var column=0, cc=blocks[row].length; column < cc; column++) {
				block = blocks[row][column];
				if (block) {
					topLeft = [
					           column * blockWidth,
					           row * blockHeight,
					           ];
					botLeft = [
					           column * blockWidth,
					           (canvas.height - (blocks.length*blockHeight)) + row * blockHeight,
					           ];
					ctx.rect(
							topLeft[X], topLeft[Y],
							blockWidth, blockHeight
					);

					ctx.rect(
							botLeft[X], botLeft[Y],
							blockWidth, blockHeight
					);
				}
			}
		}
		ctx.fillStyle = 'black';
		ctx.fill();
		ctx.strokeStyle = 'black';
		ctx.stroke();
		ctx.restore();
	}

	drawBlocks();
	drawPad();
	drawPad2();
	drawBall();
};

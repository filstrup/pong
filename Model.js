'use strict';

function Model(blocks, scenarioWidth, scenarioHeight) {

	// Default block configuration
	//
	// Blocks will have a implicit width equal to:
	//  scenario.width / how many blocks in blocks[0]
	//
	// Blocks will have a implicit height equal to:
	//  pad.height
	blocks = blocks || [
	                    [0,0,0,0,0,0,0,0]
	                    ];

	scenarioWidth = scenarioWidth || 1000;
	scenarioHeight = scenarioHeight || 700;

	var PAD_HEIGHT = 70;
	var PAD_WIDTH = 20;
	var PAD_MARGIN = 20;
	
	this.pad = {
			width: PAD_WIDTH,
			height: PAD_HEIGHT,
			position: [
			           (PAD_WIDTH / 2) + PAD_MARGIN,
			           scenarioHeight/2
			           ]
	};
	
	this.pad2 = {
			width: PAD_WIDTH,
			height: PAD_HEIGHT,
			position: [
			           scenarioWidth - (PAD_WIDTH / 2) - PAD_MARGIN,
			           scenarioHeight/2
			           ]
	};

	this.ball = {
			radius: 8,
			position: [
			           Math.floor(scenarioWidth / 2),
			           Math.floor(scenarioHeight / 2),
			           ],
			           velocity: [2.5,-2.5]
	};

	this.scenario = {
			width: scenarioWidth,
			height: scenarioHeight,
			blocks: blocks // blocks before : is a name
			// blocks after : refer to the parameter
	};
}

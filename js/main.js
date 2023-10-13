const common = {
	canvas: undefined,
	context: undefined,
	canvasWidht: 0,
	canvasHeight: 0,
	playedFrame: 0,
	colors: [
		"225, 50, 60", // red
		"238, 150, 63", // orange
		"246, 228, 0", // yellow
		"110, 210, 70", // green
		"63, 145, 255", // blue
		"185, 22, 226", // purple
	],
	colors2: [
		"255, 160, 150", // red
		"255, 200, 150", // orange
		"255, 250, 180", // yellow
		"195, 255, 170", // green
		"200, 220, 255", // blue
		"239, 173, 255", // purple
	],
	imgSrc: {
		somun: "img/somun.png",
		villan: "img/villan.png",
	},
};

(function () {
	common.canvas = document.querySelector("#main-canvas");
	common.context = common.canvas.getContext("2d");
	const container = document.querySelector(".canvas-container");
	//const dpr = window.devicePixelRatio > 1 ? 2 : 1; //해상도 처리
	const dpr = 1;
	const mouse = { x: 0, y: 0 };
	const lights = [];
	const characters = [];
	const allItems = [];
	let indexOfLight = 0;

	function setSize() {
		common.canvasWidht = container.clientWidth;
		common.canvasHeight = container.clientHeight;
		common.canvas.width = common.canvasWidht * dpr;
		common.canvas.height = common.canvasHeight * dpr;
	}

	function setCharacter() {
		const somun = new Character(
			common.imgSrc.somun,
			"underAttack",
			common.canvasWidht * 0.5 - 256 + 64,
			common.canvasHeight * 0.5 - 64
		);

		const villan = new Character(
			common.imgSrc.villan,
			"attack",
			common.canvasWidht * 0.5 - 64,
			common.canvasHeight * 0.5 - 64
		);

		characters.push(somun, villan);

		for (let i = 0; i < characters.length; i++) {
			allItems.push(characters[i]);
		}
	}

	function setup() {
		setSize();
		setCharacter();
		draw();
	}

	function setZOrder() {
		let temp;
		for (let i = 0; i < allItems.length; i++) {
			for (let j = 0; j < allItems.length - 1; j++) {
				if (j < allItems.length - 1) {
					if (allItems[j].yForOrder > allItems[j + 1].yForOrder) {
						temp = allItems[j];
						allItems[j] = allItems[j + 1];
						allItems[j + 1] = temp;
					}
				}
			}
		}
	}

	function draw() {
		common.context.clearRect(0, 0, common.canvasWidht, common.canvasHeight);

		let scaleRatio;
		let item;

		for (let i = 0; i < allItems.length; i++) {
			item = allItems[i];

			if (item instanceof Character) {
				item.draw();
			} else {
				scaleRatio = item.y / common.canvasHeight + 1.3;

				common.context.save();
				common.context.translate(item.x, item.y);
				common.context.scale(scaleRatio * 0.7, scaleRatio * 0.7);
				common.context.translate(-item.x, -item.y);

				item.draw();
				common.context.restore();
			}
		}

		// for (let i = 0; i < characters.length; i++) {
		// 	characters[i].draw();
		// }

		// for (let i = 0; i < lights.length; i++) {
		// 	scaleRatio = lights[i].y / common.canvasHeight + 1.3;

		// 	common.context.save();
		// 	common.context.translate(lights[i].x, lights[i].y);
		// 	common.context.scale(scaleRatio * 0.7, scaleRatio * 0.7);
		// 	common.context.translate(-lights[i].x, -lights[i].y);

		// 	lights[i].draw();
		// 	common.context.restore();
		// }

		common.playedFrame++;
		if (common.playedFrame > 100000) {
			common.playedFrame = 0;
		}

		requestAnimationFrame(draw);
	}

	common.canvas.addEventListener("click", function (e) {
		// if (indexOfLight > 9) {
		// 	indexOfLight = 0;
		// }

		//mouse.x = e.layerX;
		//mouse.y = e.layerY; //비표준
		mouse.x = e.clientX - common.canvas.getBoundingClientRect().left;
		mouse.y = e.clientY - common.canvas.getBoundingClientRect().top;

		if (mouse.y <= 455) return;

		const light = new Light(indexOfLight, mouse.x, mouse.y);
		lights.push(light);
		allItems.push(light);

		indexOfLight++;

		if (indexOfLight >= 9) {
			characters[0].updateAction("attack");
			characters[1].updateAction("underAttack");
		}

		setZOrder();
	});

	window.addEventListener("resize", setSize);
	window.addEventListener("load", setup);
})();

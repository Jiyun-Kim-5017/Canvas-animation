class Character {
	constructor(imgSrc, action, x, y) {
		this.width = 256;
		this.height = 256;
		this.x = x;
		this.y = y;
		//캐릭터 이미지와 기둥의 y좌표 기준이 달라서 맞춰주기 위한 변수
		this.yForOrder = this.y + this.height - 24;
		this.action = action;
		this.image = new Image();
		this.image.src = imgSrc;
		this.setAction();
	}

	setAction() {
		switch (this.action) {
			case "attack":
				this.startFrame = 0;
				this.endFrame = 1;
				break;
			case "underAttack":
				this.startFrame = 2;
				this.endFrame = 3;
				break;
			default:
				this.startFrame = 0;
				this.endFrame = 0;
		}

		this.frame = this.startFrame;
	}

	updateAction(action) {
		this.action = action;
		this.setAction();
	}

	draw() {
		if (common.playedFrame % 15 === 0) {
			if (this.frame < this.endFrame) {
				this.frame++;
			} else {
				this.frame = this.startFrame;
			}
		}

		common.context.drawImage(
			this.image,
			this.frame * 256, //이미지 상 시작점 x좌표
			0, //이미지 상 시작점 y좌표
			256, //이미지 상 크기
			256,
			this.x, //캔버스 상 위치 x좌표
			this.y, //캔버스 상 위치 y좌표
			this.width, //캔버스 상 이미지 크기
			this.height
		);
	}
}

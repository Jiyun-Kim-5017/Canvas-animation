class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.radius = Math.random() + 0.5;
		this.speed = Math.random() * 3 + 0.5;
	}

	draw() {
		common.context.beginPath();
		common.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		common.context.fill();
	}
}

class Line {
	constructor(index, x, y) {
		this.x = x;
		this.y = y;
		this.height = 300;

		this.gradient = common.context.createLinearGradient(
			0,
			common.canvasHeight -
				(this.height + (common.canvasHeight - this.y)),
			0,
			this.y
		);
		this.gradient.addColorStop(0, `rgba(${common.colors2[index]}, 0)`);
		this.gradient.addColorStop(0.5, `rgba(${common.colors2[index]}, 0.5)`);
		this.gradient.addColorStop(1, `rgba(${common.colors2[index]}, 1)`);

		const numberOfParticles = 30;
		this.particles = [];

		for (let i = 0; i < numberOfParticles; i++) {
			this.particles.push(new Particle(this.x, this.y));
		}
	}

	draw() {
		// common.context.fillStyle = this.gradient;
		common.context.strokeStyle = this.gradient;

		common.context.beginPath();
		common.context.moveTo(this.x, this.y);
		common.context.lineTo(this.x, this.y - this.height);
		common.context.stroke();

		let particle;
		for (let i = 0; i < this.particles.length; i++) {
			particle = this.particles[i];
			particle.y -= particle.speed;

			if (particle.y < this.y - this.height) {
				particle.y = this.y;
			}

			particle.draw();
		}
	}
}

class Light {
	constructor(index, x, y) {
		this.x = x;
		this.y = y;
		this.yForOrder = this.y;
		this.width = 20;
		this.height = 300;
		this.angle = 0;

		if (index >= 6) {
			index = index % 6;
		}

		const numberOfLines = 5;
		this.lines = [];
		for (let i = 0; i < numberOfLines; i++) {
			this.lines.push(
				new Line(
					index,
					this.x + (Math.random() * this.width - this.width / 2),
					this.y
				)
			);
		}

		this.gradient = common.context.createLinearGradient(
			0,
			common.canvasHeight -
				(this.height + (common.canvasHeight - this.y)),
			0,
			this.y
		);

		this.gradient.addColorStop(0, `rgba(${common.colors[index]}, 0)`);
		this.gradient.addColorStop(0.25, `rgba(${common.colors[index]}, 0.25)`);
		this.gradient.addColorStop(0.5, `rgba(${common.colors[index]}, 0.5)`);
		this.gradient.addColorStop(0.75, `rgba(${common.colors[index]}, 0.75)`);
		this.gradient.addColorStop(1, `rgba(${common.colors[index]}, 1)`);
	}

	draw() {
		common.context.fillStyle = this.gradient;

		common.context.save();
		common.context.filter = "blur(20px)";
		common.context.beginPath();
		common.context.ellipse(
			this.x,
			this.y,
			this.width * 1.6 +
				Math.abs(Math.sin(((this.angle * Math.PI) / 180) * 30)) * 5,
			this.width * 0.3 +
				Math.abs(Math.sin(((this.angle * Math.PI) / 180) * 30)) * 5,
			0,
			0,
			Math.PI * 2
		);
		common.context.fill();

		common.context.filter = "blur(8px)";
		common.context.beginPath();
		common.context.ellipse(
			this.x,
			this.y,
			this.width +
				Math.abs(Math.sin(((this.angle * Math.PI) / 180) * 30)) * 2,
			this.width * 0.1 +
				Math.abs(Math.sin(((this.angle * Math.PI) / 180) * 30)) * 2,
			0,
			0,
			Math.PI * 2
		);
		common.context.fill();
		this.angle++;

		common.context.fillRect(
			this.x - this.width * 0.5,
			common.canvasHeight -
				(this.height + (common.canvasHeight - this.y)),
			this.width * 0.8,
			this.height
		);

		common.context.restore();

		let line;
		for (let i = 0; i < this.lines.length; i++) {
			line = this.lines[i];
			line.draw();
		}
	}
}

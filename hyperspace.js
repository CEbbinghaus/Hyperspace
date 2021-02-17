class Mouse {
	constructor() {
		this.x = 0;
		this.y = 0;
		Mouse.Instance = this;
		window.onmousemove = this.handleEvent.bind(this);
	}
	handleEvent(evt) {
		this.x = evt.clientX;
		this.y = evt.clientY;
	}
}

class Hyperspace {
	constructor(e) {
		this.element = e.tagName ? e : document.getElementById(e);
		if(!this.element || this.element.tagName !== "CANVAS") throw "You must Supply a Canvas Element";

		this.element.onclick = () => {
			this.element.style.cursor = "none";
		}

		// /**
		//  * 
		//  * @param {KeyboardEvent} evt
		//  */
		window.onkeydown = (evt) => {
			console.log(evt);
			if(evt.key == "Escape") {
				this.element.style.cursor = "default";
			}
			if(evt.key == "f")
				openFullscreen();
		}


		this.ctx = this.element.getContext("2d");
		this.points = Array.from(new Array(100)).fill(star);
		this.lastTime = 0;
		this.deltaTime = 0;
		this.frame = requestAnimationFrame(this.update.bind(this));
		this.resize();
		onresize = this.resize.bind(this);
	}

	resize(e) {
		let evt = e || event;
		this.element.width = innerWidth;
		this.element.height = innerHeight;
	}
	update(t) {
		let m = Mouse.Instance;
		this.ctx.strokeStyle = "#fff";
		this.deltaTime = (t - this.lastTime) / 16;
		this.lastTime = t;
		this.ctx.clearRect(0, 0, innerWidth, innerHeight);
		this.points.map(p => {
			let xOffset = m.x - p.x;
			let xScale = Math.abs(xOffset / (innerWidth / 2))
			let yOffset = m.y - p.y;
			let yScale = Math.abs(yOffset / (innerHeight / 2));
			p.z += ((xScale + yScale) / 2 - p.z) / 10;
			// console.log(-xOffset / 10 * p.z);
			let oldX = p.x;
			let oldY = p.y;
			p.x += -xOffset * p.z;
			p.y += -yOffset * p.z;
			this.ctx.beginPath();
			this.ctx.lineWidth = p.z * 5;
			this.ctx.moveTo(oldX, oldY);
			this.ctx.lineTo(p.x, p.y);
			this.ctx.stroke();
			if(p.x < 0 || p.x > innerWidth || p.y < 0 || p.y > innerHeight)
				p.randPosition();
			// p.draw(this.ctx);
			return p;
		})
		this.frame = requestAnimationFrame(this.update.bind(this));
	}
}

class star {
	constructor() {
		this.z = 0;
		this.x = this.placePoint(innerWidth);
		this.y = this.placePoint(innerHeight);
		this.last
	}
	randPosition() {
		this.z = 0;
		this.x = this.placePoint(innerWidth);
		this.y = this.placePoint(innerHeight);
	}
	placePoint(v) {
		return Math.random() * v;
		// return (Math.random() * 20 - 10) + v / 2
	}
	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
		ctx.fill();
	}
}
Array.prototype.fill = function(e) {
	for(let i = 0; i < this.length; i++) {
		if(typeof e != "function" || !e.constructor) { this[i] = e; continue };
		this[i] = new e();
	}
	return this;
}

function openFullscreen() {
	const e = document.documentElement;
	if(e.requestFullscreen) {
		e.requestFullscreen();
	} else if(e.webkitRequestFullscreen) { /* Safari */
		e.webkitRequestFullscreen();
	} else if(e.msRequestFullscreen) { /* IE11 */
		e.msRequestFullscreen();
	}
}
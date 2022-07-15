// --- has to be run on a localhost ---

//create canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
console.log(ctx);
width = window.innerWidth;
height = window.innerHeight;
const shht = document.querySelector('p');

//fullscreen
canvas.width = width;
canvas.height = height;

//responsive
window.addEventListener('resize', () => {
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;
});

//particle vars
let particlesArray = [];
let particleShrink = 1;
let shrinkSilent = 1;
let shrinkLoud = 10;
let particleCount = 30;

let minR = 0;
let minG = 60;
let minB = 30;

//volume vars
let isLoud = false;
const thresholdOne = 10;
const thresholdTwo = 20;
const thresholdLoud = 21;
let volArray = [];
let volMedian;
let amplifier = 110;
let timer = 0;

//particle setup
class Particle {
	constructor() {
		this.x = randomizer(0, width);
		this.y = randomizer(0, height);

		if (!isLoud) {
			this.size = randomizer(50, 70);
			this.speedX = randomizer(-3, 3);
			this.speedY = randomizer(-3, 3);
			this.colour = randomCol();
		} else {
			this.size = randomizer(120, 160);
			this.speedX = randomizer(-25, 25);
			this.speedY = randomizer(-25, 25);
			this.speedXStored = this.speedX;
			this.speedYStored = this.speedY;
			const randNum = Math.ceil(Math.random() * 5);
			if (randNum <= 4) {
				this.colour = '#A4303F';
			} else {
				this.colour = '#FFECCC';
			}
		}
	}

	//update particles
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		if (!isLoud) {
			this.colour = randomCol();
		}
		if (this.size > particleShrink) this.size -= particleShrink;
	}

	//draw particles
	draw() {
		ctx.fillStyle = this.colour;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		if (!isLoud) {
			ctx.shadowBlur = 100;
			ctx.shadowOffsetX = 2;
			ctx.shadowOffsetY = 2;
			ctx.shadowColor = randomCol();
			ctx.globalCompositeOperation = 'lighter';
		} else {
			ctx.shadowBlur = 0;
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
			ctx.shadowColor = 0;
			ctx.globalCompositeOperation = 'source-over';
		}
		ctx.fill();
	}
}

//randomizer
function randomizer(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//biased colour randomizer
function randomCol() {
	var r = Math.floor(randomizer(minR, 100));
	var g = Math.floor(randomizer(minG, 60));
	var b = Math.floor(randomizer(minB, 180));
	return `rgb(${r}, ${g}, ${b})`;
}

function handleParticles(volMedian) {
	//console.log(vol);
	//timed updates
	if (volMedian < thresholdOne) {
		minR = 0;
		minG = 100;
		minB = 80;
		shrinkSilent = 1;
		particleCount = 30;
	} else if (volMedian < thresholdTwo) {
		minR = 50;
		minG = 0;
		minB = 50;
		shrinkSilent = 1.5;
		particleCount = 45;
	} else if (volMedian > thresholdTwo) {
		minR = 30;
		minG = 0;
		minB = 0;
		shrinkSilent = 1.7;
		particleCount = 60;
	} else {
		minR = 0;
		minG = 100;
		minB = 80;
	}

	//run when loud
	if (volMedian > thresholdLoud) {
		//first loop above threshold
		if (!isLoud) {
			//text update
			shht.style.opacity = 1;
			shht.style.fontSize = '10em';
			particleShrink = shrinkLoud;

			//new speed and update current particles
			particleCount = 60;
			for (let i = 0; i < particlesArray.length; i++) {
				particlesArray[i].speedXStored = randomizer(-25, 25);
				particlesArray[i].speedYStored = randomizer(-25, 25);
				particlesArray[i].update();

				//update current colours
				const randNum = Math.ceil(Math.random() * 5);
				if (randNum <= 4) {
					particlesArray[i].colour = '#A4303F';
				} else {
					particlesArray[i].colour = '#FFECCC';
				}

				particlesArray[i].draw();
				//delete small particles
				if (particlesArray[i].size <= shrinkLoud) {
					particlesArray.splice(i, 1);
					i--;
				}
			}
			isLoud = true;
		} else {
			//loud update loop
			for (let i = 0; i < particlesArray.length; i++) {
				let vibrationRateX = randomizer(volMedian * -0.2, volMedian * 0.2);
				let vibrationRateY = randomizer(volMedian * -0.2, volMedian * 0.2);
				if (vibrationRateX > 30) vibrationRateX = 30;
				if (vibrationRateX < -30) vibrationRateX = -30;
				if (vibrationRateY > 30) vibrationRateY = 30;
				if (vibrationRateY < -30) vibrationRateY = -30;

				particlesArray[i].speedX =
					particlesArray[i].speedXStored + vibrationRateX;
				particlesArray[i].speedY =
					particlesArray[i].speedYStored + vibrationRateY;
				particlesArray[i].update();
				particlesArray[i].draw();
				//delete small particles
				if (particlesArray[i].size <= shrinkLoud) {
					particlesArray.splice(i, 1);
					i--;
				}
			}
		}
		//if not loud loop
	} else {
		// text update
		shht.style.opacity = 0;
		shht.style.fontSize = '9em';
		particleShrink = shrinkSilent;

		//first not loud loop
		if (isLoud) {
			for (let i = 0; i < particlesArray.length; i++) {
				particlesArray[i].colour = randomCol();
				particlesArray[i].speedX = randomizer(-3, 3);
				particlesArray[i].speedY = randomizer(-3, 3);
				particlesArray[i].update();
				particlesArray[i].draw();
				//delete small particles
				if (particlesArray[i].size <= shrinkSilent) {
					particlesArray.splice(i, 1);
					i--;
				}
			}
			isLoud = false;
		} else {
			//not loud update loop
			for (let i = 0; i < particlesArray.length; i++) {
				particlesArray[i].update();
				particlesArray[i].draw();
				//delete small particles
				if (particlesArray[i].size <= shrinkSilent) {
					particlesArray.splice(i, 1);
					i--;
				}
			}
		}
	}
}

//mic vars
let audioContext;
let analyser;

//get volume median
function getMedian(array) {
	//find middle of array
	const mid = Math.floor(array.length / 2),
		//spread and sort from small to big
		nums = [...array].sort((a, b) => a - b);
	//return middle of sorted array or calculate middle when uneven
	return array.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

//mic setup
async function onMicrophoneGranted(stream) {
	//create audio stream
	audioContext = new AudioContext();
	await audioContext.audioWorklet.addModule('vumeter-processor.js');
	let microphone = audioContext.createMediaStreamSource(stream);
	const node = new AudioWorkletNode(audioContext, 'vumeter');

	//create audio analyser
	analyser = audioContext.createAnalyser();
	microphone.connect(analyser);

	//get frequency array
	analyser.fftSize = 64;
	const bufferLength = analyser.frequencyBinCount;
	const dataArray = new Uint8Array(bufferLength);

	//audio event input -> 60 times per second
	node.port.onmessage = event => {
		let _volume = 0;
		if (event.data.volume) _volume = event.data.volume;
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//increase timer
		timer++;

		//recorded volume to a number we can easily work with
		let vol = _volume * 4 * amplifier;
		// let vol = 31;

		//add volume to array
		if (timer < 30) {
			//fill volArray
			volArray.push(vol);
		} else if (timer === 30) {
			volMedian = getMedian(volArray);
			volArray = [];
			timer = 0;
			// volMedian = 500;
		}

		//particle spawner
		if (particlesArray.length < particleCount) {
			if (!isLoud) {
				particlesArray.push(new Particle());
			} else {
				particlesArray.push(new Particle());
				particlesArray.push(new Particle());
			}
		}
		//console.log(vol);

		//particle animator
		handleParticles(volMedian);
	};

	//output
	microphone.connect(node).connect(audioContext.destination);
}

//allow mic input
function activeSound() {
	try {
		navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
			onMicrophoneGranted(stream);
		});
	} catch (e) {
		alert(e);
	}
}

//init
activeSound();

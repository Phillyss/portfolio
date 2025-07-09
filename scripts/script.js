// Homepage Animation
var container = document.querySelector("#homepage div");
var img = document.querySelector("#homepage img");

function animateImg(e) {
	let xAxis = clamp(-42, (window.innerWidth / 2 - e.pageX) / -22, 42);
	let yAxis = clamp(-14, (window.innerHeight / 2 - e.pageY) / 22, 14);
	let transX = clamp(-180, (window.innerWidth / 2 - e.pageX) / 5, 180);
	let transY = clamp(-50, (window.innerHeight / 2 - e.pageY) / 5, 50);
	img.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translate(${transX}px, ${transY}px)`;
}

// Reset animation
function resetImg() {
	img.style.transition = "all 0.5s ease";
	img.style.transform = `rotateX(0deg) rotateY(0deg)`;
}

// Takes away transition while animating
function takeTransition() {
	img.style.transition = "none";
}

function clamp(min, num, max) {
	return Math.min(Math.max(num, min), max);
}

// Footer animation
var footer = document.querySelector("footer div:last-of-type");
var footerH2 = document.querySelector("footer h2");

window.onscroll = function (ev) {
	var totalHeight = document.body.scrollHeight;
	var scrollPoint = window.scrollY + window.innerHeight;

	if (scrollPoint >= totalHeight - 260) {
		footerH2.classList.remove("foot");
	} else {
		footerH2.classList.add("foot");
	}
};

// set footer animation on desktop
if (!window.matchMedia("(any-hover:none)").matches) {
	container.addEventListener("mousemove", animateImg);
	container.addEventListener("mouseleave", resetImg);
	container.addEventListener("mouseenter", takeTransition);
}

// -- Vars --
var container = document.querySelector("#homepage div");
var img = document.querySelector("#homepage img");




// -- Functions --

// Homepage animation
function animateImg(e) {
    let xAxis = (window.innerWidth / 2 - e.pageX) / -95;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 65;
    let transX = (window.innerWidth / 2 - e.pageX) / 20;
    let transY = (window.innerHeight / 2 - e.pageY) / 20;
    img.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translate(${transX}px, ${transY}px)`;
}

// Reset animation
function resetImg() {
    img.style.transition = "all 0.5s ease";
    img.style.transform = `rotateX(0deg) rotateY(0deg)`;
}

function takeTransition() {
    img.style.transition = "none";
}



// -- Event Listeners --
container.addEventListener("mousemove", animateImg);
container.addEventListener("mouseleave", resetImg);
container.addEventListener("mouseenter", takeTransition);
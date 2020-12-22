// Homepage Animation 
var container = document.querySelector("#homepage div");
var img = document.querySelector("#homepage img");

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

// Takes away transition while animating
function takeTransition() {
    img.style.transition = "none";
}

container.addEventListener("mousemove", animateImg);
container.addEventListener("mouseleave", resetImg);
container.addEventListener("mouseenter", takeTransition);



// Footer animation
var footer = document.querySelector("footer section:last-of-type");
var footerH2 = document.querySelector("footer h2");

window.onscroll = function(ev) {
    var totalHeight = document.body.scrollHeight;
    var scrollPoint = window.scrollY + window.innerHeight;

    if(scrollPoint >= totalHeight - 260) {
        footerH2.classList.remove("foot");
    } else {
        footerH2.classList.add("foot");
    }
};


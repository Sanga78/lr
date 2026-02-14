const startBtn = document.getElementById("startBtn");
const homePage = document.getElementById("homePage");
const slideshowPage = document.getElementById("slideshowPage");
const finalPage = document.getElementById("finalPage");
const bgSlideshow = document.getElementById("bgSlideshow");
const slideText = document.getElementById("slideText");
const loveSong = document.getElementById("loveSong");

let slides = [
    { src: "images/1.jpeg", text: "You are my happiness 💖" },
    { src: "images/2.jpeg", text: "Distance means nothing when love is real 💕" },
    { src: "images/3.jpeg", text: "Every moment with you is special 💫" },
    { src: "images/4.jpeg", text: "Happy Valentine’s Day my love ❤️" }
];

let index = 0;
let interval;

startBtn.addEventListener("click", () => {
    homePage.classList.add("hidden");
    slideshowPage.classList.remove("hidden");
    loveSong.play();
    startSlideshow();
});

function startSlideshow() {
    interval = setInterval(() => {
        bgSlideshow.style.backgroundImage = `url(${slides[index].src})`;
        slideText.textContent = slides[index].text;
        index++;

        if (index === slides.length) {
            clearInterval(interval);
            setTimeout(showFinal, 3000);
        }
    }, 4000);
}

function showFinal() {
    slideshowPage.classList.add("hidden");
    finalPage.classList.remove("hidden");
    startFireworks();
}

/* Heart Fireworks */
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let particles = [];

function createHeart(x, y) {
    for (let t = 0; t < Math.PI * 2; t += 0.2) {
        let px = 16 * Math.pow(Math.sin(t), 3);
        let py = -(13 * Math.cos(t) - 5 * Math.cos(2*t)
                 - 2 * Math.cos(3*t) - Math.cos(4*t));
        particles.push({
            x: x,
            y: y,
            vx: px * 0.2,
            vy: py * 0.2,
            alpha: 1
        });
    }
}

function startFireworks() {
    setInterval(() => {
        createHeart(
            Math.random() * canvas.width,
            Math.random() * canvas.height / 2
        );
    }, 1000);
    animate();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.01;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "#fff";
        ctx.fillRect(p.x, p.y, 2, 2);

        if (p.alpha <= 0) particles.splice(i, 1);
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
}

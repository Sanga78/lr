const heartBtn = document.getElementById('heartBtn');
const modal = document.getElementById('modal');
const messageEl = document.getElementById('message');
const yes = document.getElementById('yes');
const no = document.getElementById('no');
const bgSlideshow = document.getElementById('bgSlideshow');
const slideText = document.getElementById('slideText');
const finalPage = document.getElementById('finalPage');
const restart = document.getElementById('restart');
const loveSong = document.getElementById('loveSong');
const centerSection = document.querySelector('.center');

let slidesData = [
    { src: "images/1.jpeg", text: "From the moment I met you… ✨" },
    { src: "images/2.jpeg", text: "My heart knew something special 💓" },
    { src: "images/3.jpeg", text: "You are my peace in chaos 🌸" },
    { src: "images/4.jpeg", text: "My smile begins with you 😊" },
    { src: "images/5.jpeg", text: "And I choose you. Always. 💍" }
];

let slideIndex = 0;
let slideInterval;
let slides = [];
let visibleIndex = 0;

heartBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    typeMessage("You are the best thing that ever happened to me...");
});

function typeMessage(text){
    messageEl.textContent = "";
    let i = 0;
    let interval = setInterval(()=>{
        messageEl.textContent += text[i];
        i++;
        if(i >= text.length) clearInterval(interval);
    }, 35);
}

yes.addEventListener('click', async ()=>{
    modal.classList.add('hidden');
    centerSection.style.display = "none";
    await loveSong.play().catch(()=>{});
    startSlideshow();
});

no.addEventListener('click', ()=>{
    modal.classList.add('hidden');
});

function createSlides(){
    if(slides.length > 0) return;
    for(let i=0;i<2;i++){
        let div = document.createElement("div");
        div.classList.add("bg-slide");
        if(i===0) div.classList.add("visible");
        bgSlideshow.appendChild(div);
        slides.push(div);
    }
}

function showSlide(data){
    let nextIndex = 1 - visibleIndex;

    slides[nextIndex].style.backgroundImage = `url('${data.src}')`;
    slides[nextIndex].classList.add("visible");
    slides[visibleIndex].classList.remove("visible");

    visibleIndex = nextIndex;

    slideText.classList.remove("show");

    setTimeout(()=>{
        slideText.textContent = data.text;
        slideText.classList.add("show");
    }, 400);
}

function startSlideshow(){
    createSlides();

    showSlide(slidesData[slideIndex]);
    slideIndex++;

    slideInterval = setInterval(()=>{
        showSlide(slidesData[slideIndex % slidesData.length]);
        slideIndex++;
    }, 3500);

    setTimeout(()=>{
        clearInterval(slideInterval);
        slideText.style.display = "none";
        finalPage.classList.remove('hidden');
    }, slidesData.length * 3500 + 1000);
}

restart.addEventListener("click", ()=>{
    location.reload();
});

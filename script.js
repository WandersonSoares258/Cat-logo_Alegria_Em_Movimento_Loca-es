let currentSlideIndices = []; // Array para armazenar os índices de cada carrossel

function initCarousels() {
    const carousels = document.getElementsByClassName("carousel");
    for (let i = 0; i < carousels.length; i++) {
        currentSlideIndices[i] = 0; // Inicializa o índice do slide atual para cada carrossel
        showSlides(currentSlideIndices[i], i); // Mostra o primeiro slide de cada carrossel
    }
}

function plusSlides(n, carouselIndex) {
    showSlides(currentSlideIndices[carouselIndex] += n, carouselIndex);
}

function currentSlide(n, carouselIndex) {
    showSlides(currentSlideIndices[carouselIndex] = n, carouselIndex);
}

function showSlides(n, carouselIndex) {
    const carousels = document.getElementsByClassName("carousel");
    const slides = carousels[carouselIndex].getElementsByClassName("carousel-image");

    // Ajuste do índice
    if (n >= slides.length) {
        currentSlideIndices[carouselIndex] = 0;
        n = 0;
    }
    if (n < 0) {
        currentSlideIndices[carouselIndex] = slides.length - 1;
        n = slides.length - 1;
    }

    // Oculta todos os slides e pausa qualquer vídeo
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        
        // Pausa o vídeo se o slide contiver um
        const video = slides[i].querySelector("video");
        if (video) video.pause();
    }

    // Exibe o slide atual e reproduz o vídeo, se houver
    slides[n].style.display = "block";
    const currentVideo = slides[n].querySelector("video");
    if (currentVideo) currentVideo.play();
}

// Inicializa os carrosséis
initCarousels();

// Inicia a exibição automática
setInterval(() => {
    const carousels = document.getElementsByClassName("carousel");
    for (let i = 0; i < carousels.length; i++) {
        plusSlides(1, i); // Avança para o próximo slide de cada carrossel
    }
}, 15000);

function sendToWhatsApp() {
    const nome = document.getElementById("nome").value;
    const mensagem = document.getElementById("mensagem").value;
    const url = `https://api.whatsapp.com/send?phone=5562994046855&text=Nome:%20${encodeURIComponent(nome)}%0A%0AMensagem:%20${encodeURIComponent(mensagem)}`;
    window.open(url);
}

function share() {
    const shareText = "Confira este produto incrível!";
    if (navigator.share) {
        navigator.share({
            title: 'Alegria em Movimento Locações',
            text: shareText,
            url: window.location.href
        }).catch(console.error);
    } else {
        alert("Seu navegador não suporta o compartilhamento.");
    }
}

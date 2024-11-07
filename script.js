// Inicializar variables
const cards = document.querySelectorAll('.card');
let currentIndex = 0;
let activeCardIndex = 0;
const cardsToShow = 3;

// Función para mostrar las cards según el índice
function updateVisibleCards() {
    cards.forEach((card, index) => {
        if (index >= currentIndex && index < currentIndex + cardsToShow) {
            card.classList.add('visible');
        } else {
            card.classList.remove('visible');
        }
    });
}

// Función para mostrar la descripción correspondiente a la card seleccionada
function showDescription(especialitat) {
    document.querySelectorAll('.card').forEach((card) => {
        card.classList.remove('active');
    });

    document.getElementById(especialitat).classList.add('active');

    document.querySelectorAll('.description').forEach((desc) => {
        desc.classList.remove('active');
    });

    document.getElementById(especialitat + '-description').classList.add('active');
}

// Inicializa la funcionalidad para todas las cards
document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', function () {
        const especialitat = this.id;
        activeCardIndex = Array.from(cards).indexOf(this);
        showDescription(especialitat);
        updateDescriptionCardBorders(); // Actualiza los bordes de la card de descripción
    });
});

// Función para actualizar los bordes de la card de descripción
function updateDescriptionCardBorders() {
    const descriptionCard = document.querySelector('.description-card');
    descriptionCard.classList.remove('middle', 'right', 'left');

    if (activeCardIndex === currentIndex + 1) {
        descriptionCard.classList.add('middle');
    } else if (activeCardIndex === currentIndex) {
        descriptionCard.classList.add('left');
    } else if (activeCardIndex === currentIndex + 2) {
        descriptionCard.classList.add('right');
    }
}

// Función para aplicar el efecto shake al llegar a los límites
function applyShakeEffect(card) {
    card.classList.add('shake');
    setTimeout(() => {
        card.classList.remove('shake');
    }, 500);
}

// Función para mover el carrusel y el selector activo entre las cards visibles
function moveCarousel(direction) {
    const maxIndex = cards.length - cardsToShow;
    const activeCard = document.querySelector('.card.active');
    const activeId = activeCard ? activeCard.id : null;

    // Aplicar sacudida dependiendo de si estamos en los límites y según la card activa
    if (
        (currentIndex === 0 && direction === -1 && activeId === 'quiropidia') ||
        (currentIndex === maxIndex && direction === 1 && activeId === 'test2')
    ) {
        const shakeCard = direction === -1 ? cards[currentIndex] : cards[currentIndex + cardsToShow - 1];
        applyShakeEffect(shakeCard);
        return;
    }

    if ((activeCardIndex === currentIndex && direction === -1) ||
        (activeCardIndex === currentIndex + 2 && direction === 1)) {
        currentIndex = Math.min(Math.max(currentIndex + direction, 0), maxIndex);
        updateVisibleCards();
    } else {
        activeCardIndex += direction;
    }

    const newActiveCard = cards[activeCardIndex];
    newActiveCard.classList.add('active');
    showDescription(newActiveCard.id);
    updateDescriptionCardBorders();
}

// Inicializa las cards visibles y la descripción activa al cargar
updateVisibleCards();
showDescription(cards[activeCardIndex].id);

// Eventos para las flechas
document.querySelector('.arrow-left').addEventListener('click', function() {
    moveCarousel(-1);
});

document.querySelector('.arrow-right').addEventListener('click', function() {
    moveCarousel(1);
});
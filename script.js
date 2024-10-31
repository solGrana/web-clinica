// Inicializar variables
const cards = document.querySelectorAll('.card');
let currentIndex = 0;
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
    // Remover la clase 'active' de todas las cards
    document.querySelectorAll('.card').forEach(function (card) {
        card.classList.remove('active');
    });

    // Añadir la clase 'active' a la card seleccionada
    document.getElementById(especialitat).classList.add('active');

    // Ocultar todas las descripciones
    document.querySelectorAll('.description').forEach(function (desc) {
        desc.classList.remove('active');
    });

    // Mostrar la descripción correspondiente
    if (especialitat !== 'quiropidia') {
        document.getElementById(especialitat + '-description').classList.add('active');
    } else {
        document.getElementById('quiropidia-description').classList.add('active');
    }
}

// Inicializa la funcionalidad para todas las cards
document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('click', function () {
        const especialitat = this.id;
        showDescription(especialitat);
        updateDescriptionCardBorders(); // Actualiza los bordes de la card de descripción
    });
});

// Función para actualizar los bordes de la card de descripción
function updateDescriptionCardBorders() {
    const descriptionCard = document.querySelector('.description-card');
    const activeCard = document.querySelector('.card.active');
    const activeIndex = Array.from(cards).indexOf(activeCard);

    // Remover cualquier clase de borde previa
    descriptionCard.classList.remove('middle', 'right', 'left');

    // Asignar la clase correcta según la posición
    if (activeIndex === currentIndex + 1) {
        descriptionCard.classList.add('middle'); 
    } else if (activeIndex === currentIndex) {
        descriptionCard.classList.add('left'); 
    } else if (activeIndex === currentIndex + 2) {
        descriptionCard.classList.add('right'); 
    }
}

// Función para mover el carrusel
function moveCarousel(direction) {
    const maxIndex = cards.length - cardsToShow;
    currentIndex += direction;

    // Asegura que el índice esté dentro del rango permitido
    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }

    updateVisibleCards();

    // Verifica si la card activa está en el rango visible
    const activeCard = document.querySelector('.card.active');
    const activeIndex = Array.from(cards).indexOf(activeCard);

    // Si la card activa no está visible, activa la primera visible
    if (activeIndex < currentIndex || activeIndex >= currentIndex + cardsToShow) {
        activeCard.classList.remove('active');
        cards[currentIndex].classList.add('active'); // Activa la primera card visible
    }

    // Actualiza la descripción basada en la card activa
    showDescription(cards[currentIndex].id);

    // Actualiza los bordes de la card de descripción
    updateDescriptionCardBorders();
}

// Inicializa las cards visibles y la descripción activa al cargar
updateVisibleCards();
showDescription('quiropidia');

// Agrega eventos a las flechas
document.querySelector('.arrow-left').addEventListener('click', function() {
    moveCarousel(-1);
});

document.querySelector('.arrow-right').addEventListener('click', function() {
    moveCarousel(1);
});

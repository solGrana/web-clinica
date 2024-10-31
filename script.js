// Función para mostrar la descripción correspondiente a la card seleccionada
function showDescription(especialitat) {
    // Remover la clase 'active' de todas las cards
    document.querySelectorAll('.card').forEach(function (card) {
        card.classList.remove('active');
    });

    // Añadir la clase 'active' a la card seleccionada
    document.getElementById(especialitat).classList.add('active');

    // Ocultar todas las descripciones y remover las clases de bordes
    document.querySelectorAll('.description').forEach(function (desc) {
        desc.classList.remove('active');
    });

    // Mostrar la descripción correspondiente
    if (especialitat !== 'quiropidia') {
        document.getElementById(especialitat + '-description').classList.add('active');
    } else {
        document.getElementById('quiropidia-description').classList.add('active');
    }

    // Cambiar bordes de la card de descripción según la especialidad seleccionada
    const descriptionCard = document.getElementById('descripcion-card'); // ID correcto

    // Remover clases de bordes antes de agregar nuevas
    //descriptionCard.classList.remove('borders-top-left-recto', 'borders-top-right-recto');

    // Establecer los bordes según la especialidad seleccionada
}

// Inicializar la funcionalidad para todas las cards
document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('click', function () {
        // Obtener el ID de la card seleccionada
        const especialitat = this.id;
        showDescription(especialitat);
    });
});

// Activar la descripción de quiropodia al cargar la página
showDescription('quiropidia');

/* SLIDER ESPECIALIDADES */
const cards = document.querySelectorAll('.card');
let currentIndex = 0;
const cardsToShow = 3;

// Función para mostrar las cards según el índice
function updateVisibleCards() {
    cards.forEach((card, index) => {
        if (index >= currentIndex && index < currentIndex + cardsToShow) {
            card.classList.add('visible'); // Muestra la card
        } else {
            card.classList.remove('visible'); // Oculta la card
        }
    });
}

function updateDescriptionCardBorders() {
    const descriptionCard = document.querySelector('.description-card');
    const activeCard = document.querySelector('.card.active');
    const activeIndex = Array.from(cards).indexOf(activeCard);

    // Remueve cualquier clase de borde previa
    descriptionCard.classList.remove('middle', 'right', 'left');

    // Asigna la clase correcta según la posición
    if (activeIndex === currentIndex + 1) {
        descriptionCard.classList.add('middle'); // Card activa está en el medio
    } else if (activeIndex === currentIndex) {
        descriptionCard.classList.add('left'); // Card activa está en la izquierda
    } else if (activeIndex === currentIndex + 2) {
        descriptionCard.classList.add('right'); // Card activa está en la derecha
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

    // Actualiza los bordes de la card de descripción
    updateDescriptionCardBorders();

    // Actualiza la descripción de la card activa
    const especialitat = cards[currentIndex].id; // Obtener el ID de la card activa
    showDescription(especialitat); // Muestra la descripción
}

// Inicializa las cards visibles
updateVisibleCards();

// Agrega eventos para las flechas
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');

prevButton.addEventListener('click', () => moveCarousel(-1));
nextButton.addEventListener('click', () => moveCarousel(1));

// Agrega eventos de 'mouseenter' para cambiar la descripción al pasar el mouse
prevButton.addEventListener('mouseenter', () => {
    const newIndex = (currentIndex - 1 + cards.length) % cards.length; // Índice de la card anterior
    showDescription(cards[newIndex].id); // Cambia la descripción
});

nextButton.addEventListener('mouseenter', () => {
    const newIndex = (currentIndex + 1) % cards.length; // Índice de la card siguiente
    showDescription(cards[newIndex].id); // Cambia la descripción
});

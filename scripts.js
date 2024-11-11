const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

// Calcula cuántas tarjetas entran en la vista del carrusel según su ancho
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insertar copias de las últimas tarjetas al principio del carrusel
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insertar copias de las primeras tarjetas al final del carrusel
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Se agrega y elimina la clase no-transition para evitar una transición cuando se ajusta la posición del carrusel.
// Mueve el carrusel a la posición inicial correcta, moviéndose al principio del carrusel (donde ahora están las tarjetas duplicadas)
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Agregar event listeners a las flechas para mover el carrusel derecha o izquierda
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

// Función para manejar el scroll infinito
const infiniteScroll = () => {
    // Si el carrusel está al principio, mueve al final
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth); // Mover al final
        carousel.classList.remove("no-transition");
    }
    // Si el carrusel está al final, mueve al principio
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth; // Mover al principio
        carousel.classList.remove("no-transition");
    }
};

// Event listener del scroll infinito (pasar la referencia de la función sin ejecutarla)
carousel.addEventListener("scroll", infiniteScroll);

function showDescription(especialitat) {
    // Selecciona todas las instancias de la card seleccionada (incluidas las duplicadas)
    const selectedCards = document.querySelectorAll(`.card#${especialitat}`);

    // Verifica si alguna card tiene la clase 'active'
    const isActive = Array.from(selectedCards).some(card => card.classList.contains('active'));

    // Si alguna card está activa, quítale la clase 'active' a todas las instancias
    if (isActive) {
        selectedCards.forEach(card => {
            card.classList.remove('active');
        });

        // Esconde todas las descripciones
        document.querySelectorAll('.description').forEach((desc) => {
            desc.classList.remove('active');
        });
    } else {
        // Si ninguna card está activa, agrega la clase 'active' a todas las instancias
        selectedCards.forEach(card => {
            card.classList.add('active');
        });

        // Esconde todas las descripciones antes de mostrar la nueva
        document.querySelectorAll('.description').forEach((desc) => {
            desc.classList.remove('active');
        });

        // Muestra la descripción de la card seleccionada
        const selectedDescription = document.getElementById(`${especialitat}-description`);
        if (selectedDescription) {
            selectedDescription.classList.add('active');
        }
    }
}

// Función que alterna la visibilidad de la descripción
function toggleDescription() {
    const description = document.querySelector('.description-card');
    
    // Verifica si la descripción está actualmente oculta
    if (description.style.display === 'none' || description.style.display === '') {
        description.style.display = 'flex';  // Cambia a 'flex' para mostrar
    } else {
        description.style.display = 'none';  // Cambia a 'none' para ocultar
    }
}

// Función que se llama al hacer clic en una card
function setupCardClicks() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', toggleDescription);
    });
}

// Llamamos a la función para registrar los clics en las cards
setupCardClicks();

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

// Configuración de carrusel 
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Función para desactivar todas las cards y descripciones
function desactivarTodas() {
    document.querySelectorAll(".card").forEach(card => card.classList.remove("active"));
    document.querySelectorAll(".description").forEach(desc => desc.classList.remove("active"));
    document.getElementById("descripcion-card").style.display = "none";
}

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        desactivarTodas(); // Desactiva todas las cards y descripciones antes de moverse en el carrusel
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
};

carousel.addEventListener("scroll", infiniteScroll);

// Función para mostrar/ocultar la descripción de una card 
function showDescription(especialitat) {
    // Seleccionar todas las instancias de la card seleccionada
    const selectedCards = document.querySelectorAll(`.card#${especialitat}`);
    const descriptionContainer = document.getElementById("descripcion-card");

    // Verificar si alguna card ya tiene la clase 'active'
    const isActive = Array.from(selectedCards).some(card => card.classList.contains("active"));

    // Si está activa, sacar clase 'active' de todas las instancias y ocultar el contenedor de descripciones
    if (isActive) {
        selectedCards.forEach(card => card.classList.remove("active"));
        descriptionContainer.style.display = "none";
    } else {
        // Remover clase 'active' de todas las cards y ocultar todas las descripciones
        desactivarTodas(); // Llama a la función para desactivar todo

        // Agregar clase 'active' a las instancias seleccionadas
        selectedCards.forEach(card => card.classList.add("active"));

        // Mostrar el contenedor de descripciones y activar la descripción correspondiente
        descriptionContainer.style.display = "flex";
        const selectedDescription = document.getElementById(`${especialitat}-description`);
        if (selectedDescription) {
            selectedDescription.classList.add("active");
        }
    }
    window.location.href = "#especialitats";
}

// Selecciona el tooltip y el contenedor
const deliveryContainer = document.querySelector('.delivery-container');
const tooltip = document.querySelector('.tooltip');

// Texto original y texto al hacer clic
const originalText = "Servei de podologia a domicili!";
const clickedText = "Contacta'ns 972 20 77 16";

// Cambia el texto al hacer clic
deliveryContainer.addEventListener('click', () => {
    tooltip.textContent = clickedText;
    // Restaura el texto original después de 3 segundos
    setTimeout(() => {
        tooltip.textContent = originalText;
    }, 3000); // Ajusta el tiempo según prefieras
});

// Restaura el texto original al salir con el mouse
deliveryContainer.addEventListener('mouseleave', () => {
  tooltip.textContent = originalText;
});

// Seleccionar el header 
const header = document.querySelector('header');

let inactivityTimer;

function hideHeader() {
  header.style.opacity = '0';
  header.style.pointerEvents = 'none'; 
}
function showHeader() {
  header.style.opacity = '1';
  header.style.pointerEvents = 'auto'; 
}

// Reiniciar el temporizador de inactividad
function resetInactivityTimer() {
  showHeader(); // Mostrar el header en cada interacción
  clearTimeout(inactivityTimer); // Limpiar el temporizador anterior
  inactivityTimer = setTimeout(hideHeader, 3000); // Ocultar despues de 3 segundos
}

// eventos de interaccion
['mousemove', 'touchstart', 'keydown', 'scroll'].forEach(event => {
  window.addEventListener(event, resetInactivityTimer);
});

// Inicializar el temporizador al cargar la pag
resetInactivityTimer();
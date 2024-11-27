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

    if (window.innerWidth > 611) {
        window.location.href = "#especialitats";
    }
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

// Selecciona los botones y el menú lateral
const hamburger = document.querySelector('.hamburger');
const closeBtn = document.querySelector('.close-btn');
const sideMenu = document.querySelector('.side-menu');

// Cuando se haga clic en la hamburguesa, abrir el menú lateral
hamburger.addEventListener('click', () => {
  sideMenu.classList.add('open');
});

// Cuando se haga clic en la cruz, cerrar el menú lateral
closeBtn.addEventListener('click', () => {
  sideMenu.classList.remove('open');
});

/* const descriptions = {
    quiropidia: `<div>
                    <h4>Quiropidia</h4>
                    <p>La quiropòdia és un tractament podològic que consisteix en l'eliminació de callositats i alteracions a les ungles dels peus amb l'objectiu d'evitar que aquestes lesions lleus s'agreugin i derivin en altres de més rellevància.</p>
                    <button class="CTA">Contacta't amb nosaltres</button>
                 </div>`,
    exploracio: `<div>
                    <h4>Exploració Biomecànica</h4>
                    <p>És un examen podològic que avalua la forma en què el cos es mou i com això afecta l'estructura i la funció del cos.</p>
                    <button class="CTA">Contacta't amb nosaltres</button>
                 </div>`,
    // Añade más descripciones según sea necesario
};

function showDescriptionmobile(cardId) {
    // Encuentra la tarjeta clickeada
    const card = document.getElementById(cardId);

    // Encuentra el contenedor de descripción dentro de esa tarjeta
    const descriptionContainer = card.querySelector('.description-container');

    // Si ya está visible, la ocultamos
    if (descriptionContainer.classList.contains('active')) {
        descriptionContainer.classList.remove('active');
        descriptionContainer.innerHTML = '';
    } else {
        // Oculta cualquier otra descripción activa
        document.querySelectorAll('.description-container.active').forEach((el) => {
            el.classList.remove('active');
            el.innerHTML = '';
        });

        // Agrega el contenido y muestra la descripción
        descriptionContainer.innerHTML = descriptions[cardId];
        descriptionContainer.classList.add('active');
    }
}
 */

const descriptions = [
    {
        id: "quiropidia",
        title: "Quiropidia",
        text: "La quiropòdia és un tractament podològic que consisteix en l'eliminació de callositats i alteracions a les ungles dels peus amb l'objectiu d'evitar que aquestes lesions lleus s'agreugin i derivin en altres de més rellevància.",
        image: "images/quiropidia.png",
        alt: "Descripción Quiropidia"
    },
    {
        id: "exploracio",
        title: "Exploració Biomecànica",
        text: "És un examen/estudi podològic que avalua la forma en què el cos es mou i com això afecta l'estructura i la funció del cos. En el cas dels peus, una exploració biomecànica inclou una anàlisi detallada de la petjada i la manera com el teu cos s'ajusta a la superfície on camines.",
        image: "images/quiropidia.png",
        alt: "Descripción Exploració Biomecànica"
    },
    {
        id: "ortopodologia",
        title: "Ortopodologia",
        text: `L'ortopodologia es basa en el tractament de les alteracions mecàniques del peu, és a dir, de les alteracions que influeixen en la funció correcta del peu durant la marxa. El tractament d’aquestes alteracions és mitjançant:
            <h5>Per què triar-nos?</h5>
            <p class="tic"><img src="images/tic.png"> Plantilles ortopèdiques a mida.</p>
            <p><img src="images/tic.png"> Órtesis de silicona. </p>`,
        image: "images/plantillas-ortopedicas.png",
        alt: "Descripción Ortopodologia"
    },
    {
        id: "podologia",
        title: "Podologia",
        text: `<span class="podiatry-category">PODOLOGIA PEDIÀTRICA </span>
            <span><img src="images/arrow-especialidad.png"> Especialitzada al peu del nen i les seves afeccions més comunes.</span><br><br>
            <span class="podiatry-category">PODOLOGIA ESPORTIVA </span>
            <span><img src="images/arrow-especialidad.png"> Especialitzada en el gest de l'esportista i en les afeccions més comunes. Prevenció i tractament de les lesions de l'esportista.</span><br><br>
            <span class="podiatry-category">PODOLOGIA GERIÀTRICA</span>
            <span><img src="images/arrow-especialidad.png"> Especialitzada en el peu de la gent gran. Prevenció i cura de les patologies.</span>
            <h5>Per què triar-nos?</h5>
            <p class="tic"><img src="images/tic.png"> Promoció de la salut integral.</p>
            <p class="tic"><img src="images/tic.png"> Prevenció d'afeccions i deformitats del peu.</p>
            <p><img src="images/tic.png"> Donar resposta mitjançant tècniques diagnòstiques i tractaments adequats.</p>`,
        image: "images/podologia.png",
        alt: "Descripción Podologia"
    },
    {
        id: "piediabetico",
        title: "Peu Diabétic",
        text: `El peu diabètic o síndrome del peu diabètic fa referència a la presència d'infecció, ulceració o destrucció dels teixits del peu associada a neuropatia perifèrica i/o malaltia arterial perifèrica de les extremitats inferiors de les persones amb diabetis mellitus.<br><br>
            Cura del peu diabètic i tractament preventiu d’úlceres vasculars i neuropàtiques.<br>
            <p class="tic"><img src="images/tic.png"> Adscrita en el PEU DIABÈTIC del CATSALUT des del 2009.</p>`,
        image: "images/piediabetico.png",
        alt: "Descripción Peu Diabétic"
    }

];
function showDescriptionMobile(cardId) {
    // Encuentra la tarjeta clickeada
    const card = document.getElementById(cardId);

    // Encuentra el contenedor de descripción dentro de esa tarjeta
    const descriptionContainer = card.querySelector('.description-container');

    // Si ya está visible, la ocultamos
    if (descriptionContainer.classList.contains('active')) {
        descriptionContainer.classList.remove('active');
        card.classList.remove('active'); // Quita el color violeta de la tarjeta
        descriptionContainer.innerHTML = '';
    } else {
        // Oculta cualquier otra descripción activa y remueve el color violeta de otras tarjetas
        document.querySelectorAll('.description-container.active').forEach((el) => {
            el.classList.remove('active');
            el.innerHTML = '';
            el.closest('.card').classList.remove('active'); // Quita el color de la tarjeta asociada
        });

        // Busca la descripción correspondiente en el array de objetos
        const description = descriptions.find(desc => desc.id === cardId);

        if (description) {
            // Agrega el contenido dinámicamente y muestra la descripción
            descriptionContainer.innerHTML = `
                <div class="description-text">
                    <h4>${description.title}</h4>
                    <p>${description.text}</p>
                    </div>
                    <img src="${description.image}" alt="${description.alt}" class="description-image">
                    <button class="CTA">Contacta't amb nosaltres</button>
            `;
            descriptionContainer.classList.add('active');
            card.classList.add('active'); // Agrega el color violeta a la tarjeta clickeada
        } else {
            console.error(`Descripción no encontrada para el ID: ${cardId}`);
        }
    }
}


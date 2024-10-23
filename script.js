// Función para mostrar la descripción correspondiente a la card seleccionada
function showDescription(especialitat) {
    // Remover la clase 'active' de todas las cards
    document.querySelectorAll('.card').forEach(function(card) {
        card.classList.remove('active');
    });

    // Añadir la clase 'active' a la card seleccionada
    document.getElementById(especialitat).classList.add('active');

    // Ocultar todas las descripciones y remover las clases de bordes
    document.querySelectorAll('.description').forEach(function(desc) {
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
    descriptionCard.classList.remove('borders-top-left-recto', 'borders-top-right-recto');

    // Establecer los bordes según la especialidad seleccionada
    if (especialitat === 'quiropidia') {
        descriptionCard.classList.add('borders-top-left-recto');
    } else if (especialitat === 'ortopodologia') {
        descriptionCard.classList.add('borders-top-right-recto');
    }
}

// Inicializar la funcionalidad para todas las cards
document.querySelectorAll('.card').forEach(function(card) {
    card.addEventListener('click', function() {
        // Obtener el ID de la card seleccionada
        const especialitat = this.id;
        showDescription(especialitat);
    });
});

// Activar la descripción de quiropodia al cargar la página
showDescription('quiropidia');

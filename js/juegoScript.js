"Use strict"

document.addEventListener('DOMContentLoaded', function () {
    // Obtenemos referencias a los elementos HTML que vamos a manipular
    const goalkeeper = document.getElementById('goalkeeper');
    const ball = document.getElementById('ball');
    const resultDisplay = document.getElementById('result');
    const goalsDisplay = document.getElementById('goals');
    const savesDisplay = document.getElementById('saves');
    const playButton = document.getElementById('playButton');

    // Variables para llevar la cuenta de goles y paradas
    let goals = 0;
    let saves = 0;

    // Rutas de imágenes para el portero en estado normal y cuando para un balón
    const goalkeeperNormalImg = 'img/Animaciones/mark_evans.webp';
    const goalkeeperStoppedImg = 'img/Animaciones/parado.png';

    // Función para animar el balón hacia la dirección elegida (izquierda, centro, derecha)
    function animateBall(direction) {
        ball.classList.remove('d-none');

        // Posicionamos el balón al centro y a cierta altura antes de la animación
        ball.style.left = '50%';
        ball.style.transform = 'translateX(-50%)';
        ball.style.bottom = '50px';

        // Definimos posiciones para cada dirección
        const positions = {
            'izquierda': '30%',
            'centro': '50%',
            'derecha': '70%'
        };

        // Aplicamos la animación al balón
        ball.style.transition = 'left 0.5s ease-in-out, bottom 0.5s ease-in-out';
        setTimeout(() => {
            // Animamos el balón hacia la dirección elegida
            ball.style.left = positions[direction];
            ball.style.bottom = '100px';
        }, 10);

        // Despues de 1 segundo, ocultamos el balón
        setTimeout(() => {
            ball.classList.add('d-none');
        }, 1000);
    }

    // Función principal del juego
    function playGame() {
        // Preguntamos al usuario dónde quiere lanzar el balón
        const userChoice = prompt(
            "¿Dónde quieres lanzar el balón?\n\n" +
            "Escribe una de estas opciones:\n" +
            "- Izquierda\n" +
            "- Centro\n" +
            "- Derecha\n" +
            "- Salir\n\n" +
            "Luego haz clic en Aceptar"
        );

        if (userChoice === null) {
            return; // Si cancela, no hacer nada
        }

        const choice = userChoice.toLowerCase().trim();

        // Controlamos la opción de salida
        if (choice === 'salir') {
            alert("¡Gracias por jugar!");
            return;
        } else if (choice !== 'izquierda' && choice !== 'centro' && choice !== 'derecha') {
            alert("¡Opción no válida!\n\nDebes escribir exactamente:\n- Izquierda\n- Centro\n- Derecha\n- Salir");
            playGame();
            return;
        }

        animateBall(choice);

        // Array con posiciones posibles para el portero (izquierda, centro, derecha)
        const positions = ['left', 'center', 'right'];

        // Posición aleatoria del portero
        const randomPosition = positions[Math.floor(Math.random() * positions.length)];

        goalkeeper.className = 'position-absolute';
        goalkeeper.classList.add(`goalkeeper-${randomPosition}`);

        setTimeout(() => {
            // COmprobar si el portero ha parado el balón
            const isSave = (choice === 'izquierda' && randomPosition === 'left') ||
                (choice === 'centro' && randomPosition === 'center') ||
                (choice === 'derecha' && randomPosition === 'right');

            if (isSave) {
                goalkeeper.src = goalkeeperStoppedImg;
                resultDisplay.textContent = "¡Mark ha parado el balón!";
                resultDisplay.className = "fs-4 fw-bold mb-3 text-danger";
                saves++;
                savesDisplay.textContent = saves;

                setTimeout(() => {
                    goalkeeper.src = goalkeeperNormalImg;
                }, 5000);
            } else {
                resultDisplay.textContent = "¡GOOOOOOL!";
                resultDisplay.className = "fs-4 fw-bold mb-3 text-success";
                goals++;
                goalsDisplay.textContent = goals;
            }

            // Habilitar el botón de nuevo después de que termine la jugada
            setTimeout(() => {
                playButton.disabled = false;
                playButton.textContent = "Tirar de nuevo";
            }, 1000);
        }, 500);
    }

    // Evento click para iniciar el juego
    playButton.addEventListener('click', function () {
        this.disabled = true;
        this.textContent = "Jugando...";
        playGame();
    });
});
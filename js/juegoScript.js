"Use strict"

document.addEventListener('DOMContentLoaded', function () {
    const goalkeeper = document.getElementById('goalkeeper');
    const ball = document.getElementById('ball');
    const resultDisplay = document.getElementById('result');
    const goalsDisplay = document.getElementById('goals');
    const savesDisplay = document.getElementById('saves');
    const playButton = document.getElementById('playButton');

    let goals = 0;
    let saves = 0;
    const goalkeeperNormalImg = 'img/Animaciones/mark_evans.webp';
    const goalkeeperStoppedImg = 'img/Animaciones/parado.png';

    function animateBall(direction) {
        ball.classList.remove('d-none');
        
        ball.style.left = '50%';
        ball.style.transform = 'translateX(-50%)';
        ball.style.bottom = '50px';
        
        const positions = {
            'izquierda': '30%',
            'centro': '50%',
            'derecha': '70%'
        };
        
        ball.style.transition = 'left 0.5s ease-in-out, bottom 0.5s ease-in-out';
        setTimeout(() => {
            ball.style.left = positions[direction];
            ball.style.bottom = '100px';
        }, 10);
        
        setTimeout(() => {
            ball.classList.add('d-none');
        }, 1000);
    }

    function playGame() {
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

        if (choice === 'salir') {
            alert("¡Gracias por jugar!");
            return;
        } else if (choice !== 'izquierda' && choice !== 'centro' && choice !== 'derecha') {
            alert("¡Opción no válida!\n\nDebes escribir exactamente:\n- Izquierda\n- Centro\n- Derecha\n- Salir");
            playGame();
            return;
        }

        animateBall(choice);

        const positions = ['left', 'center', 'right'];
        const randomPosition = positions[Math.floor(Math.random() * positions.length)];

        goalkeeper.className = 'position-absolute';
        goalkeeper.classList.add(`goalkeeper-${randomPosition}`);

        setTimeout(() => {
            const isSave = (choice === 'izquierda' && randomPosition === 'left') ||
                          (choice === 'centro' && randomPosition === 'center') ||
                          (choice === 'derecha' && randomPosition === 'right');

            if (isSave) {
                goalkeeper.src = goalkeeperStoppedImg;
                resultDisplay.textContent = "¡El portero ha atajado el balón!";
                resultDisplay.className = "fs-4 fw-bold mb-3 text-danger";
                saves++;
                savesDisplay.textContent = saves;
                
                setTimeout(() => {
                    goalkeeper.src = goalkeeperNormalImg;
                }, 1000);
            } else {
                resultDisplay.textContent = "¡GOOOOOOL!";
                resultDisplay.className = "fs-4 fw-bold mb-3 text-success";
                goals++;
                goalsDisplay.textContent = goals;
            }

            // Habilitar el botón de nuevo después de que termine la jugada
            setTimeout(() => {
                playButton.disabled = false;
                playButton.textContent = "Jugar de nuevo";
            }, 1000);
        }, 500);
    }

    playButton.addEventListener('click', function() {
        this.disabled = true;
        this.textContent = "Jugando...";
        playGame();
    });
});
"Use strict"



document.addEventListener('DOMContentLoaded', function() {
    const goalkeeper = document.getElementById('goalkeeper');
    const resultDisplay = document.getElementById('result');
    const goalsDisplay = document.getElementById('goals');
    const savesDisplay = document.getElementById('saves');
    
    let goals = 0;
    let saves = 0;
    
    function startGame() {
        // Mostrar opciones al usuario con prompt
        const userChoice = prompt(
            "¿Dónde quieres lanzar el balón?\n\n" +
            "Escribe una de estas opciones:\n" +
            "- Izquierda\n" +
            "- Centro\n" +
            "- Derecha\n\n" +
            "Si no quieres jugar más, cierra la ventana.");
        
        if (userChoice === null) {
            // Si el usuario cancela, preguntar de nuevo después de 1 segundo
            setTimeout(startGame, 1000);
            return;
        }
        
        // Normalizar la entrada del usuario
        const choice = userChoice.toLowerCase().trim();
        
        // Validar la opción
        if (choice !== 'izquierda' && choice !== 'centro' && choice !== 'derecha') {
            alert("¡Opción no válida!\n\nDebes escribir exactamente:\n- Izquierda\n- Centro\n- Derecha");
            startGame();
            return;
        }
        
        // Mover al portero aleatoriamente
        const positions = ['left', 'center', 'right'];
        const randomPosition = positions[Math.floor(Math.random() * positions.length)];
        
        // Resetear clases primero
        goalkeeper.className = 'position-absolute';
        goalkeeper.classList.add(`goalkeeper-${randomPosition}`);
        
        // Determinar resultado después de que termine la animación
        setTimeout(() => {
            if ((choice === 'izquierda' && randomPosition === 'left') ||
                (choice === 'centro' && randomPosition === 'center') ||
                (choice === 'derecha' && randomPosition === 'right')) {
                // Parada
                resultDisplay.textContent = "¡El portero ha atajado el balón!";
                resultDisplay.className = "fs-4 fw-bold mb-3 text-danger";
                saves++;
                savesDisplay.textContent = saves;
            } else {
                // Gol
                resultDisplay.textContent = "¡GOOOOOOL!";
                resultDisplay.className = "fs-4 fw-bold mb-3 text-success";
                goals++;
                goalsDisplay.textContent = goals;
            }
            
            // Volver a preguntar después de 1 segundo
            setTimeout(startGame, 1000);
        }, 500);
    }
    
    // Iniciar el juego automáticamente
    startGame();
}); 
// Script de validación de Bootstrap con modificaciones de Olga, no tocar salvo los ids
(() => {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            // Validar hobbies manualmente
            const checkboxes = form.querySelectorAll('.saga:checked'); // id de los hobbies
            if (checkboxes.length === 0) {
                event.preventDefault();
                event.stopPropagation();
                form.querySelector('.saga').closest('fieldset').classList.add('is-invalid');
            }

            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            // Validar coincidencia de contraseñas
            const pass = form.querySelector('#pass').value;  // id contraseña 1
            const pass2 = form.querySelector('#pass2').value; // id contraseña 2
            if (pass !== pass2) {
                event.preventDefault();
                event.stopPropagation();
                form.querySelector('#pass2').classList.add('is-invalid');
            }

            form.classList.add('was-validated');
        }, false);
    });
})();

// Script adicional para funcionalidades extra

// Contador de caracteres para la biografía
document.getElementById('bio').addEventListener('input', function() {
    const contador = document.getElementById('contador');
    contador.textContent = this.value.length;
});

// Mostrar nivel de satisfacción del usuario
document.getElementById('satisfaccion').addEventListener('input', function() {
    document.getElementById('satisfaccion-valor').textContent = this.value;
});


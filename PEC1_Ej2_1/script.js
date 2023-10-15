const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('mail');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const age = document.getElementById('age');

// Función para mostrar mensajes de error
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.remove('success');
    formControl.classList.add('error');
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Función para mostrar éxito
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
    const small = formControl.querySelector('small');
    small.innerText = '';
}

//Comprobamos que el nombre es correcto
function checkName() {
    if (username.value.trim().length < 4) {
        showError(username, 'El nombre debe tener al menos 4 caracteres');
    } else {
        showSuccess(username);
    }
}

//Comprobamos que el email es correcto
function checkEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
        showError(email, 'El email no tiene la estructura correcta');
    } else {
        showSuccess(email);
    }
}

//Comprobamos que la edad es correcta
function checkAge() {
    const ageValue = parseInt(age.value);
    if (isNaN(ageValue) || ageValue < 1 || ageValue > 1000) {
        showError(age, 'La edad debe estar entre 1 y 1000');
    } else {
        showSuccess(age);
    }
}

//Comprobamos que las contraseñas coinciden y cumplen los requisitos
function checkPasswordCriteria(passwordValue) {
    if (passwordValue.length < 8) {
        return false;
    }

    if (!/[A-Z]/.test(passwordValue)) {
        return false;
    }

    if (!/[~!@#\$%\^&*()_+\-=\{\}\[\]|\\:";'<>? ,.]/.test(passwordValue)) {
        return false;
    }

    if (!/[a-z]/.test(passwordValue)) {
        return false;
    }

    if (!/\d/.test(passwordValue)) {
        return false;
    }

    return true;
}
function checkPasswords() {
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (passwordValue === '') {
        showError(password, 'La contraseña es obligatoria');
    } else if (!checkPasswordCriteria(passwordValue)) {
        showError(password, 'La contraseña no cumple con los criterios');
    } else {
        showSuccess(password);
    }

    if (password2Value === '') {
        showError(password2, 'La confirmación de contraseña es obligatoria');
    } else if (passwordValue !== password2Value) {
        showError(password, 'Las contraseñas no coinciden');
        showError(password2, 'Las contraseñas no coinciden');
    } else {
        showSuccess(password);
        showSuccess(password2);
    }
}

// Evento de envío del formulario
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkName();
    checkEmail();
    checkAge();
    checkPasswords();
});

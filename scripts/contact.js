const form = document.querySelector('form');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const messageField = document.getElementById('message');
const charCounter = document.getElementById('char-counter');
const errorOutput = document.getElementById('error-output');
const infoOutput = document.getElementById('info-output');

function showMessage(output, message) {
    output.textContent = message;
    output.style.display = 'block';
    setTimeout(() => { output.style.display = 'none'; }, 3000);
}

function flashField(field) {
    field.classList.add('flash-error');
    setTimeout(() => field.classList.remove('flash-error'), 500);
}

nameField.addEventListener('input', e => {
    const pattern = /^[A-Za-z\s\-']*$/;
    if (!pattern.test(e.target.value)) {
        flashField(nameField);
        showMessage(errorOutput, 'Illegal character in Name.');
        nameField.value = e.target.value.replace(/[^A-Za-z\s\-']/g, '');
    }
});

messageField.addEventListener('input', () => {
    const remaining = messageField.maxLength - messageField.value.length;
    charCounter.textContent = `${remaining} characters remaining`;
    charCounter.classList.remove('warning', 'error');

    if (remaining <= 50 && remaining > 0) charCounter.classList.add('warning');
    else if (remaining <= 0) {
        charCounter.classList.add('error');
        messageField.setCustomValidity('Character limit exceeded');
    } else {
        messageField.setCustomValidity('');
    }

    if (messageField.checkValidity() && messageField.value.length >= 50) {
        showMessage(infoOutput, 'Message field is valid!');
    }
});

form.addEventListener('submit', e => {
    e.preventDefault();
    let hasErrors = false;
    const inputs = [nameField, emailField, messageField];

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            flashField(input);
            showMessage(errorOutput, `Error in field: ${input.name}`);
            hasErrors = true;
        }
    });

    if (!hasErrors) {
        showMessage(infoOutput, 'Form submitted successfully!');
        form.submit();
    }
});

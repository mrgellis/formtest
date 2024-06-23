document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');
    const inputs = form.querySelectorAll('input, textarea');

    // Inline validation
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });

    function validateField(field) {
        const errorElement = field.nextElementSibling.nextElementSibling;
        if (field.checkValidity()) {
            errorElement.textContent = '';
        } else {
            if (field.validity.valueMissing) {
                errorElement.textContent = 'This field is required.';
            } else if (field.validity.typeMismatch) {
                errorElement.textContent = 'Please enter a valid ' + field.type + '.';
            }
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields before submission
        let isValid = true;
        inputs.forEach(input => {
            validateField(input);
            if (!input.checkValidity()) {
                isValid = false;
            }
        });

        if (!isValid) {
            statusMessage.textContent = 'Please correct the errors in the form.';
            statusMessage.style.color = '#F44336';
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Replace 'YOUR_WEBHOOK_URL' with your actual webhook URL
        const webhookUrl = 'https://hook.eu2.make.com/s89t342af7ptta0b9ta1p7r7rzbfw5b0';

        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.status;
        })
        .then(status => {
            console.log('Success:', status);
            statusMessage.textContent = 'Thank you! Your message has been sent successfully.';
            statusMessage.style.color = '#4CAF50';
            form.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            statusMessage.textContent = 'An error occurred. Please try again or contact support if the problem persists.';
            statusMessage.style.color = '#F44336';
        });
    });
});

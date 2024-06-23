document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

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
            // For webhooks that don't return JSON, we can just check if the status is OK
            return response.status;
        })
        .then(status => {
            console.log('Success:', status);
            statusMessage.textContent = 'Message sent successfully!';
            statusMessage.style.color = '#4CAF50';
            form.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            statusMessage.textContent = 'An error occurred. Please try again.';
            statusMessage.style.color = '#F44336';
        });
    });
});

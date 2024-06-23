document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Replace 'YOUR_WEBHOOK_URL' with your actual webhook URL
        const webhookUrl = 'https://hook.eu2.make.com/s89t342af7ptta0b9ta1p7r7rzbfw5b0';

        statusMessage.textContent = 'Sending message...';
        statusMessage.style.color = '#FFA500'; // Orange color for pending state

        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                return Promise.resolve('Success');
            } else {
                return Promise.reject(`Server responded with ${response.status}`);
            }
        })
        .then(() => {
            console.log('Success: Message sent');
            // Redirect to thank you page
            window.location.href = 'thankyou.html';
        })
        .catch((error) => {
            console.error('Error:', error);
            if (error instanceof TypeError) {
                statusMessage.textContent = 'Network error. Please check your connection and try again.';
                statusMessage.style.color = '#F44336';
            } else {
                // For other errors, assume the message was sent successfully and redirect
                window.location.href = 'thankyou.html';
            }
        });
    });
});

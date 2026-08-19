const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push({
            name: contactForm.elements.name.value.trim(),
            email: contactForm.elements.email.value.trim(),
            message: contactForm.elements.message.value.trim(),
            date: new Date().toLocaleString()
        });

        localStorage.setItem('contactMessages', JSON.stringify(messages));
        contactForm.reset();
        alert('Your message was saved.');
    });
}

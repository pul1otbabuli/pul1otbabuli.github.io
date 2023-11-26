document.addEventListener('DOMContentLoaded', function () {
    const formPopup = document.getElementById('formPopup');
    const openFormButton = document.getElementById('openFormButton');
    const closeFormButton = document.getElementById('closeFormButton');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    // Check for previously entered values in LocalStorage
    if (localStorage.getItem('formValues')) {
        const savedValues = JSON.parse(localStorage.getItem('formValues'));
        populateForm(savedValues);
    }

    openFormButton.addEventListener('click', function () {
        formPopup.style.display = 'block';
        // Save current URL to History API
        history.pushState({ page: 'form' }, 'Form', '?form');
    });

    closeFormButton.addEventListener('click', function () {
        formPopup.style.display = 'none';
        // Reset URL on closing the form
        history.pushState({ page: 'home' }, 'Home', '/');
    });

    window.addEventListener('popstate', function (event) {
        if (event.state && event.state.page === 'home') {
            formPopup.style.display = 'none';
        }
    });

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Check if the checkbox is checked
        if (!contactForm.agreement.checked) {
            formMessage.textContent = 'Необходимо согласие с политикой обработки персональных данных';
            return;
        }

        // Check if the email is valid
        const email = contactForm.email.value;
        if (!isValidEmail(email)) {
            formMessage.textContent = 'Введите корректный адрес электронной почты';
            return;
        }

        // Check if the phone number is valid
        const phone = contactForm.phone.value;
        if (!isValidPhone(phone)) {
            formMessage.textContent = 'Введите корректный номер телефона (10 цифр)';
            return;
        }

        const formData = new FormData(contactForm);

        // Send form data to the server using fetch or another AJAX method
        // For example, using formcarry.com as a server
        fetch('https://formcarry.com/s/your-form-id', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            formMessage.textContent = data.title;
            contactForm.reset();
            // Save the current form values to LocalStorage
            localStorage.setItem('formValues', JSON.stringify(getFormValues()));
        })
        .catch(error => {
            formMessage.textContent = 'Ошибка при отправке формы';
            console.error('Error:', error);
        });
    });

    // Event listeners for real-time validation
    emailInput.addEventListener('input', function () {
        const email = emailInput.value;
        if (!isValidEmail(email)) {
            formMessage.textContent = 'Введите корректный адрес электронной почты';
        } else {
            formMessage.textContent = '';
        }
    });

    phoneInput.addEventListener('input', function () {
        const phone = phoneInput.value;
        if (!isValidPhone(phone)) {
            formMessage.textContent = 'Введите корректный номер телефона (10 цифр)';
        } else {
            formMessage.textContent = '';
        }
    });

    // Function to get form values as an object
    function getFormValues() {
        const values = {};
        const elements = contactForm.elements;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].name) {
                values[elements[i].name] = elements[i].value;
            }
        }
        return values;
    }

    // Function to populate form fields with saved values
    function populateForm(savedValues) {
        const elements = contactForm.elements;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].name && savedValues[elements[i].name]) {
                elements[i].value = savedValues[elements[i].name];
            }
        }
    }

    // Function to check if the email is valid
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to check if the phone number is valid
    function isValidPhone(phone) {
        const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
        return phoneRegex.test(phone);
    }
});

// Function to submit the form and close the popup
function submitForm() {
    document.getElementById('contactForm').submit();
    document.getElementById('formPopup').style.display = 'none';
}


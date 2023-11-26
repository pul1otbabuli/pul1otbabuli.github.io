document.addEventListener('DOMContentLoaded', function () {
    const formPopup = document.getElementById('formPopup');
    const openFormButton = document.getElementById('openFormButton');
    const closeFormButton = document.getElementById('closeFormButton');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

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
        const formData = new FormData(contactForm);

        // Send form data to the server using fetch or another AJAX method
        // For example, using formcarry.com as a server
        fetch('https://formcarry.com/s/LTM_tPRuTd', {
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
});

// Function to submit the form and close the popup
function submitForm() {
    document.getElementById('contactForm').submit();
    document.getElementById('formPopup').style.display = 'none';
}

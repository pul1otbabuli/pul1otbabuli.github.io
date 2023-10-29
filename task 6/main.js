document.addEventListener("DOMContentLoaded", function() {
    const quantityInput = document.getElementById("quantity");
    const serviceRadios = document.getElementsByName("service");
    const optionSelect = document.getElementById("option");
    const propertyCheckbox = document.getElementById("property");
    const calculateButton = document.getElementById("calculate-button");
    const totalPriceSpan = document.getElementById("total-price");

    
    const prices = {
        service1: 50,    // Уборка
        service2: 100,   // Ремонт
        service3: 30,    // Доставка
        option1: 0,      // Стандартная
        option2: 30,     // Премиум
        option3: 50,     // Экспресс
        property1: 20,   // Страховка
    };

    
    function calculateTotalPrice() {
        let total = 0;

        
        let selectedService = "";
        for (const radio of serviceRadios) {
            if (radio.checked) {
                selectedService = radio.value;
                break;
            }
        }

        
        total += prices[selectedService];

        
        if (optionSelect.value) {
            total += prices[optionSelect.value];
        }

        
        if (propertyCheckbox.checked) {
            total += prices[propertyCheckbox.value];
        }

        
        total *= parseInt(quantityInput.value, 10);

        
        totalPriceSpan.textContent = total + " рублей";
    }

   
    calculateButton.addEventListener("click", calculateTotalPrice);
    quantityInput.addEventListener("input", calculateTotalPrice);
    serviceRadios.forEach(radio => radio.addEventListener("change", calculateTotalPrice));
    optionSelect.addEventListener("change", calculateTotalPrice);
    propertyCheckbox.addEventListener("change", calculateTotalPrice);

    
    calculateTotalPrice();
});

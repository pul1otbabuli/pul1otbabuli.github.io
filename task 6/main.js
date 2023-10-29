document.addEventListener("DOMContentLoaded", function() {
    const quantityInput = document.getElementById("quantity");
    const serviceRadios = document.getElementsByName("service");
    const optionSelect = document.getElementById("option");
    const propertyCheckbox = document.getElementById("property");
    const totalPriceSpan = document.getElementById("total-price");

   
    const prices = {
        service1: 10,
        service2: 20,
        service3: 30,
        option1: 5,
        option2: 10,
        option3: 15,
        property1: 7,
    };

    
    function recalculateTotalPrice() {
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

    
    quantityInput.addEventListener("input", recalculateTotalPrice);
    serviceRadios.forEach(radio => radio.addEventListener("change", recalculateTotalPrice));
    optionSelect.addEventListener("change", recalculateTotalPrice);
    propertyCheckbox.addEventListener("change", recalculateTotalPrice);

    
    recalculateTotalPrice();
});

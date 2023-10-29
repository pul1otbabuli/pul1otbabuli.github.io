document.addEventListener("DOMContentLoaded", function() {
    const quantityInput = document.getElementById("quantity");
    const serviceRadios = document.getElementsByName("service");
    const optionSelect = document.getElementById("option");
    const propertyCheckbox = document.getElementById("property");
    const totalPriceSpan = document.getElementById("total-price");

    // Цены для разных типов услуг и опций
    const prices = {
        service1: 50,    // Уборка
        service2: 100,   // Ремонт
        service3: 30,    // Доставка
        option1: 0,      // Стандартная
        option2: 30,     // Премиум
        option3: 50,     // Экспресс
        property1: 20,   // Страховка
    };

    // Функция для расчета и обновления стоимости
    function calculateTotalPrice() {
        let total = 0;

        // Получить выбранный тип услуги
        let selectedService = "";
        for (const radio of serviceRadios) {
            if (radio.checked) {
                selectedService = radio.value;
                break;
            }
        }

        // Добавить цену выбранного типа услуги
        total += prices[selectedService];

        // Добавить цену выбранной опции (если выбрана)
        if (optionSelect.value) {
            total += prices[optionSelect.value];
        }

        // Добавить цену выбранного свойства (если выбрано)
        if (propertyCheckbox.checked) {
            total += prices[propertyCheckbox.value];
        }

        // Умножить на количество
        total *= parseInt(quantityInput.value, 10);

        // Обновить отображение итоговой стоимости
        totalPriceSpan.textContent = total + " рублей";
    }

    // Добавить обработчики событий
    quantityInput.addEventListener("input", calculateTotalPrice);
    serviceRadios.forEach(radio => radio.addEventListener("change", calculateTotalPrice));
    optionSelect.addEventListener("change", calculateTotalPrice);
    propertyCheckbox.addEventListener("change", calculateTotalPrice);

    // Инициализация
    calculateTotalPrice();
});


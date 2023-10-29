function calculateCost() {
    const cost = parseInt(document.getElementById('cost').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    document.getElementById('result').innerHTML = `Стоимость: ${cost * quantity} руб.`;
};

function validateInput() {
    const prodCost = document.getElementById('quantity').value;
    const regex = /^[0-9]+$/;

    if (!regex.test(prodCost)) {
        document.getElementById('result').textContent = 'Некорректное значение';
        return false;
    } else {
        return true;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('calculate').addEventListener('click', function() {
        if (validateInput()) {
            calculateCost();
        }
    });
});

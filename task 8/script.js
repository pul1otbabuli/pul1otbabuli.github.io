function send(event) {
    // убираем стандартное поведение формы
    event.preventDefault();

    // Валидация на чекбокс
    let acceptionEl = document.getElementById("uacception");
    if (!acceptionEl.checked) {
        alert("Примите политику обработки персональных данных");
        return false;
    }

    // Создаем новый запрос
    let request = new XMLHttpRequest();
    request.open("POST", "https://formcarry.com/s/G9Dc0K8CB1");
    request.setRequestHeader("ACCEPT", "application/json");

    // Заполняем данные

    let data = new FormData();
    
    let inputEls = document.getElementsByClassName("save");
    [...inputEls].forEach(inputEl => {
        data.append(inputEl.id, inputEl.value);
    });
    
    // Устанавливаем обработку на изменение состояния запроса
    request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          const status = request.status;
          if (status === 0 || (status >= 200 && status < 400)) {
            alert("Форма успешно отправлена");
          } else {
            alert("Произошла ошибка." + status);
          }
        }
    };

    // Отправляем данные
    request.send(data);
    // Отчистка хранилища
    [...inputEls].forEach(inputEl => {
        inputEl.value = "";
        localStorage.setItem(inputEl.id, "");
    });

    hide();
}

function show () {
    // второй параметр устарел, передается пустая строка
    history.pushState({form: true}, "", "./#form");
    let modal = document.getElementById("modal");
    modal.setAttribute("data--modal", "shown");
}

function hide() {
    // второй параметр устарел, передается пустая строка
    history.replaceState({form: false}, "", "./");
    let modal = document.getElementById("modal");
    modal.setAttribute("data--modal", "hidden");
}

function saveInput(event) {
    localStorage.setItem(event.target.id, event.target.value);
}

document.addEventListener('DOMContentLoaded', function () {
    if (history.state == null) {
        history.pushState({form: false}, "", "./");
    }
    // проверка на активность формы
    if (history.state.form) {
        show();
    }
    
    let feedbackButtonEl = document.getElementById("feedback-button");    
    feedbackButtonEl.addEventListener('click', show);

    let closeButton = document.getElementById("close-button");
    closeButton.addEventListener("click", hide);

    let inputEls = document.getElementsByClassName("save");

    [...inputEls].forEach(inputEl => {
        // Загрузка значений в инпуты
        inputEl.value = localStorage.getItem(inputEl.id);
    });
    
    [...inputEls].forEach(inputEl => {
        // Добавляем ивент на сохранение значения
        inputEl.addEventListener("input", saveInput);
    });

    let submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", send);
});

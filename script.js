// === DOM Elements ===
const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');

// === Clock ===
function showTime() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    // Показываем время в 12-часовом формате
    const amPm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Преобразуем 0 в 12

    // Выводим на страницу
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${amPm}`;

    // Обновляем каждую секунду
    setTimeout(showTime, 1000);
}

// Вспомогательная функция, чтобы добавлять нолик к числам < 10 (например 05, а не 5)
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// === Greeting ===
function setBgGreet() {
    let hour = new Date().getHours();

    if (hour < 12) {
        // Morning
        greeting.textContent = 'Good Morning,';
    } else if (hour < 18) {
        // Afternoon
        greeting.textContent = 'Good Afternoon,';
    } else {
        // Evening
        greeting.textContent = 'Good Evening,';
    }
}

// === Name & Focus ===
// Получаем имя из localStorage
function getName() {
    if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Сохраняем имя в localStorage
function setName(e) {
    if (e.type === 'keypress') {
        // Сохраняем по нажатию Enter
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur(); // Убираем курсор
        }
    } else {
        // Сохраняем, когда кликнули в другое место
        localStorage.setItem('name', e.target.innerText);
    }
}

// Делаем то же самое для фокуса
function getFocus() {
    if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === '') {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

function setFocus(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

// "Слушаем" события: нажатие клавиши и уход курсора с элемента
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// === Run Everything ===
showTime();
setBgGreet();
getName();
getFocus();

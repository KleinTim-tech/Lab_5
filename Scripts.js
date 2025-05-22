// Функція для збору інформації про браузер і ОС
function getBrowserInfo() {
    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
    };
}

// Збереження у localStorage
const browserInfo = getBrowserInfo();
localStorage.setItem('browserInfo', JSON.stringify(browserInfo));

window.addEventListener('DOMContentLoaded', () => {
    const footer = document.createElement('div');
    footer.id = 'browserInfoBox';

    const info = JSON.parse(localStorage.getItem('browserInfo') || '{}');
    footer.innerHTML = `
    <div><strong>📋 Браузер:</strong></div>
    <div>${info.userAgent || ''}</div>
    <div><strong>📱 Платформа:</strong> ${info.platform || ''}</div>
    <div><strong>🌐 Мова:</strong> ${info.language || ''}</div>
    <div><strong>🍪 Cookies:</strong> ${info.cookieEnabled ? 'Так' : 'Ні'}</div>
  `;
    document.body.appendChild(footer);

    // Кнопка для перемикання теми
    const toggleButton = document.getElementById('toggleTheme');

// Перевіряємо, чи вже збережена тема в localStorage
    if (localStorage.getItem('theme') === 'night') {
        document.body.classList.add('night');
    }

// Слухаємо клік по кнопці
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('night');

        // Зберігаємо тему в localStorage
        if (document.body.classList.contains('night')) {
            localStorage.setItem('theme', 'night');
        } else {
            localStorage.setItem('theme', 'day');
        }
    });

});

window.addEventListener('DOMContentLoaded', () => {
    const commentsContainer = document.createElement('div');
    commentsContainer.id = 'comments';
    commentsContainer.style.marginTop = '20px';

    fetch(`https://jsonplaceholder.typicode.com/posts/8/comments`)
        .then(response => response.json())
        .then(comments => {
            const header = document.createElement('h2');
            header.textContent = 'Коментарі попередніх роботодавців';
            commentsContainer.appendChild(header);

            comments.forEach(comment => {
                const commentEl = document.createElement('div');
                commentEl.classList.add('comment');
                commentEl.innerHTML = `
                    <strong>${comment.name} (${comment.email}):</strong>
                    <p>${comment.body}</p>
                `;
                commentsContainer.appendChild(commentEl);
            });

            // Додаємо коментарі **окремо**, не перезаписуючи інші елементи
            document.getElementById('resume').appendChild(commentsContainer);
        });

});

// Показати модальне вікно через 1 хвилину
setTimeout(() => {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
}, 60000);

document.getElementById('closeModal').onclick = () => {
    document.getElementById('modal').style.display = 'none';
};

const toggle = document.getElementById('themeToggle');
const label = document.getElementById('toggleLabel');

function setTheme(theme) {
    document.body.classList.remove('day', 'night');
    document.body.classList.add(theme);
    label.textContent = theme === 'day' ? 'Денна тема' : 'Нічна тема';
    toggle.checked = theme === 'night';
}


// Автоматичне встановлення теми за часом
function autoTheme() {
    const hour = new Date().getHours();
    if (hour >= 7 && hour < 21) {
        setTheme('day');
    } else {
        setTheme('night');
    }
}

toggle.addEventListener('change', () => {
    setTheme(toggle.checked ? 'night' : 'day');
});

// Ініціалізація
autoTheme();

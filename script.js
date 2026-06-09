// Функция для подсчёта видимых фотографий
function countPhotos() {
    const visiblePhotos = document.querySelectorAll('.image-card:not(.hidden)');
    const counter = document.getElementById('image-counter');

    if (counter) {
        counter.textContent = visiblePhotos.length;
    }
}

// Функция для пересчёта лайков
function recalculateLikes() {
    const likedButtons = document.querySelectorAll('.like-btn.liked');
    const totalLikesElement = document.getElementById('total-likes');

    if (totalLikesElement) {
        totalLikesElement.textContent = likedButtons.length;
    }
}

// Настройка лайков
function setupLikes() {
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', () => {
            const likesSpan = button.querySelector('.like-count');
            if (!likesSpan) return;

            let currentLikes = parseInt(likesSpan.textContent) || 0;

            if (button.classList.contains('liked')) {
                currentLikes--;
                button.classList.remove('liked');
            } else {
                currentLikes++;
                button.classList.add('liked');
            }

            likesSpan.textContent = currentLikes;
            recalculateLikes();

            // Анимация кнопки
            button.style.transform = 'scale(1.2)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 300);
        });
    });
}

// Настройка переключения вида (сетка/список)
function setupViewControls() {
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');
    const galleryGrid = document.querySelector('.gallery-grid');

    if (!gridBtn || !listBtn || !galleryGrid) {
        console.warn('Элементы управления видом не найдены.');
        return;
    }

    // Инициализация: по умолчанию — сетка
    galleryGrid.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');

    // Обработчик для кнопки «Сетка»
    gridBtn.addEventListener('click', () => {
        galleryGrid.classList.remove('list-view');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    });

    // Обработчик для кнопки «Список»
    listBtn.addEventListener('click', () => {
        galleryGrid.classList.add('list-view');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    });
}


// Настройка фильтров
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.image-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Обновляем активные кнопки
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.dataset.filter;

            cards.forEach(card => {
                const cardCategory = card.dataset.category;
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });

            // Обновляем статистику после фильтрации
            countPhotos();
            recalculateLikes();
        });
    });
}

// Космические факты с плавным переливом цвета
const spaceFacts = [
    { text: "Свет от Солнца до Земли идет 8 минут 20 секунд.", c1: "#070216", c2: "#ff8800" },
    { text: "В космосе царит абсолютная тишина, так как там нет воздуха.", c1: "#0b0326", c2: "#2c1654" },
    { text: "Один день на Венере длится дольше, чем один венерианский год.", c1: "#1f0318", c2: "#ad550d" },
    { text: "Юпитер — самая большая планета в Солнечной системе.", c1: "#021a1e", c2: "#dd9e55" },
    { text: "Нейтронные звезды настолько плотные, что чайная ложка весит миллиарды тонн.", c1: "#140152", c2: "#67c7ff" },
    { text: "Следы астронавтов на Луне останутся там на миллионы лет.", c1: "#1c1c1c", c2: "#4f4f4f" },
    { text: "В нашей галактике звезд меньше, чем деревьев на планете Земля.", c1: "#040d21", c2: "#f3f1eb" }
];

let currentFactIndex = 0;

function changeSpaceFact() {
    const factElement = document.getElementById('fact-text');
    const infoBlock = document.querySelector('.gallery-info');

    if (factElement && infoBlock) {
        factElement.style.opacity = 0;

        setTimeout(() => {
            currentFactIndex = (currentFactIndex + 1) % spaceFacts.length;
            factElement.textContent = spaceFacts[currentFactIndex].text;
            infoBlock.style.setProperty('--color-start', spaceFacts[currentFactIndex].c1);
            infoBlock.style.setProperty('--color-end', spaceFacts[currentFactIndex].c2);
            factElement.style.opacity = 1;
        }, 400);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setupLikes();
    setupViewControls();
    setupFilters();
    countPhotos();
    recalculateLikes();

    // Устанавливаем первый факт
    const factElement = document.getElementById('fact-text');
    const infoBlock = document.querySelector('.gallery-info');
    if (factElement && infoBlock && spaceFacts.length > 0) {
        factElement.textContent = spaceFacts[0].text;
        infoBlock.style.setProperty('--color-start', spaceFacts[0].c1);
        infoBlock.style.setProperty('--color-end', spaceFacts[0].c2);
    }

    // Автосмена фактов каждые 6 секунд
    setInterval(changeSpaceFact, 6000);
});

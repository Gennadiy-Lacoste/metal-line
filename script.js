// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Защита от якорей без ID
        const target = document.querySelector(targetId);
        if (target) {
            // Учитываем высоту фиксированной шапки
            const headerOffset = document.querySelector('.header').offsetHeight;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            // Закрыть мобильное меню при нажатии на ссылку
            const nav = document.querySelector('.nav');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            }
        }
    });
});

// Обработка формы с отправкой на email
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nameInput = this.querySelector('input[type="text"]');
        const phoneInput = this.querySelector('input[type="tel"]');
        const messageInput = this.querySelector('textarea');

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !phone || !message) {
            alert("Пожалуйста, заполните все поля формы.");
            return;
        }

        // Подготавливаем данные для отправки на email
        const subject = `Запрос с сайта Metal Line от ${name}`;
        const body = `Имя: ${name}%0D%0AТелефон: ${phone}%0D%0A%0D%0AСообщение:%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A---%0D%0AСообщение отправлено с сайта Metal Line`;

        // Открываем почтовый клиент с предзаполненным письмом
        window.location.href = `mailto:Kozin-evgeny@bk.ru?subject=${encodeURIComponent(subject)}&body=${body}`;
        // Показываем сообщение и очищаем форму
        setTimeout(() => {
            alert(`Спасибо, ${name}! Открывается почтовый клиент. Пожалуйста, отправьте письмо для связи с нами.`);
            this.reset();
        }, 500);
    });
}

// Функции для модального окна с фото
function openModal(imageSrc, title) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    caption.textContent = title; // Используем textContent вместо innerHTML
    // Блокируем прокрутку страницы
    document.body.style.overflow = 'hidden';
    // Добавляем обработчик для закрытия по ESC
    document.addEventListener('keydown', handleKeyPress);
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    const modalContent = document.querySelector('.modal-content');
    // Добавляем класс для анимации закрытия
    modal.classList.add('closing');
    modalContent.classList.add('closing');
    // Удаляем классы после анимации
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('closing');
        modalContent.classList.remove('closing');
        // Разблокируем прокрутку
        document.body.style.overflow = 'auto';
        // Удаляем обработчик ESC
        document.removeEventListener('keydown', handleKeyPress);
    }, 300);
}

// Закрытие модального окна по клику вне изображения
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Обработка нажатия клавиши ESC
function handleKeyPress(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

// Обновление года в футере
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }

    // Добавляем обработчики для клавиатурной навигации по фото
    const portfolioImages = document.querySelectorAll('.portfolio-img');
    portfolioImages.forEach((img, index) => {
        img.setAttribute('tabindex', '0');
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const onclickAttr = this.getAttribute('onclick');
                if (onclickAttr) {
                    // Извлекаем параметры из onclick
                    const match = onclickAttr.match(/openModal\('([^']+)',\s*'([^']+)'\)/);
                    if (match) {
                        openModal(match[1], match[2]);
                    }
                }
            }
        });
    });

    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            // Меняем иконку
            const icon = mobileMenuBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Закрываем меню при клике на ссылку (уже есть в плавной прокрутке)

        // Закрываем меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            }
        });
    }
});
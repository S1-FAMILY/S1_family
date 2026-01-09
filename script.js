// ===== S1 FAMILY DANCE CENTER - MAIN SCRIPT =====
// Версия с обновленным функционалом

// Главная функция инициализации
function initializeApp() {
    console.log('🚀 Инициализация S1 Family Dance Center...');
    
    try {
        // Получаем все необходимые элементы
        const elements = getAllElements();
        
        // Инициализируем все компоненты
        setupHeader(elements.header);
        setupMobileMenu(elements.mobileMenuBtn, elements.mobileMenu, elements.mobileMenuClose);
        setupCounters(elements.statNumbers);
        setupSmoothScroll();
        setupScrollAnimations();
        setupActiveNav(elements.navLinks, elements.mobileNavLinks);
        setupLazyLoading();
        setupYearUpdate(elements.yearElements);
        setupScrollToTop(elements.scrollToTop);
        setupReviewsSlider(); // Новый слайдер отзывов
        
        // Добавляем обработчики событий
        addEventListeners(elements);
        
        console.log('✅ S1 Family успешно инициализирован!');
    } catch (error) {
        console.error('❌ Ошибка при инициализации:', error);
    }
}

// Функция для получения всех элементов
function getAllElements() {
    return {
        // Header
        header: document.querySelector('.header'),
        mobileMenuBtn: document.getElementById('mobileMenuBtn'),
        mobileMenu: document.getElementById('mobileMenu'),
        mobileMenuClose: document.getElementById('mobileMenuClose'),
        navLinks: document.querySelectorAll('.nav-link'),
        mobileNavLinks: document.querySelectorAll('.mobile-nav-link'),
        
        // Hero
        statNumbers: document.querySelectorAll('.stat-number'),
        
        // Reviews Slider
        reviewsTrack: document.getElementById('reviewsTrack'),
        reviewsPrev: document.getElementById('reviewsPrev'),
        reviewsNext: document.getElementById('reviewsNext'),
        
        // Footer
        yearElements: document.querySelectorAll('.current-year'),
        
        // Scroll to top
        scrollToTop: document.getElementById('scrollToTop')
    };
}

// ===== КОМПОНЕНТЫ =====

// Шапка с эффектом при скролле
function setupHeader(headerElement) {
    if (!headerElement) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            headerElement.classList.add('scrolled');
        } else {
            headerElement.classList.remove('scrolled');
        }
    });
}

// Мобильное меню
function setupMobileMenu(menuBtn, mobileMenu, closeBtn) {
    if (!menuBtn || !mobileMenu) return;
    
    // Функция переключения меню
    const toggleMenu = () => {
        const isActive = mobileMenu.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', isActive);
        mobileMenu.setAttribute('aria-hidden', !isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    };
    
    // Открытие меню
    menuBtn.addEventListener('click', toggleMenu);
    
    // Закрытие меню
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
    }
    
    // Закрытие при клике на ссылку
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });
    });
}

// Анимация счетчиков
function setupCounters(statNumbers) {
    if (!statNumbers || statNumbers.length === 0) return;
    
    // Создаем observer для запуска анимации при появлении
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count')) || 0;
                
                if (target > 0) {
                    animateCounter(counter, target);
                }
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(counter => observer.observe(counter));
}

// Функция анимации одного счетчика
function animateCounter(element, target) {
    let current = 0;
    const duration = 2000; // 2 секунды
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Плавная прокрутка
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            event.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Анимации при скролле
function setupScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Наблюдаем за элементами которые нужно анимировать
    const animatedElements = document.querySelectorAll(
        '.direction-card, .group-card, .team-card, .gallery-item, .achievement-category, .contact-card, .review-item'
    );
    
    animatedElements.forEach(element => observer.observe(element));
}

// Подсветка активного раздела в навигации
function setupActiveNav(navLinks, mobileNavLinks) {
    if ((!navLinks || navLinks.length === 0) && (!mobileNavLinks || mobileNavLinks.length === 0)) return;
    
    // Функция обновления активных ссылок
    const updateActiveLinks = () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        let currentSectionId = '';
        
        // Находим текущую секцию
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });
        
        // Обновляем десктопные ссылки
        if (navLinks && navLinks.length > 0) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href').replace('#', '');
                link.classList.toggle('active', href === currentSectionId);
            });
        }
        
        // Обновляем мобильные ссылки
        if (mobileNavLinks && mobileNavLinks.length > 0) {
            mobileNavLinks.forEach(link => {
                const href = link.getAttribute('href').replace('#', '');
                link.classList.toggle('active', href === currentSectionId);
            });
        }
    };
    
    // Обновляем при скролле
    window.addEventListener('scroll', updateActiveLinks);
    
    // Инициализация при загрузке
    updateActiveLinks();
}

// Ленивая загрузка изображений
function setupLazyLoading() {
    if (!('IntersectionObserver' in window)) return;
    
    const lazyImages = document.querySelectorAll('img[loading="lazy"], img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Загружаем изображение
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    delete img.dataset.src;
                }
                
                // Удаляем из наблюдения
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Обновление года в футере
function setupYearUpdate(yearElements) {
    if (!yearElements || yearElements.length === 0) return;
    
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Кнопка "Наверх"
function setupScrollToTop(scrollToTopBtn) {
    if (!scrollToTopBtn) return;
    
    // Показываем/скрываем кнопку
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Обработчик клика
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Слайдер отзывов
function setupReviewsSlider() {
    const track = document.getElementById('reviewsTrack');
    const prevBtn = document.getElementById('reviewsPrev');
    const nextBtn = document.getElementById('reviewsNext');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const items = document.querySelectorAll('.review-item');
    const itemWidth = items[0]?.offsetWidth + parseInt(getComputedStyle(track).gap) || 320;
    let currentPosition = 0;
    const maxPosition = -(items.length - 3) * itemWidth;
    
    // Обновление позиции слайдера
    const updateSliderPosition = () => {
        track.style.transform = `translateX(${currentPosition}px)`;
        
        // Блокируем кнопки на границах
        prevBtn.disabled = currentPosition >= 0;
        nextBtn.disabled = currentPosition <= maxPosition;
    };
    
    // Следующий слайд
    nextBtn.addEventListener('click', () => {
        if (currentPosition > maxPosition) {
            currentPosition -= itemWidth * 3; // Прокрутка по 3 элемента
            if (currentPosition < maxPosition) currentPosition = maxPosition;
            updateSliderPosition();
        }
    });
    
    // Предыдущий слайд
    prevBtn.addEventListener('click', () => {
        if (currentPosition < 0) {
            currentPosition += itemWidth * 3; // Прокрутка по 3 элемента
            if (currentPosition > 0) currentPosition = 0;
            updateSliderPosition();
        }
    });
    
    // Автопрокрутка
    let autoSlideInterval;
    
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            if (currentPosition <= maxPosition) {
                currentPosition = 0; // Возврат к началу
            } else {
                currentPosition -= itemWidth * 3;
                if (currentPosition < maxPosition) currentPosition = maxPosition;
            }
            updateSliderPosition();
        }, 5000); // 5 секунд
    };
    
    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };
    
    // Запуск автопрокрутки
    startAutoSlide();
    
    // Остановка при наведении
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);
    
    // Остановка при фокусе на элементах управления
    prevBtn.addEventListener('focus', stopAutoSlide);
    nextBtn.addEventListener('focus', stopAutoSlide);
    prevBtn.addEventListener('blur', startAutoSlide);
    nextBtn.addEventListener('blur', startAutoSlide);
    
    // Инициализация
    updateSliderPosition();
}

// Дополнительные обработчики событий
function addEventListeners(elements) {
    // Закрытие мобильного меню при клике вне его
    if (elements.mobileMenu) {
        elements.mobileMenu.addEventListener('click', (event) => {
            if (event.target === elements.mobileMenu) {
                elements.mobileMenu.classList.remove('active');
                if (elements.mobileMenuBtn) {
                    elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
                elements.mobileMenu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Закрытие мобильного меню при нажатии Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && elements.mobileMenu && elements.mobileMenu.classList.contains('active')) {
            elements.mobileMenu.classList.remove('active');
            if (elements.mobileMenuBtn) {
                elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
            elements.mobileMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    });
}

// Вспомогательные функции
function getAgeGroupName(ageKey) {
    const ageGroups = {
        'breakdance-kids': 'Break Dance Kids (5-7 лет)',
        'breakdance-7-15': 'Break Dance (7-15 лет)',
        'breakdance-pro': 'Break Dance Pro (15+ лет)',
        'hiphop-kids': 'Hip-Hop Kids (5-7 лет)',
        'hiphop-junior': 'Hip-Hop Junior (7-11 лет)',
        'hiphop-12-15': 'Hip-Hop (12-15 лет)',
        'hiphop-pro': 'Hip-Hop Pro (16+ лет)',
        'afro-7+': 'Afro (7+ лет)',
        'freestyle-7+': 'Freestyle (7+ лет)',
        'popping-7+': 'Popping (7+ лет)',
        'vogue-12+': 'Vogue (12+ лет)',
        'dancehall-10+': 'Dancehall (10+ лет)',
        'individual': 'Индивидуальные занятия (любой возраст)'
    };
    
    return ageGroups[ageKey] || ageKey;
}

// ===== ЗАПУСК ПРИЛОЖЕНИЯ =====
// Проверяем что DOM загружен
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM уже загружен
    initializeApp();
}

// Экспорт функций если нужно (для тестов)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        getAgeGroupName,
        getAllElements
    };
}
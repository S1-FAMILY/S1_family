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
        // Добавьте этот код в функцию initializeApp после setupCounters
function setupMobileHeroStats() {
    if (window.innerWidth <= 768) {
        const mobileStatNumbers = document.querySelectorAll('.stat-number-mobile');
        if (mobileStatNumbers && mobileStatNumbers.length > 0) {
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
            
            mobileStatNumbers.forEach(counter => observer.observe(counter));
        }
    }
}

// В функции initializeApp добавьте:
function initializeApp() {
    console.log('🚀 Инициализация S1 Family Dance Center...');
    
    try {
        // Получаем все необходимые элементы
        const elements = getAllElements();
        
        // Инициализируем все компоненты
        setupHeader(elements.header);
        setupMobileMenu(elements.mobileMenuBtn, elements.mobileMenu, elements.mobileMenuClose);
        setupCounters(elements.statNumbers);
        setupMobileHeroStats(); // Новая функция
        setupSmoothScroll();
        setupScrollAnimations();
        setupActiveNav(elements.navLinks, elements.mobileNavLinks);
        setupLazyLoading();
        setupYearUpdate(elements.yearElements);
        setupScrollToTop(elements.scrollToTop);
        
        // Слайдер отзывов инициализируем после полной загрузки DOM
        setTimeout(() => {
            setupReviewsSlider();
        }, 100);
        
        // Добавляем обработчики событий
        addEventListeners(elements);
        
        // Обработчик изменения размера окна
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                setupMobileHeroStats();
            }
        });
        
        console.log('✅ S1 Family успешно инициализирован!');
    } catch (error) {
        console.error('❌ Ошибка при инициализации:', error);
    }
}
        setupSmoothScroll();
        setupScrollAnimations();
        setupActiveNav(elements.navLinks, elements.mobileNavLinks);
        setupLazyLoading();
        setupYearUpdate(elements.yearElements);
        setupScrollToTop(elements.scrollToTop);
        
        // Слайдер отзывов инициализируем после полной загрузки DOM
        setTimeout(() => {
            setupReviewsSlider();
        }, 100);
        
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

// ===== СЛАЙДЕР ОТЗЫВОВ (Стрелки вместо автопереключения) =====
function setupReviewsSlider() {
    console.log('🔄 Инициализация слайдера с ручным управлением...');
    
    const prevBtn = document.querySelector('.review-prev');
    const nextBtn = document.querySelector('.review-next');
    const groups = document.querySelectorAll('.review-group');
    const currentGroupSpan = document.querySelector('.current-group');
    const totalGroupsSpan = document.querySelector('.total-groups');
    
    if (!prevBtn || !nextBtn || groups.length === 0) {
        console.log('ℹ️ Элементы слайдера не найдены');
        return;
    }
    
    console.log(`✅ Найдено ${groups.length} групп отзывов`);
    
    let currentGroup = 0;
    let isAnimating = false;
    const animationDuration = 500; // 0.5 секунды
    
    // Устанавливаем общее количество групп
    if (totalGroupsSpan) {
        totalGroupsSpan.textContent = groups.length;
    }
    
    // Обновление состояния кнопок и индикатора
    const updateControls = () => {
        // Обновляем индикатор
        if (currentGroupSpan) {
            currentGroupSpan.textContent = currentGroup + 1;
        }
        
        // Обновляем состояние кнопок
        prevBtn.disabled = currentGroup === 0;
        nextBtn.disabled = currentGroup === groups.length - 1;
        
        // Добавляем/убираем классы для стилизации
        prevBtn.classList.toggle('disabled', currentGroup === 0);
        nextBtn.classList.toggle('disabled', currentGroup === groups.length - 1);
        
        // Обновляем ARIA-атрибуты
        groups.forEach((group, index) => {
            group.setAttribute('aria-hidden', index !== currentGroup ? 'true' : 'false');
            group.setAttribute('aria-live', index === currentGroup ? 'polite' : 'off');
        });
        
        console.log(`📊 Текущая группа: ${currentGroup + 1} из ${groups.length}`);
    };
    
    // Функция перехода к следующей группе
    const nextGroup = () => {
        if (isAnimating || currentGroup >= groups.length - 1) return;
        
        isAnimating = true;
        const currentActive = groups[currentGroup];
        const nextIndex = currentGroup + 1;
        const nextGroupEl = groups[nextIndex];
        
        // Устанавливаем классы для анимации
        currentActive.classList.remove('active');
        currentActive.classList.add('prev');
        
        nextGroupEl.classList.remove('next');
        nextGroupEl.classList.add('active');
        
        // Обновляем текущую группу
        currentGroup = nextIndex;
        
        // Сбрасываем анимацию через время
        setTimeout(() => {
            currentActive.classList.remove('prev');
            nextGroupEl.classList.remove('next');
            isAnimating = false;
            updateControls();
        }, animationDuration);
    };
    
    // Функция перехода к предыдущей группе
    const prevGroup = () => {
        if (isAnimating || currentGroup <= 0) return;
        
        isAnimating = true;
        const currentActive = groups[currentGroup];
        const prevIndex = currentGroup - 1;
        const prevGroupEl = groups[prevIndex];
        
        // Устанавливаем классы для анимации
        currentActive.classList.remove('active');
        currentActive.classList.add('next');
        
        prevGroupEl.classList.remove('prev');
        prevGroupEl.classList.add('active');
        
        // Обновляем текущую группу
        currentGroup = prevIndex;
        
        // Сбрасываем анимацию через время
        setTimeout(() => {
            currentActive.classList.remove('next');
            prevGroupEl.classList.remove('prev');
            isAnimating = false;
            updateControls();
        }, animationDuration);
    };
    
    // Функция перехода к конкретной группе
    const goToGroup = (index) => {
        if (isAnimating || index < 0 || index >= groups.length || index === currentGroup) return;
        
        isAnimating = true;
        const currentActive = groups[currentGroup];
        const targetGroup = groups[index];
        
        // Определяем направление анимации
        const direction = index > currentGroup ? 'next' : 'prev';
        
        // Устанавливаем классы для анимации
        currentActive.classList.remove('active');
        currentActive.classList.add(direction === 'next' ? 'prev' : 'next');
        
        targetGroup.classList.remove(direction === 'next' ? 'next' : 'prev');
        targetGroup.classList.add('active');
        
        // Обновляем текущую группу
        currentGroup = index;
        
        // Сбрасываем анимацию через время
        setTimeout(() => {
            currentActive.classList.remove('prev', 'next');
            targetGroup.classList.remove('prev', 'next');
            isAnimating = false;
            updateControls();
        }, animationDuration);
    };
    
    // Назначаем обработчики на кнопки
    prevBtn.addEventListener('click', prevGroup);
    nextBtn.addEventListener('click', nextGroup);
    
    // Добавляем навигацию с клавиатуры
    const handleKeyDown = (e) => {
        // Стрелки влево/вправо
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevGroup();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextGroup();
        }
        
        // Цифры для быстрого перехода к группе
        if (e.key >= '1' && e.key <= '5') {
            const groupIndex = parseInt(e.key) - 1;
            if (groupIndex < groups.length) {
                e.preventDefault();
                goToGroup(groupIndex);
            }
        }
    };
    
    // Добавляем свайп для мобильных устройств
    const setupTouchSwiping = () => {
        const container = document.querySelector('.reviews-container');
        if (!container) return;
        
        let startX = 0;
        let endX = 0;
        const minSwipeDistance = 50;
        
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        container.addEventListener('touchmove', (e) => {
            // Предотвращаем скролл страницы при горизонтальном свайпе
            if (Math.abs(e.touches[0].clientX - startX) > Math.abs(e.touches[0].clientY - startX)) {
                e.preventDefault();
            }
        }, { passive: false });
        
        container.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > minSwipeDistance) {
                if (diff > 0) {
                    // Свайп влево - следующая группа
                    nextGroup();
                } else {
                    // Свайп вправо - предыдущая группа
                    prevGroup();
                }
            }
        }, { passive: true });
    };
    
    // Инициализация
    const initSlider = () => {
        // Устанавливаем начальные классы
        groups.forEach((group, index) => {
            group.style.transition = `opacity ${animationDuration}ms ease, transform ${animationDuration}ms ease`;
            if (index === 0) {
                group.classList.add('active');
            } else {
                group.classList.remove('active');
            }
        });
        
        // Добавляем обработчики событий
        document.addEventListener('keydown', handleKeyDown);
        
        // Настраиваем свайп для мобильных
        setupTouchSwiping();
        
        // Инициализируем контролы
        updateControls();
        
        console.log(`✅ Слайдер с ручным управлением инициализирован: ${groups.length} групп`);
        
        // Возвращаем публичные методы для отладки
        return {
            nextGroup,
            prevGroup,
            goToGroup,
            currentGroup: () => currentGroup + 1,
            totalGroups: groups.length
        };
    };
    
    // Запускаем инициализацию
    const slider = initSlider();
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
        // Корректируем размер стрелок на маленьких экранах
        if (window.innerWidth < 576) {
            prevBtn.style.width = '36px';
            prevBtn.style.height = '36px';
            nextBtn.style.width = '36px';
            nextBtn.style.height = '36px';
        } else {
            prevBtn.style.width = '';
            prevBtn.style.height = '';
            nextBtn.style.width = '';
            nextBtn.style.height = '';
        }
    });
    
    return slider;
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

// ===== ЗАПУСК ПРИЛОЖЕНИЯ =====
// Проверяем что DOM загружен
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM уже загружен
    initializeApp();
}
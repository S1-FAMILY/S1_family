// ===== S1 FAMILY DANCE CENTER - MAIN SCRIPT =====

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
        setupMobileHeroStats();
        setupSmoothScroll();
        setupScrollAnimations();
        setupActiveNav(elements.navLinks, elements.mobileNavLinks);
        setupLazyLoading();
        setupYearUpdate(elements.yearElements);
        setupScrollToTop(elements.scrollToTop);
        
        // Слайдер отзывов
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
        header: document.querySelector('.header'),
        mobileMenuBtn: document.getElementById('mobileMenuBtn'),
        mobileMenu: document.getElementById('mobileMenu'),
        mobileMenuClose: document.getElementById('mobileMenuClose'),
        navLinks: document.querySelectorAll('.nav-link'),
        mobileNavLinks: document.querySelectorAll('.mobile-nav-link'),
        statNumbers: document.querySelectorAll('.stat-number'),
        yearElements: document.querySelectorAll('.current-year'),
        scrollToTop: document.getElementById('scrollToTop')
    };
}

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
    
    const toggleMenu = () => {
        const isActive = mobileMenu.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', isActive);
        mobileMenu.setAttribute('aria-hidden', !isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    };
    
    menuBtn.addEventListener('click', toggleMenu);
    
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
    }
    
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

function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Мобильная статистика
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
    
    const animatedElements = document.querySelectorAll(
        '.direction-card, .group-card, .team-card, .gallery-item, .achievement-category, .contact-card'
    );
    
    animatedElements.forEach(element => observer.observe(element));
}

// Подсветка активного раздела
function setupActiveNav(navLinks, mobileNavLinks) {
    if ((!navLinks || navLinks.length === 0) && (!mobileNavLinks || mobileNavLinks.length === 0)) return;
    
    const updateActiveLinks = () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });
        
        if (navLinks && navLinks.length > 0) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href').replace('#', '');
                link.classList.toggle('active', href === currentSectionId);
            });
        }
        
        if (mobileNavLinks && mobileNavLinks.length > 0) {
            mobileNavLinks.forEach(link => {
                const href = link.getAttribute('href').replace('#', '');
                link.classList.toggle('active', href === currentSectionId);
            });
        }
    };
    
    window.addEventListener('scroll', updateActiveLinks);
    updateActiveLinks();
}

// Ленивая загрузка изображений
function setupLazyLoading() {
    if (!('IntersectionObserver' in window)) return;
    
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                imageObserver.unobserve(entry.target);
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
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Слайдер отзывов
function setupReviewsSlider() {
    console.log('🔄 Инициализация слайдера...');
    
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
    const animationDuration = 500;
    
    if (totalGroupsSpan) {
        totalGroupsSpan.textContent = groups.length;
    }
    
    const updateControls = () => {
        if (currentGroupSpan) {
            currentGroupSpan.textContent = currentGroup + 1;
        }
        
        prevBtn.disabled = currentGroup === 0;
        nextBtn.disabled = currentGroup === groups.length - 1;
        
        prevBtn.classList.toggle('disabled', currentGroup === 0);
        nextBtn.classList.toggle('disabled', currentGroup === groups.length - 1);
        
        groups.forEach((group, index) => {
            group.setAttribute('aria-hidden', index !== currentGroup ? 'true' : 'false');
        });
    };
    
    const nextGroup = () => {
        if (isAnimating || currentGroup >= groups.length - 1) return;
        
        isAnimating = true;
        const currentActive = groups[currentGroup];
        const nextIndex = currentGroup + 1;
        const nextGroupEl = groups[nextIndex];
        
        currentActive.classList.remove('active');
        currentActive.classList.add('prev');
        
        nextGroupEl.classList.remove('next');
        nextGroupEl.classList.add('active');
        
        currentGroup = nextIndex;
        
        setTimeout(() => {
            currentActive.classList.remove('prev');
            nextGroupEl.classList.remove('next');
            isAnimating = false;
            updateControls();
        }, animationDuration);
    };
    
    const prevGroup = () => {
        if (isAnimating || currentGroup <= 0) return;
        
        isAnimating = true;
        const currentActive = groups[currentGroup];
        const prevIndex = currentGroup - 1;
        const prevGroupEl = groups[prevIndex];
        
        currentActive.classList.remove('active');
        currentActive.classList.add('next');
        
        prevGroupEl.classList.remove('prev');
        prevGroupEl.classList.add('active');
        
        currentGroup = prevIndex;
        
        setTimeout(() => {
            currentActive.classList.remove('next');
            prevGroupEl.classList.remove('prev');
            isAnimating = false;
            updateControls();
        }, animationDuration);
    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevGroup();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextGroup();
        }
    };
    
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
            if (Math.abs(e.touches[0].clientX - startX) > Math.abs(e.touches[0].clientY - startX)) {
                e.preventDefault();
            }
        }, { passive: false });
        
        container.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > minSwipeDistance) {
                if (diff > 0) {
                    nextGroup();
                } else {
                    prevGroup();
                }
            }
        }, { passive: true });
    };
    
    const initSlider = () => {
        groups.forEach((group, index) => {
            group.style.transition = `opacity ${animationDuration}ms ease, transform ${animationDuration}ms ease`;
            if (index === 0) {
                group.classList.add('active');
            } else {
                group.classList.remove('active');
            }
        });
        
        document.addEventListener('keydown', handleKeyDown);
        setupTouchSwiping();
        updateControls();
        
        console.log(`✅ Слайдер инициализирован`);
    };
    
    initSlider();
    
    prevBtn.addEventListener('click', prevGroup);
    nextBtn.addEventListener('click', nextGroup);
}

// Дополнительные обработчики
function addEventListeners(elements) {
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
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            setupMobileHeroStats();
        }
    });
}

// Запуск приложения
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
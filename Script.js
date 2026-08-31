// Dr. Naif Taleb Ali - Personal Website
// Enhanced Interactive Script
// ============================================

(() => {
    'use strict';

    const init = () => {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-menu a');
        const sections = document.querySelectorAll('section[id]');

        // ===== HAMBURGER MENU =====
        const closeMenu = () => {
            navMenu?.classList.remove('active');
            hamburger?.classList.remove('open');
            hamburger?.setAttribute('aria-expanded', 'false');
        };

        if (hamburger && navMenu) {
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-controls', navMenu.id || 'navMenu');

            hamburger.addEventListener('click', (event) => {
                event.stopPropagation();
                const isOpen = navMenu.classList.toggle('active');
                hamburger.classList.toggle('open', isOpen);
                hamburger.setAttribute('aria-expanded', String(isOpen));
            });

            navLinks.forEach((link) => link.addEventListener('click', closeMenu));

            document.addEventListener('click', (event) => {
                if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
                    closeMenu();
                }
            });

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') closeMenu();
            });
        }

        // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (event) => {
                const targetId = anchor.getAttribute('href');
                if (!targetId || targetId === '#') return;

                const target = document.querySelector(targetId);
                if (!target) return;

                event.preventDefault();
                const navHeight = navbar?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 10;

                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                        ? 'auto'
                        : 'smooth'
                });
            });
        });

        // ===== ACTIVE NAV LINK ON SCROLL =====
        if (sections.length && navLinks.length) {
            const updateActiveNavLink = () => {
                const navHeight = navbar?.offsetHeight || 0;
                let current = '';

                sections.forEach((section) => {
                    if (window.scrollY >= section.offsetTop - navHeight - 100) {
                        current = section.id;
                    }
                });

                navLinks.forEach((link) => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
                });
            };

            updateActiveNavLink();
            window.addEventListener('scroll', updateActiveNavLink, { passive: true });
        }

        // ===== SCROLL-TO-TOP BUTTON =====
        const scrollBtn = document.createElement('button');
        scrollBtn.type = 'button';
        scrollBtn.textContent = '↑';
        scrollBtn.className = 'scroll-top-btn';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        scrollBtn.hidden = true;
        document.body.appendChild(scrollBtn);

        const updateScrollButton = () => {
            const isVisible = window.scrollY > 500;
            scrollBtn.hidden = !isVisible;
            scrollBtn.classList.toggle('visible', isVisible);
        };

        window.addEventListener('scroll', updateScrollButton, { passive: true });
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'auto'
                    : 'smooth'
            });
        });
        updateScrollButton();

        // ===== LAZY LOADING FOR IMAGES =====
        const lazyImages = document.querySelectorAll('img[data-src]');
        const loadImage = (image) => {
            const source = image.dataset.src;
            if (!source) return;
            image.src = source;
            image.removeAttribute('data-src');
        };

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        loadImage(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });
            lazyImages.forEach((image) => imageObserver.observe(image));
        } else {
            lazyImages.forEach(loadImage);
        }

        // ===== YEAR AUTO-UPDATE IN FOOTER =====
        document.querySelectorAll('.current-year').forEach((element) => {
            element.textContent = new Date().getFullYear();
        });

        // ===== CONSOLE WELCOME =====
        console.log('Website loaded successfully.');
        console.log('Research | Hematology | AI in Medicine | Global Health');
        console.log('https://naiftalebali.github.io/');
        console.log('n.taleb@ust.edu | orcid.org/0000-0002-2266-1569');
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();

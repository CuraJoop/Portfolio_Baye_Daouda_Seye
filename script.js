document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Navigation highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('text-primary', 'font-semibold');
            link.classList.add('text-gray-600');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-gray-600');
                link.classList.add('text-primary', 'font-semibold');
            }
        });
    });

    // Animations on scroll for sections and child elements
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Trigger animations for child elements with staggered delays
                const animElements = entry.target.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .bounce-in');
                animElements.forEach((el, index) => {
                    el.style.animationDelay = `${index * 0.1}s`;
                    el.classList.add('visible');
                });
            }
        });
    }, observerOptions);
    document.querySelectorAll('section[id]').forEach(section => observer.observe(section));

    // Progress bars animation for individual skill items
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar && !progressBar.classList.contains('active')) {
                    progressBar.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.skill-item').forEach(item => progressObserver.observe(item));

    // Contact form handling
    document.getElementById('contact-submit').addEventListener('click', function(e) {
        e.preventDefault();
        const submitText = this.querySelector('.submit-text');
        const loadingText = this.querySelector('.loading-text');
        submitText.classList.add('hidden');
        loadingText.classList.remove('hidden');
        this.disabled = true;
        setTimeout(() => {
            alert('Message envoyé avec succès ! Je vous répondrai bientôt.');
            document.querySelector('#contact .space-y-6').reset();
            submitText.classList.remove('hidden');
            loadingText.classList.add('hidden');
            this.disabled = false;
        }, 2000);
    });
});
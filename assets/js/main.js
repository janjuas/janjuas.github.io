document.addEventListener('DOMContentLoaded', function () {

    // --- Smooth scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- Dark mode toggle ---
    const darkBtn = document.querySelector('.dark-mode-btn');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    if (darkBtn) {
        const icon = darkBtn.querySelector('i');
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        darkBtn.addEventListener('click', function () {
            const current = document.body.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            icon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    // --- Scroll animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // --- Experience accordion ---
    document.querySelectorAll('.timeline-toggle').forEach(btn => {
        btn.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            const body = this.closest('.timeline-content').querySelector('.timeline-body');
            this.setAttribute('aria-expanded', String(!expanded));
            if (expanded) {
                body.setAttribute('hidden', '');
            } else {
                body.removeAttribute('hidden');
            }
        });
    });

    // --- Power BI modal ---
    const modal = document.getElementById('pbi-modal');
    const pbiFrame = document.getElementById('pbi-frame');
    const modalClose = document.querySelector('.modal-close');

    function openModal(embedUrl) {
        pbiFrame.src = embedUrl;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        pbiFrame.src = '';
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.pbi-trigger').forEach(btn => {
        btn.addEventListener('click', function () {
            openModal(this.dataset.embed);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);

    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeModal();
    });

});

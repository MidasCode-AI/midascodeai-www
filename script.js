// MidasCode.AI website behavior

document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializeReveals();
    initializeCopyrightYear();
});

// Mobile navigation toggle
function initializeNavigation() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    function setOpen(open) {
        toggle.setAttribute('aria-expanded', String(open));
        menu.classList.toggle('active', open);
    }

    toggle.addEventListener('click', function () {
        setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', function (e) {
        if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setOpen(false);
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.navbar')) setOpen(false);
    });
}

// Scroll-in reveals (CSS disables the effect under prefers-reduced-motion)
function initializeReveals() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        items.forEach(function (el) { el.classList.add('visible'); });
        return;
    }
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    items.forEach(function (el) { observer.observe(el); });
}

// Copyright year — never goes stale
function initializeCopyrightYear() {
    const year = document.getElementById('copyright-year');
    if (year) year.textContent = new Date().getFullYear();
}

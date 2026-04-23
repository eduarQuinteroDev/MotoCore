const filterButtons = document.querySelectorAll('.filter-btn');
const interestCards = document.querySelectorAll('.interest-card');
const counters = document.querySelectorAll('[data-counter]');
const faqButtons = document.querySelectorAll('.faq-question');
const revealTargets = document.querySelectorAll(
    '.hero, .stat-card, .intro, .interest, .interest-card, .text-card, .gallery-item, .testimonial-card, .faq-item'
);
const heroMediaImage = document.querySelector('.hero-media img');

const applyFilter = (kind) => {
    filterButtons.forEach((button) => {
        button.classList.toggle('is-active', button.dataset.filter === kind);
    });

    interestCards.forEach((card) => {
        card.classList.toggle('is-hidden', card.dataset.kind !== kind);
    });
};

filterButtons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter));
});

if (filterButtons.length) {
    const initialButton = document.querySelector('.filter-btn.is-active') || filterButtons[0];
    applyFilter(initialButton.dataset.filter);
}

const counterObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const target = entry.target;
            const endValue = Number(target.dataset.counter);
            const duration = 1300;
            const start = performance.now();

            const step = (time) => {
                const progress = Math.min((time - start) / duration, 1);
                const value = Math.floor(progress * endValue);
                target.textContent = `${value.toLocaleString('es-PE')}+`;

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };

            requestAnimationFrame(step);
            observer.unobserve(target);
        });
    },
    { threshold: 0.55 }
);

counters.forEach((counter) => counterObserver.observe(counter));

faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const expanded = button.getAttribute('aria-expanded') === 'true';

        faqButtons.forEach((otherButton) => {
            const otherAnswer = otherButton.closest('.faq-item').querySelector('.faq-answer');
            otherButton.setAttribute('aria-expanded', 'false');
            otherAnswer.style.maxHeight = null;
        });

        if (!expanded) {
            button.setAttribute('aria-expanded', 'true');
            answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
    });
});

if (revealTargets.length) {
    revealTargets.forEach((item, index) => {
        item.classList.add('reveal-item');
        item.style.setProperty('--reveal-delay', `${Math.min(index * 55, 360)}ms`);
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.16 }
    );

    revealTargets.forEach((item) => revealObserver.observe(item));
}

const updateScrollEffects = () => {
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;

    doc.style.setProperty('--scroll-progress', `${progress}%`);

    if (heroMediaImage) {
        const offset = Math.min(window.scrollY * 0.04, 16);
        heroMediaImage.style.transform = `scale(1.08) translateY(${offset}px)`;
    }
};

updateScrollEffects();
window.addEventListener('scroll', updateScrollEffects, { passive: true });

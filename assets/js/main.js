const filterButtons = document.querySelectorAll('.filter-btn');
const interestCards = document.querySelectorAll('.interest-card');
const counters = document.querySelectorAll('[data-counter]');
const faqButtons = document.querySelectorAll('.faq-question');

const applyFilter = (kind) => {
    filterButtons.forEach((btn) => {
        const active = btn.dataset.filter === kind;
        btn.classList.toggle('is-active', active);
    });

    interestCards.forEach((card) => {
        const match = card.dataset.kind === kind;
        card.classList.toggle('is-hidden', !match);
    });
};

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        applyFilter(button.dataset.filter);
    });
});

if (filterButtons.length) {
    const initial = document.querySelector('.filter-btn.is-active') || filterButtons[0];
    applyFilter(initial.dataset.filter);
}

const runCounter = (entry) => {
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
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(runCounter);
}, { threshold: 0.55 });

counters.forEach((counter) => observer.observe(counter));

faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const expanded = button.getAttribute('aria-expanded') === 'true';

        faqButtons.forEach((otherButton) => {
            const otherItem = otherButton.closest('.faq-item');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            otherButton.setAttribute('aria-expanded', 'false');
            otherAnswer.style.maxHeight = null;
        });

        if (!expanded) {
            button.setAttribute('aria-expanded', 'true');
            answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
    });
});

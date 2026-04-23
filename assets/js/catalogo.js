const brandFilter = document.querySelector('#brand-filter');
const bikeCards = document.querySelectorAll('.bike-card');
const revealTargets = document.querySelectorAll('.catalog-header, .catalog-filter, .bike-card');

const applyBrandFilter = (selectedBrand) => {
    bikeCards.forEach((card) => {
        const shouldShow = selectedBrand === 'all' || card.dataset.brand === selectedBrand;
        card.style.display = shouldShow ? '' : 'none';
    });
};

if (brandFilter) {
    brandFilter.addEventListener('change', (event) => {
        applyBrandFilter(event.target.value);
    });
}

if (revealTargets.length) {
    revealTargets.forEach((item, index) => {
        item.classList.add('reveal-item');
        item.style.setProperty('--reveal-delay', `${Math.min(index * 45, 320)}ms`);
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.14 }
    );

    revealTargets.forEach((item) => revealObserver.observe(item));
}

const updateScrollEffects = () => {
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;

    doc.style.setProperty('--scroll-progress', `${progress}%`);
};

updateScrollEffects();
window.addEventListener('scroll', updateScrollEffects, { passive: true });

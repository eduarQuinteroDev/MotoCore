const brandFilter = document.querySelector('#brand-filter');
const bikeCards = document.querySelectorAll('.bike-card');

if (brandFilter) {
    brandFilter.addEventListener('change', (event) => {
        const selectedBrand = event.target.value;

        bikeCards.forEach((card) => {
            const cardBrand = card.dataset.brand;
            const shouldShow = selectedBrand === 'all' || cardBrand === selectedBrand;
            card.style.display = shouldShow ? '' : 'none';
        });
    });
}

const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const consumoInput = document.querySelector('#consumo');
const consumoValor = document.querySelector('#consumo-valor');
const autonomia = document.querySelector('#autonomia');

const activateTab = (tabName) => {
    tabButtons.forEach((button) => {
        button.classList.toggle('is-active', button.dataset.tab === tabName);
    });

    tabPanels.forEach((panel) => {
        panel.classList.toggle('is-active', panel.dataset.panel === tabName);
    });
};

tabButtons.forEach((button) => {
    button.addEventListener('click', () => activateTab(button.dataset.tab));
});

const updateRange = () => {
    if (!consumoInput || !consumoValor || !autonomia) return;

    const consumo = Number(consumoInput.value);
    const tanqueLitros = 14;
    const autonomiaEstimada = Math.round(consumo * tanqueLitros);

    consumoValor.textContent = `${consumo} km/l`;
    autonomia.textContent = `${autonomiaEstimada} km`;
};

if (consumoInput) {
    consumoInput.addEventListener('input', updateRange);
    updateRange();
}

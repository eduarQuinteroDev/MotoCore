const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const consumoInput = document.querySelector('#consumo');
const consumoValor = document.querySelector('#consumo-valor');
const autonomia = document.querySelector('#autonomia');
const soundToggle = document.querySelector('#sound-toggle');
const mt03Audio = document.querySelector('#mt03-audio');

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

const setSoundUI = (isPlaying) => {
    if (!soundToggle) return;

    soundToggle.classList.toggle('is-playing', isPlaying);
    soundToggle.textContent = isPlaying ? 'Detener sonido MT-03' : 'Escuchar sonido MT-03';
};

if (soundToggle && mt03Audio) {
    soundToggle.addEventListener('click', async () => {
        if (mt03Audio.paused) {
            try {
                await mt03Audio.play();
                setSoundUI(true);
            } catch (error) {
                setSoundUI(false);
            }
            return;
        }

        mt03Audio.pause();
        mt03Audio.currentTime = 0;
        setSoundUI(false);
    });

    mt03Audio.addEventListener('ended', () => {
        setSoundUI(false);
    });
}

const revealItems = document.querySelectorAll(
    '.hero, .quick-card, .feature-block, .tabs-section, .tool-card, .sources, .feature-list li, .spec-grid div'
);

if (revealItems.length) {
    revealItems.forEach((item, index) => {
        item.classList.add('reveal-item');
        item.style.setProperty('--reveal-delay', `${Math.min(index * 45, 360)}ms`);
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.14 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
}

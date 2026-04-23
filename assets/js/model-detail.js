const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const scenarioButtons = document.querySelectorAll('.scenario-btn');
const consumoValor = document.querySelector('#consumo-valor');
const autonomia = document.querySelector('#autonomia');
const autonomyMode = document.querySelector('#autonomy-mode');
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

const updateAutonomy = (consumo, label) => {
    if (!consumoValor || !autonomia || !autonomyMode) return;

    const tanqueLitros = 14;
    const autonomiaEstimada = Math.round(consumo * tanqueLitros);

    consumoValor.textContent = `${consumo} km/l`;
    autonomia.textContent = `${autonomiaEstimada} km`;
    autonomyMode.textContent = label;
};

scenarioButtons.forEach((button) => {
    button.addEventListener('click', () => {
        scenarioButtons.forEach((item) => item.classList.remove('is-active'));
        button.classList.add('is-active');
        updateAutonomy(Number(button.dataset.kmL), button.dataset.label);
    });
});

if (scenarioButtons.length) {
    const initialScenario =
        document.querySelector('.scenario-btn.is-active') || scenarioButtons[0];
    updateAutonomy(Number(initialScenario.dataset.kmL), initialScenario.dataset.label);
}

const setSoundUI = (isPlaying) => {
    if (!soundToggle) return;

    soundToggle.classList.toggle('is-playing', isPlaying);
    soundToggle.textContent = isPlaying ? 'Detener sonido del motor' : 'Escuchar sonido MT-03';
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

const heroImage = document.querySelector('.hero-media img');

const updateScrollEffects = () => {
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;

    doc.style.setProperty('--scroll-progress', `${progress}%`);

    if (heroImage) {
        const offset = Math.min(window.scrollY * 0.045, 18);
        heroImage.style.transform = `scale(1.09) translateY(${offset}px)`;
    }
};

updateScrollEffects();
window.addEventListener('scroll', updateScrollEffects, { passive: true });

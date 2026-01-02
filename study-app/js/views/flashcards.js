/**
 * Flashcards View
 * Sistema de Tarjetas de Memoria con animación de volteo.
 */

// Datos simulados (Mazos)
const decks = [
    {
        id: 1,
        title: 'Vocabulario Inglés B2',
        count: 20,
        color: 'var(--primary)',
        cards: [
            { front: 'To Achieve', back: 'Lograr / Conseguir' },
            { front: 'Nevertheless', back: 'Sin embargo / No obstante' },
            { front: 'To Hinder', back: 'Dificultar / Entorpecer' }
        ]
    },
    {
        id: 2,
        title: 'Fechas Historia España',
        count: 15,
        color: 'var(--secondary)',
        cards: []
    },
    {
        id: 3,
        title: 'Biología Celular',
        count: 32,
        color: 'var(--accent)',
        cards: []
    }
];

let currentDeck = null;
let currentCardIndex = 0;
let isFlipped = false;

export default async function View() {
    // Si no hay mazo seleccionado, mostramos la lista de mazos
    if (!currentDeck) {
        return renderDeckList();
    } else {
        return renderStudyMode();
    }
}

function renderDeckList() {
    const decksHTML = decks.map(deck => `
        <div class="deck-card" onclick="window.startDeck(${deck.id})">
            <div class="deck-icon" style="background-color: ${deck.color}20; color: ${deck.color}">
                <i class="ti ti-cards"></i>
            </div>
            <div class="deck-info">
                <h3>${deck.title}</h3>
                <p>${deck.count} tarjetas</p>
                <div class="progress-bar-mini">
                    <div class="fill" style="width: ${Math.random() * 100}%; background-color: ${deck.color}"></div>
                </div>
            </div>
            <button class="play-btn"><i class="ti ti-player-play"></i></button>
        </div>
    `).join('');

    // Exponer función globalmente para el evento onclick (simple solution for no-framework)
    window.startDeck = (id) => {
        currentDeck = decks.find(d => d.id === id);
        currentCardIndex = 0;
        isFlipped = false;
        // Recargar vista (truco simple: disparar hashchange simulado o recargar)
        // En una app real usaríamos un Router más complejo u Observables.
        // Aquí forzamos volver a llamar a View() mediante recarga de hash 'flashcards'
        window.location.hash = '#dashboard'; // Breve hack para refrescar
        setTimeout(() => window.location.hash = '#flashcards', 1);
    };

    return `
        <div class="flashcards-container fade-in">
            <div class="header-section">
                <h2>Mis Mazos de Estudio</h2>
                <button class="btn btn-primary"><i class="ti ti-plus"></i> Crear Mazo</button>
            </div>
            
            <div class="decks-grid">
                ${decksHTML}
            </div>
        </div>
    `;
}

function renderStudyMode() {
    const card = currentDeck.cards[currentCardIndex] || { front: 'Fin del mazo', back: '¡Has terminado!' };

    // Bindear eventos tras render
    setTimeout(() => {
        const cardEl = document.getElementById('active-card');
        if (cardEl) {
            cardEl.onclick = () => {
                cardEl.classList.toggle('flipped');
            };
        }

        document.getElementById('btn-next').onclick = () => {
            if (currentCardIndex < currentDeck.cards.length - 1) {
                currentCardIndex++;
                window.location.hash = '#dashboard';
                setTimeout(() => window.location.hash = '#flashcards', 1);
            } else {
                alert("¡Mazo completado!");
                currentDeck = null;
                window.location.hash = '#dashboard';
                setTimeout(() => window.location.hash = '#flashcards', 1);
            }
        };

        document.getElementById('btn-back').onclick = () => {
            currentDeck = null;
            window.location.hash = '#dashboard';
            setTimeout(() => window.location.hash = '#flashcards', 1);
        };
    }, 0);

    return `
        <div class="study-session-container fade-in">
            <div class="session-header">
                <button id="btn-back" class="text-btn"><i class="ti ti-arrow-left"></i> Volver</button>
                <span>${currentCardIndex + 1} / ${currentDeck.cards.length || 1}</span>
            </div>

            <div class="card-scene">
                <div class="study-card" id="active-card">
                    <div class="card-face card-front">
                        <span class="label">Pregunta</span>
                        <div class="content">${card.front}</div>
                        <div class="hint"><i class="ti ti-hand-click"></i> Toca para ver respuesta</div>
                    </div>
                    <div class="card-face card-back">
                        <span class="label">Respuesta</span>
                        <div class="content">${card.back}</div>
                    </div>
                </div>
            </div>

            <div class="session-controls">
                <button class="rate-btn hard" style="background:#ef4444">Difícil</button>
                <button class="rate-btn good" style="background:#f59e0b">Bien</button>
                <button class="rate-btn easy" style="background:#10b981">Fácil</button>
                <div class="spacer"></div>
                <button id="btn-next" class="btn btn-primary">Siguiente <i class="ti ti-arrow-right"></i></button>
            </div>
        </div>
    `;
}

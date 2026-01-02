/**
 * Pomodoro View
 * Temporizador de estudio con modos de concentración.
 */

let timerInterval;
let timeLeft; // segundos
let isRunning = false;
let currentMode = 'focus'; // focus, shortBreak, longBreak

const MODES = {
    focus: { label: 'Concentración', time: 25 * 60 },
    shortBreak: { label: 'Descanso Corto', time: 5 * 60 },
    longBreak: { label: 'Descanso Largo', time: 15 * 60 }
};

export default async function View() {
    // Inicializar estado si es la primera vez en esta vista o recuperar si quisiéramos persistencia
    if (!timeLeft) timeLeft = MODES.focus.time;

    // Render inicial
    // Nota: Usamos delegación de eventos en el documento o bindear después de renderizar.
    // Como es View() simple que retorna HTML, script principal debe manejar lógica global o 
    // este módulo debe exportar funciones de control. Para simplificar en modularidad sin frameworks:
    // Retornamos HTML y luego bindeamos eventos en un setTimeout 0 o hook.

    setTimeout(bindEvents, 0);

    return `
        <div class="pomodoro-container fade-in">
            <div class="timer-card">
                <div class="mode-selector">
                    <button class="mode-btn active" data-mode="focus">Enfoque (25m)</button>
                    <button class="mode-btn" data-mode="shortBreak">Corto (5m)</button>
                    <button class="mode-btn" data-mode="longBreak">Largo (15m)</button>
                </div>

                <div class="timer-display">
                    <div class="circle-progress">
                        <svg width="300" height="300" viewBox="0 0 300 300">
                            <circle class="bg" cx="150" cy="150" r="140"></circle>
                            <circle class="progress" cx="150" cy="150" r="140" id="progress-ring"></circle>
                        </svg>
                        <div class="time-text" id="time-display">25:00</div>
                    </div>
                </div>

                <div class="controls">
                    <button id="btn-start" class="control-btn primary"><i class="ti ti-player-play"></i> Iniciar</button>
                    <button id="btn-pause" class="control-btn secondary" style="display:none;"><i class="ti ti-player-pause"></i> Pausar</button>
                    <button id="btn-reset" class="control-btn"><i class="ti ti-refresh"></i></button>
                </div>
            </div>

            <div class="tasks-overlay">
                <h3><i class="ti ti-list-check"></i> Tarea Actual</h3>
                <div class="current-task-display">
                    <p>Estudiar Tema 4 de Historia</p>
                </div>
            </div>
        </div>
    `;
}

// Lógica del Timer (adjunta al window o manejada internamente si tuviéramos un controller más complejo)
// Para esta demo, definimos funciones helpers que se adjuntarán tras renderizar.

function bindEvents() {
    const display = document.getElementById('time-display');
    const startBtn = document.getElementById('btn-start');
    const pauseBtn = document.getElementById('btn-pause');
    const resetBtn = document.getElementById('btn-reset');
    const modeBtns = document.querySelectorAll('.mode-btn');
    const progressRing = document.getElementById('progress-ring');

    // Calcular circunferencia para SVG dasharray
    const radius = 140;
    const circumference = 2 * Math.PI * radius;
    progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
    progressRing.style.strokeDashoffset = circumference;

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Update SVG Progress
        const totalTime = MODES[currentMode].time;
        const offset = circumference - (timeLeft / totalTime) * circumference;
        progressRing.style.strokeDashoffset = offset;

        // Update document title
        document.title = `${display.textContent} - StudyFlow`;
    }

    function toggleTimer(start) {
        if (start) {
            if (isRunning) return;
            isRunning = true;
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    finishTimer();
                }
            }, 1000);
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-flex';
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.style.display = 'inline-flex';
            pauseBtn.style.display = 'none';
        }
    }

    function finishTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        // Sonido simple usando Web Audio API
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.5);

        alert("¡Tiempo terminado! Tómate un respiro.");

        // Reset UI
        timeLeft = MODES[currentMode].time;
        updateDisplay();
        startBtn.style.display = 'inline-flex';
        pauseBtn.style.display = 'none';
    }

    // Event Listeners
    startBtn.onclick = () => toggleTimer(true);
    pauseBtn.onclick = () => toggleTimer(false);

    resetBtn.onclick = () => {
        toggleTimer(false);
        timeLeft = MODES[currentMode].time;
        updateDisplay();
    };

    modeBtns.forEach(btn => {
        btn.onclick = (e) => {
            modeBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const mode = e.target.dataset.mode;
            currentMode = mode;
            toggleTimer(false);
            timeLeft = MODES[mode].time;
            updateDisplay();
        };
    });

    // Iniciar display
    updateDisplay();
}

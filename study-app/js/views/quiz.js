/**
 * Quiz View
 * Sistema de autoevaluación con preguntas tipo test.
 */

// Datos simulados (Tests)
const quizzes = [
    {
        id: 1,
        title: 'Geografía de Europa',
        description: 'Capitales, ríos y sistemas montañosos.',
        questions: [
            { id: 1, text: '¿Cuál es el río más largo de Europa?', options: ['Danubio', 'Volga', 'Rin', 'Sena'], correct: 1 },
            { id: 2, text: 'Capital de Suiza', options: ['Ginebra', 'Zurich', 'Berna', 'Basilea'], correct: 2 },
            { id: 3, text: '¿Dónde están los montes Urales?', options: ['Entre Francia y España', 'En Italia', 'Frontera de Europa y Asia', 'En Escandinavia'], correct: 2 }
        ]
    }
];

let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = {};
let isFinished = false;

export default async function View() {
    if (!currentQuiz) {
        return renderQuizList();
    } else if (isFinished) {
        return renderResults();
    } else {
        return renderQuestion();
    }
}

function renderQuizList() {
    const listHTML = quizzes.map(quiz => `
        <div class="quiz-card" onclick="window.startQuiz(${quiz.id})">
            <div class="icon-wrapper"><i class="ti ti-school"></i></div>
            <div class="quiz-info">
                <h3>${quiz.title}</h3>
                <p>${quiz.description}</p>
                <div class="meta">
                    <span><i class="ti ti-list-check"></i> ${quiz.questions.length} preguntas</span>
                    <span><i class="ti ti-clock"></i> ~5 min</span>
                </div>
            </div>
            <button class="btn btn-primary btn-sm">Empezar</button>
        </div>
    `).join('');

    window.startQuiz = (id) => {
        currentQuiz = quizzes.find(q => q.id === id);
        currentQuestionIndex = 0;
        userAnswers = {};
        isFinished = false;
        refreshView();
    };

    return `
        <div class="quiz-container fade-in">
            <div class="header-section">
                <h2>Tests de Autoevaluación</h2>
                <button class="btn btn-primary"><i class="ti ti-plus"></i> Crear Test</button>
            </div>
            <div class="quiz-grid">
                ${listHTML}
            </div>
        </div>
    `;
}

function renderQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / currentQuiz.questions.length) * 100;

    setTimeout(() => {
        const options = document.querySelectorAll('.option-btn');
        options.forEach((btn, index) => {
            btn.onclick = () => {
                userAnswers[question.id] = index;
                // Avanzar automáticamente
                if (currentQuestionIndex < currentQuiz.questions.length - 1) {
                    currentQuestionIndex++;
                    refreshView();
                } else {
                    isFinished = true;
                    refreshView();
                }
            };
        });

        document.getElementById('btn-quit').onclick = () => {
            if (confirm('¿Salir del test? Se perderá el progreso.')) {
                currentQuiz = null;
                refreshView();
            }
        };
    }, 0);

    return `
        <div class="quiz-session-container fade-in">
            <div class="progress-bar-top">
                <div class="bar" style="width: ${progress}%"></div>
            </div>
            
            <div class="question-card">
                <span class="q-number">Pregunta ${currentQuestionIndex + 1} de ${currentQuiz.questions.length}</span>
                <h3 class="q-text">${question.text}</h3>
                
                <div class="options-list">
                    ${question.options.map((opt, idx) => `
                        <button class="option-btn">
                            <span class="letter">${String.fromCharCode(65 + idx)}</span>
                            <span class="text">${opt}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <div class="session-footer">
                <button id="btn-quit" class="text-btn danger">Salir</button>
            </div>
        </div>
    `;
}

function renderResults() {
    let score = 0;
    currentQuiz.questions.forEach(q => {
        if (userAnswers[q.id] === q.correct) score++;
    });

    const percentage = Math.round((score / currentQuiz.questions.length) * 100);
    const message = percentage >= 80 ? '¡Excelente!' : (percentage >= 50 ? 'Bien hecho' : 'Necesitas repasar');
    const color = percentage >= 50 ? 'var(--accent)' : '#ef4444';

    setTimeout(() => {
        document.getElementById('btn-finish').onclick = () => {
            currentQuiz = null;
            userAnswers = {};
            isFinished = false;
            refreshView();
        };
    }, 0);

    return `
        <div class="results-container fade-in">
            <div class="results-card">
                <div class="score-circle" style="color: ${color}; border-color: ${color}">
                    <span class="number">${percentage}%</span>
                    <span class="label">Aciertos</span>
                </div>
                <h2>${message}</h2>
                <p>Has acertado ${score} de ${currentQuiz.questions.length} preguntas.</p>
                
                <button id="btn-finish" class="btn btn-primary">Volver al Listado</button>
            </div>
        </div>
    `;
}

function refreshView() {
    window.location.hash = '#dashboard';
    setTimeout(() => window.location.hash = '#quiz', 1);
}

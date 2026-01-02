/**
 * StudyFlow - Main Application Script
 * Gestiona el enrutamiento y la carga de módulos.
 */

// Estado global simple
const state = {
    currentView: 'dashboard',
    user: {
        name: 'Estudiante',
        level: 1,
        xp: 0
    }
};

// Configuración de rutas
const routes = {
    'dashboard': { title: 'Panel Principal', view: () => import('./views/dashboard.js') },
    'planner': { title: 'Planificador', view: () => import('./views/planner.js') },
    'pomodoro': { title: 'Modo Pomodoro', view: () => import('./views/pomodoro.js') },
    'notes': { title: 'Apuntes Inteligentes', view: () => import('./views/notes.js') },
    'flashcards': { title: 'Tarjetas de Memoria', view: () => import('./views/flashcards.js') },
    'quiz': { title: 'Test y Evaluación', view: () => import('./views/quiz.js') },
    'ai-assistant': { title: 'Asistente Virtual', view: () => import('./views/ai-assistant.js') },
    'profile': { title: 'Mi Perfil', view: () => import('./views/profile.js') },
};

// Referencias DOM
const viewContainer = document.getElementById('view-container');
const pageTitle = document.getElementById('page-title');
const navLinks = document.querySelectorAll('.nav-links li');

/**
 * Sistema de Enrutamiento Básico
 */
async function navigateTo(routeKey) {
    if (!routes[routeKey]) routeKey = 'dashboard';

    // Actualizar estado
    state.currentView = routeKey;

    // Actualizar UI navegación
    navLinks.forEach(li => {
        const link = li.querySelector('a');
        if (link.getAttribute('href') === `#${routeKey}`) {
            li.classList.add('active');
        } else {
            li.classList.remove('active');
        }
    });

    // Actualizar Título
    pageTitle.textContent = routes[routeKey].title;

    // Mostrar estado de carga
    viewContainer.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Cargando ${routes[routeKey].title}...</p>
        </div>
    `;

    try {
        // Cargar el módulo de la vista dinámicamente
        // Nota: Como es una demo local, crearemos vistas simuladas si no existen
        // En un caso real: const module = await routes[routeKey].view();

        // Simulación de carga (artificial delay for UX feel)
        await new Promise(r => setTimeout(r, 300));

        let content = '';

        // Renderizado condicional simple (hasta que tengamos los archivos reales)
        if (routeKey === 'dashboard') {
            content = renderDashboardPlaceholder();
        } else {
            content = `<div class="fade-in"><h2>Sección: ${routes[routeKey].title}</h2><p>Próximamente...</p></div>`;
        }

        viewContainer.innerHTML = content;

    } catch (error) {
        console.error("Error cargando vista:", error);
        viewContainer.innerHTML = `<p class="error">Error cargando la sección.</p>`;
    }
}

function renderDashboardPlaceholder() {
    return `
        <div class="dashboard-grid fade-in">
            <div class="card welcome-card">
                <h2>¡Hola, ${state.user.name}! 👋</h2>
                <p>Listo para una sesión productiva hoy?</p>
            </div>
        </div>
    `;
}

/**
 * Inicialización
 */
function init() {
    // Escuchar cambios de hash
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1) || 'dashboard';
        navigateTo(hash);
    });

    // Carga inicial
    const initialHash = window.location.hash.slice(1) || 'dashboard';
    navigateTo(initialHash);

    // Configurar Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeToggle.innerHTML = isDark ? '<i class="ti ti-moon"></i>' : '<i class="ti ti-sun"></i>';
    });
}

// Arrancar app
document.addEventListener('DOMContentLoaded', init);

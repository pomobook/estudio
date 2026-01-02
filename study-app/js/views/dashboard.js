/**
 * Dashboard View
 * Muestra el resumen principal del estudiante.
 */

export default async function View() {
    // Simulamos datos (luego vendrán del LocalStorage)
    const stats = {
        studyTimeToday: '2h 15m',
        streak: 5,
        pendingTasks: 3,
        nextExam: { subject: 'Matemáticas', daysLeft: 3 }
    };

    return `
        <div class="dashboard-container fade-in">
            <!-- Sección de Bienvenida -->
            <div class="welcome-section">
                <h2>¡Vamos a por todas! 🚀</h2>
                <p class="subtitle">"El éxito es la suma de pequeños esfuerzos repetidos día tras día."</p>
            </div>

            <!-- Grid de Estadísticas Rápidas -->
            <div class="stats-grid">
                <div class="stat-card primary">
                    <div class="icon-box"><i class="ti ti-clock"></i></div>
                    <div class="stat-info">
                        <span class="value">${stats.studyTimeToday}</span>
                        <span class="label">Hoy</span>
                    </div>
                </div>
                <div class="stat-card secondary">
                    <div class="icon-box"><i class="ti ti-flame"></i></div>
                    <div class="stat-info">
                        <span class="value">${stats.streak} días</span>
                        <span class="label">Racha</span>
                    </div>
                </div>
                <div class="stat-card accent">
                    <div class="icon-box"><i class="ti ti-list-check"></i></div>
                    <div class="stat-info">
                        <span class="value">${stats.pendingTasks}</span>
                        <span class="label">Tareas</span>
                    </div>
                </div>
                <div class="stat-card warning">
                    <div class="icon-box"><i class="ti ti-calendar-event"></i></div>
                    <div class="stat-info">
                        <span class="value">${stats.nextExam.subject}</span>
                        <span class="label">En ${stats.nextExam.daysLeft} días</span>
                    </div>
                </div>
            </div>

            <!-- Accesos Directos Grandes -->
            <div class="shortcuts-grid">
                <div class="shortcut-card pomodoro-start">
                    <h3>Sesión Rápida</h3>
                    <p>Empezar 25 minutos de concentración</p>
                    <button class="btn btn-primary" onclick="window.location.hash='#pomodoro'">Iniciar <i class="ti ti-arrow-right"></i></button>
                </div>
                <!-- Aquí irán gráficas en el futuro -->
            </div>
        </div>
    `;
}

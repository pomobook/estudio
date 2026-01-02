/**
 * Planner View
 * Calendario y Gestión de Exámenes
 */

export default async function View() {
    const today = new Date();
    const currentMonth = today.toLocaleString('es-ES', { month: 'long' });
    const currentYear = today.getFullYear();

    // Generar días del calendario (simplificado para demo: 30 días)
    // En producción usamos lógica real de Date para el mes exacto
    let daysHTML = '';
    const daysInMonth = 31; // Ejemplo
    const startDayOffset = 3; // Ejemplo, empieza en miércoles

    // Días vacíos previos
    for (let i = 0; i < startDayOffset; i++) {
        daysHTML += `<div class="day empty"></div>`;
    }

    // Días reales
    for (let i = 1; i <= daysInMonth; i++) {
        const isToday = i === today.getDate();
        // Simulamos un evento en el día 15 y 28
        let eventHTML = '';
        if (i === 15) eventHTML = `<div class="event-dot exam" title="Examen Matemáticas"></div>`;
        if (i === 28) eventHTML = `<div class="event-dot task" title="Entrega Historia"></div>`;

        daysHTML += `
            <div class="day ${isToday ? 'today' : ''}" onclick="alert('Día ${i} seleccionado')">
                <span class="day-number">${i}</span>
                <div class="events">${eventHTML}</div>
            </div>
        `;
    }

    return `
        <div class="planner-container fade-in">
            <div class="planner-header">
                <h2>${currentMonth} ${currentYear}</h2>
                <div class="planner-actions">
                    <button class="btn-icon"><i class="ti ti-chevron-left"></i></button>
                    <button class="btn-icon"><i class="ti ti-chevron-right"></i></button>
                    <button class="btn btn-sm btn-primary"><i class="ti ti-plus"></i> Nuevo Evento</button>
                </div>
            </div>

            <div class="calendar-grid">
                <!-- Headers Días -->
                <div class="weekday">Lun</div>
                <div class="weekday">Mar</div>
                <div class="weekday">Mié</div>
                <div class="weekday">Jue</div>
                <div class="weekday">Vie</div>
                <div class="weekday">Sáb</div>
                <div class="weekday">Dom</div>

                <!-- Días -->
                ${daysHTML}
            </div>

            <div class="upcoming-list">
                <h3>Próximos Eventos</h3>
                <div class="event-card">
                    <div class="date-badge">
                        <span class="day">15</span>
                        <span class="month">Oct</span>
                    </div>
                    <div class="event-details">
                        <h4>Examen de Matemáticas</h4>
                        <p>Tema: Derivadas e Integrales</p>
                    </div>
                </div>
                 <div class="event-card">
                    <div class="date-badge warning">
                        <span class="day">28</span>
                        <span class="month">Oct</span>
                    </div>
                    <div class="event-details">
                        <h4>Trabajo de Historia</h4>
                        <p>Entrega final - Revolución Francesa</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

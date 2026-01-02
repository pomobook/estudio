/**
 * Profile View
 * Estadísticas, Logros y Configuración de Usuario.
 */

export default async function View() {
    // Datos simulados
    const user = {
        name: 'Estudiante',
        level: 5,
        xp: 2450,
        nextLevelXp: 3000,
        totalStudyTime: '14h 30m',
        notesCount: 12,
        flashcardsMastered: 45
    };

    const achievements = [
        { icon: 'ti-flame', title: 'Racha de 7 días', desc: 'Estudia 7 días seguidos', unlocked: true },
        { icon: 'ti-book', title: 'Ratón de Biblioteca', desc: 'Crea 10 notas', unlocked: true },
        { icon: 'ti-clock', title: 'Maratón', desc: 'Estudia 2 horas en una sesión', unlocked: false },
        { icon: 'ti-brain', title: 'Cerebrito', desc: 'Saca 100% en 3 tests', unlocked: false }
    ];

    const xpPercentage = (user.xp / user.nextLevelXp) * 100;

    return `
        <div class="profile-container fade-in">
            <!-- Header Perfil -->
            <div class="profile-header">
                <div class="user-avatar-large">E</div>
                <div class="user-details">
                    <h2>${user.name} <span class="badge-level">Nivel ${user.level}</span></h2>
                    <div class="xp-bar-container">
                        <div class="xp-info">
                            <span>XP: ${user.xp} / ${user.nextLevelXp}</span>
                            <span>${Math.round(xpPercentage)}%</span>
                        </div>
                        <div class="xp-bar">
                            <div class="xp-fill" style="width: ${xpPercentage}%"></div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-outline"><i class="ti ti-settings"></i> Editar Perfil</button>
            </div>

            <div class="profile-grid">
                <!-- Estadísticas -->
                <div class="section-card">
                    <h3>Estadísticas Globales</h3>
                    <div class="stats-row">
                        <div class="stat-item">
                            <i class="ti ti-clock"></i>
                            <div class="val">${user.totalStudyTime}</div>
                            <div class="lbl">Tiempo Total</div>
                        </div>
                         <div class="stat-item">
                            <i class="ti ti-notebook"></i>
                            <div class="val">${user.notesCount}</div>
                            <div class="lbl">Apuntes</div>
                        </div>
                         <div class="stat-item">
                            <i class="ti ti-cards"></i>
                            <div class="val">${user.flashcardsMastered}</div>
                            <div class="lbl">Tarjetas</div>
                        </div>
                    </div>
                    
                    <h3 style="margin-top:2rem">Actividad Semanal</h3>
                    <!-- Simulación de gráfica con barras CSS -->
                    <div class="chart-container">
                        <div class="chart-bar" style="height: 40%" title="Lun"></div>
                        <div class="chart-bar" style="height: 70%" title="Mar"></div>
                        <div class="chart-bar" style="height: 50%" title="Mié"></div>
                        <div class="chart-bar" style="height: 90%" title="Jue"></div>
                        <div class="chart-bar" style="height: 30%" title="Vie"></div>
                        <div class="chart-bar" style="height: 60%" title="Sáb"></div>
                        <div class="chart-bar" style="height: 20%" title="Dom"></div>
                    </div>
                    <div class="chart-labels">
                        <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
                    </div>
                </div>

                <!-- Logros (Gamificación) -->
                <div class="section-card">
                    <h3>Logros y Medallas</h3>
                    <div class="achievements-list">
                        ${achievements.map(ach => `
                            <div class="achievement-item ${ach.unlocked ? 'unlocked' : 'locked'}">
                                <div class="ach-icon">
                                    <i class="ti ${ach.icon}"></i>
                                </div>
                                <div class="ach-info">
                                    <h4>${ach.title}</h4>
                                    <p>${ach.desc}</p>
                                </div>
                                ${ach.unlocked ? '<i class="ti ti-check check-icon"></i>' : '<i class="ti ti-lock lock-icon"></i>'}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

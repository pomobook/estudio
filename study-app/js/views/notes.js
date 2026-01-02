/**
 * Notes View
 * Editor de apuntes minimalista con guardado automático simulado.
 */

export default async function View() {
    // Lista de apuntes simulada
    const notesList = [
        { id: 1, title: 'Historia: La Revolución Industrial', date: 'Hace 2h' },
        { id: 2, title: 'Fórmulas de Física', date: 'Hace 1 día' },
        { id: 3, title: 'Verbos Irregulares Inglés', date: 'Hace 3 días' }
    ];

    const notesHTML = notesList.map(note => `
        <div class="note-item" onclick="alert('Abrir nota: ${note.title}')">
            <div class="note-icon"><i class="ti ti-file-text"></i></div>
            <div class="note-info">
                <h4>${note.title}</h4>
                <span>${note.date}</span>
            </div>
        </div>
    `).join('');

    return `
        <div class="notes-container fade-in">
            <!-- Sidebar de Notas (Lista) -->
            <div class="notes-sidebar">
                <div class="sidebar-header">
                    <h3>Mis Apuntes</h3>
                    <button class="btn-icon-small"><i class="ti ti-plus"></i></button>
                </div>
                <div class="search-box">
                    <i class="ti ti-search"></i>
                    <input type="text" placeholder="Buscar apuntes...">
                </div>
                <div class="notes-list">
                    ${notesHTML}
                </div>
            </div>

            <!-- Editor Principal -->
            <div class="editor-area">
                <div class="editor-toolbar">
                    <input type="text" class="note-title-input" value="Historia: La Revolución Industrial">
                    <div class="tools">
                        <button class="tool-btn" title="Negrita"><i class="ti ti-bold"></i></button>
                        <button class="tool-btn" title="Itálica"><i class="ti ti-italic"></i></button>
                        <button class="tool-btn" title="Subrayado"><i class="ti ti-underline"></i></button>
                        <div class="divider"></div>
                        <button class="tool-btn ai-btn" title="Resumir con IA"><i class="ti ti-wand"></i> Resumir</button>
                    </div>
                </div>
                
                <div class="editor-content" contenteditable="true">
                    <h2>Introducción</h2>
                    <p>La <strong>Revolución Industrial</strong> marca un punto de inflexión en la historia, modificando e influenciando todos los aspectos de la vida cotidiana de una u otra manera.</p>
                    <p>Comenzó en Gran Bretaña a mediados del siglo XVIII...</p>
                    <ul>
                        <li>Mecanización de la industria textil</li>
                        <li>Desarrollo de los procesos del hierro</li>
                        <li>Expansión del comercio</li>
                    </ul>
                    <p><em>(Escribe aquí tus apuntes...)</em></p>
                </div>
            </div>
        </div>
    `;
}

/**
 * AI Assistant View
 * Chat simulado para ayuda al estudio.
 */

// Respuestas simuladas simples
const RESPONSES = {
    'hola': '¡Hola! Soy tu asistente de estudio. ¿En qué puedo ayudarte hoy?',
    'ayuda': 'Puedo explicarte conceptos, resumir textos o darte consejos de estudio.',
    'explicame': 'Claro, ¿qué concepto te gustaría entender mejor? Intenta ser específico, por ejemplo: "Explícame la fotosíntesis".',
    'consejo': 'Recuerda hacer descansos regulares usando la técnica Pomodoro para mantener tu mente fresca.',
    'default': 'Entiendo. Esa es una pregunta interesante. Para ayudarte mejor, ¿podrías reformularla o darme más contexto? (Soy una demo simulada 😉)'
};

// Respuestas específicas para demos
const DEMO_TOPICS = {
    'fotosintesis': 'La fotosíntesis es el proceso por el cual las plantas convierten la luz solar en energía química. Usan agua y CO2 para producir glucosa y oxígeno.',
    'revolucion francesa': 'Fue un conflicto social y político en Francia (1789) que derrocó a la monarquía y estableció principios de libertad e igualdad.',
    'derivada': 'En matemáticas, la derivada representa cómo cambia una función en un punto dado. Es fundamental para entender tasas de cambio y pendientes.'
};

export default async function View() {

    setTimeout(() => {
        const input = document.getElementById('chat-input');
        const sendBtn = document.getElementById('btn-send');
        const messagesContainer = document.getElementById('chat-messages');

        function addMessage(text, isUser = false) {
            const div = document.createElement('div');
            div.className = `message ${isUser ? 'user' : 'bot'} fade-in`;
            div.innerHTML = `
                <div class="msg-content">
                    <p>${text}</p>
                </div>
            `;
            messagesContainer.appendChild(div);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function handleSend() {
            const text = input.value.trim().toLowerCase();
            if (!text) return;

            // Mensaje usuario
            addMessage(input.value, true);
            input.value = '';

            // Simular "escribiendo..."
            const loadingId = 'loading-' + Date.now();
            const loadingDiv = document.createElement('div');
            loadingDiv.id = loadingId;
            loadingDiv.className = 'message bot fade-in';
            loadingDiv.innerHTML = '<div class="msg-content typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
            messagesContainer.appendChild(loadingDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Respuesta bot
            setTimeout(() => {
                const prevLoading = document.getElementById(loadingId);
                if (prevLoading) prevLoading.remove();

                let response = RESPONSES['default'];

                // Lógica simple de palabras clave
                if (text.includes('hola') || text.includes('buenos')) response = RESPONSES['hola'];
                else if (text.includes('ayuda') || text.includes('que puedes')) response = RESPONSES['ayuda'];
                else if (text.includes('consejo') || text.includes('tip')) response = RESPONSES['consejo'];
                else {
                    // Buscar coincidencia parcial en temas demo
                    for (const [key, val] of Object.entries(DEMO_TOPICS)) {
                        if (text.includes(key)) {
                            response = val;
                            break;
                        }
                    }
                }

                addMessage(response, false);

            }, 1500);
        }

        sendBtn.onclick = handleSend;
        input.onkeypress = (e) => {
            if (e.key === 'Enter') handleSend();
        };

    }, 0);

    return `
        <div class="ai-container fade-in">
            <div class="chat-interface">
                <div class="chat-header">
                    <div class="bot-avatar">
                        <i class="ti ti-robot"></i>
                    </div>
                    <div class="header-info">
                        <h3>Asistente Virtual</h3>
                        <p><span class="status-dot"></span> En línea</p>
                    </div>
                </div>

                <div class="chat-messages" id="chat-messages">
                    <div class="message bot">
                        <div class="msg-content">
                            <p>¡Hola! Soy tu compañero de estudio. Puedo explicarte conceptos, resolver dudas o darte ánimos. ¿Por dónde empezamos?</p>
                        </div>
                    </div>
                    <!-- Mensajes dinámicos -->
                </div>

                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Pregunta algo sobre tus apuntes..." autocomplete="off">
                    <button id="btn-send" class="btn-send"><i class="ti ti-send"></i></button>
                </div>
            </div>
        </div>
    `;
}

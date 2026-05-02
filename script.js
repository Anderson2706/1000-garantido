// Inicialização do Lucide Icons (ícones da tela)
lucide.createIcons();

// 1. CARREGAMENTO INICIAL
window.onload = () => {
    carregarDadosDoCadastro();
    loadRepertorio(); // Carrega do dados.js
    loadTemas();
    initCharts();
    console.log("Sistema 1000 Garantido pronto!");
};

// 2. LOGICA DE CADASTRO (Recebe de cadastro.html)
function carregarDadosDoCadastro() {
    const params = new URLSearchParams(window.location.search);
    const nome = params.get('nome') || localStorage.getItem('user_nome') || "Estudante Elite";
    
    document.getElementById('user-name-display').innerText = nome;
    document.getElementById('user-initials').innerText = nome.substring(0,2).toUpperCase();
    localStorage.setItem('user_nome', nome);
}

// 3. NAVEGAÇÃO ENTRE ABAS
function navigate(tabId, btn) {
    // Esconde todas as abas
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    // Desmarca todos os botões
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('bg-blue-50', 'text-blue-900'));
    
    // Ativa a aba clicada
    document.getElementById('tab-' + tabId).classList.add('active');
    btn.classList.add('bg-blue-50', 'text-blue-900');
    
    document.getElementById('page-title').innerText = "Dashboard / " + tabId.toUpperCase();
}

// 4. EDITOR E CONTADORES
function handleEditorInput() {
    const text = document.getElementById('editor-content').innerText;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    
    document.getElementById('word-count').innerText = words;
    document.getElementById('line-count').innerText = Math.floor(words / 10);
    
    // Auto-save visual
    const now = new Date();
    document.getElementById('save-status').innerText = now.getHours() + ":" + String(now.getMinutes()).padStart(2,'0');
}

// 5. CARREGAR REPERTÓRIOS (Do arquivo dados.js)
function loadRepertorio() {
    const grid = document.getElementById('repertorio-grid');
    if(!grid) return;

    grid.innerHTML = BANCO_REPERTORIO.map(r => `
        <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm border-t-4 border-blue-900">
            <h4 class="font-black text-blue-900">${r.autor}</h4>
            <p class="text-[10px] font-bold text-orange-500 uppercase">${r.obra}</p>
            <p class="text-xs text-gray-500 mt-2">${r.uso}</p>
            <button onclick="copiar('${r.autor}')" class="mt-4 w-full py-2 bg-gray-50 rounded-xl text-[10px] font-black uppercase">Copiar</button>
        </div>
    `).join('');
}

// 6. CORRETOR HUMANO (Fila de Espera)
function uploadHumano() {
    const label = document.getElementById('human-up-label');
    const queue = document.getElementById('human-queue');
    
    label.innerText = "✓ REDAÇÃO ENVIADA!";
    label.classList.add('text-green-600');
    queue.classList.remove('hidden');
}

// Função Auxiliar de Cópia
function copiar(texto) {
    navigator.clipboard.writeText(texto);
    alert("Copiado!");
}
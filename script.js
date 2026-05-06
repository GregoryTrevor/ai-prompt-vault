// Load prompts on page start
document.addEventListener('DOMContentLoaded', displayPrompts);

function savePrompt() {
    const tagInput = document.getElementById('tagInput');
    const promptInput = document.getElementById('promptInput');

    if (tagInput.value && promptInput.value) {
        const prompts = JSON.parse(localStorage.getItem('prompts')) || [];
        prompts.push({
            category: tagInput.value,
            text: promptInput.value
        });
        localStorage.setItem('prompts', JSON.stringify(prompts));
        
        // Reset fields
        tagInput.value = '';
        promptInput.value = '';
        displayPrompts();
    }
}

function displayPrompts() {
    const promptGrid = document.getElementById('promptGrid');
    const prompts = JSON.parse(localStorage.getItem('prompts')) || [];
    promptGrid.innerHTML = '';

    prompts.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">
                <span class="tag">${p.category}</span>
                <button class="delete-btn" onclick="deletePrompt(${index})">×</button>
            </div>
            <p id="promptText-${index}">${p.text}</p>
            <button class="copy-btn" onclick="copyPrompt(${index})">Copy Prompt</button>
        `;
        promptGrid.appendChild(card);
    });
}

function copyPrompt(index) {
    const text = document.getElementById(`promptText-${index}`).innerText;
    const btn = document.querySelectorAll('.copy-btn')[index];
    const originalText = btn.innerText;

    navigator.clipboard.writeText(text).then(() => {
        btn.innerText = '✅ Copied!';
        btn.style.background = '#238636';
        btn.style.color = 'white';

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
    });
}

function deletePrompt(index) {
    let prompts = JSON.parse(localStorage.getItem('prompts')) || [];
    prompts.splice(index, 1);
    localStorage.setItem('prompts', JSON.stringify(prompts));
    displayPrompts();
}
window.onload = function() {
    displayPrompts();
};

function savePrompt() {
    const tagInput = document.getElementById('tagInput');
    const promptInput = document.getElementById('promptInput');

    if (!tagInput.value || !promptInput.value) {
        alert("Please fill in both fields!");
        return;
    }

    const newEntry = { tag: tagInput.value, prompt: promptInput.value };
    let vault = JSON.parse(localStorage.getItem('gregoryVault')) || [];
    
    vault.push(newEntry);
    localStorage.setItem('gregoryVault', JSON.stringify(vault));

    tagInput.value = '';
    promptInput.value = '';
    displayPrompts();
}

function displayPrompts() {
    const promptGrid = document.getElementById('promptGrid');
    const prompts = JSON.parse(localStorage.getItem('prompts')) || [];
    promptGrid.innerHTML = '';

    prompts.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <span class="category-tag">${p.category}</span>
            <p id="promptText-${index}">${p.text}</p>
            <button class="copy-btn" onclick="copyPrompt(${index})">Copy Prompt</button>
        `;
        promptGrid.appendChild(card);
    });
}

function copyPrompt(index) {
    const text = document.getElementById(`promptText-${index}`).innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelectorAll('.copy-btn')[index];
        btn.innerText = '✅ Copied!';
        setTimeout(() => btn.innerText = 'Copy Prompt', 2000);
    });
}
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
    const grid = document.getElementById('promptGrid');
    grid.innerHTML = ''; 
    
    const vault = JSON.parse(localStorage.getItem('gregoryVault')) || [];

    vault.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <span class="tag">${item.tag}</span>
            <code>${item.prompt}</code>
        `;
        grid.appendChild(card);
    });
}
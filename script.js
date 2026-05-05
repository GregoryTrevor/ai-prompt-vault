window.onload = function() {
    displayPrompts();
};

function savePrompt() {
    const categoryInput = document.getElementById('tagInput');
    const textInput = document.getElementById('promptInput');

    if (categoryInput.value && textInput.value) {
        const prompts = JSON.parse(localStorage.getItem('prompts')) || [];
        prompts.push({
            category: categoryInput.value,
            text: textInput.value
        });
        localStorage.setItem('prompts', JSON.stringify(prompts));
        
        // Clear inputs and refresh the list
        categoryInput.value = '';
        textInput.value = '';
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
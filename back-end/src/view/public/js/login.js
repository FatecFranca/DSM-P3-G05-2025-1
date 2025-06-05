document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const playerNameInput = document.getElementById('playerName');
    const playButton = document.getElementById('playButton');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const difficultySelect = document.getElementById('difficultySelect');
    
    let selectedTheme = null;

    
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            themeButtons.forEach(btn => btn.classList.remove('selected'));
            
            button.classList.add('selected');
            selectedTheme = button.dataset.theme;
            validateForm();
        });
    });

    
    function validateForm() {
        const isValid = playerNameInput.value.trim().length >= 3 &&
                       selectedTheme &&
                       difficultySelect.value;
        
        playButton.disabled = !isValid;
    }

    
    playerNameInput.addEventListener('input', validateForm);
    difficultySelect.addEventListener('change', validateForm);

    
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const playerName = playerNameInput.value.trim();
        const difficulty = difficultySelect.value;

        if (!playerName || !selectedTheme || !difficulty) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        
        localStorage.setItem('playerName', playerName);
        localStorage.setItem('difficulty', difficulty);
        localStorage.setItem('theme', selectedTheme);

        
        window.location.href = `/game/${selectedTheme}`;
    });
});






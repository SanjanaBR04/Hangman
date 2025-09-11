const hangmanStages = [
    `
      +---+
      |   |
          |
          |
          |
          |
    =========`,
    `
      +---+
      |   |
      O   |
          |
          |
          |
    =========`,
    `
      +---+
      |   |
      O   |
      |   |
          |
          |
    =========`,
    `
      +---+
      |   |
      O   |
     /|   |
          |
          |
    =========`,
    `
      +---+
      |   |
      O   |
     /|\\  |
          |
          |
    =========`,
    `
      +---+
      |   |
      O   |
     /|\\  |
     /    |
          |
    =========`
];

function startGame() {
    fetch('http://https://hangman-lt7u.onrender.com/start', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('word-display').textContent = data.display.split('').join(' ');
            document.getElementById('lives-count').textContent = data.lives;
            document.getElementById('hangman-drawing').textContent = hangmanStages[5 - data.lives];
            document.getElementById('message').textContent = 'Pick a letter!';
            document.getElementById('message').className = '';
            createKeyboard();
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').textContent = 'Cannot connect to game!';
            document.getElementById('message').className = 'wrong';
        });
}

function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    letters.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.className = 'keyboard-button';
        button.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(button);
    });
}

function handleGuess(letter) {
    fetch('http://https://hangman-lt7u.onrender.com/guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ letter: letter.toLowerCase() })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('word-display').textContent = data.display.split('').join(' ');
            document.getElementById('lives-count').textContent = data.lives;
            document.getElementById('hangman-drawing').textContent = hangmanStages[5 - data.lives];
            document.getElementById('message').textContent = data.message === 'Correct guess!' 
                ? `Yay! "${letter}" is in the word!` 
                : data.message === 'Wrong guess!' 
                ? `Oops! "${letter}" isn't in the word!` 
                : `You already guessed "${letter}"!`;
            document.getElementById('message').className = data.message === 'Correct guess!' ? 'correct' : data.message === 'Wrong guess!' ? 'wrong' : '';

            if (data.gameOver) {
                document.getElementById('message').textContent = data.lives <= 0 
                    ? `Game over! The word was ${data.word}.` 
                    : 'You won! Great job!';
                document.getElementById('message').className = data.lives <= 0 ? 'wrong' : 'correct';
                disableKeyboard();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').textContent = 'Cannot connect to game!';
            document.getElementById('message').className = 'wrong';
        });
}

function disableKeyboard() {
    const buttons = document.querySelectorAll('.keyboard-button');
    buttons.forEach(button => button.disabled = true);
}

document.getElementById('restart-button').addEventListener('click', startGame);

startGame();/start', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('word-display').textContent = data.display.split('').join(' ');
            document.getElementById('lives-count').textContent = data.lives;
            document.getElementById('hangman-drawing').textContent = hangmanStages[5 - data.lives];
            document.getElementById('message').textContent = 'Pick a letter!';
            document.getElementById('message').className = '';
            createKeyboard();
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').textContent = 'Cannot connect to game!';
            document.getElementById('message').className = 'wrong';
        });
}

function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    letters.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.className = 'keyboard-button';
        button.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(button);
    });
}

function handleGuess(letter) {
    fetch('http://localhost:8080/guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ letter: letter.toLowerCase() })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('word-display').textContent = data.display.split('').join(' ');
            document.getElementById('lives-count').textContent = data.lives;
            document.getElementById('hangman-drawing').textContent = hangmanStages[5 - data.lives];
            document.getElementById('message').textContent = data.message === 'Correct guess!' 
                ? `Yay! "${letter}" is in the word!` 
                : data.message === 'Wrong guess!' 
                ? `Oops! "${letter}" isn't in the word!` 
                : `You already guessed "${letter}"!`;
            document.getElementById('message').className = data.message === 'Correct guess!' ? 'correct' : data.message === 'Wrong guess!' ? 'wrong' : '';

            if (data.gameOver) {
                document.getElementById('message').textContent = data.lives <= 0 
                    ? `Game over! The word was ${data.word}.` 
                    : 'You won! Great job!';
                document.getElementById('message').className = data.lives <= 0 ? 'wrong' : 'correct';
                disableKeyboard();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').textContent = 'Cannot connect to game!';
            document.getElementById('message').className = 'wrong';
        });
}

function disableKeyboard() {
    const buttons = document.querySelectorAll('.keyboard-button');
    buttons.forEach(button => button.disabled = true);
}

document.getElementById('restart-button').addEventListener('click', startGame);

startGame();


var inquirer = require('inquirer');

var Word = require('./word.js');
var WordBank = require('./game.js');

game = {
	wordBank: new WordBank(),
	currentWord: null,
	numGuesses: 10,
	previousGuesses: [],

	startGame: function() {
		this.currentWord = new Word(this.wordBank.pickWord());
		this.currentWord.createCharacters();
		console.log(this.currentWord);
		this.playGame();
	},

	playGame: function() {
		var self = this;

		if ((this.currentWord.guessed != true) && (this.numGuesses != 0)) {
			console.log(self.currentWord.renderWord());
			inquirer.prompt({
				name: 'userGuess',
				message: 'Guess a letter: ',
				validate: function(value) {
					value = value.toLowerCase();
					if ((/[a-z]/.test(value)) && (value.length == 1) && (self.previousGuesses.indexOf(value) == -1)){
						return true;
					} else {
						return false;
					}
				}
			}).then(function(answer) {
				// Check user's guess
				if (!self.currentWord.checkGuess(answer.userGuess.toLowerCase())){
					console.log('Your guess was incorrect.');
					self.numGuesses--;
					self.previousGuesses.push(answer.userGuess.toLowerCase());
				} else {
					console.log('Your guess was correct!');
				}
				// Check if user has correctly guessed entire word
				self.currentWord.checkIfWin();
				if (self.currentWord.guessed) {
					console.log('Congratulations! You won!');
					return;
				}
				// Check if user has lost
				if (self.numGuesses == 0) {
					console.log('Sorry but you have been defeated.');
					return;
				}
				// Log the number of guesses remaining and user's previous guesses
				console.log('Number of guesses remaining: ' + self.numGuesses);
				if (self.numGuesses == 9) {
					console.log('Your previous guess: ' + self.previousGuesses);
				}
				if (self.numGuesses < 9) {
					console.log('Your previous guesses: ' + self.previousGuesses);
				}
				game.playGame();
			})
		}
	}
};

game.startGame();
var inquirer = require('inquirer');

var Word = require('./word.js');

// var currentWord = new Word('apple stick');
// console.log(currentWord);
// currentWord.createCharacters();
// console.log(currentWord);

game = {
	currentWord: null,
	numGuesses: 12,

	startGame: function() {
		this.currentWord = new Word('apple stick');
		this.currentWord.createCharacters();
		this.playGame();
	},

	playGame: function() {
		var self = this;

		if ((this.currentWord.guessed != true) && (this.numGuesses != 0)) {
			inquirer.prompt({
				name: 'userGuess',
				message: 'Guess a letter: ',
				validate: function(value) {
					if ((/[a-z]/.test(value.toLowerCase()) && (value.length == 1))){
						return true;
					} else {
						return false;
					}
				}
			}).then(function(answer) {
				// Check user's guess
				if (self.currentWord.checkGuess(answer.userGuess.toLowerCase())){
					console.log(self.currentWord.renderWord());
				} else {
					self.numGuesses--;
					console.log('Number of guesses remaining: ' + self.numGuesses);
				}
				// Check if user has correctly guessed entire word
				self.currentWord.checkIfWin();
				if (self.currentWord.guessed) {
					console.log('Congratulations! You win!');
					return;
				}
				game.playGame();
			})
		}
	}
};

game.startGame();
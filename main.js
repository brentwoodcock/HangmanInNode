var inquirer = require('inquirer');

var Game = require('./game.js');
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
		console.log(this.currentWord);
		if ((this.currentWord.guessed != true) && (this.numGuesses != 0)) {
			inquirer.prompt({
				name: 'userGuess',
				message: 'Guess a letter: '
			}).then(function(answer) {
				this.currentWord.checkGuess(answer.userGuess);
				console.log(this.currentWord.renderWord());
				game.playGame();
			})
		}
	}
};

game.startGame();
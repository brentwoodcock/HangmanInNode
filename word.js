var Letter = require('./letter.js');

var Word = function(word) {
	this.word = word;
	this.characters = [];
	this.guessed = false;  // Tracks if the word has been guessed

	// Fill the characters array with each character from word as letter objects
	this.createCharacters = function() {
		for (var i = 0; i < this.word.length; i++) {
			this.characters.push(new Letter(this.word[i]));
			// Set the appear property to true for spaces
			if (this.characters[i].letter == ' '){
				this.characters[i].appear = true;
			}
		}
	};
	
	// Check a user's guess, setting the letter's appear property to true if a letter is correctly guessed
	// Returns true for a correct guess, false for an incorrect guess
	this.checkGuess = function(userGuess) {
		var correctGuess = false;
		for (var i = 0; i < this.characters.length; i++) {
			if (this.characters[i].letter == userGuess){
				this.characters[i].appear = true;
				correctGuess = true;
			}
		}
		return correctGuess;
	};

	// Check if user has successfully guessed every letter
	this.checkIfWin = function () {
		this.guessed = this.characters.every(function(x) {
			return x.appear;
		});
	}

	// Create a string to represent the current state of user's guess
	this.renderWord = function() {
		var str = '';
		for (var i = 0; i < this.characters.length; i++) {
			str += this.characters[i].renderLetter() + ' ';
		}
		return str;
	}
}

module.exports = Word;

// TESTING
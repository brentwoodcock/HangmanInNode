var Game = function() {
	this.wordBank = ['apple', 'orange', 'pear', 'watermelon', 'candy cane'];
	this.pickWord = function() {
		return this.wordBank[Math.floor(Math.random() * this.wordBank.length)]
	}
}

module.exports = Game;
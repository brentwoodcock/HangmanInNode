// Letter is constructor used to determine if a letter, 'x', will appear as itself or a '_' depending on if has been guessed

var Letter = function(x) {
    this.letter = x;
    this.appear = false;
    // renderLetter will return the letter or _ depending on if the letter has been guessed
    this.renderLetter = function() {
        if (this.appear) {
            return this.letter;
        } else {
            return "_";
        }
    };
};

module.exports = Letter;

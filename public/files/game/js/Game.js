

/**
 * creates new game
 * 
 * @param {object} assets          - game assets.
 * @param {Array}  assets.names    - array containing champion names ["Ahri", "Akali", ...]
 * @param {Array}  assets.gameData - array of arrays containing champion name and champion image name [["Ahri", "Ahri.png"], ["Akali", "Akali.png"], ...]]
 * @param {Array}  assets.pictures - array of paths to champion pictures ["/files/game/images/champion/Ahri.png", "/files/game/images/champion/Akali.png"]
 * 
 */
Game = function(assets) {

    // game vars
    this.assets = assets;
    this.currentQuestion = 0;
    this.inputbox; // reference to input box
    this.correctStrings = ['Great!', 'Good job!', 'YEAH!', "That\'s right!", 'Correct!', 'Indeed.', 'Confirmative!', 'TRUE'];
    this.incorrectStrings = ['Ouch!', 'No, sorry!', 'Wrong!', 'Nope. Chuck Testa.', 'Negative.', 'Incorrect.', "uh uh.", "FALSE"];
    this.numberCorrect = 0;
    this.numberIncorrect = 0;
    this.gameOver = false;
    this.cards = []; // array holding cards on screen
    
    

};

Game.constructor = Game;


Game.prototype.getRandomInt = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
    
Game.prototype.getCorrectString = function getCorrectString() {
    return this.correctStrings[this.getRandomInt(0, this.correctStrings.length - 1)];
};
    
Game.prototype.getIncorrectString = function getIncorrectString() {
    return this.incorrectStrings[this.getRandomInt(0, this.incorrectStrings.length - 1)];
};

Game.prototype.begin = function() {
    this.populate();
};

Game.prototype.populate = function populate() {
    // if there are no cards, create two
    if (this.cards.length == 0) {
        this.createCard();
        this.createCard(1);
    }
    this.placeCards();
};

Game.prototype.createCard = function addCard(offset) {
    var off = offset || 0;
    var texture = new PIXI.Texture.fromImage(this.assets.gameData[this.currentQuestion + off][1]);
    var card = new PIXI.Sprite(texture);
    
    card.anchor.x = 0.5;
    card.anchor.y = 0.5;
    
    if (this.cards.length == 3) this.cards.shift();
    this.cards.push(card); // save a reference to this card
    stage.addChild(card);
};

Game.prototype.placeCards = function organizeCards() {
    
    var pos1x = 40;
    var pos1y = 150;
    
    var pos2x = 200;
    var pos2y = 150;
    
    var pos3x = 360;
    var pos3y = 150;
    
    var dark = 0x333333;
    var light = 0xFFFFFF;
    var small = 0.5;
    var big = 1;

    //console.dir(this.cards[0]);    

    switch(this.cards.length) {
    case 3:
        this.cards[0].position.x = pos1x;
        this.cards[0].position.y = pos1y;
        this.cards[0].tint = dark;
        this.cards[0].scale.x = small;
        this.cards[0].scale.y = small;
        
        this.cards[1].position.x = pos2x;
        this.cards[1].position.y = pos2y;
        this.cards[1].tint = light;
        this.cards[1].scale.x = big;
        this.cards[1].scale.y = big;
        
        this.cards[2].position.x = pos3x;
        this.cards[2].position.y = pos3y;
        this.cards[2].tint = dark;
        this.cards[2].scale.x = small;
        this.cards[2].scale.y = small;
        break;
    case 2:
        this.cards[0].position.x = pos2x;
        this.cards[0].position.y = pos2y;
        this.cards[0].tint = light;
        this.cards[1].scale.x = small;
        this.cards[1].scale.y = small;
        
        this.cards[1].position.x = pos3x;
        this.cards[1].position.y = pos3y;
        this.cards[1].tint = dark;
        this.cards[1].scale.x = small;
        this.cards[1].scale.y = small;
        break;
    } 
    
    
};

Game.prototype.getCurrentChampion = function() {
    return this.assets.gameData[this.currentQuestion][0].toLowerCase();
};

Game.prototype.compareGuess = function(guess) {
    guess = guess.toLowerCase();
    var answer = this.getCurrentChampion().toLowerCase();
    
    // if on last question, end game
    //if (game.currentQuestion == 3) return this.endGame(); // ccc
    if (guess === answer) {
        return this.answeredCorrectly();
    } else {
        return this.answeredIncorrectly();
    }
};

Game.prototype.answeredCorrectly = function answeredCorrectly() {
    this.numberCorrect += 1;
    console.log(this.getCorrectString());
    return this.nextQuestion();
};

Game.prototype.answeredIncorrectly = function answeredIncorrectly() {
    this.numberIncorrect += 1;
    console.log(this.getIncorrectString());
    return this.nextQuestion();
};

Game.prototype.nextQuestion = function nextQuestion() {

    this.currentQuestion += 1; // advance to next question
    this.createCard(1);  // create next card (offset by +1 because it's not the active card yet)
    this.placeCards();   // organize the cards on screen
};

Game.prototype.endGame = function endGame() {
    console.log('endgame');
};

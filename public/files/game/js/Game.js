

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
    this.assets = assets;  // @todo production
    //this.assets = {
    //    gameData: [
    //        ["Ahri", "/files/game/images/champion/Ahri.png"],
    //        ["Lux", "/files/game/images/champion/Lux.png"],
    //        ["Alistar", "/files/game/images/champion/Alistar.png"],
    //        ["Taric", "/files/game/images/champion/Taric.png"]
    //    ],
    //    names: [
    //        "Ahri",
    //        "Lux",
    //        "Alistar",
    //        "Taric"
    //    ]
    //};
    this.currentQuestion = 0;
    this.inputbox; // reference to input box
    this.correctStrings = [
        'Great!',
        'Good job!',
        'YEAH!',
        "That\'s right!",
        'Correct!',
        'Indeed.',
        'Confirmative!',
        'TRUE',
        'yeppers',
        'mhm',
        'yep',
        'YIP!'
    ];
    this.incorrectStrings = [
        'Ouch!',
        'No, sorry!',
        'Wrong!',
        'Nope. Chuck Testa.',
        'Negative.',
        'Incorrect.',
        "uh uh.",
        "FALSE",
        'Negatron',
        'nah, brah.'
    ];
    this.numberCorrect = 0;
    this.numberIncorrect = 0;
    this.gameOver = false;
    this.cards = []; // array holding cards on screen
    this.texts = [];
    
    this.timeDisplayText = 2000;

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
    
    // make the next card a blank card if we're on the last question
    if (this.isCurrentQuestionLast()) {
        var texture = new PIXI.Texture.fromImage('/files/game/images/blank.png');
    } else {
        var texture = new PIXI.Texture.fromImage(this.assets.gameData[this.currentQuestion + off][1]);
    }
    var card = new PIXI.Sprite(texture);
    
    card.anchor.x = 0.5;
    card.anchor.y = 0.5;
    
    if (this.cards.length == 3) {
        // remove first card
        stage.removeChild(this.cards[0]);
        this.cards.shift();
    }
    this.cards.push(card); // save a reference to this card
    stage.addChild(card);
};

Game.prototype.placeCards = function placeCards() {
    
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

Game.prototype.removeCards = function() {
    for (var card in this.cards) {
        stage.removeChild(this.cards[card]);
    }
};

Game.prototype.getCurrentChampion = function() {
    return this.assets.gameData[this.currentQuestion][0].toLowerCase();
};

Game.prototype.isCurrentQuestionLast = function() {
    if (this.currentQuestion == this.assets.gameData.length - 1) return true;  // -1 on length because currentQuestion is zero indexed
    return false;
};

Game.prototype.isNextQuestionLast = function() {
    if (this.currentQuestion + 1 == this.assets.gameData.length - 1) return true;
    return false;
};

Game.prototype.compareGuess = function(guess) {
    // only compare if game is still in progress
    if (this.gameOver) return;
    
    guess = guess.toLowerCase();
    var answer = this.getCurrentChampion().toLowerCase();
    
    if (guess === answer) {
        this.answeredCorrectly();
    } else {
        this.answeredIncorrectly();
    }
    
    // if last champion, end game
    if (this.isCurrentQuestionLast()) return this.endGame();
    return this.nextQuestion();
};

Game.prototype.answeredCorrectly = function answeredCorrectly() {
    this.numberCorrect += 1;
    this.addText(this.getCorrectString(), 'green');
};

Game.prototype.answeredIncorrectly = function answeredIncorrectly() {
    this.numberIncorrect += 1;
    this.addText(this.getIncorrectString(), 'red');
};

Game.prototype.nextQuestion = function nextQuestion() {
    this.currentQuestion += 1; // advance to next question
    this.createCard(1);  // create next card (offset by +1 because it's not the active card yet)
    this.placeCards();   // organize the cards on screen
};

Game.prototype.addText = function addText(text, color) {
    color = color || 'black';
    console.log('adding text: ' + text);
    var t = new PIXI.Text(text, {fill: color});
    t.anchor.x = 0.5;
    t.anchor.y = 0.5;
    t.position.x = 200;
    t.position.y = 20;

    if (this.texts[0]) {
        stage.removeChild(this.texts[0]);
        this.texts.shift();
    }
    
    stage.addChild(t);
    this.texts.push(t);
    

};

Game.prototype.removeText = function removeText(t) {
    console.log('removing text');
    console.log(t);
    stage.removeChild(t);
};

Game.prototype.addGraph = function addGraph() {
    // get answered correctly
    var numberAnswersCorrect = this.numberCorrect;
    var numberAnswersIncorrect = this.numberIncorrect;
    
    var graphHeight = 300;
    var barBase = 250;
    
    var numberOfChampions = this.assets.gameData.length - 1;
    var sectionHeight = graphHeight / numberOfChampions;
    var correctBarHeight = sectionHeight * numberAnswersCorrect;
    var incorrectBarHeight = sectionHeight * numberAnswersIncorrect;
    
    var gfx = new PIXI.Graphics();
    var correctLabel = new PIXI.Text('Correct: ' + numberAnswersCorrect, {fill: 'green', font: 'bold 14px Arial'});
    var incorrectLabel = new PIXI.Text('Incorrect: ' + numberAnswersIncorrect, {fill: 'red', font: 'bold 14px Arial'});
    
	gfx.lineStyle(50, 0x00FF00, 1);
	gfx.moveTo(40, barBase);
	gfx.lineTo(40, (barBase - correctBarHeight));
	gfx.endFill();
	
	gfx.lineStyle(50, 0xFF0000, 1);
	gfx.moveTo(360, barBase);
	gfx.lineTo(360, (barBase - incorrectBarHeight));
	gfx.endFill();
	
	correctLabel.position.x = 10;
	correctLabel.position.y = (barBase + 15);
	correctLabel.anchor.x = 0;
	
	incorrectLabel.position.x = 390;
	incorrectLabel.position.y = (barBase + 15);
	incorrectLabel.anchor.x = 1;
	
	console.log(incorrectLabel);
    stage.addChild(gfx);
    stage.addChild(correctLabel);
    stage.addChild(incorrectLabel);

    // get answered incorrectly
    // make bar graph for each
    // calculate and display percentage
};

Game.prototype.endGame = function endGame() {
    console.log('ENDGAME');
    this.gameOver = true;
    this.removeCards();    // make cards disappear
    this.addText('Results');
    this.addGraph();
};

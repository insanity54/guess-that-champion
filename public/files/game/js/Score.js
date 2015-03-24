Score = function() {
    
    // dimentions
	this.width = 400;
	this.height = 300;    
    
    // game vars
    this.numberCorrect = 0;
    this.numberIncorrect = 0;
    this.gameOver = false;
}


Score.constructor = Score;


Score.prototype.gameover = function() {
	this.gameOver = true;

	this.addChild(this.gameoverView);
	this.gameoverView.show();
	this.gameoverView.onContinue = $.proxy(this.restart, this);
}


Score.prototype.update = function() {
    
    
}
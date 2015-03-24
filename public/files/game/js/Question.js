
Question = function(game) {
    
    this.game = game;
    this.number = game.currentQuestion;
    return Object.create(Card.prototype, texture);

};
        
Question.constructor = Question;


Question.prototype.create = function create() {
    
    this.setTexture(game.assets.pictures[this.game.currentQuestion]);
    //return Object.create(PIXI.Sprite.prototype, texture);
};
//var texture = PIXI.Texture.fromImage(assets[score.currentCard]);



Card = function(texture) {
    this.number;
};
        
Card.constructor = Card;
Card.prototype = Object.create(PIXI.Sprite.prototype);

Card.prototype.update = function(texture) {
    console.log('updating card');
    //this.setTexture(game.assets.pictures[game.currentQuestion]);
};
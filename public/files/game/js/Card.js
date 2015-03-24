//var texture = PIXI.Texture.fromImage(assets[score.currentCard]);



Card = function(texture) {
    //var texture = PIXI.Texture.fromImage("/files/game/images/champion/Jinx.png");
    
    //this.setTexture(texture);
    //return Object.create(PIXI.Sprite.prototype)(texture);
};
        
Card.constructor = Card;
Card.prototype = Object.create(PIXI.Sprite.prototype);

Card.prototype.update = function() {
    console.log('updating card');
    //this.setTexture(assets[game.currentCard]);
};
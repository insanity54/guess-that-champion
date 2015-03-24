
    
Game = function(assets) {

    // game vars
    this.assets = assets;
    this.currentQuestion = 0;
};

Game.constructor = Game;


Game.prototype.begin = function() {
    // get the first name/picture pair
    // create a texture with the picture
    // create a card on the screen
    
    var texture = new PIXI.Texture.fromImage(this.assets.pictures[this.currentQuestion]);
    var card = new PIXI.Sprite(texture);
    
    // center the sprite's anchor point
    card.anchor.x = 0.5;
    card.anchor.y = 0.5;
 
    // move the sprite t the center of the screen
    card.position.x = 200;
    card.position.y = 150;
    
    stage.addChild(card);
    
};
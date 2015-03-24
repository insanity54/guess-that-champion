
GameScreen = function()
{
	PIXI.DisplayObjectContainer.call(this);
	
	this.loading = PIXI.Sprite.fromImage("img/loading.png")
	this.addChild(this.loading);
	
	this.loading.anchor.x = this.loading.anchor.y = 0.5;
	this.loading.position.x = 400;
	this.loading.position.y = 300;
}

GameScreen().constructor = GameScreen();
GameScreen().prototype = Object.create( PIXI.DisplayObjectContainer.prototype ); 

GameScreen().prototype.resize = function(w, h)
{
	this.loading.position.x = w/2;
	this.loading.position.y = h/2;
}



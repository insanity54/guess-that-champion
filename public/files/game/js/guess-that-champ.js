// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x66FF99);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(400, 300);

// add the renderer view element to the DOM
document.getElementById("game").appendChild(renderer.view);

document.addEventListener('preloaded', onPreload);
$("#state").html("<p>Loading more stuff</p>");

function onPreload(e) {
    
    console.log('assets preloaded');

    var assets = e.detail;
    //console.log(assets.pictures);
    
    new PIXI.AssetLoader(assets.pictures);  // load champion images into memory
    $("#inputter").css("display", "inline");
    $("#state").html("<p>Can you name this champion? Enter your guess in the box below.</p>");

    
    
    //var loader = new PIXI.AssetLoader(['files/game/images/champion/Alistar.png', 
    //                                    'files/game/images/champion/Janna.png']);
    
    // load images preload told us about
    //var loader = new PIXI.AssetLoader(e.detail.pictures);
    //var loader = new Loader(assets.pictures);

    // loader.addEventListener('onProgress', function(e) {
    //     console.log('progress: ' + e);
    //     //console.dir(e);
    // });
    
    //loader.addEventListener('onComplete', onNext);
    
    //loader.load();
  
    //var startup	= new Startup(e.detail.pictures);
    //var startup = new Startup(['files/game/images/Aatrox.png', 'files/game/images/Janna.png']);
    // var music = document.getElementById('music');
    // music.playing = true;
        
    
    //console.log('guess-that-champ.js here. loading assets.');
    //this.loader = new PIXI.AssetLoader(['files/game/images/champion/Aatrox.png', 'files/game/images/champion/Jinx.png', 'files/game/images/champion/Alistar.png'], true);
    
    //simpleApp.gotoScreen(loadingScreen);
    
    // loader.on('onProgress', function(e) {
    //     console.log('loader progress! ');
    //     console.dir(e);
    // });
    
    // loader.on( 'onComplete', function ( event ) {
    //     console.log('startup.js: assets loaded.');
    //     //		simpleApp.gotoScreen(titleScreen);
    // });
    
    var score = new Score();
    var game = new Game(assets);
    var input = new Inputbox(game);
    //var question = new Question(game);
    
    //input.loadNames(assets.names);
    //var question = new Question(game);
    
    //var card = new Card(texture);
    //var texture = PIXI.Texture.fromImage(assets[score.currentCard]);
    //var card = new PIXI.Sprite(texture);
    //card.position.x = 100;
	//card.position.y = stage.height/2 + 50;
    
    console.log('oi am called');
    
    
    // center the sprites anchor point
    // card.anchor.x = 0.5;
    // card.anchor.y = 0.5;
 
    // // move the sprite t the center of the screen
    // card.position.x = 200;
    // card.position.y = 150;
    
    
    // stage.addChild(card);
    game.begin();
    
    
    // animate when browser says (auto detect fps)
    requestAnimFrame(animate);


    
    function animate() {
        requestAnimFrame(animate);
        // card.rotation += 0.001;
    
        if (game.currentQuestion == game.currentQuestion.length) score.gameOver;
        
    
        // render the stage  
        renderer.render(stage);
    }
}


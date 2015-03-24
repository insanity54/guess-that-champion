// loads assets from server
//
// more specifically...
//   - downloads the champion json from the downloadDragoon.js script...
//   - goes through each champion listed in the json
//   - constructs a path to each champion's image (example: /files/game/images/champion/Monkeyking.png)
//   - gets the champion's user readable name (example: Wu-Kong, not Monkeyking)
//   - assembles a gameData array containing both user readable name and image path+program name ['Wu-Kong', '/files/game/images/champion/Monkeyking.png']
//   - stores the image paths to an array
//   - stores all champion names to an array
//   - adds gameData array, image path array, and champion names to a data object
//   - fires the 'preloaded' event with the data object. (guess-that-champ.js takes over from here, which passes off to loader.js)


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}



function compileChampionData(cb) {
    console.log('compile the data');
    
    $.get("/files/game/data/champion.json", function(json, status) {
        //console.log(status);
        //console.dir(json);
        var counter = 0;
        var gameData = [];
        var pictures = [];
        var names = [];
        var d = {};
        
        for (var champion in json.data) {
            //console.dir(json.data[champion]);
            var entry = [];
            names.push(json.data[champion].name);
            pictures.push('/files/game/images/champion/' + json.data[champion].image.full);
            entry[0] = json.data[champion].name;
            entry[1] = json.data[champion].image.full;
            gameData.push(entry);
            counter += 1;
        }
        
        d['names'] = names;
        d['gameData'] = gameData;
        d['pictures'] = pictures;
        //console.log('all good lets cb');
        return cb(null, d);
    });
}




compileChampionData(function(err, data) {
    if (err) throw new Error(err);
    var event = new CustomEvent('preloaded', { 'detail': data });
    document.dispatchEvent(event);
});


// var names2 = [];
// document.addEventListener('loaded', function (e) {
//     var names = e.detail.names;
    
//     for(var i = 0; i < names.length; i += 1) {
//         var imageRoot = "images/champion/";
//         names2.push(imageRoot + names[i]);
//     }

    
    
    
//     Startup = function() {
//     	this.loader = new PIXI.AssetLoader(names2);
    	
//     	simpleApp.gotoScreen(loadingScreen);
    	
//     	this.loader.addEventListener( 'onComplete', function ( event ) 
//     	{
//     //		simpleApp.gotoScreen(titleScreen);
    
//     		gameScreen = new GAME.Game();
//     		titleScreen = new TitleScreen();
    		
//     		transition = new GAME.TransitionAnimation();
//     		stage.addChildAt(transition, 1);
//     		simpleApp.gotoScreen(titleScreen);
    		
//     		hand = new GAME.ExplosionAnimation();
    	
//     		hand.position.x = GAME.width/2;
//     		hand.position.y = GAME.height/2 + 30;
    
//     	} );
//     }
    
//     Startup.constructor = Startup;
    
//     Startup.prototype.run = function()
//     {
//     	this.loader.load();
//     };
// });
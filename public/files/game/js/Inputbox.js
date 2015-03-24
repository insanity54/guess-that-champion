// Handles typing input from user.
//
//   - Listen for the that tells us the assets have been loaded.
//   - add list of champion names to the typing box for use in auto complete


//document.addEventListener('preloaded', function (e) {
    
    // console.log('typingjs here. I got loaded event with deets: ' + e.detail);
    
    // console.dir(e.detail);


    
    //console.log('there are ' + data.names.length  + ' champions.');
    
Inputbox = function() {
    

};

Inputbox.constructor = Inputbox;


/**
 * loadNames
 * 
 * Insert all champion names into the text box autocomplete
 * 
 * @param {Array} champions - an array of champion names
 */
Inputbox.prototype.loadNames = function(champions) {

    var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
    var matches, substrRegex;
     
    
    // an array that will be populated with substring matches
    matches = [];
     
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
     
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
            // the typeahead jQuery plugin expects suggestions to a
            // JavaScript object, refer to typeahead docs for more info
            matches.push({ value: str });
            }
        });
         
        cb(matches);
        };
    };
     
     
     
    $('#inputter .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        name: 'champions',
        displayKey: 'value',
        source: substringMatcher(champions)
    }); 

    var that = this;
    $("#inputter").keypress(function(e) {
        if (e.keyCode == 13) {
            // enter key pressed
            e.preventDefault();
            console.log('enter key prssed on the input box ' + $("#inputter").val());
            console.log(e);
            that.submitGuess($(".typeahead").typeahead('val'));
        }
    });

};

Inputbox.prototype.submitGuess = function(guess) {
    console.log('submitting guess ' + guess);
}
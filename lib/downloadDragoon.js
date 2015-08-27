// updates champion data

var league = require('leagueapi');
var fs = require('fs-extra');
var targz = require('tar.gz');
var request = require('request');
var nconf = require('nconf');
var path = require('path');
var os = require('os');


var rootDir = path.join(__dirname, '../');
var tmpDir = path.join(os.tmpdir(), 'dragoonTmp');
var championImgDir = path.join(rootDir, 'public', 'files', 'game', 'images', 'champion');
var championDataDir = path.join(rootDir, 'public', 'files', 'game', 'data', 'champion.json');

nconf.env(['RIOTKEY'])
    .file({
        file: path.join(rootDir, 'config.json')
    });
    
if (!nconf.get('RIOTKEY')) throw new Error('Riot api key not found in config.json or environment variable');

league.init(nconf.get('RIOTKEY'), 'na');


function cleanUp(err) {
    console.log('cleanup');
    var exitStatus;
    if (err) {
        exitStatus = true;
        console.error(err);
    }
    else {
        exitStatus = false;
        console.log('exit without error');
    }
    
    return exitStatus;
    // there is no rm -rf so I'll do this at the system level
    // fs.exists(tmpDir, function (exists) {
    //     if (exists) {
    //         fs.rmdir(tmpDir, function(err) {
    //             if (err) throw new Error('could not delete tmp dir' + err);
    //         });
    //     }
    //     else {
    //         return exitStatus;
    //     }
    // });
}

// control flow
getLatestVersion(function(err, version) {
    if (err) return cleanUp(err); 
    console.log('NEU: got latest version: ' + version);
    
    downloadDragontail(version, function(err, tar) {
       if (err) return cleanUp(err);
       console.log('NEU: got tar: ' + tar);
       
       extractTar(tar, function(err, dt) {
          if (err) return cleanUp(err);
          console.log('NEU: extracted tar: ' + dt);
          
          placeDragonTailChampionImages(dt, version, function(err) {
             if (err) return cleanUp(err);
             console.log('NEU: dt images placed!');
             
             placeDragonTailChampionData(dt, version, function(err) {
                if (err) return cleanUp(err);
                console.log('NEU: dt data placed!');
                cleanUp(null);
             });
          });
       });
    });
});


// find latest LoL version
function getLatestVersion(cb) {
    league.Static.getVersions('na', function(err, versions) {
        if (err) return cb(err);
        return cb(null, versions[0]);
    });
}

function downloadDragontail(version, cb) {
    var saveFile = path.join(tmpDir, 'dragontail-' + version + '.tgz');

    fs.mkdir(tmpDir, function(err) {
        if (err && err.code != 'EEXIST') return cb('error creating tmpDir: ' + err);
        
        var download = request('http://ddragon.leagueoflegends.com/cdn/dragontail-' + version + '.tgz')
        download.on('response', function(response) {
            console.log(response.statusCode) // 200
            console.log(response.headers['content-type']) // 'image/png'
        })
        download.pipe(fs.createWriteStream(saveFile));
        download.on('end', function() {
            return cb(null, saveFile);
        });
        // request.get('http://ddragon.leagueoflegends.com/cdn/dragontail-' + version + '.tgz', function (err, res, body) {
        //     if (err) return cb('error downloading dragontail: ' + err);
        //     if (!err && res.statusCode == 200) {
        //         fs.writeFile(saveFile, body, function(err) {
        //             if (err) return cb('error writing dragontail tar.gz: ' + err);
        //         return cb(null, saveFile);
        // });
        //     }
        //     else {
        //         return cb('didnt get 200 status while downloading dragontail: ' + res.statusCode);
        //     }
        // });
    });
}

function extractTar(tar, cb) {
    console.log('extractin ', tar);
    var extractPath = path.join(tmpDir, 'extracted');

    //var tar = spawn('tar', ['x', 'v', 'f', tar, extractPath, extractPath] 
    
    targz().extract(tar, extractPath)
	.then(function() {
	    console.log('done extractin');
	    return cb(null, extractPath);
	})
        .catch(function(err) {
	    console.log('something is wrong: ', err.stack);
	    return cb(err, null);
	});
}

function placeDragonTailChampionImages(dt, version, cb) {
    fs.copy(path.join(dt, version, 'img', 'champion'), championImgDir, function(err) {
        if (err) return cb('err moving champ img: ' + err);
        return cb(null);
    });
}

function placeDragonTailChampionData(dt, version, cb) {
    fs.copy(path.join(dt, version, 'data', 'en_US', 'champion.json'), championDataDir, function(err) {
        if (err) return cb('err moving champ data: ' + err);
        return cb(null);
    });
}

function downloadAndPlaceUrfImage(cb) {
    var urfFile = path.join(rootDir, 'public', 'files', 'game', 'images', 'Urf.png');
    var urfDl = request('https://www.dropbox.com/s/lngb5mdu9ctxo3c/Urf.png?dl=1');
    urfDl.pipe(fs.createWriteStream(urfFile));
    urfDl.on('end', function(err) {
        if (err) return cb('error downloading urf' + err);
        return cb(false);
    });
}
// updates champion data

var league = require('./LeagueJS');
var fs = require('fs-extra');
var targz = require('tar.gz');
var request = require('request');
var nconf = require('nconf');
var path = require('path');
var os = require('os');

var rootDir = path.join(__dirname, '../');
var tmpDir = path.join(os.tmpdir(), 'dragoonTmp');
var championImgDir = path.join(rootDir, 'public', 'files', 'game', 'images', 'champion');

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
          
          placeDragonTailChampionImages(dt, function(err) {
             if (err) return cleanUp(err);
             console.log('NEU: dt placed!');
             cleanUp(null);
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
    var extractPath = path.join(tmpDir, 'extracted');
    new targz().extract(tar, extractPath, function(err) {
        if (err) return cb('got an error decompressing: ' + err);
        return cb(null, extractPath);
    });
}

function placeDragonTailChampionImages(dt, cb) {
    fs.copy(dt, championImgDir, function(err) {
        if (err) return cb('err moving champ dir');
        return cb(null);
    });
}

function downloadAndPlaceUrfImage(cb) {
    var urfFile = path.join(rootDir, 'public', 'files', 'game''images', 'Urf.png');
    var urfDl = request('https://www.dropbox.com/s/lngb5mdu9ctxo3c/Urf.png?dl=1');
    urfDl.pipe(fs.createWriteStream(urfFile));
    urfDl.on('end', function(err) {
        if (err) return cb('error downloading urf' + err);
        return cb(false);
    });
}

// // find latest LoL version
// league.Static.getVersions('na', function(err, versions) {
//     if (err) return console.error(err);
//     console.dir('latest: ' + versions[0]);
//     var latestVersion = versions[0];
//     // download dragontail
//     var download = request('http://ddragon.leagueoflegends.com/cdn/dragontail-' + latestVersion + '.tgz')
//     var saveFile = path.join(tmpDir, 'dragontail-' + latestVersion + '.tgz');
//     download.on('response', function(response) {
//         console.log(response.statusCode) // 200
//         console.log(response.headers['content-type']) // 'image/png'
//     })
//     download.pipe(fs.createWriteStream(saveFile));
//     download.on('end', function() {
//         console.log('download done.');
//         var archive = new targz().extract(saveFile, path.join(tmpDir, 'dragoon'), function(err) {
//             if (err) return console.log('got an error decompressing: ' + err);
//             console.log('archive extracted');
//             // move profileicon images
//             //var profileIconSrcDir = path.join(tmpDir, 'dragoon', latestVersion, 'img', 'profileicon');
//             //var profileIconDstDir = path.join(rootDir, 'public', 'profileicon');
//             //fs.copy(profileIconSrcDir, profileIconDstDir, function(err) {
//                 //if (err) return console.error('err moving profileicon dir');
//                 //console.log('success copying profileicon dir');
//             var champImgSrcDir = path.join(tmpDir, 'dragoon', latestVersion, 'img', 'champion');
//             fs.copy(champImgSrcDir, championImgDir, function(err) {
//                 if (err) return console.error('err moving champ dir');
//                 console.log('success copying champ dir');
//                 var urfFile = path.join(rootDir, 'public', 'Urf.png');
//                 var urfDl = request('https://www.dropbox.com/s/lngb5mdu9ctxo3c/Urf.png?dl=1');
//                 urfDl.pipe(fs.createWriteStream(urfFile));
//                 urfDl.on('end', function(err) {
//                     if (err) return console.log('error downloading urf' + err);
//                     console.log('downloaded Urf');
//                 });
//             });
//         });
//     });
// });
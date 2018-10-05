# guess-that-champion

[![Greenkeeper badge](https://badges.greenkeeper.io/insanity54/guess-that-champion.svg)](https://greenkeeper.io/)

Guess the league of legends champion game. [Play it here](http://teamrpc.info)


# Admin Guide

## Overview

A node.js script, index.js, serves up the game to the client. The client does most of the rendering, but the server serves the champion images at `/files/game/images/champion/[CHAMPION_NAME].png`.

## Installation

Use `npm install`

create a config file, /config.json which contains one key, 'RIOTKEY'. the value should be your Riot games API key. If you don't have one, get one here: https://developer.riotgames.com/

config.json should look something like this:

    {
        "RIOTKEY": "12345678-1234-1234-1234-123456789012"
    }

## Running

You can start the server using `npm start` or `node index.js`. Pass the environment variable PORT the port you want the server to listen on. If you don't specify one, the default port is 8787.

## Directory structure

### /

server run scripts and junk.

  - index.js - serves the game
  - config.json - config file you must create yourself (see above section Installation)
  - LICENSE - blah blah stupid stuff, IP is made up and exists only in greedy ppl's minds.
  - bower.json - list of js dependencies needed for client side game
  - package.json - list of js deps for server side

### /lib

backend utility scripts go here

  - downloadDragoon.js
    - downloads updated champion list, pictures and other assets from Riot, places them in /public/files/game/data and /public/files/game/images/champion

### /public

everything being made publically accessible by the node server. All game assets, html/js/css


## TODO

line 135 of Game.js, make the endgame

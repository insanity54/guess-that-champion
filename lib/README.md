download dragoon updates the champion database using the riot api.

to run, set your riot api key to RIOTKEY environment variable or create config.json with RIOTKEY defined.

depends on the LeagueJs lib by matthewferderber (https://github.com/matthewferderber/LeagueJS) because the lib of the same name in npm (https://github.com/claudiowilson/LeagueJS/) isn't up to date with Riot's api. ../package.json has this module dependency in devDependencies for your convenience. (npm install --development)

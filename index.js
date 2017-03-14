var gameDetails = require('./game-details-json'),
	teamSchedule = require('./team-schedule'),
	tourneyGames = require('./tournament-games'),
	fs = require('fs-extra');


/* Get the tourney games to extract the teams */
tourneyGames(loopTourneyGamesForTeamIds);

function loopTourneyGamesForTeamIds(gameArray) {
	console.log('Getting all NCAA Tournament Games');
	gameArray.forEach(function (data) {
		gameDetails(data, extractTeamSlug);
	});
}

function extractTeamSlug(json) {
	console.log('Getting all NCAA Tournament Teams & Schedules');
	const teamA = json.data.teams[0].slug ? json.data.teams[0].slug.replace('college-basketball/team/', '') : false;
	const teamB = json.data.teams[1].slug ? json.data.teams[1].slug.replace('college-basketball/team/', '') : false;
	teamA && teamSchedule(teamA, saveScheduleData);
	teamB && teamSchedule(teamB, saveScheduleData);
}

function saveScheduleData(gamesArray) {
	gamesArray.forEach(function (data) {
		gameDetails(data, function (json) {
			console.log(`${json.data.teams[0].title} vs ${json.data.teams[1].title}`);
			const file = `./game-data/${json.data.teams[0].slug.replace('college-basketball/team/', '')}.json`;
			fs.ensureFileSync(file);
			var obj = fs.readJsonSync(file, { throws: false })
			if (!obj) {
				obj = {};
				obj.team = json.data.teams[0].title;
				obj.id = json.data.teams[0].id;
				obj.slug = json.data.teams[0].slug.replace('college-basketball/team/', '');
				obj.games = [];
			}
			obj.games.push({
				'date': json.data.start.local,
				'type': json.data.teams[0].location.type,
				'3PA': 0,
				'3PM': 0
			});
			fs.outputJsonSync(file, obj)
			//fs.writeFile(`./game-data/${json.data.id}.json`, JSON.stringify(json));
		});
	});
}

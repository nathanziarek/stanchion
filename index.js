var gameDetails = require('./game-details-json'),
	 teamSchedule = require('./team-schedule'),
	 tourneyGames = require('./tournament-games'),
	 fs = require('fs-extra');


/* Get the tourney games to extract the teams */
tourneyGames(loopTourneyGamesForTeamIds);

function loopTourneyGamesForTeamIds(gameArray){
	gameArray.forEach(function(data){
		gameDetails(data, extractTeamSlug);
	});
}

function extractTeamSlug(json){
	const teamA = json.data.teams[0].slug ? json.data.teams[0].slug.replace('college-basketball/team/', '') : false;
	const teamB = json.data.teams[1].slug ? json.data.teams[1].slug.replace('college-basketball/team/', '') : false;
	teamA && teamSchedule(teamA, saveScheduleData);
	teamB && teamSchedule(teamB, saveScheduleData);
}

function saveScheduleData(gamesArray){
	gamesArray.forEach(function(data){
		gameDetails(data, function(json){

			console.log(`${json.data.teams[0].title} vs ${json.data.teams[1].title}`);
			fs.writeFile(`./game-data/${json.data.id}.json`, JSON.stringify(json));
		});
	});
}

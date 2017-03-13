var request = require('request'),
	unique = require('array-unique');

const teamId = 'norfolk-state-spartans',
	teamScheduleUrl = `http://www.si.com/college-basketball/team/${teamId}/schedule`,
	gameIdList = [];

console.log(teamScheduleUrl);

request(teamScheduleUrl, function (error, response, body) {
	if (response && response.statusCode == 200) {
		const recapLinks = body.match(/\/college-basketball\/game\/\d+/gim);
		recapLinks.map(function (data) {
			gameIdList.push(data.match(/\d+/)[0]);
		});
		gameIdList = unique(gameIdList);
	}
});

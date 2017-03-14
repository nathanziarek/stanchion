// Gets all games played by a team
// Accepts a teamId & callback, returns array of game Ids

module.exports = function (teamId, cb) {

	var request = require('request'),
		unique = require('array-unique');

	const teamScheduleUrl = `http://www.si.com/college-basketball/team/${teamId}/schedule`
	var gameIdList = [];

	request(teamScheduleUrl, function (error, response, body) {
		if (response && response.statusCode == 200) {
			const recapLinks = body.match(/\/college-basketball\/game\/\d+/gim);
			recapLinks.map(function (data) {
				gameIdList.push(data.match(/\d+/)[0]);
			});
			cb && cb(unique(gameIdList));
		}
	});

}

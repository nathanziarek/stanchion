// Gets all tournament games from SI
// Accepts a callback, returns array of game Ids

module.exports = function (cb) {

	var request = require('request'),
		unique = require('array-unique');

	const tournamentUrl = 'http://www.si.com/college-basketball/ncaa-mens-basketball-bracket';
	var gameIdList = [];

	request(tournamentUrl, function (error, response, body) {
		if (response && response.statusCode == 200) {
			const previewLinks = body.match(/\/college-basketball\/game\/\d+/gim);
			previewLinks.map(function (data) {
				gameIdList.push(data.match(/\d+/)[0]);
			});
			cb && cb(unique(gameIdList));
		}
	});

}

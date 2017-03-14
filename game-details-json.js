// Gets all game details
// Accepts a gameId & callback, returns full object of game data


module.exports = function (gameId, cb) {

	var request = require('request');

	const gameUrl = `http://www.si.com/private/stats-proxy/v1/ncaab/game_detail?id=${gameId}&league=ncaab&box_score=true`;

	request(gameUrl, function (error, response, body) {
		if (response && response.statusCode == 200) {
			cb && cb(JSON.parse(body));
		}
	});

}

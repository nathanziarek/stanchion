var request = require('request');

const gameId = '1689144',
		gameUrl = `http://www.si.com/private/stats-proxy/v1/ncaab/game_detail?id=${gameId}&league=ncaab&box_score=true`;

console.log(gameUrl);

request(gameUrl, function (error, response, body) {
  if(response && response.statusCode == 200) {
    console.log(JSON.parse(body));
  }
});

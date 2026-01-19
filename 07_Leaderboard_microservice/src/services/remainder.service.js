const {leaderboardService} = require('../services/index')

const subscribeEvent = async (payload) => {
  try {
    let service = payload.service;
    let data = payload.data;

    // console.log(`service => ${service} '\n' data => ${data}`);

    switch (service) {
      case "UPDATE_FANTASY_POINTS":
        // console.log("data => ", data);
        await leaderboardService.updateLeaderboard({matchId: data.matchId,contestId: data.contestId, gameId: data.gameId,playerId: data.playerId,fantasyPoint: data.fantasyPoint,   });
      break;

      default:
        break;
    }

    // return res;
  } catch (error) {
    console.log("Something went wrong in service layer (subscribeEvent)");
    throw error;
  }
};


module.exports = {subscribeEvent}
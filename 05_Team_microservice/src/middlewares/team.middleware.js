const { ClientErrorsCodes } = require('../utlis/Errors/https_codes')


class TeamMiddleware {
  


  addTeam(req, res, next) {
    const { userId, players, matchId, contestId, gameId, totalCredits } = req?.body;

    if (!userId || !matchId || !contestId || !gameId || totalCredits === undefined || totalCredits === null || !players || !Array.isArray(players) || players.length === 0) {
      return res.status(ClientErrorsCodes.BAD_REQUEST).json({ data: {}, message: 'All fields are required (userId, matchId, contestId, gameId, totalCredits, players)', success: false });
    }

    next();
  };

  
}

const teamMiddleware = new TeamMiddleware()

module.exports = teamMiddleware;

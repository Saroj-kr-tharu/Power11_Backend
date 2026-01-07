const { ClientErrorsCodes } = require('../utlis/Errors/https_codes')


class ContestMiddleware {
  


  joinContest(req, res, next) {
    const userId = req?.userId; 
    const {  contestId, matchId, gameId, teamId, joinFee } = req?.body;

    if (!userId || !contestId || !matchId || !gameId || !teamId || joinFee === undefined || joinFee === null) {
      return res.status(ClientErrorsCodes.BAD_REQUEST).json({ data: {}, message: 'All fields are required (userId, contestId, matchId, gameId, teamId, joinFee)', success: false });
    }

    next();
  };

  
}

const contestMiddleware = new ContestMiddleware()

module.exports = contestMiddleware;

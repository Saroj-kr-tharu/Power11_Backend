
const {ClientErrorsCodes} = require('../utlis/Errors/https_codes')

class ScoreMiddleware {
    
    addScoreRule(req, res, next) {
        const { gameId, eventType, points, conditions } = req?.body;

        if (!gameId || !eventType || typeof points !== 'number') {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                message: "Required field is missing: gameId, eventType, or points",
                success: false,
            });
        }

        if (conditions && typeof conditions !== 'object') {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                message: "Conditions must be an object",
                success: false,
            });
        }

        next();
    }


    addMatchEvent(req, res, next) {
        const { matchId, gameId, playerId, eventType, eventValue, fantasyPoints, metadata } = req?.body;

        if (!matchId || !gameId || !playerId || !eventType || typeof fantasyPoints !== 'number') {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                message: "Required field is missing: matchId, gameId, playerId, eventType, or fantasyPoints",
                success: false,
            });
        }

        if (eventValue !== undefined && typeof eventValue !== 'number') {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                message: "eventValue must be a number if provided",
                success: false,
            });
        }

        if (metadata && typeof metadata !== 'object') {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                message: "metadata must be an object",
                success: false,
            });
        }

        if (conditions && typeof conditions !== 'object') {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                message: "createdBy must be either 'ADMIN' or 'SYSTEM'",
                success: false,
            });
        }

        next();
    }
    
    

   

}





const scoreMiddleware = new  ScoreMiddleware()
module.exports = scoreMiddleware; 

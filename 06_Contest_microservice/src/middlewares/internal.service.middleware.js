
const {ClientErrorsCodes} = require('../utlis/Errors/https_codes')
const {INTERNAL_SERVER_TOKEN} = require('../config/server.config')
const {JwtHelper} = require("../utlis/index")

class InternalServiceMiddleware {
    
   async checkInternalServiceToken(req, res, next) { 
        if (!req.headers["x-internal-server-token"]) {
            // console.log("Try to access without Internal Service Token");
          return res.status(ClientErrorsCodes.FORBIDDEN).json({ message: "Forbidden", success: false });
        }

        if (req.headers["x-internal-server-token"] != INTERNAL_SERVER_TOKEN) {
            // console.log("Try to access with modified token");
          return res.status(ClientErrorsCodes.UNAUTHORIZED).json({ message: "Unauthorized", success: false });
        }
        
        const token = req?.headers['x-access-token'];
        if (!token ) 
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({ message: "token is missing ", success: false, });

        try {
            const response = await JwtHelper.verifyToken(token)   
                // console.log('response => ', response)            
            if(response) {
                req.userId= response?.data?.id;
                req.email = response?.data?.email;
                return  next();
            } 
           throw new Error("Token Expired")
        } catch (error) {
            return res.status(ClientErrorsCodes.UNAUTHORIZED).json({
                data: {},
                message: "Invalid token or Token expired",
                success: false,
            });
        }

    }
    
}



const internalServiceMiddleware = new  InternalServiceMiddleware()
module.exports = internalServiceMiddleware; 

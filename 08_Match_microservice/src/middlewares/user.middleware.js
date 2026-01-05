
const {ClientErrorsCodes} = require('../utlis/Errors/https_codes')
const {JwtHelper} = require("../utlis/index")

class UserMiddleware {
    verifyToken  (req, res, next)  {
        const token = req?.headers['x-access-token'];
        if (!token ) {
            console.log("token is missing ");
            
            return res.status(ClientErrorsCodes.UNAUTHORISED).json({
            data: {},
            message: "token is missing  ",
            success: false,
            });
        }

      next();
    };
    
    async validateToken  (req, res, next)  {
        const token = req?.headers['x-access-token'];
        if (!token ) {
            console.log("token is missing ");
            
            return res.status(ClientErrorsCodes.UNAUTHORISED).json({
              data: {},
              message: "token is missing  ",
              success: false,
            });
        }
        try {
            const response = await JwtHelper.verifyToken(token)   
                console.log('response => ', response)            
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

      
    };

    verifyRefreshToken  (req, res, next)  {

      try {
                
        const oldToken = req.cookies['refreshToken'];
        
          if (!oldToken ) {
              console.log("No refresh token is missing ");
              
              return res.status(ClientErrorsCodes.UNAUTHORISED).json({
              data: {},
              message: "refresh token is missing  ",
              success: false,
              });
          }

        next();
      } catch (error) {
           return res.status(ClientErrorsCodes.NOT_FOUND).json({
            message: "refresh token is missing ",
            success: false,
          });
         
      }

        
    };

}





const userMiddlewares = new  UserMiddleware()

module.exports = userMiddlewares; 

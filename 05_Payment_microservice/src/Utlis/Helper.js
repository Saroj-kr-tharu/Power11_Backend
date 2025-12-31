const crypto = require("crypto");


class Helper {

    async genRandString() {
        try {
            const randomString = crypto.randomBytes(16).toString('hex'); 
            return randomString;
        } catch (error) {
            throw error;
        }
    }


   
}

const helper = new Helper();
module.exports = helper;
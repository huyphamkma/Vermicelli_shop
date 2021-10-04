const jwt = require('jsonwebtoken');
const JWT_SECRET = 'shh'


class jwtHelper {
    generateToken(id){
        return jwt.sign({id}, JWT_SECRET, {
            expiresIn: 3600
        })
    }

    authenToken(token) {
        return jwt.verify(token, JWT_SECRET)
    }
}


module.exports = new jwtHelper
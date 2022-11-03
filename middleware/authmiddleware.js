const jwt = require('jsonwebtoken');

const Authorize = async (req, res, next) => {
    try {
        const token = await req.header('Authorization')
        const decode = await jwt.verify(token, 'verySecretValue')
        req.user = decode
        if(decode){
            next()
        }else{
            res.status(403).json({
                status : 403,
                message: 'Authorization failed ....'
            })
        }
    }
    catch (error) {
        res.json({
            message:error
        })
    }
}

module.exports = {Authorize};


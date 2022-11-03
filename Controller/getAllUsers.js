const User = require('../Models/userModel');

const getUser = async(req, res) => {
     
        let result = await User.find().select(['userName','-_id'])
        return res.status(200).json({ user: result })
     
    
}

module.exports={getUser};
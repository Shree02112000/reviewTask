const express = require('express')
const router = express.Router()

const {register,login} = require('../Controller/user')
const {getUser}= require('../Controller/getAllUsers')
const {Authorize} = require("../middleware/authmiddleware")
const {errHandle} = require("../utils/errorhandle")
const {userRegister,userLogin} =require("../Validation/userVallidation")

router.post('/register',userRegister,register )
router.post('/login',userLogin,login)
router.get('/getAllUser',Authorize,errHandle(getUser))

module.exports = router;
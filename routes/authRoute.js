const userControler = require('../controllers/userControler')
const Auth = require('../midleware/Auth')
const authAdmin = require('../midleware/authAdmin')
const router = require('express').Router()

router.post('/register',userControler.setRegister)

router.post('/login',userControler.setLogin)

router.get('/getuser',Auth,userControler.getUserInfor)

router.get('/getall',Auth,authAdmin,userControler.getAllUser)

module.exports = router
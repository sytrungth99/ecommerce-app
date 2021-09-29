const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl')
const authAdmin = require('../midleware/authAdmin')
const Auth = require('../midleware/Auth')

router.get('/category',categoryCtrl.getCategory)

router.post('/category',Auth,authAdmin,categoryCtrl.createCategory)

router.delete('/category/:id',Auth,authAdmin,categoryCtrl.deleteCategory)

router.put('/category/:id',Auth,authAdmin,categoryCtrl.updateCategory)

module.exports = router
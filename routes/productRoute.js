const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')
const authAdmin = require('../midleware/authAdmin')
const Auth = require('../midleware/Auth')

router.route('/products')
    .get(productCtrl.getProducts)
    .post(Auth,authAdmin,productCtrl.createProduct)
router.route('/products/:id')
    .patch(productCtrl.review)

    .delete(Auth,authAdmin,productCtrl.deleteProduct)

    .put(Auth,authAdmin,productCtrl.updateProduct)

module.exports = router
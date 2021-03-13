const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')
const auth = require('../middleware/auth')



router.route('/products')
    .get(productCtrl.getProducts)
    .post(auth,  productCtrl.createProduct)


router.route('/products/:id')
    .delete(auth, productCtrl.deleteProduct)
    .put(auth,  productCtrl.updateProduct)



module.exports = router
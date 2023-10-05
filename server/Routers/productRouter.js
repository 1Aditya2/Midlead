const router=require('express').Router()
const productController=require('../Controllers/productController')
//creating different routes here
router.post('/',productController.postProduct)
router.get('/getProducts',productController.getProducts)
router.get('/getCart',productController.getCart)
router.post('/removeFromCart',productController.removeFromCart)
router.post('/removeCartItem',productController.removeCartItem)
router.post('/addToCart',productController.addToCart)



module.exports=router
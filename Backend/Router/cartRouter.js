const express = require('express')
const router = express.Router()
const { getCartController, addToCartController, updateCartController } = require('../Controller/cartController')
const { verifyUser } = require('../Middleware/verifyUser')

router.get('/get', verifyUser, getCartController)
router.post('/add', verifyUser, addToCartController)
router.post('/update', verifyUser, updateCartController)

module.exports = router
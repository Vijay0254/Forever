const express = require('express')
const router = express.Router()
const { placeCodOrderController, placeStripeOrderController, placeRazorpayOrderController, getAllOrdersController, userOrdersController, updateOrderStatusController, verifyStripeController, verifyRazorpayController } = require('../Controller/orderController')
const { verifyUser } = require('../Middleware/verifyUser')
const { verifyAdmin } = require('../Middleware/verifyAdmin')

router.post('/place/cod', verifyUser, placeCodOrderController)
router.post('/place/stripe', verifyUser, placeStripeOrderController)
router.post('/verify/stripe', verifyUser, verifyStripeController)
router.post('/place/razorpay', verifyUser, placeRazorpayOrderController)
router.post('/verify/razorpay', verifyUser, verifyRazorpayController)
router.get('/get/user/:id', verifyUser, userOrdersController)

router.post('/update/status', verifyAdmin, updateOrderStatusController)
router.get('/get/all', verifyAdmin, getAllOrdersController)


module.exports = router
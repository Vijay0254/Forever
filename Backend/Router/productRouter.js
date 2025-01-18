const express = require('express')
const router = express.Router()
const { addProductController, removeProductController, getAllProductController, getEachProductController } = require('../Controller/productController')
const upload = require('../Utils/multer')
const { verifyAdmin } = require('../Middleware/verifyAdmin')

router.post('/add', verifyAdmin, upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1}, {name: 'image4', maxCount: 1}]), addProductController)
router.delete('/remove/:id', verifyAdmin, removeProductController)
router.get('/get/all', getAllProductController)
router.get('/get/each/:id',  getEachProductController)

module.exports = router
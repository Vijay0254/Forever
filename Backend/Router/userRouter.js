const express = require('express')
const router = express.Router()
const { loginUserController, SignupUserController, logoutUserController, verifyUserController, loginAdminController, logoutAdminController, verifyAdminController } = require('../Controller/userController')
const { verifyUser } = require('../Middleware/verifyUser')
const { verifyAdmin } = require('../Middleware/verifyAdmin')

router.post('/user/signup', SignupUserController)
router.post('/user/login', loginUserController)
router.get('/user/logout', logoutUserController)
router.get('/user/verify', verifyUser, verifyUserController)

router.post('/admin/login', loginAdminController)
router.get('/admin/logout', logoutAdminController)
router.get('/admin/verify', verifyAdmin, verifyAdminController)

module.exports = router
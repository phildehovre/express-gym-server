const {Router } = require('express')
const authController = require('../controllers/authControllers.js') 
const router = Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

module.exports = router
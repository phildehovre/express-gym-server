const {Router} = require('express')
const router = Router()
const stripeControllers = require('../controllers/stripeControllers.js')
const express =require('express')

router.post('/create-checkout-session', stripeControllers.createCheckoutSession);
router.post('/create-portal-session', stripeControllers.createPortalSession);
router.post('/webhook', express.raw({ type: 'application/json' }), stripeControllers.webhook);
router.post('/create-payment-intent', stripeControllers.createPaymentIntent)

module.exports = router;
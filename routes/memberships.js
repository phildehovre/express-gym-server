const {Router} = require('express')
const Membership = require('../models/Membership.js')
const router = Router()

router.get('/', (req, res, next) => {
    return res.status(200).send('memberships here')
})

router.post('/', async (req, res, next) => {
    try {
        await Membership.create({
            type: req.body.type,
            startDate: req.body.startDate,
            active: req.body.active,
            owner: req.body.owner,
            endDate: req.body.endDate,
        })

        return res.status(201).json('success')
    } catch (err) {
        return res.status(500).json({msg: `There was an error creating a new membership: ${err}`})
    }
})

module.exports = router
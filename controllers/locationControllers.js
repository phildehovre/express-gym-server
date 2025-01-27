const Location = require('../models/Location.js')


module.exports.create = async (req, res) => {
    try {
        await Location.create({
            name: req.body.name,
            address: req.body.address,
            postcode: req.body.postcode,
            city: req.body.city,
            country: req.body.country,
            coordinates: req.body.coordinates,
            phone: req.body.phone, 
            email: req.body.email  
        })
        res.status(201).json('success')
    }
        catch (error) {
            console.log(error)
        }
}
module.exports.getAll = async (_, res) => {
    try {
        const locations =  await Location.find()
        res.status(200).json(locations)
    } catch (error) {
        console.log(error)
    }
}

module.exports.update = async (req, res) => {
    try {
        const location = await Location.findOne({_id: req.body.locationId})
        for (let key in req.body.payload) {
            location[key] = req.body.payload[key]
        }
        location.save()
        res.status(201).json(location)
        }  catch (error) {
       console.log(error) 
    }
}

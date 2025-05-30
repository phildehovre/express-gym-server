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
module.exports.getAll = async (req, res) => {
    const term = req.query.q
    if (term) {
        // TODO: deal with accents
        // TODO: deal with languages
        const locations = await Location.find( 
            { $or: [{ city: term}, {country: term}]} ).populate('extrasIds')
        return res.status(200).json(locations)
    }
    try {
        const locations =  await Location.find()
        res.status(200).json(locations)
    } catch (error) {
        console.log(error)
    }
}

module.exports.getNear = async (req,res) => {
    const lat = parseFloat(req.query.lat)
    const lng = parseFloat(req.query.lng)
    const range = parseFloat(req.query.rng) * 1000
    const params = req.params

    if (isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({error: 'invalid or missing latitude/longitude'})
    }
    if (lat && lng) {
        try {
            const locations = await Location.find({
                geolocation: {
                    $near: {
                        $geometry: {
                            type: "Point" ,
                            coordinates: [ lng , lat]
                        },
                        // in meters
                        $maxDistance: range,
                        $minDistance: 0
                        }
                    }
                }).populate('extrasIds');
                if (locations.length == 0) {
                    return res.status(404).json({error: `no location found within a ${range / 1000}km range`})
                }
                return res.status(200).json(locations)
        } catch (err) {
            return res.status(500).json({error: 'No location found: '+ err})
        }
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

module.exports.getOne = async (req, res) => {
    if (req.params.id.length !== 24) {
        res.status(400).json({msg: 'invalid ID'})
    }
    try {
        const location = await Location.findOne({_id: req.params.id})
        if (location) {
            res.status(200).json(location)
        } else {
            res.status(404).json({msg: 'No club found'})
        }

    } catch (error) {
        console.error(error)
    }
}

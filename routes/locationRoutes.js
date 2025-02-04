const {Router} = require('express')
const router = Router();
const locationController = require('../controllers/locationControllers.js')


router.post('/', locationController.create);
router.get('', locationController.getAll);
router.patch('/', locationController.update);
router.get('/club/:id', locationController.getOne)
router.get('/near', locationController.getNear);

module.exports = router;
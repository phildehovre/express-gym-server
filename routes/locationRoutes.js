const {Router} = require('express')
const router = Router();
const locationController = require('../controllers/locationControllers.js')


router.post('/', locationController.create);
router.get('', locationController.getAll);
router.patch('/', locationController.update);
router.get('/:id', locationController.getOne)

module.exports = router;
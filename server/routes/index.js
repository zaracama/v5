const Controller = require('../controllers/controller')
const authentication = require('../middlewares/authentication')
const router = require('express').Router()

router.get('/discord-login', Controller.discordLogin)
router.get('/cuisines', Controller.cuisines)
router.get('/cuisines/featured', Controller.getFeaturedCuisines)
router.get('/catalogs', Controller.catalogs)

router.use(authentication)

router.get('/bins', Controller.bins)
router.post('/bins/:cuisineId', Controller.createBin)
router.delete('/bins/:id', Controller.deleteBin)
router.patch('/bins/:id', Controller.patchBin)

router.post('/generate-midtrans-token', Controller.generateMidtransToken)
router.delete('/checkout', Controller.clearBinAfterPayment)
module.exports = router
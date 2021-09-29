const router = require('express').Router()
const historyCtrl = require('../controllers/historyCtrl')


router.get('/history',historyCtrl.getHistory)
router.post('/history',historyCtrl.createHistory)

module.exports = router
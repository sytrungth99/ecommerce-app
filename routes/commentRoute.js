const route = require('express').Router()

const commentCtrl = require('../controllers/commentCtrl')

route.get('/comments/:id',commentCtrl.getComment)


module.exports = route
//Network de auth
const express = require('express')

const response = require('../../../newtork/response')
const controller = require('./index')

const router = express.Router();
router.post('/login', function(req, res){
      controller.login(req.body.username, req.body.passwd)
            .then((token) => {
                  response.success(req, res, token, 200)
            }).catch(e => {
                  response.error(req, res, e, 400)
            })
})

module.exports = router
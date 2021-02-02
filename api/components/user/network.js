//Network del user
const express = require('express');
const response = require('../../../newtork/response');
const router = express.Router();

router.get('/', function (req,res){
      response.success(req, res, 'Todo funciona ok', 200)
})

module.exports = router;
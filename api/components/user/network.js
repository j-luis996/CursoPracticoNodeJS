//Network del user
const express = require('express');

const response = require('../../../newtork/response');
const controller = require('./index');

const router = express.Router();

router.get('/', function (req,res){
      controller.list()
            .then((lista) => {
                  response.success(req, res, lista, 200);
            }).catch((error) => {
                  response.error(req,res,error.message,500)
             });
      
})
router.get('/:id', function (req,res){
      controller.get(req.params.id)
            .then((user) => {
                  response.success(req, res, user, 200)
            }).catch((error) => {
                  response.error(req,res,error.message,500)
             })
      
})

module.exports = router
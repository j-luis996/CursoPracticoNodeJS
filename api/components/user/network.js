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
router.post('/inset',function (req, res){
      controller.insert(req.body.name)
            .then((data)=>{
                  response.success(req, res, data, 200)
            }).catch((error) => {
                  response.error(req,res,error,500)
             })
})
router.patch('/update',function(req, res){
      controller.update(req.body)
            .then((data)=>{
                  response.success(req, res, data, 200)
            }).catch((error) => {
                  response.error(req,res,error,500)
            })
})
router.delete('/delete',function(req, res){
      controller.remove(req.body.id)
            .then((data)=>{
                  response.success(req, res, data, 200)
            }).catch((error) => {
                  response.error(req,res,error,500)
            })
})
module.exports = router
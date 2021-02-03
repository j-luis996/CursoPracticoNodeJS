//Network del user
const express = require('express');

const response = require('../../../newtork/response');
const controller = require('./index');

const router = express.Router();

router.get('/', listarUsuarios)
router.get('/:id', obtenerUsuario)
router.post('/inset', crearUsuario)
router.patch('/update',actualizarUsuario)
router.delete('/delete',eliminarUsuario)

function listarUsuarios(req,res){
      controller.list()
            .then((lista) => {
                  response.success(req, res, lista, 200);
            }).catch((error) => {
                  response.error(req,res,error.message,500)
             });
      
}

function obtenerUsuario(req,res){
      controller.get(req.params.id)
            .then((user) => {
                  response.success(req, res, user, 200)
            }).catch((error) => {
                  response.error(req,res,error.message,500)
             })
      
}

function crearUsuario(req, res){
      controller.insert(req.body.name)
            .then((data)=>{
                  response.success(req, res, data, 200)
            }).catch((error) => {
                  response.error(req,res,error,500)
             })
}

function actualizarUsuario(req, res){
      controller.update(req.body)
            .then((data)=>{
                  response.success(req, res, data, 200)
            }).catch((error) => {
                  response.error(req,res,error,500)
            })
}

function eliminarUsuario (req, res){
      controller.remove(req.body.id)
            .then((data)=>{
                  response.success(req, res, data, 200)
            }).catch((error) => {
                  response.error(req,res,error,500)
            })
}
module.exports = router
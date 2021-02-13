//Network del user
const express = require('express');

const secure = require('./secure')
const response = require('../../../newtork/response');
const controller = require('./index');


const router = express.Router();

router.get('/', listarUsuarios)
router.get('/:id', obtenerUsuario)
router.post('/upsert', upsertUser)
router.put('/update', secure('update'),upsertUser)
router.delete('/delete',eliminarUsuario)

function listarUsuarios(req,res, next){
      controller.list()
            .then((lista) => {
                  response.success(req, res, lista, 200);
            }).catch(next);
      //la funcion next se incluye en los middlewre de expres por defecto
}

function obtenerUsuario(req,res, next){
      controller.get(req.params.id)
            .then((user) => {
                  response.success(req, res, user, 200)
            }).catch(next)
      
}

function upsertUser(req, res, next){
      controller.upsert(req.body)
            .then((data) => {
                        response.success(req, res, data, 200);
                  }).catch(next)
}

function eliminarUsuario (req, res, next){
      controller.remove(req.body.id)
            .then((data)=>{
                  response.success(req, res, data, 200)
            }).catch(next)
}
module.exports = router
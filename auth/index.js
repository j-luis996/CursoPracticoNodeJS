const jwt = require('jsonwebtoken')

const config = require('../config')
const errors = require('../utils/error')

function sing(data){
      return jwt.sign(data, config.auth.palabraSecreta)
}

function verify(token){
      return jwt.verify(token, config.auth.palabraSecreta)
}

const check = {
      own: function (req,owner){
            const decoded = decodeHeader(req)
            console.log(decoded)
            
            if(decoded.id !== owner){
                  throw errors('No puedes acceder a esto',401)
            }
      }
}

function getToken(auth){
      if(!auth){
            throw errors('Autenticacion fallida',400)
      }
      if(auth.indexOf('Bearer ')===-1){
            throw errors('Formato no valido',400)
      }
      let token = auth.replace('Bearer ','')
      return token
}

function decodeHeader(req){
      const authorization = req.headers.authorization || ''
      const token = getToken(authorization)
      const decoded = verify(token)

      req.user = decoded //esto es por si se quiere usar el decoded despues
      return decoded
}
module.exports = {
      sing,
      check
}
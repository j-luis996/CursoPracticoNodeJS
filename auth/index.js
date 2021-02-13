const jwt = require('jsonwebtoken')

const config = require('../config')

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
                  throw new Error('No puedes acceder a esto')
            }
      }
}

function getToken(auth){
      if(!auth){
            throw new Error('no hay token')
      }
      if(auth.indexOf('Bearer ')===-1){
            throw new Error('formato invalido')
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
const jwt = require('jsonwebtoken')

const config = require('../config')

function sing(data){
      return jwt.sign(data, config.auth.palabraSecreta)
}

module.exports = {
      sing,
}
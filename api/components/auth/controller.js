const auth = require('.')

//controlador de auth
const TABLE = 'auth'
module.exports = function (injecterStore){
      let store = injecterStore

      if(!store){
            store = require('../../../store/dummy')
      }
      function upsert(data){
            const authData= {
                  id: data.id
            }

            if(data.username){
                  authData.username = data.username
            }

            if(data.passwd){
                  authData.passwd = data.passwd
            }
            
            store.upsert(TABLE,authData)
      }

      return {
            upsert
      }
}
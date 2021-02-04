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

      async function remove(id){
            return await store.remove(TABLE,id)
      }

      return {
            upsert,
            remove
      }
}
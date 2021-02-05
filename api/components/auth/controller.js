//controlador de auth
const bcrypt = require('bcrypt')
const auth = require ('../../../auth/index')

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

      async function login(username, passwd){
            const data = await store.query(TABLE, {username: username})
            let token
            await bcrypt.compare(passwd, data.passwd)
                  .then((result)=>{
                        if(result){
                              token = auth.sing(data)
                        }else{
                              token = ""
                              throw new Error('informacion invalida')
                        }
                        
                  }).catch(error =>{
                        throw new Error('informacion invalida')
                  })
                  return token
      }
      return {
            upsert,
            remove,
            login,
      }
}
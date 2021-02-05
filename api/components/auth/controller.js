//controlador de auth
const bcrypt = require('bcrypt')
const auth = require ('../../../auth/index')

const TABLE = 'auth'

module.exports = function (injecterStore){
      let store = injecterStore

      if(!store){
            store = require('../../../store/dummy')
      }
      async function upsert(data){
            const authData= {
                  id: data.id
            }

            if(data.username){
                  authData.username = data.username
            }

            if(data.passwd){
                  /**Nota
                   * en este caso yo guardo la contraseña directamente por que el cifrado lo realicé en 
                   * el controller de usuario, al llegar aquí la contraseña ya es solo un hash
                   */
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
            /**
             * como nota, tuve varios problemas para retornar el token, ya que estaba
             * retornando el toquen desde dentro de la promesa de bcrypt y no retornaba nada
             * en la clase del curso el profesor retorna el bcrypt completo para poner el return
             * dentro de la promesa
             */
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
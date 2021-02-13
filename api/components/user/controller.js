//Controller del user
const { nanoid } = require("nanoid")
const bcrypt = require('bcrypt')

const config = require('../../../config')
const auth = require('../auth')

const TABLE = 'user'

module.exports = function (injecterStore){
      let store = injecterStore

      if(!store){
            store = require('../../../store/dummy')
      }

      function list(){
            return store.list(TABLE)
      }
      
      function get(id){
            return store.get(TABLE, id)
      }

      async function upsert(data){
            let newUser = {}
            let newAuth = {}
            if(data.id){
                  newUser.id = data.id
                  newAuth.id = data.id
            }
            else{
                  newUser.id = nanoid()
                  newAuth.id = newUser.id
            }

            if(data.name){
                  newUser.name = data.name
            }
            
            if(data.username){
                  newUser.username = data.username
                  newAuth.username = data.username
            }
            /**
             * en este caso el cifrado de la contraseña la realizo aquí, 
             * en los videos del curso el profesor realiza el cifrado dentro
             * del controller de auth pero #YOLO XD
             */
            if(data.passwd){
                  await bcrypt.hash(data.passwd,config.api.saltRounds)
                        .then((result) => {
                              newAuth.passwd = result
                        }).catch(error => {
                              console.error(error)
                        })
            
            }   
            if(data.passwd || data.username){
                  await auth.upsert(newAuth)
            }
            return store.upsert(TABLE, newUser)
      }

      async function remove(id){
            try {
                  await auth.remove(id)
            } catch (error) {
                  console.error(error)
            }           
            return store.remove(TABLE,id)
      }

      return {
            list,
            get,
            upsert,
            remove,
      }
}
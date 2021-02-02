//Controller del user
const { nanoid } = require("nanoid")
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
      function insert(name){
            if(!name){
                  return store.insert(TABLE, null)
            }
            const user ={
                  id: nanoid(),
                  name
            }
            return store.insert(TABLE, user)
      }
      function update(data){
            return store.update(TABLE, data)
      }
      function remove(id){
            return store.remove(TABLE,id)
      }
      return {
            list,
            get,
            insert,
            update,
            remove,
      }
}
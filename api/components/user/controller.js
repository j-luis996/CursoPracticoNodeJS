//Controller del user

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
      function insert(data){
            return store.insert(TABLE, data)
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
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
      return {
            list,
            get,
      }
}
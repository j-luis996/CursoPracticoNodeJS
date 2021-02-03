const db = {
      'user': [
            {id: "1", name: 'jorge'},
            {id: "2", name: 'luis'}
      ]
};

async function list(table){
      return db[table]
}

async function get(table, id){
      let col = await list(table)
      return col.filter(item => item.id === id)[0] || null
}

async function insert(table, data){
      if(!data){
            return Promise.reject('Error al crear al usuario')
      }
      return await db[table].push(data)
}

function update(table, data){
      return new Promise(async (resolve,reject)=> {
            let col = await list(table)
            col.filter(item =>{
                  if(item.id === data.id){
                        item.name = data.name
                        resolve(item)
                  }
            })
            reject('Algo salio mal')
      })
}

function remove(table, id){
      return new Promise(async (resolve,reject) =>{
            let col = await list(table)
            let cont = 0
            await col.filter(item => {
                  if(item.id===id){
                        col.splice(cont,1)
                        resolve(`Usuario ${item.id} elimunado`)
                  }
                  cont++
            })
            reject('Error al eliminar al usuario')
      })
}

module.exports ={
      list,
      get, 
      insert,
      update,
      remove,
}
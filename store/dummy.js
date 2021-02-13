const db = {
      'user': [
            {id: "1", name: 'jorge'},
      ]
};

async function list(table){
      return db[table] || null 
}

async function get(table, id){
      let col = await list(table)
      return col.filter(item => item.id === id)[0] || null
}

async function upsert(tabla, data){
      if(!db[tabla]){
            db[tabla] = []
      }
      update(tabla, data).catch(() => {
            db[tabla].push(data)
      })
      // return true
}

function update(table, data){
      return new Promise(async (resolve, reject)=> {
            let col = await list(table)
            col.filter(item => {
                  if(item.id === data.id){
                        if(data.name){
                              item.name = data.name
                        }
                        if(data.username){
                              item.username = data.username
                        }
                        if(data.passwd){
                              item.passwd = data.passwd
                        }
                        resolve(item)
                  }
            })
            reject('Algo salio mal')
      })
}

function remove(table, id){
      return new Promise(async (resolve, reject) => {
            let col = await list(table)
            let cont = 0
            try {
                  await col.filter(item => {
                        if(item.id === id){
                              col.splice(cont, 1)
                              console.log(db)
                              resolve(`Usuario ${item.id} elimunado`)
                        }
                        cont++
                  })
            } catch (error) {
                  reject('Error al eliminar al usuario')
            }
            reject('Error al eliminar al usuario')
      })
}

async function query(table, q){
      let col = await list(table)
      let keys = Object.keys(q)
      let key = keys[0]
      return col.filter(item => item[key] === q[key])[0] || null
}
module.exports ={
      list,
      get, 
      upsert,
      update,
      remove,
      query,
}
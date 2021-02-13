const mysql = require('mysql')

const config = require('../config')

const dbconfig = {
      host: config.mysql.host,
      user: config.mysql.user,
      password: config.mysql.password,
      database: config.mysql.database,
}

let connection;

function handleCon(){
      connection = mysql.createConnection(dbconfig)

      connection.connect((err)=>{
            if (err){
                  console.error('[db err]', err)
                  setTimeout(handleCon,2000)
            }
            else{
                  console.log('db conectada')
            }
      })

      connection.on('error', err =>{
            console.error('[db err]', err)
            if(err.code==='PROTOCOL_CONNECTION_LOST'){
                  handleCon()
            }else{
                  throw err
            }
      })
}

handleCon()

function list(table){
      return new Promise((resolve,reject)=>{
            connection.query(`SELECT * FROM ${table};`, (err,data)=>{
                  if(err){
                        return reject(err)
                  }
                  resolve(data)
            })
      })
}

function get(table, id){
      return new Promise((resolve,reject)=>{
            connection.query(`SELECT * FROM ${table} WHERE id='${id}';`, (err,data)=>{
                  if(err){
                        return reject(err)
                  }
                  resolve(data)
            })
            
      })
}

function insert(table, data){
      return new Promise((resolve,reject)=>{
            connection.query(`INSERT INTO ${table} SET ?`, data,(err, result)=>{
                  if(err){
                        return reject(err)
                  }
                  resolve(result)
            })
            
      })
}

function update(table, data){
      return new Promise((resolve,reject)=>{
            connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id],(err, result)=>{
                  if(err){
                        return reject(err)
                  }
                  resolve(result)
            })
            
      })
}

function upsert(table, data){
      //a qui hay un error, siempre entra al update
      get(table,data.id).then((res)=>{
            console.log('numero resultados', res.length)
            if(res.length === 0){
                  console.log('entré a insertar')
                  return insert(table, data)
            }else{
                  console.log('entré a actualizar')
                  return update(table, data)
            }
      })
      
}

function query(table, q){
      return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM ${table} WHERE ?`, q, (err, res)=>{
                  if(err){
                        return reject(err)
                  }
                  resolve(res[0] || null)
            })
      })
}

function remove(table,id){
      return new Promise((resolve,reject)=>{
            connection.query(`DELETE FROM ${table} WHERE id='${id}'`,(err, result)=>{
                  if(err){
                        return reject(err)
                  }
                  resolve(result)
            })
            
      })
}

module.exports = {
      list,
      get,
      upsert,
      query,
      remove,
}
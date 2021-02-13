//index principal
const express = require ('express')

const router = require('../newtork/routes')
const config = require('../config');
const errors = require('../newtork/error');
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router(app)

app.use(errors)//es importante que sea lo ultimo en ser usado para no perder ninguna ruta

app.listen(config.api.port, () => {
      console.log(`Servidor escuchando en el puerto ${config.api.port}`)
})
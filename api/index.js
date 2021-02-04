//index principal
const express = require ('express')

const router = require('../newtork/routes')
const config = require('../config')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router(app)

app.listen(config.api.port, () => {
      console.log(`Servidor escuchando en el puerto ${config.api.port}`)
})
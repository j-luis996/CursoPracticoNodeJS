//index de auth
const controller = require('./controller')
const store = require('../../../store/mysql')

module.exports = controller(store)
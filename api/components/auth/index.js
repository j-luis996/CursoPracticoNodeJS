//index de auth
const controller = require('./controller')
const store = require('../../../store/dummy')

module.exports = controller(store)
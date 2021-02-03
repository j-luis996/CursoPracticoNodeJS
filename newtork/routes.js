const user = require('../api/components/user/network')

const routes = (server) => {
      server.use('/api/user',user)
}

module.exports = routes
const corsMiddleware = require('../middlewares/cors')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(corsMiddleware)
}

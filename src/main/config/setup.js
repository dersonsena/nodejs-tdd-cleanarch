const corsMiddleware = require('../middlewares/cors')
const jsonParser = require('../middlewares/json-parser')
const contentType = require('../middlewares/content-type')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(corsMiddleware)
  app.use(jsonParser)
  app.use(contentType)
}

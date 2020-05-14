module.exports = (request, response, next) => {
  response.type('json')
  next()
}

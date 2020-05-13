module.exports = class ServerError extends Error {
  constructor (paramName) {
    super('An Internal error occurred')
    this.name = 'ServerError'
  }
}

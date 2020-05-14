module.exports = class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  load (email) {
    const user = this.userModel.findOne({
      email
    }, {
      projection: {
        email: 1,
        password: 1
      }
    })
    return user
  }
}

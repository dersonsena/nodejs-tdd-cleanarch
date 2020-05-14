const { MongoClient } = require('mongodb')

let client
let db

class LoadUserByEmailRepository {
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

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)

  return {
    sut,
    userModel
  }
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = client.db()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await client.close()
  })

  test('Should return null if no user is found', async () => {
    const { sut } = makeSut()
    const user = await sut.load('invalid_email@email.com')
    expect(user).toBeNull()
  })

  test('Should return as user if user is found', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@email.com',
      name: 'any_name',
      passwork: 'hashed_password',
      age: 40
    })
    const user = await sut.load('valid_email@email.com')

    expect(user.email).toBe('valid_email@email.com')
    expect(user).toEqual({
      _id: fakeUser.ops[0]._id,
      email: fakeUser.ops[0].email,
      password: fakeUser.ops[0].password
    })
  })
})

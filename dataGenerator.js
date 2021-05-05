const faker = require('faker')
const fs = require('fs')

faker.locale = 'ko'
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) 
}

const generateUsers = (length) => {
  const customers = [...new Array(length)].map((_, index) => ({
    id: index + 1,
    name: faker.name.lastName() + faker.name.firstName(),
    email: faker.internet.email(),
    profile_img: faker.internet.avatar(),
    phone_number: faker.phone.phoneNumber(),
    created_at: new Date(),
  }))

  return customers
}

const generate = () => {
  const users = generateUsers(100)

  const generatedData = {
    users
  } 

  fs.writeFileSync('./Database.json', JSON.stringify(generatedData, null, 2))
}

generate()
const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if ( process.argv.length<3 ) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

else if (process.argv.length === 3){
  const password = process.argv[2]

  const url =
        `mongodb+srv://fullstack:${password}@cluster0.xmgbg.mongodb.net/phonebook?retryWrites=true&w=majority`

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

else if (process.argv.length === 5){
  const password = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]

  const url =
        `mongodb+srv://fullstack:${password}@cluster0.xmgbg.mongodb.net/phonebook?retryWrites=true&w=majority`

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

  // const personSchema = new mongoose.Schema({
  //     name: String,
  //     number: String
  // })
  //
  // const Person = mongoose.model('Person', personSchema)

  const person = new Person({
    name: name,
    number: number
  })

  // eslint-disable-next-line no-unused-vars
  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}

else {
  console.log('Invalid arguments, please provide arguments as: node mongo.js <password> <name> <number> or node mongo.js <password>')
}
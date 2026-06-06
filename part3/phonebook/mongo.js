const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://faiqnaeem24_db_user:${password}@cluster0.dbjg14b.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const phonebookModel = mongoose.model('Phonebook', phonebookSchema)

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new phonebookModel({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  phonebookModel.find({}).then(persons => {
    persons.forEach(person => console.log(person))
    mongoose.connection.close()
  })
}

const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('give password as argument or password, name, and number as args')
  process.exit(1)

}

if (process.argv.length === 3) {
  const password = process.argv[2]

  const url = `mongodb+srv://fullstackclosed:${password}@cluster0.bsyz4mi.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

  mongoose.set('strictQuery',false)

  mongoose.connect(url, { family: 4 })

  const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  console.log("phonebook:")
  Person.find({}).then(persons => {
  persons.forEach(person => {
    console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
})

}
else if (process.argv.length === 5) {
  const password = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]

  const url = `mongodb+srv://fullstackclosed:${password}@cluster0.bsyz4mi.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

  mongoose.set('strictQuery',false)

  mongoose.connect(url, { family: 4 })

  const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  const person = new Person({
    name: name,
    number: number,
  })

person.save().then(result => {
  console.log(`added ${name} number ${number} to phonebook!`)
  mongoose.connection.close()
})
}
require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Phonebook = require('./models/phonebook')


morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms - :body'))
app.use(express.static('dist'))

app.get('/api/persons', (request, response, next) => {
  Phonebook.find({}).then(persons => {
    response.json(persons)
  })
    .catch(error => next(error))
})

app.get('/api/persons/info', (request, response, next) => {
  Phonebook.find({}).then(persons => {
    const personsCount = persons.length
    const now = new Date()
    response.send(`
            <p>Phonebook has info for ${personsCount} people</p>
            <p>${now}</p>
        `)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Phonebook.findById(id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Phonebook.findByIdAndDelete(id).then(() => response.status(204).end()).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number of the contact is missing'
    })
  }

  const person = new Phonebook({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => response.json(savedPerson)).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const { name, number } = request.body

  Phonebook.findById(id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      person.save().then(savedPerson => response.json(savedPerson))
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

import express from 'express'
import path from 'path'
import { v4 } from 'uuid'

const __dirname = path.resolve()
const app = express()

let CONTACTS = [
  { id: v4(), name: 'exampleName', value: '+19999999999', marked: false }
]

app.use(express.json())

app.get('/api/contacts', (req, res) => {
  res.json(CONTACTS)
})
app.post('/api/contacts', (req, res) => {
  const contact = { ...req.body, id: v4(), marked: false }
  CONTACTS.push(contact)
  res.status(201).json(contact)
})
app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter(contact => contact.id !== req.params.id)
  res
    .json({ message: `Contact with id ${req.params.id} has been removed` })
})
app.put('/api/contacts/:id', (req, res) => {
  const index = CONTACTS.findIndex(contact => contact.id === req.params.id)
  CONTACTS[index] = req.body
  res.json(CONTACTS[index])
})

/* #region START EXPRESS SERVER */
app
  .use(express.static(path.resolve(__dirname, 'client')))
  .get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
  )
  .listen(3000, () => console.log('Server listening on port 3000...'))
/* #endregion */

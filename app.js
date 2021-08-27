import express from 'express'
import path from 'path'
import { v4 } from 'uuid'

const __dirname = path.resolve()
const app = express()

const CONTACTS = [
  { id: v4(), name: 'exampleName', value: '+19999999999', marked: false }
]

app.use(express.json())

app.get('/api/contacts', (req, res) => {
  res.status(200).json(CONTACTS)
})
app.post('/api/contacts', (req, res) => {
  const contact = { ...req.body, id: v4(), marked: false }
  CONTACTS.push(contact)
  res.status(201).json(contact)
})

/* #region START EXPRESS SERVER */
app
  .use(express.static(path.resolve(__dirname, 'client')))
  .get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
  )
  .listen(3000, () => console.log('Server listening on port 3000...'))
/* #endregion */

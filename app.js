import express from 'express'
import path from 'path'

const CONTACTS = [
  { id: 1, name: 'exampleName', value: '+19999999999', marked: false }
]

const __dirname = path.resolve()
const app = express()



/* #region START EXPRESS SERVER */
app
  .use(express.static(path.resolve(__dirname, 'client')))
  .get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
  )
  .listen(3000, () => console.log('Server listening on port 3000...'))
/* #endregion */

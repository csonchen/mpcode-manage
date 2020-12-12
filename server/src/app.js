const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// init
app.get('/', (req, res) => res.send('hello world.'))

const port = 5000
app.listen(port, () => console.log(`mpcode-manage service listen on port ${port}`))
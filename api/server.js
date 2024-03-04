const express = require('express')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', function (req, res) {
  console.log('Server is running gracefully')
  const filePath = path.join('index.html')
  res.sendFile(filePath)
})

app.get('/api/:date', function (req, res) {
  const dateString = req.params.date
  let requestedDate
  if (dateString) {
    requestedDate = new Date(parseInt(dateString))
  } else {
    requestedDate = new Date()
  }
  const unixTime = requestedDate.getTime()
  const utcFormatDate = requestedDate.toUTCString()
  console.log({ unix: unixTime, utc: utcFormatDate })
  res.json({ unix: unixTime, utc: utcFormatDate })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

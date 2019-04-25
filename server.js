var express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser')
var app = express()

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-token')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.post('/exportLess', function (req, res) {
  let lessObj = req.body

  let themeStr = 'const modifyVars = { \n'

  lessObj.map(item => {
    themeStr += `'${item.name.slice(1)}': '${item.color}', \n`
  })

  themeStr += `} \n`

  themeStr = themeStr + 'module.exports = modifyVars'

  fs.writeFile('./theme.js', themeStr, () => {
    console.log('写入成功')
  })

  res.send({ status: 1 })
})

app.listen(3020, function () {
  console.log('export less app listening on port 3030!')
})

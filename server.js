const express= require('express')
const app = express()
var bodyParser = require('body-parser')
const fs = require ('fs')


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/html/index.html');
})
app.get('/pug', function (request, response) {
  var timePoints = [
    {
      year: "2003",
      title: "Started"
    },
    {
      year: "2006",
      title: "Important Date One"
    },
    {
      year: "2007",
      title: "Important Date Two"
    },
    {
      year: "2020",
      title: "current Time"
    }
  ]
  response.render('pages/index', { title: 'Hey', message: 'Hello there!', timePoints: timePoints});
})

//app.get('/thanx', function(request, response) {
 // console.log(request);
 // response.render('pages/thanx', { title: 'Дякую', name: request.query.name});
//})

app.post('/thanx', function(request, response) {
  console.log(request.body.name);
  const data = `
    імʼя - ${request.body.name}
    emeil - ${request.body.emeil}
    повідомлення - - ${request.body.msg}

  `
  fs.writeFile(__dirname + "/records/" + request.body.name, data, 'utf-8', function() {})
  response.render('pages/thanx', { title: 'Дякую', name: request.body.name});
})

app.listen(4000, function() {
  console.log("application listen on port 4000")
})
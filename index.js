const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const logMiddleware = (req, res, next) => {
  const age = req.query.age

  if (age) {
    console.log('tem')
    return next()
  } else {
    res.redirect('/')
  }
}

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/check', (req, res) => {
  const age = req.body.age

  if (age >= '18') {
    res.redirect(`/major?age=${age}`)
  } else {
    res.redirect(`/minor?age=${age}`)
  }
})

app.get('/major', logMiddleware, (req, res) => {
  const age = req.query.age
  return res.render('major', { age })
})

app.get('/minor', logMiddleware, (req, res) => {
  const age = req.query.age
  return res.render('minor', { age })
})

app.listen(3000)

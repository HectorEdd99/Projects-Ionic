const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./code/codes')
const port = 3000

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/series', db.getSeries)
app.get('/serie/:id', db.getSerie)
app.post('/serie', db.createSerie)
app.put('/serie/:id', db.updateSerie)
app.delete('/serie/:id', db.deleteSerie)

app.get('/temporadas', db.getTemporadas)
app.get('/temporada/:id', db.getTemporada)
app.post('/temporada', db.createTemporada)
app.put('/temporada/:id', db.updateTemporada)
app.delete('/temporada/:id', db.deleteTemporada)

app.get('/capitulos', db.getCapitulos)
app.get('/capitulo/:id', db.getCapitulo)
app.post('/capitulo', db.createCapitulo)
app.put('/capitulo/:id', db.updateCapitulo)
app.delete('/capitulo/:id', db.deleteCapitulo)

app.get('/temporadaxid/:id', db.getTemporadasXID)
app.get('/capitulosxtemporada/:id', db.getCapitulosXTemporada)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'serie',
  password: 'root123',
  port: 5432,
})


// Serie
// ==================================================================================================================
const getSeries = (request, response) => {
  pool.query('SELECT * FROM series order by idSerie', (error, results) => {
    if (error) {throw error}
    response.status(200).json(results.rows)
  })
}

const getSerie = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM SERIES WHERE idSerie = $1', [id], (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
  })
}

const createSerie = (request, response) => {
  const { nombreserie } = request.body;
  pool.query('INSERT INTO SERIES (nombreserie) VALUES ($1)', [ nombreserie ], (error, results) => {
    if (error) { throw error }
    // response.status(200).send(`User added with ID: ${results.insertId}`)
  })
}

const updateSerie = (request, response) => {
  const id = parseInt(request.params.id)
  const { nombreserie } = request.body
  pool.query(
    'UPDATE SERIES SET nombreSerie = $1 WHERE idserie = $2',
    [nombreserie,id],
    (error, results) => {
      if (error) { throw error }
      response.status(200).send(`{"User_modified_with_ID": ${id} }`)
    }
  )
}

const deleteSerie = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('DELETE FROM SERIES WHERE idserie = $1', [id], (error, results) => {
    if (error) { throw error }
    response.status(200).send(`{"User_deleted_with_ID": ${id} }`)
  })
}

// Serie
// ==================================================================================================================

const getTemporadas = (request, response) => {
  pool.query('SELECT * FROM TEMPORADAS', (error, results) => {
    if (error) {throw error}
    response.status(200).json(results.rows)
  })
}

const getTemporada = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM TEMPORADAS WHERE idtemporada = $1', [id], (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
  })
}

const createTemporada = (request, response) => {
  const { nombreTemporada, idSerie } = request.body
  pool.query('INSERT INTO TEMPORADAS (nombreTemporada, idSerie) VALUES ($1, $2)', [ nombreTemporada,idSerie ], (error, results) => {
    if (error) { throw error }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateTemporada = (request, response) => {
  const id = parseInt(request.params.idTemporada)
  const { nombreTemporada, idSerie } = request.body
  pool.query(
    'UPDATE TEMPORADAS SET nombreTemporada = $1, idSerie = $2 WHERE idtemporada = $3',
    [nombreTemporada,idSerie, id],
    (error, results) => {
      if (error) { throw error }
      response.status(200).send(`{"User_modified_with_ID": ${id} }`)
    }
  )
}

const deleteTemporada = (request, response) => {
  const id = parseInt(request.params.idSerie)
  pool.query('DELETE FROM TEMPORADAS WHERE idtemporada = $1', [id], (error, results) => {
    if (error) { throw error }
    response.status(200).send(`{"User_deleted_with_ID": ${id} }`)
  })
}

// Capitulos
// ==================================================================================================================


const getCapitulos = (request, response) => {
  pool.query('SELECT * FROM CAPITULOS', (error, results) => {
    if (error) {throw error}
    response.status(200).json(results.rows)
  })
}

const getCapitulo = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM CAPITULOS WHERE idcapitulos = $1', [id], (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
  })
}

const createCapitulo = (request, response) => {
  const { idtemporada, nombrecap, visto } = request.body
  pool.query('INSERT INTO CAPITULOS (idtemporada, nombrecap,visto) VALUES ($1, $2, $3)', [ idtemporada, nombrecap, visto ], (error, results) => {
    if (error) { throw error }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateCapitulo = (request, response) => {
  const id = parseInt(request.params.idTemporada)
  const { idtemporada, nombrecap,visto  } = request.body
  pool.query(
    'UPDATE CAPITULOS SET idtemporada = $1, nombrecap = $2, visto = $3 WHERE idcapitulo = $4',
    [ idtemporada, nombrecap,visto,id ],
    (error, results) => {
      if (error) { throw error }
      response.status(200).send(`{"User_modified_with_ID": ${id} }`)
    }
  )
}

const deleteCapitulo = (request, response) => {
  const id = parseInt(request.params.idCapitulo)
  pool.query('DELETE FROM CAPITULOS WHERE idcapitulo = $1', [id], (error, results) => {
    if (error) { throw error }
    response.status(200).send(`{"User_deleted_with_ID": ${id} }` )
  })
}

// JOINS 
// ==================================================================================================================
const getTemporadasXID = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('Select T.idtemporada, T.idserie, T.nombretemporada from  temporadas T JOIN series S ON T.idserie = S.idserie WHERE S.idserie= $1', [id], (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
  })
}

const getCapitulosXTemporada = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM CAPITULOS WHERE idtemporada = $1', [id], (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getSeries,
  getSerie,
  createSerie,
  updateSerie,
  deleteSerie,

  getTemporadas,
  getTemporada,
  createTemporada,
  updateTemporada,
  deleteTemporada,

  getCapitulos,
  getCapitulo,
  createCapitulo,
  updateCapitulo,
  deleteCapitulo, 

  getTemporadasXID,
  getCapitulosXTemporada
}
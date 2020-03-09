const express = require('express')
const cors = require('cors')
const app = express()
const sqlite3 = require('sqlite3').verbose()

const path = require('path')
const dbPath = path.resolve(__dirname, 'reviews.sqlite')

const port = process.env.PORT || 3000

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
	if (err) {
		console.error(err.message);
	} else {
		console.log('Connected to the sqlite database.')
	}
})

app.use(cors())

app.get(`/api`, (req, res, next) => {
  let { limit = 48, page = 1 } = req.query

  limit = parseInt(limit)
  page = (parseInt(page) - 1) * limit

  const sql = `SELECT * FROM reviews 
               JOIN genres ON reviews.reviewid = genres.reviewid
  						 LIMIT ? 
  						 OFFSET ?`

  const params = [limit, page]
  
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
      	'error': err.message
      })
      return
    }
    res.json({
      message: 'success',
      data: rows
    })
  })
})

app.get(`/api/best-new-music`, (req, res, next) => {
  let { limit = 48, page = 1 } = req.query

  limit = parseInt(limit)
  page = (parseInt(page) - 1) * limit

  const sql = `SELECT * FROM reviews 
               JOIN genres ON reviews.reviewid = genres.reviewid
  						 WHERE best_new_music = 1
  						 LIMIT ? 
  						 OFFSET ?`

  const params = [limit, page]
  
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
      	'error': err.message
      })
      return
    }
    res.json({
      message: 'success',
      data: rows
    })
  })
})

app.get(`/api/search`, (req, res, next) => {
  let { query = '', limit = 48, page = 1 } = req.query

  limit = parseInt(limit)
  page = (parseInt(page) - 1) * limit

  const sql = `SELECT * FROM reviews 
               JOIN genres ON reviews.reviewid = genres.reviewid
               WHERE title LIKE ? OR artist LIKE ?
               LIMIT ? 
               OFFSET ?`

  const params = [`%${query}%`, `%${query}%`, limit, page]
  
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
        'error': err.message
      })
      return
    }
    res.json({
      message: 'success',
      data: rows
    })
  })
})

app.get(`/api/authors/:author`, (req, res, next) => {
  let { author = '', limit = 48, page = 1 } = req.query

  limit = parseInt(limit)
  page = (parseInt(page) - 1) * limit

  const sql = `SELECT * FROM reviews 
               WHERE author = ?
               LIMIT ? 
               OFFSET ?`

  const params = [author, limit, page]
  
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
        'error': err.message
      })
      return
    }
    res.json({
      message: 'success',
      data: rows
    })
  })
})

db.on('trace', str => {
  console.log('trace', str)
})

app.get(`/api/genres`, (req, res, next) => {
  let { genres = ['electronic', 'metal', 'rock', 'rap', 'experimental', 'pop/r&b', 'folk/country', 'jazz'], 
        limit = 48, 
        page = 1
      } = req.query

  const genresPlaceholder = genres.map(() => '?').join(', ')
  limit = parseInt(limit)
  page = (parseInt(page) - 1) * limit

  const sql = `SELECT * FROM reviews 
               JOIN genres ON reviews.reviewid = genres.reviewid
               WHERE genres.genre IN (${genresPlaceholder})
               LIMIT ? 
               OFFSET ?`

  const params = [...genres, limit, page]
  
  db.all(sql, params, (err, rows) => {
    if (err) {
      console.log(err)
      res.status(400).json({
        'error': err.message
      })
      return
    }
    res.json({
      message: 'success',
      data: rows
    })
  })
})

app.get(`/api/reviews/:reviewid`, (req, res, next) => {
  let { reviewid } = req.query

  reviewid = parseInt(reviewid)

  const sql = `SELECT * FROM reviews
               JOIN genres ON reviews.reviewid = genres.reviewid
               JOIN content ON reviews.reviewid = content.reviewid 
               WHERE reviews.reviewid = ?`

  const params = [reviewid]
  
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
        'error': err.message
      })
      return
    }
    res.json({
      message: 'success',
      data: rows
    })
  })
})

app.get(`/api/colors`, (req, res, next) => {
  let { limit = 48, page = 1 } = req.query

  limit = parseInt(limit)
  page = (parseInt(page) - 1) * limit

  const sql = `SELECT * FROM reviews 
               JOIN genres ON reviews.reviewid = genres.reviewid
               LIMIT ? 
               OFFSET ?`

  const params = [limit, page]
  
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
        'error': err.message
      })
      return
    }
    res.json({
      message: 'success',
      data: rows
    })
  })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
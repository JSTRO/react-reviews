const express = require('express')
const app = express()
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()

require('dotenv').config()

const dbURL = process.env.DATABASE_URL
const port = process.env.PORT || 3000

const path = require('path')
const dbPath = path.resolve(__dirname, './databases/reviews_test_25July.sqlite')

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message)
  } else {
    console.log('Connected to the sqlite database.')
  }
})

app.use(cors())
app.use(express.static(path.join(__dirname, '../build')))

app.get(`/api/all-reviews`, (req, res, next) => {
  let {
    genres = [
      'electronic',
      'metal',
      'rock',
      'rap',
      'experimental',
      'pop/r&b',
      'folk/country',
      'jazz',
      'global',
    ],
    limit = 48,
    page = 1,
  } = req.query

  const genresPlaceholder = genres.map(() => '?').join(', ')
  limit = parseInt(limit)
  page = (parseInt(page) - 1) * limit

  const sql = `SELECT * FROM reviews 
               JOIN genres ON reviews.reviewid = genres.reviewid
               WHERE genres.genre COLLATE NOCASE IN (${genresPlaceholder})
               ORDER BY pub_year desc, pub_month desc, pub_day desc
               LIMIT ? 
               OFFSET ?`

  const params = [...genres, limit, page]

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
        error: err.message,
      })
      return
    }
    res.json({
      message: 'success',
      data: rows,
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
               ORDER BY pub_year desc, pub_month desc, pub_day desc
               LIMIT ? 
               OFFSET ?`

  const params = [limit, page]

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
        error: err.message,
      })
      return
    }
    res.json({
      message: 'success',
      data: rows,
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
               ORDER BY pub_year desc, pub_month desc, pub_day desc
               LIMIT ? 
               OFFSET ?`

  const params = [`%${query}%`, `%${query}%`, limit, page]

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
        error: err.message,
      })
      return
    }
    res.json({
      message: 'success',
      data: rows,
    })
  })
})

app.get(`/api/authors/:author`, (req, res, next) => {
  let { author = '', limit = 48, page = 1 } = req.query

  limit = parseInt(limit)
  page = (parseInt(page) - 1) * limit

  const sql = `SELECT * FROM reviews 
               JOIN genres ON reviews.reviewid = genres.reviewid
               WHERE author LIKE ?
               ORDER BY pub_year desc, pub_month desc, pub_day desc
               LIMIT ? 
               OFFSET ?`

  const params = [author, limit, page]

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
        error: err.message,
      })
      return
    }
    res.json({
      message: 'success',
      data: rows,
    })
  })
})

app.get(`/api/artists/:artist`, (req, res, next) => {
  let { artist = '', limit = 48, page = 1 } = req.query

  limit = parseInt(limit)
  page = (parseInt(page) - 1) * limit
  artist = artist

  const sql = `SELECT * FROM reviews 
               JOIN genres ON reviews.reviewid = genres.reviewid
               WHERE artist LIKE ?
               ORDER BY pub_year desc, pub_month desc, pub_day desc
               LIMIT ? 
               OFFSET ?`

  const params = [artist, limit, page]

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
        error: err.message,
      })
      return
    }
    res.json({
      message: 'success',
      data: rows,
    })
  })
})

app.get(`/api/reviews/:reviewid`, (req, res, next) => {
  let { reviewid } = req.query

  reviewid = isNaN(reviewid) ? reviewid : parseInt(reviewid)

  const sql = `SELECT * FROM reviews
               JOIN genres ON reviews.reviewid = genres.reviewid
               JOIN content ON reviews.reviewid = content.reviewid
               JOIN labels ON reviews.reviewid = labels.reviewid  
               WHERE reviews.reviewid = ?
               ORDER BY pub_year desc, pub_month desc, pub_day desc`

  const params = [reviewid]

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
        error: err.message,
      })
      return
    }
    res.json({
      message: 'success',
      data: rows,
    })
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'))
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

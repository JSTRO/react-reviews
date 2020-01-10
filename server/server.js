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

// Get all reviews
app.get('/api/reviews', cors(), (req, res, next) => {
	const sql = 'SELECT * FROM reviews LIMIT 100'
	db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json({
      	'error': err.message
      })
    } else {
    	res.json({
	       'message': 'success',
	       'data': rows
	    })	
    }  
	})
})

// Get a review given the reviewid
app.get('/api/reviews/:reviewid', (req, res, next) => {
  const sql = 'SELECT * FROM reviews WHERE reviewid = ?'
  const params = [req.params.reviewid]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({
      	'error': err.message
      });
    }
    res.json({
      'message': 'success',
      'data': row
    })
  })
})

// Get all authors 
app.get('/api/artists', (req, res, next) => {
  const sql = 'SELECT DISTINCT artist FROM artists ORDER BY artist'
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json({
      	'error': err.message
      })
    }
    res.json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get reviews given an artist
app.get('/api/reviews/artists/:artist', (req, res, next) => {
  const sql = 'SELECT * FROM reviews WHERE artist = ?'
  const params = [req.params.artist]
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
      	'error': err.message
      })
    }
    res.json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get all authors
app.get('/api/authors', (req, res, next) => {
  const sql = 'SELECT DISTINCT author FROM reviews ORDER BY author'
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json({
      	'error': err.message
      })
    }
    res.json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get reviews given the author
app.get('/api/reviews/authors/:author', (req, res, next) => {
  const sql = 'SELECT * FROM reviews WHERE author = ?'
  const params = [req.params.author]
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
      	'error': err.message
      })
    }
    res.json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get all years
app.get('/api/years', (req, res, next) => {
  const sql = 'SELECT DISTINCT pub_year FROM reviews ORDER BY pub_year'
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json({
      	'error': err.message
      })
    }
    res.json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get reviews given the year
app.get('/api/reviews/years/:year', (req, res, next) => {
  const sql = 'SELECT * FROM reviews WHERE pub_year = ?'
  const params = [req.params.pub_year]
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
      	'error': err.message
      })
    }
    res.json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get all genres
app.get('/api/genres', (req, res, next) => {
  const sql = 'SELECT DISTINCT genre FROM genres ORDER BY genre'
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json({
      	'error': err.message
      })
    }
    res.json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get reviews given the genre
app.get('/api/reviews/genres/:genre', (req, res, next) => {
  const sql = 'SELECT * FROM reviews LEFT JOIN genres ON genres.reviewid = reviews.reviewid WHERE genre = ?'
  const params = [req.params.genre]
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
      	'error': err.message
      })
    }
    res.json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get all labels
app.get('/api/labels/', (req, res, next) => {
  const sql = 'SELECT DISTINCT label FROM labels ORDER BY label' 
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json({
      	'error': err.message
      })
    }
    res.json({
      'message': 'success',
      'data': rows
    })
  })
})

// Get reviews given the label
app.get('/api/reviews/labels/:label', (req, res, next) => {
  const sql = 'SELECT * FROM reviews LEFT JOIN labels ON labels.reviewid = reviews.reviewid where label = ?'
  const params = [req.params.label]
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({
      	'error': err.message
      })
    }
    res.json({
      'message': 'success',
      'data': rows
    })
  })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
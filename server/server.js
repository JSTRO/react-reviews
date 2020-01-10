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

const sql = {
	reviews: 'SELECT * FROM reviews LIMIT 100',
	review: 'SELECT * FROM reviews WHERE reviewid = ?',
	artists: 'SELECT DISTINCT artist FROM artists ORDER BY artist',
	artist: 'SELECT * FROM reviews WHERE artist = ?',
	authors: 'SELECT DISTINCT author FROM reviews ORDER BY author',
	author: 'SELECT * FROM reviews WHERE author = ?',
	years: 'SELECT DISTINCT pub_year FROM reviews ORDER BY pub_year',
	year: 'SELECT * FROM reviews WHERE pub_year = ?',
	genres: 'SELECT DISTINCT genre FROM genres ORDER BY genre',
	genre: 'SELECT * FROM reviews LEFT JOIN genres ON genres.reviewid = reviews.reviewid WHERE genre = ?',
	labels: 'SELECT DISTINCT label FROM labels ORDER BY label', 
	label: 'SELECT * FROM reviews LEFT JOIN labels ON labels.reviewid = reviews.reviewid where label = ?'
}

getRoute = (url, query, param) => {
	app.get(`/api/${url}`, (req, res, next) => {
	  const sql = query
	  const params = [req.params[param]]
	  db.all(sql, params, (err, row) => {
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
}

// Get all reviews
getRoute('reviews', sql.reviews)

// Get a review given the reviewid
getRoute('reviews/:reviewid', sql.review, 'reviewid')

// Get all artists 
getRoute('artists', sql.artists)

// Get reviews given an artist
getRoute('reviews/artists/:artist', sql.artist, 'artist')

// Get all authors
getRoute('authors', sql.authors)

// Get reviews given the author
getRoute('reviews/authors/:author', sql.author, 'author')

// Get all years
getRoute('years', sql.years)

// Get reviews given the year
getRoute('reviews/years/:year', sql.year, 'year')

// Get all genres
getRoute('genres', sql.genres)

// Get reviews given the genre
getRoute('reviews/genres/:genre', sql.genre, 'genre')

// Get all labels
getRoute('labels', sql.labels)

// Get reviews given the label
getRoute('reviews/labels/:label', sql.label, 'label')

app.listen(port, () => console.log(`App listening on port ${port}!`))
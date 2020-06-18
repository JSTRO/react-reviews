/*

// SQL queries for express routes
const sql = {
	reviews: 'SELECT * FROM reviews WHERE reviewid > ? ORDER BY reviewid LIMIT ?',
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
	app.get(`/api/${url}`, cors(), (req, res, next) => {

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

// Express middleware function for pagination
function paginatedResults(model) {
	return async (req ,res, next) => {
		const page = parseInt(req.query.page)
		const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {} 

    if (endIndex < model.length) { // no length to model
    	results.next = {
	    	page: page + 1,
	    	limit: limit
	    }
    }
    
    if (startIndex > 0) {
    	results.prev = {
  			page: page - 1,
  			limit: limit
    	}
    }
    try {
    	results.results = await model.all(sql//find().limit(limit).skip(startIndex).exec()
    	res.paginatedResults = results
    	next()
    } catch (e) {
    	res.status(500).json({ message: e.message })
    }
    
	}
}

  const filtered = reviews.filter(review =>  {
    const years = yearFilter.map(year => year.year)
    const checked = yearFilter.map(year => year.isChecked)
    return (
      (checked.length ? checked[years.indexOf(review.pub_year)] : review) &&
      (search !== "" ? review.title.includes(search) || review.artist.includes(search) : review) &&
      (BNMFilter ? review.best_new_music === 1 : review) &&
      (authorFilter && authorFilter !== "Select author..." ? authorFilter === review.author : review)
    )
  })

  const sortedAndFiltered = filtered.sort((a, b) => a[sortValue] > b[sortValue] ? 1 : -1)

  useEffect(() => setFilteredData(sortedAndFiltered), [sortedAndFiltered.join(",")])

// set initial year filter
  /*
  useEffect(() => {
    const getUniqueYears = () => {
      const years = reviews.map(review => review.pub_year)
      const uniqueYears = [...new Set(years)].sort()
      setYearFilter(uniqueYears.map(el => ({year: el, isChecked: true}))) 
    }
    getUniqueYears()
  }, [reviews])

  const handleYearFilter = event => {
    const {name} = event.target // NOT USING checked property
    setYearFilter(prev => prev.map(el => el.year === parseInt(name) ? 
      {year: el.year, isChecked: !el.isChecked} : 
      {year: el.year, isChecked: el.isChecked}))
  }

  const handleAuthorFilter = event => {
    const {value} = event.target
    setAuthorFilter(value)
  }

  const handleSort = event => {
    const {value} = event.target
    setReviews(prev => [...prev].sort((a, b) => a[value] > b[value] ? 1 : -1))
  }

// const genreMap = new Map([['electronic', false], ['metal', false], ['rock', false], ['rap', false], ['experimental', false], ['pop/r&b', false], ['folk/country', false], ['jazz', false]])

<Typography variant="subtitle1" className={classes.header} noWrap>
  <Link to="/colors" className={classes.header}>
    COLORS
  </Link>   
</Typography>*/}`
*/
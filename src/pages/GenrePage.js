import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import ReviewList from '../components/ReviewList'
import Button from '@material-ui/core/Button'
import useGenre from '../hooks/useGenre.js'
import getQueryStringFromArray from '../utils/getQueryStringFromArray'

function GenrePage() {
  const location = useLocation()
  const history = useHistory()

  const params = new URLSearchParams(location.search.slice(1))
  const paramGenre = params.getAll('genre')

  const [genres, setGenres] = useState(paramGenre)
  const [currentPage, setCurrentPage] = useState(1)

  const queryString = getQueryStringFromArray(genres)

  const handleClick = event => {
    const {value} = event.currentTarget
    setGenres(prev => prev.filter(genre => genre !== value))
  }

  useEffect(() => {
    history.replace({
      search: queryString
    })
  }, [queryString])

  const { reviews, setReviews, hasMore, loading, error } = useGenre(genres, currentPage)

  useEffect(() => {
    setGenres(paramGenre)
  }, [paramGenre.join(',')])

  useEffect(() => {
    setReviews([])
  }, [genres])

	return (
    <div>
      {genres.length > 0 ? 
        <div className="genre-page-filter">
          <ul>
            {genres.map(genre => {
              return (
                <li key={genre} className="genre-page-filter-item">
                  <Button variant="outlined" onClick={handleClick} value={genre}>
                    <strong>{`X ${genre}`}</strong>
                  </Button>  
                </li>
              )
            })}
          </ul> 
        </div> :
        <div className="review-list-title"></div>
      }
  		<ReviewList 
        reviews={reviews}
        hasMore={hasMore}
        loading={loading}
        error={error}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} 
      /> 
    </div>
	)
}

export default GenrePage
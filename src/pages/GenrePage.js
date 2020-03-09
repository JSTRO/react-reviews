import React, {useState, useEffect} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import ReviewList from '../components/ReviewList'
import useGenre from '../hooks/useGenre.js'

function GenrePage() {
  const location = useLocation()

  const params = new URLSearchParams(location.search.slice(1)) 
  const paramGenre = params.getAll('genre')

  const [genres, setGenres] = useState(paramGenre)
  const [currentPage, setCurrentPage] = useState(1)

  const { reviews, setReviews, hasMore, loading, error } = useGenre(genres, currentPage)

  useEffect(() => {
    setGenres(paramGenre)
  }, [paramGenre.join(',')])

  useEffect(() => {
    setReviews([])
  }, [genres])

	return (
		<ReviewList 
      reviews={reviews}
      hasMore={hasMore}
      loading={loading}
      error={error}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage} 
    /> 
	)
}

export default GenrePage
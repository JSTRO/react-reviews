import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import GenreButtons from '../components/GenreButtons'
import ReviewList from '../components/ReviewList'
import Header from '../components/Header'
import useAllReviews from '../hooks/useAllReviews.js'
import getQueryStringFromArray from '../utils/getQueryStringFromArray'

function Home() {
  // EXTRACT TO HOOK
  const location = useLocation()
  const history = useHistory()

  const params = new URLSearchParams(location.search.slice(1))
  const paramGenre = params.getAll('genre')

  const [genres, setGenres] = useState(paramGenre)
  const [currentPage, setCurrentPage] = useState(1)

  const queryString = getQueryStringFromArray(genres)

  useEffect(() => {
    history.replace({
      search: queryString,
    })
  }, [queryString])

  const { reviews, setReviews, hasMore, loading, error } = useAllReviews(
    genres,
    currentPage
  )

  useEffect(() => {
    setGenres(paramGenre)
  }, [paramGenre.join(',')])

  useEffect(() => {
    setReviews([])
  }, [genres])

  return (
    <>
      {!genres.length ? (
        <Header title="ALL REVIEWS" />
      ) : (
        <GenreButtons genres={genres} setGenres={setGenres} />
      )}
      <ReviewList
        reviews={reviews}
        hasMore={hasMore}
        loading={loading}
        error={error}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}

export default Home

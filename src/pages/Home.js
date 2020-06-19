import React, { useEffect } from 'react'
import GenreButtons from '../components/GenreButtons'
import ReviewList from '../components/ReviewList'
import Header from '../components/Header'
import useAllReviews from '../hooks/useAllReviews.js'
import useGenreFilter from '../hooks/useGenreFilter.js'

function Home() {
  const { genres, setGenres, currentPage, setCurrentPage } = useGenreFilter()

  const { reviews, setReviews, hasMore, loading, error } = useAllReviews(
    genres,
    currentPage
  )

  useEffect(() => {
    setReviews([])
  }, [genres])

  return (
    <div>
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
    </div>
  )
}

export default Home

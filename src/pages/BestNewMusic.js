import React, { useState } from 'react'
import ReviewList from '../components/ReviewList'
import Header from '../components/Header'
import useBNM from '../hooks/useBNM.js'

function BestNewMusic() {
  const [currentPage, setCurrentPage] = useState(1)
  const { reviews, hasMore, loading, error } = useBNM(currentPage)

  return (
    <>
      <Header title="BEST NEW MUSIC" />
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

export default BestNewMusic

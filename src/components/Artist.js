import React from 'react'
import ReviewList from './ReviewList'
import useArtist from '../hooks/useArtist.js'
import titleCase from 'title'

function Artist({ artist, currentPage, setCurrentPage }) {
  const { reviews, hasMore, loading, error } = useArtist(artist, currentPage)

  return (
    <div>
      <h1 className="author">{titleCase(artist)}</h1> {/* CHANGE CLASS NAME */}
      <h4 className="author-type">{reviews[0] && reviews[0].genre}</h4>{' '}
      {/* CHANGE CLASS NAME */}
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

export default Artist

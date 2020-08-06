import React from 'react'
import ReviewList from './ReviewList'
import Divider from '@material-ui/core/Divider'
import useArtist from '../hooks/useArtist.js'
import titleCase from 'title'

function Artist({ artist, currentPage, setCurrentPage }) {
  const { reviews, hasMore, loading, error } = useArtist(artist, currentPage)

  console.log(artist)

  return (
    <div>
      <h1 className="creator">
        {artist[0] !== artist[0].toUpperCase() ? titleCase(artist) : artist}
      </h1>{' '}
      <h4 className="creator-type">{reviews[0] && reviews[0].genre}</h4>{' '}
      <div className="review-list-divider">
        <Divider variant="middle" />
      </div>
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

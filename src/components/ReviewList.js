import React, { useRef, useCallback } from 'react'
import Review from './Review'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import '../App.css'

function ReviewList({
  reviews,
  hasMore,
  loading,
  error,
  setCurrentPage,
  currentPage,
}) {
  // Infinite scroll logic
  const observer = useRef()
  const lastReviewRef = useCallback(
    (node) => {
      if (loading) {
        return
      }
      if (observer.current) {
        observer.current.disconnect()
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prevPage) => prevPage + 1)
        }
      })
      if (node) {
        observer.current.observe(node)
      }
    },
    [loading, hasMore, setCurrentPage]
  )

  return (
    <div>
      <div className="loading-spinner">
        {loading && (
          <FontAwesomeIcon icon={faSpinner} size="2x" className="fa-spin" />
        )}
      </div>
      {error && <div>Error</div>}
      <div className="review-list-container">
        {reviews.map((review, index) => {
          return (
            <div
              ref={reviews.length === index + 1 ? lastReviewRef : null}
              key={review.reviewid}
              className="review-list-item"
            >
              <Review review={review} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ReviewList

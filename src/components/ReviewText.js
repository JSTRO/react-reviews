import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TextTruncate from 'react-text-truncate'
import { useParams } from 'react-router-dom'
import useReviewText from '../hooks/useReviewText.js'
import formatDate from '../utils/formatDate.js'
import { toUpper } from 'lodash'
import titleCase from 'title'
import '../App.css'

function ReviewText() {
  const { reviewid } = useParams()
  const { reviews } = useReviewText(reviewid)
  const [review, setReview] = useState({})

  useEffect(() => {
    setReview(reviews[0])
  }, [reviews])

  if (review) {
    const {
      artist,
      best_new_music,
      title,
      content,
      review_img,
      score,
      label,
      pub_date,
      pub_year,
      author,
      author_type,
      genre,
      url,
    } = review

    return (
      <div className="review-text-container">
        <div className="review-text-panel">
          <div className="review-text-artist-title">
            <h1 className="review-text-artist">
              {artist && titleCase(artist)}
            </h1>
            <h1 className="review-text-title">
              <i>{title && titleCase(title)}</i>
            </h1>
          </div>
          <div className="review-text-image">
            <img
              src={review_img}
              alt="album cover"
              className="review-text-image-cover"
            ></img>
            <h6>
              {toUpper(label)} · {pub_year}
            </h6>
          </div>
          <div className="review-text-score">
            <div
              className={
                best_new_music === 1
                  ? 'review-text-score-bnm'
                  : 'review-text-score-normal'
              }
            >
              <strong className="review-text-score-number">
                {score && score.toFixed(1)}
              </strong>
            </div>
            {best_new_music === 1 && (
              <h6 className="review-text-bnm-label">BEST NEW MUSIC</h6>
            )}
          </div>
        </div>
        <div className="review-text-body">
          <div className="review-text-by">
            <h5 className="review-text-author">
              by
              <Link to={`/authors/${author}`}>
                <strong> {author && titleCase(author)}</strong>
              </Link>
            </h5>
            <h5 className="review-text-author-type">
              {author_type && titleCase(author_type)}
            </h5>
            <div className="review-text-genre">
              <h6>
                <span
                  style={{
                    color: 'red',
                    marginRight: '1em',
                    display: 'inline-block',
                  }}
                >
                  /
                </span>
                {toUpper(genre)}
              </h6>
            </div>
            <h6 className="review-text-pub-date">
              {toUpper(formatDate(pub_date))}
            </h6>
          </div>
          <div className="review-text-text">
            <TextTruncate line={5} truncateText="…" text={content} />
            <span>
              <strong>
                <a href={url} target="blank">
                  Read the full review
                </a>
              </strong>
            </span>
          </div>
        </div>
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default ReviewText

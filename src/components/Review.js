import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { toUpper } from 'lodash'
import formatDate from '../utils/formatDate.js'
import titleCase from 'title'
import '../App.css'

function Review({ review, BNMPage }) {
  const {
    reviewid,
    artist,
    title,
    pub_date,
    best_new_music,
    review_img,
    genre,
    author,
  } = review

  const theme = createMuiTheme({
    typography: {
      subtitle2: {
        fontSize: 10,
      },
      subtitle3: {
        fontSize: 10,
        fontColor: 'red',
      },
    },
  })

  const [error, setError] = useState(false)

  const onImageError = () => {
    setError(true)
  }

  let src = error ? 'https://via.placeholder.com/150' : review_img

  return (
    <>
      <Link to={`/reviews/${reviewid}`}>
        <img src={src} alt={review_img} onError={onImageError}></img>
        <p>
          <strong>
            {artist[0] !== artist[0].toUpperCase() ? titleCase(artist) : artist}
          </strong>
        </p>
        <p>
          <i>
            {title[0] !== title[0].toUpperCase() ? titleCase(title) : title}
          </i>
        </p>
      </Link>
      <ThemeProvider theme={theme}>
        {best_new_music === 1 && !BNMPage && (
          <Typography variant="subtitle2" color="error" gutterBottom>
            <strong>{'BEST NEW ALBUM'}</strong>
          </Typography>
        )}
        <Typography variant="subtitle2">
          <strong>{toUpper(genre)}</strong>
        </Typography>
        <Link to={`/authors/${author}`}>
          <Typography variant="subtitle2">
            <strong>{toUpper(`By: ${author}`)}</strong>
          </Typography>
        </Link>
        <Typography color="textSecondary" variant="subtitle2">
          {toUpper(formatDate(pub_date))}
        </Typography>
      </ThemeProvider>
    </>
  )
}

export default Review

import React from 'react'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import Button from '@material-ui/core/Button'

function GenrePage({ genres, setGenres }) {
  const handleClick = (event) => {
    const { value } = event.currentTarget
    setGenres((prev) => prev.filter((genre) => genre !== value))
  }

  return (
    <div className="genre-page-filter">
      <ul>
        {genres.map((genre) => {
          return (
            <li key={genre} className="genre-page-filter-item">
              <Button variant="outlined" onClick={handleClick} value={genre}>
                <HighlightOffIcon style={{ marginRight: '0.25em' }} />
                <strong>{`${genre}`}</strong>
              </Button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default GenrePage

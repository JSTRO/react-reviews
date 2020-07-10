import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import RefreshIcon from '@material-ui/icons/Refresh'
import { toLower } from 'lodash'
import getQueryStringFromObject from '../utils/getQueryStringFromObject.js'
import useGenreCardStyles from '../styles/useGenreCardStyles.js'

const genreArray = [
  'Electronic',
  'Metal',
  'Rock',
  'Rap',
  'Experimental',
  'Pop/R&B',
  'Folk/Country',
  'Jazz',
  'Global',
]

const genreObj = {
  electronic: false,
  metal: false,
  rock: false,
  rap: false,
  experimental: false,
  'pop/r&b': false,
  'folk/country': false,
  jazz: false,
  global: false,
}

function GenreCard({ currentPage }) {
  const classes = useGenreCardStyles()
  const [genres, setGenres] = useState(genreObj)
  const queryString = getQueryStringFromObject(genres)

  const handleChange = (event) => {
    const { checked, name } = event.target
    setGenres({ ...genres, [name]: checked })
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleOpen}
        className={classes.button}
      >
        GENRES
        <ExpandMoreIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Grid item xs={6}>
          <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormGroup>
                {genreArray.map((genre) => {
                  return (
                    <MenuItem key={genre} className={classes.menuItem}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={toLower(genre)}
                            checked={genres[toLower(genre)]}
                            onChange={handleChange}
                          />
                        }
                        label={genre}
                      />
                    </MenuItem>
                  )
                })}
                <MenuItem>
                  <Button
                    variant="outlined"
                    component={Link}
                    to={`/?${queryString}`}
                  >
                    <RefreshIcon style={{ marginRight: '0.5em' }} />
                    Update Results
                  </Button>
                </MenuItem>
              </FormGroup>
            </FormControl>
          </div>
        </Grid>
      </Menu>
    </>
  )
}

export default GenreCard

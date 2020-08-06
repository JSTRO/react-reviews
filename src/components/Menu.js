import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import GenreCard from './GenreCard'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import useMenuStyles from '../styles/useMenuStyles.js'

function Menu() {
  const classes = useMenuStyles()
  const history = useHistory()
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearch = (event) => {
    const { value } = event.target
    setCurrentPage(1)
    history.replace({
      search: value,
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar variant="dense" className={classes.toolbar}>
          <Link to="/" className={classes.title}>
            Pitchfork <i>Reviews</i>
          </Link>
          <Link to="/" className={classes.header}>
            ALL REVIEWS
          </Link>
          <Link to="/best-new-music" className={classes.header}>
            BEST NEW MUSIC
          </Link>
          <Typography className={classes.header}>
            <GenreCard currentPage={currentPage} />
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Link to="/search">
              <InputBase
                placeholder="Search…"
                name="search"
                value={history.search}
                onChange={handleSearch}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Menu

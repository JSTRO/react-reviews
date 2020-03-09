import React, {useState} from 'react'
import GenreCard from './GenreCard'
import { Link, useHistory } from 'react-router-dom'
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

  const handleSearch = event => {
    const {value} = event.target
    setCurrentPage(1)
    history.replace({
      search: value
    })
  }

	return ( 
		<div className={classes.root}>
			<AppBar position="fixed">
	      <Toolbar>
	        <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/" className={classes.title}>
	            Pitchfork <strong>Reviews</strong>
            </Link>
	        </Typography>
          <Typography variant="subtitle1" className={classes.title} noWrap>
            <Link to="/" className={classes.title}>
              ALL REVIEWS
            </Link>   
          </Typography>
          <Typography variant="subtitle1" className={classes.title} noWrap>
            <Link to="/best-new-music" className={classes.title}>
              BEST NEW MUSIC
            </Link>    
          </Typography> 
          {/*<Typography variant="subtitle1" className={classes.title} noWrap>
            <Link to="/colors" className={classes.title}>
              COLORS
            </Link>   
          </Typography>*/}
          <GenreCard currentPage={currentPage}/>  
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
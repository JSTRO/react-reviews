import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: 'inherit'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

function Menu({setCurrentPage}) {

	const classes = useStyles()

  const history = useHistory()

  const handleSearch = event => {
    const {value} = event.target
    setCurrentPage(1)
    history.push({
      search: value
    })
  }

	return ( 
		<div className={classes.root}>
			<AppBar position="fixed">
	      <Toolbar>
	        <Typography className={classes.title} variant="h6" noWrap>
	          Pitchfork <strong>Reviews</strong>
	        </Typography>
	        <Link to="/" className={classes.title}>
            <Typography variant="subtitle1" noWrap>
                ALL REVIEWS
            </Typography>
	        </Link> 	
	        <Link to="/best-new-music" className={classes.title}>	
            <Typography variant="subtitle1" noWrap>
                BEST NEW MUSIC
            </Typography>
		      </Link> 
              
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
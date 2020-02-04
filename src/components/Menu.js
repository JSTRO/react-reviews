import React from 'react'
import { Link } from 'react-router-dom'
import MenuItem from './MenuItem'
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

function Menu({search, setSearch, setCurrentPage}) {
	
	const handleSearch = event => {
		const {value} = event.target
		setSearch(value)
		setCurrentPage(1)
	}

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="fixed">
	      <Toolbar>
	        <Typography className={classes.title} variant="h6" noWrap>
	          Pitchfork <strong>Reviews</strong>
	        </Typography>
	        <Link to="/reviews" className={classes.title}>
            <Typography variant="subtitle2" noWrap>
                ALL REVIEWS
            </Typography>
	        </Link> 	
	        <Link to="/reviews/best-new-music" className={classes.title}>	
            <Typography variant="subtitle2" noWrap>
                BEST NEW MUSIC
            </Typography>
		      </Link>      
		      <MenuItem name="GENRES" className={classes.title}/>
	        <div className={classes.search}>
	          <div className={classes.searchIcon}>
	            <SearchIcon />
	          </div>
	          <InputBase
	            placeholder="Search…"
	            name="search"
	            value={search}
	            onChange={handleSearch}
	            classes={{
	              root: classes.inputRoot,
	              input: classes.inputInput,
	            }}
	            inputProps={{ 'aria-label': 'search' }}
	          />
	        </div>
	      </Toolbar>
	    </AppBar>
	  </div>  
	)
}

export default Menu
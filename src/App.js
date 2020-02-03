import React, {useState} from 'react'
import {Link} from "react-router-dom"

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';

import useReviewSearch from './hooks/useReviewSearch.js'

import Search from "./components/Search"
import Sort from "./components/Sort"
import Filter from "./components/Filter"
import ReviewList from './components/ReviewList'
import Stats from './components/Stats'

import './App.css'

function App() {

  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const [yearFilter, setYearFilter] = useState([])
  const [authorFilter, setAuthorFilter] = useState("")

  const handleSearch = event => {
    const {value} = event.target
    setSearch(value)
    setCurrentPage(1)
  }

  const handleYearFilter = event => {
    const {name} = event.target // NOT USING checked property
    setYearFilter(prev => prev.map(el => el.year === parseInt(name) ? 
      {year: el.year, isChecked: !el.isChecked} : 
      {year: el.year, isChecked: el.isChecked}))
  }

  const handleAuthorFilter = event => {
    const {value} = event.target
    setAuthorFilter(value)
  }

  const {setReviews, reviews, loading, setBNM} = useReviewSearch(search, currentPage)

  const toggleBNMFilter = () => {
    setSearch("")
    setBNM(0)
  }

  const handleSort = event => {
    const {value} = event.target
    setReviews(prev => [...prev].sort((a, b) => a[value] > b[value] ? 1 : -1))
  }

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

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Pitchfork <strong>Reviews</strong>
          </Typography>
          <Typography className={classes.title} variant="subtitle2" noWrap>
            <Button color="inherit" onClick={() => setSearch("")}>
              All Reviews
            </Button>  
          </Typography>
          <Typography className={classes.title} variant="subtitle2" noWrap>
            <Button 
              color="inherit" 
              onClick={toggleBNMFilter}
            >
              Best New Music
            </Button> 
          </Typography>
          <Typography className={classes.title} variant="subtitle2" noWrap>
            <Button 
              color="inherit" 
              onClick={() =>  {
                setSearch("")
              }}
            >
              8.0+ Reviews
            </Button> 
          </Typography>
          <Typography className={classes.title} variant="subtitle2" noWrap>
            <Button color="inherit" onClick={() => console.log("test")}>
              Genres
            </Button> 
          </Typography>
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
      <main> 
      <ReviewList 
        search={search}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} 
      />
      </main>  
    </div>
  )
}

export default App
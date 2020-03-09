import React, {useState, useEffect} from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'
import useGenre from '../hooks/useGenre.js'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  button: {
    color: "#fff",
    fontSize: "16px"
  },
  menuTitle: {
  	backgroundColor: "#3f51b5",
  	color: "#fff",
  },
  formControl: {
    margin: theme.spacing(1),
  }
}))

const genreArray = ['electronic', 'metal', 'rock', 'rap', 'experimental', 'pop/r&b', 'folk/country', 'jazz']

function GenreCard({currentPage}) {
  
  const classes = useStyles()

  const history = useHistory()

  const genreMap = new Map(genreArray.map(genre => ([genre, false])))

  const [genres, setGenres] = useState(genreMap)
  const [genreParams, setGenreParams] = useState([])

  let queryString = ''
  let queryArr = []

  for (const [key, value] of genres) {
    if (value) {
      queryArr.push(`genre=${key}&`)
    }
    queryString = queryArr.join('').slice(0, -1)
  }

  useEffect(() => {
    history.replace({
      search: queryString
    })
  }, [queryString])

  const handleChange = event => {
    const { checked, name } = event.target
    setGenres(prev => prev.set(name, checked))
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = event => {
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
    		anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    		transformOrigin={{ vertical: "top", horizontal: "center" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >	
      	<Grid item xs={12}>
          <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormGroup>
              	{genreArray.map(genre => {
                  return (
                    <MenuItem key={genre}>
                      <FormControlLabel
                        control={
                          <Checkbox 
                            component={Link} 
                            to="/genres"
                            name={genre}
                            checked={genres.get(genre)} 
                            onChange={handleChange} 
                            value={genre}
                          />
                        }
                        label={genre}
                      />
                    </MenuItem>              
                  ) 
                })}
              </FormGroup>
            </FormControl>
          </div>  
        </Grid>	
      </Menu>
    </>
  )
}

export default GenreCard
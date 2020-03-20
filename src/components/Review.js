import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { startCase, toLower, toUpper } from 'lodash'
import formatDate from '../utils/formatDate.js'
import titleCase from 'title'
import '../App.css'

function Review({review}) {

	const {reviewid, artist, title, pub_date, review_img, genre, author} = review

	const theme = createMuiTheme({
	  typography: {
	    subtitle2: {
	      fontSize: 10,
	    },
	  },
	});

	const [error, setError] = useState(false)

	const onImageError = () =>{
		setError(true)
	}

	let src = error ? 'https://via.placeholder.com/150' : review_img

	return (
		<>
			<Link to={`/reviews/${reviewid}`}>
				<img src={src} alt={review_img} onError={onImageError}></img>
				<p>
					<strong>{titleCase(artist)}</strong>
				</p>
				<p>
					<i>{titleCase(title)}</i>
				</p>
			</Link>
			<ThemeProvider theme={theme}>
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
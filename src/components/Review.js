import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { startCase, toLower, toUpper } from 'lodash'
import '../App.css'

function Review({review}) {

	const {artist, title, pub_date, url, review_img, genre, author} = review
	const dateOptions = {year: 'numeric', month: 'short', day: 'numeric'};

	const date = new Date(pub_date)

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
		<div className="grid-item">
			<a href={url} target="blank">
				<img src={src} alt={review_img} onError={onImageError}></img>
				<p><strong>{startCase(toLower(artist))}</strong></p>
				<p><i>{startCase(toLower(title))}</i></p>
			</a>
			<ThemeProvider theme={theme}>
				<Typography variant="subtitle2"><strong>{toUpper(genre)}</strong></Typography>
				<Link to={`/authors/${author}`}>
					<Typography variant="subtitle2"><strong>{toUpper(`By: ${author}`)}</strong></Typography>
				</Link>
				<Typography color="textSecondary" variant="subtitle2">
					{toUpper(date.toLocaleDateString("en-US", dateOptions))}
				</Typography>
			</ThemeProvider>	
		</div>
	)
}

export default Review
import React, {useRef, useCallback} from 'react'
import Review from "./Review"
import { makeStyles } from '@material-ui/core/styles'
import '../App.css'

function ReviewList({reviews, hasMore, loading, error, setCurrentPage, currentPage}) {

	// Infinite scroll logic
	const observer = useRef()
	const lastReviewRef = useCallback(node => {
		if (loading) {
			return
		}
		if (observer.current) {
			observer.current.disconnect()
		}
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore) {
				setCurrentPage(prevPage => prevPage + 1)
			}
		})
		if (node) {
			observer.current.observe(node)
		}
	}, [loading, hasMore, setCurrentPage])

	const useStyles = makeStyles(theme => ({
	  root: {
	    display: 'flex',
	    '& > * + *': {
	      marginLeft: theme.spacing(2),
	    },
	    marginLeft: '140px'
	  },
	}));

	const classes = useStyles()

	return (
   	<>
   		{loading &&
	   		<div className={classes.root}>
	   			Loading...
	   		</div>
	   	}
	   	{error && 
	   		<div>
	   			'Error'
	   		</div>
   		}
   		<div className="review-list-container">
		   	{reviews.map((review, index) => {
		   		return (
	   				<div 
	   					ref={reviews.length === index + 1 ? lastReviewRef : null}
	   					key={review.reviewid}
	   					className="review-list-item" 
	   				>
	   					<Review review={review} />
	   				</div>
	   			)
		   	})}
		  </div> 	
		</>
	)
}

export default ReviewList
import React from 'react'
import ReviewList from './ReviewList'
import useAuthor from '../hooks/useAuthor.js'

function Author({author, currentPage, setCurrentPage}) {

	const { reviews, hasMore, loading, error } = useAuthor(author, currentPage)

	return (
		<div>
			<h1 className="author">{author}</h1>
			<ReviewList 
	      reviews={reviews}
	      hasMore={hasMore}
	      loading={loading}
	      error={error}
	      currentPage={currentPage}
	      setCurrentPage={setCurrentPage} 
	    />
		</div>
	)
}

export default Author
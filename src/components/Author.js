import React from 'react'
import ReviewList from './ReviewList'
import useAuthor from '../hooks/useAuthor.js'
import titleCase from 'title'

function Author({author, currentPage, setCurrentPage}) {

	const { reviews, hasMore, loading, error } = useAuthor(author, currentPage)

	return (
		<div>
			<h1 className="author">{titleCase(author)}</h1>
			<h4 className="author-type">{reviews[0] && reviews[0].author_type}</h4>
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
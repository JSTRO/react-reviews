import React from 'react'
import ReviewList from '../components/ReviewList'
import useBNM from '../hooks/useBNM.js'

function BestNewMusic({currentPage, setCurrentPage}) {

	const { reviews, hasMore, loading, error } = useBNM(currentPage)

	return (
		<ReviewList 
      reviews={reviews}
      hasMore={hasMore}
      loading={loading}
      error={error}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage} 
    /> 
	)
}

export default BestNewMusic
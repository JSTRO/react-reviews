import React, { useState } from 'react'
import ReviewList from '../components/ReviewList'
import Divider from '@material-ui/core/Divider'
import useBNM from '../hooks/useBNM.js'

function BestNewMusic() {
  const [currentPage, setCurrentPage] = useState(1)
	const { reviews, hasMore, loading, error } = useBNM(currentPage)

	return (
    <>
      <h3 className="review-list-title">BEST NEW MUSIC</h3>
      <div className="review-list-divider">
        <Divider variant="middle"/>
      </div>  
  		<ReviewList 
        reviews={reviews}
        hasMore={hasMore}
        loading={loading}
        error={error}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} 
      /> 
    </>  
	)
}

export default BestNewMusic
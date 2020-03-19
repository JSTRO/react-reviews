import React from 'react'
import Divider from '@material-ui/core/Divider'

function Header({title}) {
	return (
		<div>
			<h3 className="review-list-title">{title}</h3>
      <div className="review-list-divider">
        <Divider variant="middle"/>
      </div>
		</div>
	)
}

export default Header
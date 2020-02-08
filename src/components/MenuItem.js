import React from 'react'
import Typography from '@material-ui/core/Typography'

function MenuItem({name}) {

	return (
    <Typography variant="subtitle2" noWrap>
        {name}
    </Typography>
	)
}

export default MenuItem
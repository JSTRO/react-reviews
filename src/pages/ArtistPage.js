import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Artist from '../components/Artist'

function ArtistPage() {
	const { artist } = useParams()
	const [currentPage, setCurrentPage] = useState(1)

	return (
		<Artist
			artist={artist}
			currentPage={currentPage}
			setCurrentPage={setCurrentPage}
		/>
	)
}

export default ArtistPage

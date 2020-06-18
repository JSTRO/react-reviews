import useAPI from './useAPI.js'

export default function useArtist(artist, pageNumber) {
	return useAPI('/api/artists/:artist', { artist: artist, page: pageNumber })
}

import useAPI from './useAPI.js'

export default function useGenre(genres, pageNumber) {
	return useAPI('/genres', { genres: genres, pageNumber: pageNumber })
}
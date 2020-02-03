import {useState, useEffect} from 'react'
import useAPI from './useAPI.js'

export default function useBNM(url, params) {
	return useAPI('/reviews/best-new-music', { page: pageNumber, limit: 48 })
}
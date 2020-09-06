import { useDispatch as useReduxDispatch } from 'react-redux'

export const useDispatch = () => {
	const dispatch = useReduxDispatch()
	return { dispatch }
}

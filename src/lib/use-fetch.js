import { useState, useCallback } from 'react'

export const useFetch = ({ fetchFn, initialValue }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(initialValue)
  const [error, setError] = useState(null)

  const fetch = useCallback(async (...params) => {
    setLoading(true)
    setError(null)

    try {
      const fetchData = await fetchFn(...params)
      setData(fetchData)
      setLoading(false)
      return fetchData
    } catch (e) {
      setError(String(e))
    }

    setLoading(false)
  }, [fetchFn])

  return {
    loading,
    data,
    error,
    fetch
  }
}

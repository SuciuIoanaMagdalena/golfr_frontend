import useSWR from 'swr'
import { getToken } from './userAuth'

export const USER_URL = `${process.env.NEXT_PUBLIC_API_URL}/user`

const useUserName = userId => {
  // console.log(user_id)
  const fetcher = async url => {
    // console.log(user_id)
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },

      body: JSON.stringify({
        id: userId,
      }),
    })


    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data. In useUserScores')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json().then(data => data.scores)
  }

  const { data, error } = useSWR(USER_URL, fetcher)

  return {
    scores: data,
    error: error && error.message,
  }
}

export default useUserName

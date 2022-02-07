import Layout from '../../components/Layout'
import ScoreCard from '../../components/ScoreCard'
import { useEffect, useState } from 'react'
import { getToken } from '../../lib/userAuth'
import { useRouter } from 'next/router'
import useUserScores from '../../lib/useUserScores'

const Profile = () => {
  const router = useRouter()
  const { id } = router.query
  const [ name, setName ] = useState('')
  const [ message, setMessage ] = useState('')
  const { scores, error } = useUserScores(id)

  useEffect(() => {
    if (scores.length > 0) {
      setName(scores[0].user_name)
    }
  }, [ scores ])

  useEffect(() => {
    if (scores.length < 0) {
      setMessage('has no scores')
    } else {
      setMessage('has the following scores')
    }
  }, [ scores ])

  return (
    <Layout>
      <>
        {error ? (
          error
        ) : (
          <>
            <h1> {name} {message}  </h1>
            {scores && scores.map(score => (
              <ScoreCard
                key={score.id}
                id={score.id}
                totalScore={score.total_score}
                playedAt={score.played_at}
                userId={score.user_id}
                userName={score.user_name}
              />
            ))}
          </>
        )}
      </>
    </Layout>
  )
}
export default Profile

import Layout from '../../components/Layout'
import ScorePostWidget from '../../components/ScorePostWidget'
import ScoreCard from '../../components/ScoreCard'
import { useEffect, useState } from 'react'
import { getToken, getUsername } from '../../lib/userAuth'
import { useRouter } from 'next/router'
import useUserScores from '../../lib/useUserScores'
import { USER_SCORES_URL } from '../../lib/useUserScores'
import { useUserName } from '../../lib/useUserName'
import { USER_URL } from '../../lib/useUserName'



const Profile = () => {
  const router = useRouter()
  const { id } = router.query
  // const [ scores, setScores ] = useState([])
  // const [ scores, error ] = useState('')
  const [ name, setName ] = useState('')
  const [ message, setMessage ] = useState('')
  const { scores, error } = useUserScores(id)
  // console.log(scores);
  useEffect(() => {
    // console.log(scores[0].user_name)
    if (scores.length > 0){
      setName(scores[0].user_name)
    }

  }, [ scores ] )
  useEffect(() => {
    if (scores.length < 0) {
      setMessage('has no scores')
    } else {
      setMessage('has the following scores')
    }
  }, [ scores ])

  // console.log('Message' + message)




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

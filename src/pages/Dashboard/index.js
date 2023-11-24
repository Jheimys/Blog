
import { Link } from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import {useFechtDocuments} from '../../hooks/useFetchDocuments'

import styles from './Dashboard.module.css'

const Dashboard = () => {
  const {user} = useAuthValue()
  const uid = user.uid

  //posts do usuário
  const posts = []
  
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Gerencie seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.nopost}>
          <p>Não foram encontrados posts</p>
          <Link to='/posts/create' className='btn'>Criar o primeiro post</Link>
        </div>
      ) : (
        <div>Tem posts...</div>
      )}
    </div>
  )
}

export default Dashboard
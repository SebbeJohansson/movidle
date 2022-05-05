import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import GuessMovie from '../components/organisms/GuessMovie';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Daily Movidle</h1>
        <GuessMovie />
      </main>
    </div>
  )
}

export default Home

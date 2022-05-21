import Router from 'next/router';
import styles from '../../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <div className='container__head'>
        <h1 className="head__title">Poker Planner</h1>
      </div>
      <div className={styles.container__brand}>
        <div>
          <h1 className={styles.brand__title}>Scrum Poker for agile development teams</h1>
          <h6 className={styles.brand__tagline}>Have fun while being productive with our simple and complete tool.</h6>
          <button className='btn' onClick={() => Router.push('/sprint')}>Start new game</button>
        </div>
        <div>
          <img className={styles.placeholder_img} src='placeholder.svg' alt='placeholder' />
        </div>
      </div>
    </>
  )
}

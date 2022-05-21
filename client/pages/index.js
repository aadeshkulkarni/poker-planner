export default function Home() {
  return (
    <div className='container'>
      <div className='container__head'>
        <h1 className="head__title">Poker Planner</h1>
      </div>
      <div className='container__brand'>
        <div>
          <h1 className='brand__title'>Scrum Poker for agile development teams</h1>
          <h6 className='brand__tagline'>Have fun while being productive with our simple and complete tool.</h6>
          <button className='btn'>Start new game</button>
        </div>
        <div>
          <img className="placeholder-img" src='placeholder.svg' alt='placeholder' />
        </div>
      </div>
    </div>
  )
}

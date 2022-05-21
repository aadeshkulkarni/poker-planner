import '../styles/globals.css'
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Poker Planner</title>
        <meta name='description' content='Scrum poker for agile development teams' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='container'>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp

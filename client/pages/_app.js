import '../styles/globals.css'
import Head from 'next/head'
import { SocketStateProvider } from '../src/hooks/use-socket'
import { AppStateProvider } from '../src/hooks/use-app-state'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Poker Planner</title>
        <meta name='description' content='Scrum poker for agile development teams' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='container'>
      <AppStateProvider {...pageProps}>
        <SocketStateProvider>
          <Component {...pageProps} />
        </SocketStateProvider>
        </AppStateProvider>
      </div>
    </>
  )
}

export default MyApp

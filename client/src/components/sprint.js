import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import styles from '../../styles/sprint-styles.module.css'
import useSocketState from '../hooks/use-socket'
import useAppState from '../hooks/use-app-state'
export default function Sprint() {
  const [sprint, setSprint] = useState('')
  const [userName, setName] = useState('')

  const { setCurrentUser } = useAppState()
  const { getSocket } = useSocketState()
  const socket = getSocket()

  useEffect(() => {
    if (userName && sprint) {
      socket.on('SHOW_SPRINT', function (data) {
        if (data.length > 0) {
          const isUserValid = data.filter(record => record.userName.toUpperCase() === userName.toUpperCase())
          if (isUserValid && isUserValid.length > 0) {
            setCurrentUser({
              sprintID: isUserValid[0].sprintID,
              userID: isUserValid[0]._id,
              userName: isUserValid[0].userName,
              isScrumMaster: isUserValid[0].isScrumMaster || 0
            })
            Router.push(`/sprint-planning?sprintID=${isUserValid[0].sprintID}`)
          }
        }
      })
    }
  }, [socket])

  function CreateSprintHandler() {
    if (sprint && userName) {
      socket.emit('CREATE__SPRINT', { sprintName: sprint, userName: userName })
    }
  }
  return (
    <>
      <div className='container__head'>
        <h1 className='head__title'>Start Sprint</h1>
      </div>
      <div className='container__center'>
        <div className={styles.content}>
          <h6 className={styles.content__title}>Enter the name of your sprint</h6>
          <div className={styles.content__input_block}>
            <input type='text' name='sprint' id='sprint' autoComplete='off' placeholder="Sprint's Name" required value={sprint} onChange={e => setSprint(e.target.value)} />
          </div>

          <div className={styles.content__input_block}>
            <input type='text' name='user' id='user' autoComplete='off' placeholder='User Name' required value={userName} onChange={e => setName(e.target.value)} />
          </div>

          <button className='btn' onClick={CreateSprintHandler} style={{ marginTop: '3rem', width: '100%' }}>
            {' '}
            Sprint &rarr;
          </button>
        </div>
      </div>
    </>
  )
}
import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import styles from '../../styles/sprint-styles.module.css'
import useSocketState from '../hooks/use-socket'
import io from 'socket.io-client'
import useAppState from '../hooks/use-app-state'
export default function Sprint() {
  const [sprint, setSprint] = useState('')
  const [userName, setUserName] = useState('')
  const [isUser, setIsUser] = useState('')

  const { setCurrentUser } = useAppState()
  // const { getSocket } = useSocketState()
  // const socket = getSocket()
  const router = useRouter()

  const socket = io.connect('http://localhost:4000')

  const sprintId = router?.query?.sprintID;

  useEffect(() => {
    if (sprintId) {
      fetch(`http://localhost:4000/getSprintById?sprintId=${sprintId}`, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(result => {
          if(result.data){
            const { sprintID = '', sprintName = '' } = result.data;
            setSprint(sprintName)
            setIsUser(true)
          }
        })
        .catch(error => console.log('error', error));
    }
  }, [sprintId])


  useEffect(() => {
    if (userName && sprint) {
      socket.on('NOTIFICATION', function (response) {
        let data = response?.userInfo || [];
        if (data.length > 0) {
          const isUserValid = data.filter(record => record.userName.toUpperCase() === userName.toUpperCase())
          if (isUserValid && isUserValid.length > 0) {
            setCurrentUser({
              sprintID: isUserValid[0].sprintID,
              userID: isUserValid[0]._id,
              userName: isUserValid[0].userName,
              isScrumMaster: isUserValid[0].isScrumMaster || false
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

  function JoinSprintHandler() {
    if (sprint && userName) {
      fetch(`http://localhost:4000/addUserToSprint?sprintId=${sprintId}&userName=${userName}`, {
        method: 'POST',
      })
        .then(res => res.json())
        .then(result => {
          if (result?.status?.toLowerCase() === 'success') {
            socket.emit('JOIN__SPRINT', { sprintId: sprintId })
            Router.push(`/sprint-planning?sprintID=${result?.data.sprintID}`)
          }
          else {
            console.log(result)
          }
        })
        .catch(error => console.log('error', error));
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
            <input type='text' name='sprint' id='sprint' autoComplete='off' placeholder="Sprint's Name" required value={sprint} onChange={e => setSprint(e.target.value)} disabled={isUser} />
          </div>

          <div className={styles.content__input_block}>
            <input type='text' name='user' id='user' autoComplete='off' placeholder='User Name' required value={userName} onChange={e => setUserName(e.target.value)} />
          </div>

          {!isUser ? <button className='btn' onClick={CreateSprintHandler} style={{ marginTop: '3rem', width: '100%' }}>
            {' '}
            Sprint &rarr;
          </button>
            :
            <button className='btn' onClick={JoinSprintHandler} style={{ marginTop: '3rem', width: '100%' }}>
              {' '}
              Join Sprint &rarr;
            </button>}

        </div>
      </div>
    </>
  )
}
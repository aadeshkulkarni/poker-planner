import React, { useEffect, useState } from 'react'
import style from '../../styles/sprint-planning-styles.module.css'
import PokerCards from '../common/poker-cards'
import useSocketState from '../hooks/use-socket'
import io from 'socket.io-client'
import { useRouter } from 'next/router'
import { storiesMock } from '../../mock/stories'
import NewStory from './common/NewStory'

export default function SprintPlanning() {
  const router = useRouter()
  // const { getSocket } = useSocketState()
  // const socket = getSocket()
  const [modal, setModal] = useState(false)
  const [stories, setStories] = useState([])
  const [users, setUsers] = useState([])
  

  const room = router?.query?.sprintID
  const socket = io.connect('http://localhost:4000')

  const onAddStoryHandler = (data) => {
    console.log('Data: ',data);
    if (data.title) {
      socket.emit('CREATE_STORY', { title: data.title, ac: data.ac, description: data.description, room: room })
      setModal(false)
    }
  }

  useEffect(() => {
    if (room) {
      fetch(`http://localhost:4000/getSprintData?sprintId=${room}`, {
        method: 'GET'
      })
        .then(res => res.json())
        .then(result => {
          console.log(result)
        })
        .catch(error => console.log('error', error))
    }
  }, [room])

  useEffect(() => {
    let data = { sprintId: room }
    socket.emit('JOIN__SPRINT', data)
    socket.on('NOTIFICATION', function (response) {
      console.log("Show all data: ",response)
      let {storyInfo = [], userInfo = []}=response
      if (storyInfo.length > 0) {
        setStories(storyInfo)
      }
      if (userInfo.length > 0) {
        setUsers(userInfo)
      }
    })
  }, [socket])

  return (
    <>
      <div className='container__head'>
        <h1 className='head__title'>Poker planner</h1>
      </div>
      <div className={style.sprint_container}>
        <div>Timer</div>
        <div style={{ marginTop: '120px' }}>
          <div>
            <div className={style.poker__table}>
              <div className={style.poker__table_inner}>
                <div className='container__center'>
                  <button className='btn' onClick={() => Router.push('/sprint-planning')} style={{ width: '35%' }}>
                    Reveal Cards
                  </button>
                </div>
              </div>

              <PokerCards left='50%' right='50%' top='-125px' teamMemberName={users[0]?.userName || ''} elementOrder='012' transform='translateX(-50%)' />

              <PokerCards left='20%' top='-125px' teamMemberName={users[1]?.userName || ''} elementOrder='012' />

              <PokerCards right='20%' top='-125px' teamMemberName={users[2]?.userName || ''} elementOrder='012' />

              <PokerCards left='20%' bottom='-135px' teamMemberName={users[3]?.userName || ''} elementOrder='210' />

              <PokerCards left='50%' right='50%' bottom='-135px' teamMemberName={users[4]?.userName || ''} elementOrder='210' transform='translateX(-50%)' />

              <PokerCards right='20%' bottom='-135px' teamMemberName={users[5]?.userName || ''} elementOrder='210' />

              <PokerCards left='-6%' bottom='-37.5px' teamMemberName={users[6]?.userName || ''} elementOrder='210' transform='rotate(55deg)' />

              <PokerCards left='-6%' top='-37.5px' teamMemberName={users[7]?.userName || ''} elementOrder='210' transform='rotate(125deg)' />

              <PokerCards right='-7%' bottom='-37.5px' teamMemberName={users[8]?.userName || ''} elementOrder='210' transform='rotate(-55deg)' />

              <PokerCards right='-4%' top='-37.5px' teamMemberName={users[9]?.userName || ''} elementOrder='210' transform='rotate(-125deg)' background='#B4C1D5' />
            </div>
          </div>
          <div className={style.story_points_container}>
            <span style={{ fontWeight: 700, color: 'var(--primary-color)', letterSpacing: '10px', fontSize: '1.25rem' }}>CHOOSE YOUR STORY POINT</span>
            <div className={style.story_points}>
              {[1, 2, 3, 4, 5, 6, 7].map(eachStoryPoint => (
                <div className={style.story_point} key={eachStoryPoint}>
                  {eachStoryPoint}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ maxHeight: '90vh', overflowX: 'hidden' }}>
        <button className='btn-primary' style={{ width: '100%' }} onClick={()=>setModal(true)}>
            {' '}
            + Add Story
          </button>
          {stories.map((eachStory, index) => (
            <div key={index} className={style.story_cards}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{eachStory.title}</h3>
                <h3 style={{ margin: 0 }}>{eachStory.storypoints}</h3>
              </div>
              <div>
                <br />
                <span>
                  <b>Story Description:</b>
                </span>
                <span> {eachStory.description}</span>
              </div>
              <div>
                <br />
                <span>
                  <b>Acceptance Criteria:</b>
                </span>
                <span>{eachStory.acceptanceCriteria}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button className='btn-primary'>Vote for this issue</button>
                <button className='btn-primary'>Skip this issue</button>
              </div>
            </div>
          ))}
          {modal && <NewStory onSubmit={onAddStoryHandler} onCancel={setModal}/>}
        </div>
      </div>
    </>
  )
}

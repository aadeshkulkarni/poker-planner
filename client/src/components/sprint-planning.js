import React, { useEffect, useState } from 'react'
import style from '../../styles/sprint-planning-styles.module.css'
import PokerCards from '../common/poker-cards'
import useSocketState from '../hooks/use-socket'
import io from 'socket.io-client'
import { useRouter } from 'next/router';
import { storiesMock } from '../../mock/stories'

export default function SprintPlanning() {
  const router = useRouter();
  // const { getSocket } = useSocketState()
  // const socket = getSocket()
  const [modal, setModal] = useState(true);
  const [description, setDescription] = useState('')
  const [ac, setAc] = useState('')
  const [title, setTitle] = useState('')
  const [stories, setStories] = useState(storiesMock);

  const room = router?.query?.sprintID
  const socket = io.connect('http://localhost:4000')

  const onAddStoryHandler = () => {
    if (title) {
      socket.emit('CREATE_STORY', { title: title, ac: ac, description: description, room: room })
    }
  }


  useEffect(() => {
    if (room) {
      fetch(`http://localhost:4000/getSprintData?sprintId=${room}`, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(result => {console.log(result)})
        .catch(error => console.log('error', error));
    }
  }, [room])

  useEffect(() => {
    console.log("socket", socket);
    socket.on('NOTIFICATION', function (response) {
      let data = response?.storyInfo || [];
      if (data.length > 0) {
        setStories(data)
      }
      console.log("response", response);
    })
  }, [socket])

  return (
    <>
      <div className='container__head'>
        <h1 className="head__title">Poker planner</h1>
      </div>
      <div className={style.sprint_container}>
        <div>Timer</div>
        <div style={{ marginTop: '120px' }}>
          <div>
            <div className={style.poker__table}>
              <div className={style.poker__table_inner}>
                <div className="container__center">
                  <button className='btn' onClick={() => Router.push('/sprint-planning')} style={{ width: '35%' }}>Reveal Cards</button>
                </div>
              </div>

              <PokerCards left="50%" right='50%' top="-125px" teamMemberName="Aadesh Kulkarni" elementOrder="012" transform='translateX(-50%)' />

              <PokerCards left="20%" top="-125px" teamMemberName="Bhumika Ladhe" elementOrder="012" />

              <PokerCards right="20%" top="-125px" teamMemberName="Harsha Khanwani" elementOrder="012" />

              <PokerCards left="20%" bottom="-135px" teamMemberName="Dalee Tharayil" elementOrder="210" />

              <PokerCards left="50%" right='50%' bottom="-135px" teamMemberName="Aditya Nandurkar" elementOrder="210" transform='translateX(-50%)' />

              <PokerCards right="20%" bottom="-135px" teamMemberName="Nausheen Akhter" elementOrder="210" />

              <PokerCards left="-6%" bottom="-37.5px" teamMemberName="Naveen Chilakala" elementOrder="210" transform='rotate(55deg)' />

              <PokerCards left="-6%" top="-37.5px" teamMemberName="Rajat Panwar" elementOrder="210" transform='rotate(125deg)' />

              <PokerCards right="-7%" bottom="-37.5px" teamMemberName="Pavithra Yadavar" elementOrder="210" transform='rotate(-55deg)' />

              <PokerCards right="-4%" top="-37.5px" teamMemberName="" elementOrder="210" transform='rotate(-125deg)' background="#B4C1D5" />
            </div>
          </div>
          <div className={style.story_points_container}>
            <span style={{ fontWeight: 700, color: 'var(--primary-color)', letterSpacing: '10px', fontSize: '1.25rem' }}>CHOOSE YOUR STORY POINT</span>
            <div className={style.story_points}>
              {[1, 2, 3, 4, 5, 6, 7].map(eachStoryPoint => <div className={style.story_point} key={eachStoryPoint}>{eachStoryPoint}</div>)}
            </div>
          </div>

        </div>
        <div style={{ maxHeight: '90vh', overflowY: 'scroll', overflowX: 'hidden' }}>
          {stories.map((eachStory, index) => <div key={index} className={style.story_cards}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{eachStory.title}</h3>
              <h3 style={{ margin: 0 }}>{eachStory.storypoints}</h3>
            </div>
            <div>
              <br />
              <span><b>Story Description:</b></span>
              <span> {eachStory.description}</span>
            </div>
            <div>
              <br />
              <span><b>Acceptance Criteria:</b></span>
              <span>{eachStory.acceptanceCriteria}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button className='btn-primary'>Vote for this issue</button>
              <button className='btn-primary'>Skip this issue</button>
            </div>
          </div>
          )}
          {modal && <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></h3>
              <h3 style={{ margin: 0 }}>{2}</h3>
            </div>
            <div>
              <br />
              <span><b>Story Description:</b></span>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
              <br />
              <span><b>Acceptance Criteria:</b></span>
              <input type="text" value={ac} onChange={(e) => setAc(e.target.value)} />
            </div>
          </>}
          <button className='btn-primary' style={{ width: '100%' }} onClick={onAddStoryHandler}> + Add Story</button>
        </div>
      </div>
    </>
  )
}


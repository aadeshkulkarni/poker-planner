import React from 'react'
import style from '../../styles/sprint-planning-styles.module.css'
import PokerCards from '../common/poker-cards'
import { stories } from '../../mock/stories'

export default function SprintPlanning() {
  return (
    //top = -(cardheight+avatarheight)
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
          {stories.map(eachStory => <div className={style.story_cards}>
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
              <button className='btn-primary'>Skip/Hide this issue</button>
            </div>
          </div>
          )}
        </div>
      </div>
    </>
  )
}

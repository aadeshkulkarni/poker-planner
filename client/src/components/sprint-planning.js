import React from 'react'
import style from '../../styles/sprint-planning-styles.module.css'
import PokerCards from '../common/poker-cards'

export default function SprintPlanning() {
  return (
    //top = -(cardheight+avatarheight)
    <>
      <div className='container__head'>
        <h1 className="head__title">Poker planner</h1>
      </div>
      <div className="container__center">
        <div>
          <div className={style.poker__table}>
            <div className={style.poker__table_inner}>
              <div className="container__center">
                <button className='btn' onClick={() => Router.push('/sprint-planning')} style={{ width: '35%' }}>Reveal Cards</button>
              </div>
            </div>

            <PokerCards left="50%" right='50%' top="-145px" teamMemberName="Aadesh Kulkarni" elementOrder="012" transform='translateX(-50%)' />

            <PokerCards left="50%" right='50%' bottom="-145px" teamMemberName="Aditya Nandurkar" elementOrder="210" transform='translateX(-50%)' />

            <PokerCards left="20%" top="-145px" teamMemberName="Bhumika Ladhe" elementOrder="012" />

            <PokerCards right="20%" top="-145px" teamMemberName="Harsha Khanwani" elementOrder="012" />

            <PokerCards left="20%" bottom="-145px" teamMemberName="Dalee Tharayil" elementOrder="210" />

            <PokerCards right="20%" bottom="-145px" teamMemberName="Nausheen Akhter" elementOrder="210" />

            <PokerCards left="-8%" bottom="-37.5px" teamMemberName="Naveen Chilakala" elementOrder="210" transform='rotate(55deg)' />

            <PokerCards left="-8%" top="-37.5px" teamMemberName="Rajat Panwar" elementOrder="210" transform='rotate(125deg)' />

            <PokerCards right="-8%" bottom="-37.5px" teamMemberName="Pavithra Yadavar" elementOrder="210" transform='rotate(-55deg)' />

            <PokerCards right="-7%" top="-37.5px" teamMemberName="" elementOrder="210" transform='rotate(-125deg)' background="#B4C1D5" />
          </div>
        </div>
        <div className={style.story_points_container}>
          {[1, 2, 3, 4, 5, 6, 7].map(eachStoryPoint => <div className={style.story_points} key={eachStoryPoint}>{eachStoryPoint}</div>)}
        </div>
      </div>

    </>
  )
}

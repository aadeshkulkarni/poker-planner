import React from 'react'
import style from '../../styles/sprint-planning-styles.module.css'

export default function PokerCards(props) {
   //elementOrder => name, img, card
   const teamMember = props.teamMemberName?.split(' ');
   const firstName = teamMember[0];
   const lastName = teamMember[1];
   const order = props.elementOrder;
   return (
      <div style={{
         position: "absolute",
         display: 'flex',
         alignItems: 'center',
         flexDirection: 'column',
         top: props.top,
         bottom: props.bottom,
         right: props.right,
         left: props.left,
         transform: props.transform
      }}>
         <span className={style.team_member_name} style={{ order: order[0] }}>{firstName}</span>
         <img src={`https://avatars.dicebear.com/api/avataaars/${firstName}.svg`}
            style={{ borderRadius: '100%', border: "1px solid #e3e3e3", padding: '0.25rem', margin: '4px 0', width: 'auto', height: 'var(--avatar-height)', order: order[1] }}></img>
         <div className={style.poker_card} style={{ order: order[2], background: props.background ? props.background : 'var(--primary-color)' }}>
            {`${firstName && firstName[0]}${lastName && lastName[0] ? lastName[0] : ''}`}
         </div>
      </div>
   )
}

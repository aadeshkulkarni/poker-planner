import React from 'react'
import Router from 'next/router';
import styles from "../../styles/sprint-styles.module.css"

export default function Sprint() {
   return (
      <>
         <div className='container__head'>
            <h1 className="head__title">Start Sprint</h1>
         </div>
         <div className='container__center'>
            <div className={styles.content}>
               <h6 className={styles.content__title}>Enter the name of your sprint</h6>
               <div className={styles.content__input_block}>
                  <input type="text" name="input-text" id="input-text" placeholder="Sprint's Name"  required />
                  {/* <span className="placeholder">
                     Sprint's Name
                  </span> */}
               </div>

               <div className={styles.content__input_block}>
                  <input type="text" name="input-text" id="input-text" placeholder="User Name" required />
                  {/* <span className="placeholder">
                     User Name
                  </span> */}
               </div>

               <button className='btn' onClick={() => Router.push('/sprint-planning')} style={{marginTop:'3rem', width:'100%'}}> Sprint &rarr;</button>
            </div>
         </div>
      </>
   )
}




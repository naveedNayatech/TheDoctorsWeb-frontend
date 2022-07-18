import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const RPMMinutesProgress = ({count, totalTime }) => {
  return (
    <>
    <small>99454 : {count} / 16 days</small>
                    <ProgressBar min="0" max="16" variant='primary' label={(count / 16) * 100 + "%"} now={count} />

                    <br />

                    {totalTime >=0 && totalTime <= 20 ? <>
                        <small><b>99457 : </b> {totalTime} / 20 mins</small>
                        <ProgressBar animated min="0" max="20" variant='info' label={(totalTime / 20) * 100 + "%"} now={totalTime} />
                    </> : <>
                    <small><b>99457 : </b> 20 / 20 mins</small>
                        <ProgressBar animated min="0" max="20" variant='info' label="100%" now="20" />
                    </>}
                     

                    <br />
                    {totalTime >=21 ? <>
                        <small><b>99458 : </b> {totalTime > 40 ? "40" : totalTime} / 40 mins</small>
                        <ProgressBar animated min="21" max="40" variant='success' label={totalTime > 40 ? "100%" : (totalTime / 40) * 100 + "%"} now={totalTime} />
                    </> : <>
                    <small><b>99458 : </b> 0 / 40 mins</small>
                        <ProgressBar animated min="21" max="40" variant='dangar' now="21" />
                    </>}
                    
                    <p style={{marginTop: "14px", fontSize:"12px"}}>Total {totalTime || 0} Mins - Month of {new Date().toLocaleString('en-us',{month:'short', year:'numeric'})}</p>
    </>
  )
}

export default RPMMinutesProgress
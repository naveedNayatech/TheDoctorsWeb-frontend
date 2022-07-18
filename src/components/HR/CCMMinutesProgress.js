import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const CCMMinutesProgress = ({totalTimeinCCM}) => {
  return (
    <>
        {totalTimeinCCM >=0 && totalTimeinCCM <= 20 ? <>
            <small><b>99490  : </b> {totalTimeinCCM} / 20 mins</small>
            <ProgressBar min="0" max="20" variant='info' label={((totalTimeinCCM / 20) * 100).toFixed() + "%"} now={totalTimeinCCM} />
        </> : <>
        <small><b>99490 : </b> 20 / 20 mins</small>
            <ProgressBar min="0" max="20" variant='info' label="100%" now="20" />
        </>}  

        <br />
        {totalTimeinCCM >=21 && totalTimeinCCM <=40 ? <>
            <small><b>99439 : </b> {totalTimeinCCM} / 40 mins</small>
            <ProgressBar min="21" max="40" variant='primary' label={((totalTimeinCCM / 40) * 100).toFixed() + "%"} now={totalTimeinCCM} />
        </> : totalTimeinCCM >= 41 ? <>
            <small><b>99439 : </b> 40 / 40 mins</small>
            <ProgressBar min="21" max="40" variant='primary' now="40" label="100%" />
        </> : <>
            <small><b>99439 : </b> 0 / 40 mins</small>
            <ProgressBar min="21" max="40" variant='primary' now="0" />
        </>}
        

        <br />
        {totalTimeinCCM >=41 && totalTimeinCCM <=60 ? <>
            <small><b>99487  : </b> {totalTimeinCCM} / 60 mins</small>
            <ProgressBar min="41" max="60" variant='danger' label={((totalTimeinCCM / 60) * 100).toFixed() + "%"} now={totalTimeinCCM} />
        </> : totalTimeinCCM >= 61 ? <>
            <small><b>99439 : </b> 60 / 60 mins</small>
            <ProgressBar variant='danger' label="100%" />
        </> : <>
        <small><b>99487  : </b> 0 / 60 mins</small>
            <ProgressBar variant='danger' now="0" />
        </>}

        <br />
        {totalTimeinCCM >= 60 && totalTimeinCCM <=90 ? <>
            <small><b>99489  : </b> {totalTimeinCCM} / 90 mins</small>
            <ProgressBar min="60" max="90" variant='warning' label={((totalTimeinCCM / 90) * 100).toFixed() + "%"} now={totalTimeinCCM} />
        </> : totalTimeinCCM >= 91 ? <>
            <small><b>99439 : </b> 90 / 90 mins</small>
            <ProgressBar variant='danger' label="100%" />
        </> : <>
        <small><b>99489  : </b> 0 / 90 mins</small>
            <ProgressBar variant='warning' now="0" />
        </>}

        <p style={{marginTop: "14px", fontSize:"12px"}}>Total {totalTimeinCCM || 0} Mins - {new Date().toLocaleString('en-us',{month:'short', year:'numeric'})} in CCM Category.</p>


    </>
  )
}

export default CCMMinutesProgress
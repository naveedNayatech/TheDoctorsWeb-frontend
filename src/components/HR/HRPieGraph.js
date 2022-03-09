import React, {useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getPatientTelemetryData} from '../../actions/adminActions';
import {useAlert} from 'react-alert';
import {useDispatch, useSelector} from 'react-redux';
import { getHRPatients } from '../../actions/HRActions';
const moment = require('moment-timezone');
import {Spinner} from 'react-bootstrap';

const HRPieGraph = () => {
  
  const { hr } = useSelector(state => state.hrAuth);
  const { hrpatients} = useSelector(state => state.hrPatients);
  const {loading, error,  deviceData } = useSelector(state => state.deviceData);

    const dispatch = useDispatch();
    const [patientId, setPatientId] = useState('');

    let id = hr._id;

    const alert = useAlert();


    useEffect(() => {
      if(error){
          return alert.error(error);
      }
  
      dispatch(getHRPatients(id));
  
      if(patientId){
        if(patientId === 'default'){
          return
        }
        dispatch(getPatientTelemetryData(patientId))
      }
  
    }, [dispatch, error, patientId]);

    let data = deviceData && deviceData.slice(0,10).map((deviceData, index) => {
      return {
          'date': moment(deviceData?.createdAt).tz("America/New_York").format("ll"),
          'sys': deviceData?.telemetaryData?.sys,
          'dia': deviceData?.telemetaryData?.dia,
          'pul':deviceData?.telemetaryData?.pul
      }
    });

    return (
      <section className="alerts-section rounded-card graph-card" style={{width: '100%'}}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <h5 className="title">B.P Analytics </h5>
              <select 
              className="patient-list-style" 
              name="patientlist"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              >
              <option value="default">Select Patient</option>
              {hrpatients && hrpatients.map((patient, index) => (
                  <option value={patient?._id} key={index} > {patient?.firstname} {patient?.lastname} </option>
              ))}  
              </select>
        </div> 
        <br />

      <ResponsiveContainer width="100%" aspect={4/1}>
        {loading === true ? <Spinner animation="border" style={{marginLeft: '45%'}}/> : <BarChart data={data}
                  margin={{ top: 10, right: 0, left: -15, bottom: 0 }}>
                  <XAxis dataKey="date" />
                  <YAxis dataKey="sys"/>
                  <CartesianGrid strokeDasharray="1 1" />
                  <Tooltip />
                  <Legend/> 
                  <Bar dataKey="sys" fill="#FE9E15" />
                  <Bar dataKey="dia" fill="#003366" />
                  <Bar dataKey="pul" fill="#F95800" />
              </BarChart>
        }
      </ResponsiveContainer>
      </section>
    );
}

export default HRPieGraph;
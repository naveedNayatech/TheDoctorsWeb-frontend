import React, {useState} from 'react';
import { Formik, Form } from 'formik';
import { timeSpentOnPatient } from '../../actions/HRActions';
import { useDispatch } from 'react-redux';
import TextField from '../../components/Form/TextField';
import * as Yup from 'yup';
import moment from 'moment';

const AddTimeManually = ({hrId, patientId}) => {
    
    const [isCCM, setIsCCM] = useState(false);
    const [timeSpent, setTimeSpent] = useState(0);

    const dispatch = useDispatch();  

    const validate = Yup.object().shape({
		startDate: Yup.date().required('Start date is required'),
		endDate: Yup.date().required('End date is required'),
        startTime: Yup.string().required('Start time is required'),
        endTime: Yup.string().required('End time is required'),
        conclusion: Yup.string().required('Conclusion is required')
	  });



    const submitTimeSpent = (values) => {
        const {startTime, endTime} = values;

        var timeStart = moment(startTime, 'HH:mm:ss a');
        var timeEnd = moment(endTime, 'HH:mm:ss a');

        var duration = moment.duration(timeEnd.diff(timeStart));

        // duration in minutes
        var minutes = parseInt(duration.asMinutes()) % 60;

        var confirmation = window.confirm(`${minutes} mins would be added to patient profile, Ok ?`);
            if(confirmation == true){
                if(minutes < 0) {
                    window.alert('Invalid minutes cannot be added.');
                    return;
                }
                dispatch(timeSpentOnPatient(patientId, hrId, isCCM, minutes, values));       
            } 
    }

  return (
    <>
        <Formik initialValues={{
                    startDate: '',
                    endDate: '',
                    startTime:'',
                    endTime:'',
                    timeSpent: '',
                    conclusion: '', 
                }}
                validationSchema={validate}
                onSubmit={values => {
                    submitTimeSpent(values)
                }}
                >
                { formik => (
                <div>    
                    <Form>
                        <div className="row">
                            <div className="col-md-6">
                            <TextField 
                                label="Start Date" 
                                name="startDate" 
                                type="date" 
                            />
                            </div>

                            <div className="col-md-6">
                            <TextField 
                                label="End Date" 
                                name="endDate" 
                                type="date" 
                            />
                            </div>

                            <div className="col-md-6">
                            <TextField 
                                label="Start Time" 
                                name="startTime" 
                                type="time" 
                            />
                            </div>

                            <div className="col-md-6">
                            <TextField 
                                label="End Time" 
                                name="endTime" 
                                type="time" 
                            />
                            </div>

                            <small style={{
                                color: '#004aad',
                                marginLeft: '18px'
                            }}>Minutes should not be greater than 60 mins.</small>

                            <div className="col-md-6 mt-4">
                            <input  
                                value={isCCM}
                                onChange={e => setIsCCM(e.target.checked)}
                                type="checkbox"
                                id="IsCCM" 
                            />
                            <label htmlFor="IsCCM"> <b>&nbsp;&nbsp;Is CCM ? </b></label>
                            </div>

                            <small style={{
                                color: '#004aad',
                                marginLeft: '18px'
                            }}>If CCM is not checked, minutes will go into RPM category.</small>
                        </div>

                            <TextField 
                                label="Note" 
                                name="conclusion" 
                                type="text"	
                                placeholder="Type your conclusion here .... "
                            />

                        <div className="row-class" style={{justifyContent: 'space-between'}}>
                            <button className="reset-btn ml-3" type="submit">Submit</button>
                        </div>
                        </Form>
                    </div>
                )}   
                </Formik>
    </>
  )
}

export default AddTimeManually
import React, { useState, Fragment } from 'react'
import MetaData from '../../layouts/MetaData';
import { Modal, Button, Form } from "react-bootstrap";
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import { updatePassword } from '../../actions/authActions';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";

const Profile = () => {

    const dispatch = useDispatch();

    const { isAuthenticated, user } = useSelector(state => state.auth);
    
    const [showEditModal, setShowEditModal] = useState(false);
    const [oldpassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');

    let id = user?._id;

    console.log('id is ' + id);

    const handleShowEditModal = () => setShowEditModal(true);

    const handleCloseEditModal = () => setShowEditModal(false);

    const onFormSubmit = (e) => {
        e.preventDefault();

        console.log('Submitting form');
        dispatch(updatePassword(id, oldpassword, password));
        // handleCloseEditModal();
      };

    return (
        <Fragment>
            <MetaData title="Profile"/>
                <Sidebar />

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                
                <div className="jumbotron jumbotron-blur-img"></div> 
                  <div className="">
                  <img src="https://i.pinimg.com/originals/a2/de/39/a2de3954697c636276192afea0a6f661.jpg" className="profile-img" alt="profileimg" />

  
                  <div className="d-flex justify-content-center">
                      <b style={{fontSize: 22, marginTop: 10}}> {user && user.name} 
                        <button className="btn btn-info ml-2"onClick={handleShowEditModal}>
                            <i className='bx bx-edit-alt' data-toggle="tooltip" 
                            data-placement="top" title="Change Password">
                            </i>
                        </button></b>
                  </div>

                  <br />
                  <div className="d-flex justify-content-center">
                   <span className="profile-value-bottom-border"> <b>Email : </b> {user && user?.email}</span>
                  </div>

                  <br />
                  <div className="d-flex justify-content-center">
                   <span className="profile-value-bottom-border"><b>Role : </b> {user && user.role}</span>
                  </div>

                  <br />
                  <div className="d-flex justify-content-center">
                   <span className="profile-value-bottom-border"><b>Created At : </b>{moment(user?.createdAt).format("lll")}</span>
                  </div>

                <Modal show={showEditModal}>
                <form onSubmit={onFormSubmit}>
                   <Modal.Header>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <label htmlFor="oldPassword">Enter Old Password: </label>
                        <input
                            type="password"
                            name="oldpassword"
                            className="form-control"
                            placeholder="Enter Old Password"
                            value={oldpassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <br />

                        <label htmlFor="newPassword">Enter New Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/*...*/}
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <button className="btn btn-primary" type="submit">Save</button>
                            
                        <Button variant="danger" onClick={handleCloseEditModal}>Cancel</Button>
                    </Modal.Footer>
                    </form>
                </Modal>

                </div>


               </section>     
        </Fragment>
    )
}

export default Profile

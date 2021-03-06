import React, { useState, useEffect, Fragment } from 'react';
import Sidebar  from '../../components/AdminDashboard/Sidebar';
import TopBar  from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDevices, sortRPMDevicesByBroken, sortRPMDevices, deleteRPMDevice, searchRPMDevices } from '../../actions/adminActions';
import { useAlert } from 'react-alert'; 
import Loader from '../../layouts/Loader';
import Pagination from 'react-js-pagination';
import { Badge, Modal, Table } from 'react-bootstrap';
import InventoryAnalytics from '../../components/inventory/InventoryAnalytics';
import ReactTooltip from "react-tooltip";

const RPMDevices = (props) => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const { loading, deviceCount, devices } = useSelector(state => state.devices);
    const {message, error } = useSelector(state => state.common);

    const [deviceModel, setDeviceModel] = useState(null);
    const [deviceToDelete, setDeviceToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); //for pagination, current page
    const [resPerPage, setResPerPage] = useState(10); //for pagination, how many responses we want to show
    const [search, setSearch] = useState(''); 
    const [searchBy, setSearchBy] = useState('_id');

    const [smShow, setSmShow] = useState(false); //small confirm modal

    useEffect(() => {
        if(error){
        return alert.error(error);
        }

        if(message) {
            alert.success(message);
            props?.history.push('/devices');
            setSmShow(false);    
        }

        dispatch(getAllDevices(resPerPage, currentPage));

    }, [dispatch, alert, error, message, currentPage])

    const sortDevices = (event) => {
        let updatedValue = event.target.value;

        if (updatedValue === "true" || updatedValue == "false") {
            updatedValue = JSON.parse(updatedValue);
        }
        dispatch(sortRPMDevices(updatedValue));
    }

    const sortDevicesByBroken = (event) => {
        let brokenValue = event.target.value;

        if (brokenValue === "true") {
            brokenValue = JSON.parse(brokenValue);
        }

        dispatch(sortRPMDevicesByBroken(brokenValue));
    }

    const deleteHandler = () => {
        dispatch(deleteRPMDevice(deviceToDelete));
    }

    function setCurrentPageNumber(pageNumber) {
        setCurrentPage(pageNumber);
    } 

    const searchDevice = () => {
        dispatch(searchRPMDevices(searchBy, search))
    };

    const refreshHandler = () => {
        dispatch(getAllDevices(resPerPage, currentPage));
    }

    return (
        <Fragment>
              <MetaData title="RPM Devices "/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />


                {loading ? <Loader /> : ( <Fragment>    
                <div className="shadow-lg p-3 mb-2 mr-4 ml-4 rounded">
                    <div className="home-content">
                    
                    <div className="row-display">
                        
                        <h5 className="pt-2">Inventory <span style={{color: '#004aad'}}>Management</span></h5>
                            
                            
                            <div className="row-display">
                            <Link to="adminDashboard" className="go-back-btn"><i className='bx bx-arrow-back' ></i></Link> &nbsp;
                            <button className="btn refresh-btn" onClick={refreshHandler}><i className='bx bx-refresh'></i></button> &nbsp;
                            <Link to="/device" className="add-staff-btn">
                                <small>Add New Device</small>
                            </Link>
                            </div>
                    </div>
                    <br />

                    <div className="row-display">
                       <div className="col-md-4">
                           
                       </div>

                        <div className="mt-2">
                            <select name="listDevice" 
                                className="form-control shadow-none select-input-type"
                                defaultValue={'List Device By'}
                                onChange={sortDevices}
                            >
                                <option disabled>List Device By</option>
                                <option value="true"> In Stock</option>
                                <option value="false"> Out Of Stock</option>
                            </select>
                        </div>

                        <div className="mt-2">
                            <select name="listDevice" 
                                className="form-control select-input-type"
                                    defaultValue={'Sort By'}
                                    onChange={sortDevicesByBroken}
                            >
                                <option disabled>Sort By</option>
                                <option value="true"> Broken</option>
                            </select>
                        </div>
                        
                        <div className="mt-2">
                            <Link to="/Admin/Inventory/Download" className="add-staff-btn" data-tip data-for="downloadcsv">
                            <i className='bx bxs-download'></i>
                            </Link>
                        </div>

                        {/* Search Device By */}
                        <div
                            className="row-display"
                            style={{
                                backgroundColor: '#D3D3D3',
                                padding: '10px',
                                borderRadius: '10px',
                            }}>

                        <div>
                            <select 
                            className="form-control select-input-type" 
                            value={searchBy}
                            onChange={e => setSearchBy(e.target.value)}
                            >
                                <option value="undefined">Search device By </option>
                                <option value="_id">Device ID</option>
                                    <option value="imei">IMEI</option>
                                    <option value="modelNumber">Model Number</option>
                                    <option value="deviceType">Device Type</option>
                                    <option value="firmwareVersion">Firmware Version</option>
                                    <option value="hardwareVersion">Hardware Version</option>
                            </select>    
                        </div>
                        
                        &nbsp;&nbsp;&nbsp;
                        <div>
                            <input 
                            type="text"
                            className="form-control shadow-none"
                            placeholder="Search device..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            />
                        </div>

                        &nbsp;&nbsp;&nbsp;
                            <button 
                            className="btn add-staff-btn" style={{height: '40px'}}
                            onClick={searchDevice}
                            ><i className='bx bx-search-alt-2'></i></button>
                        </div>
                        
                     </div>

                        <ReactTooltip id="downloadcsv" type="dark" effect="solid">
                            Download complete list in .csv
                        </ReactTooltip>
                            <br /> 
                        </div>

                        <InventoryAnalytics />        
                          {/* Devices List Card */}
                          <div className="col-md-12">
                         <Fragment>
                         {devices && <Fragment>
                            <Table className="table table-sm table-striped">
                            <thead align="center">
                                <tr>
                                    <th>Device ID</th>
                                    <th>IMEI</th>
                                    <th>Device Type </th>
                                    <th>Broken</th>
                                    <th>Status</th>
                                    <th>To</th>
                                    <th>Action</th>
                                </tr> 
                            </thead>

                            <tbody>      
                            {devices && devices.map((device, index) => (                      
                                <tr align="center" key={index}>
                                    <td><Link to={{ pathname:"/devicedetails", state: {id: device?._id}}}>{device?._id}</Link></td>
                                    <td>{device?.imei ? device?.imei : 'N/A'}</td>
                                    {device?.deviceType === 'bp' ? 
                                    <td><Badge bg="warning text-white" className="male-tag">cuff</Badge></td>
                                        : device.deviceType === 'spO2' ? <td><Badge bg="info text-white" className="male-tag">Spo2</Badge></td> : 
                                        <td><Badge bg="danger text-white" className="male-tag">Weight</Badge></td>}
                                    {device?.broken === true ? <td style={{color: 'red', fontWeight: 'bold'}}>Broken</td> : <td>unbroken</td> }
                                    
                                    {device?.assigned_patient_id ? <td style={{backgroundColor: 'green', color: '#FFF'}}>Assigned</td> : <td style={{color: 'green', fontWeight: 'bold'}}>In Stock</td>}
                                    <td>{device?.assigned_patient_id ? <span style={{fontWeight: 'bold', color: '#23408e'}}>Pt. {device?.assigned_patient_id?.firstname} 
                                    {device?.assigned_patient_id?.lastname}</span> : 'N/A'}</td>
                                    <td>
                                        <Link to={{ pathname:"/devicedetails", state: {id: device?._id}}} className="rounded-button-profile"><i className='bx bx-list-ul'></i></Link>
                                        <Link to={{ pathname:"/updatedevice", state: {deviceDetails: device}}} className="rounded-button-edit"><i className='bx bx-edit-alt'></i></Link>                       
                                        <Link to="/devices" className="rounded-button-delete" onClick={() => {setSmShow(true); setDeviceModel(device?._id); setDeviceToDelete(device?._id)}} ><i className='bx bx-minus'></i></Link>
                                    </td>
                                </tr>                      
                            ))}
                             </tbody>
                            </Table>  
                            <small style={{color: 'gray'}}>Showing {resPerPage} records per page</small>  

                            {resPerPage <= deviceCount && (
                            <div className="d-flex justify-content-center mt-5"> 
                                <Pagination activePage={currentPage} 
                                itemsCountPerPage={resPerPage} 
                                totalItemsCount = {deviceCount}
                                onChange={setCurrentPageNumber} 
                                nextPageText = {'???'}
                                prevPageText = {'???'}
                                firstPageText = {'??'}
                                lastPageText = {'??'}
                                itemClass='page-item'
                                linkClass="page-link"
                                />           
                            </div>
                            )}  


                            </Fragment> 
                            } 
                          </Fragment>                
                         </div>
                        </div>

                        <Modal
                            size="sm"
                            show={smShow}
                            onHide={() => setSmShow(false)}
                            aria-labelledby="example-modal-sizes-title-sm"
                        >
                            <Modal.Body>
                                <small style={{color: 'gray'}}>Are you sure you want to delete RPM device having model number
                                    <span style={{color: '#000'}}> {deviceModel}</span> ?
                                 </small>
                            </Modal.Body>

                            <Modal.Footer>
                                <button className="btn btn-sm btn-danger" onClick={deleteHandler}>Delete</button>
                            </Modal.Footer>
                        </Modal>
                    </Fragment> 
                    )}
                </section>
                
        </Fragment>
    )
}

export default RPMDevices

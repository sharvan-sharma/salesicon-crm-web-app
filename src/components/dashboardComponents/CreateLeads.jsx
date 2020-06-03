import React,{useEffect,useState} from 'react'
import FileUpload from './createleads/FileUpload'

function CreateLeads(props){
    useEffect(() =>  props.setactive(), [])
    const [active,setactive] = useState(1)
    let activeClass= 'btn btn-3 fsm mr-2'
    let inactiveClass= 'btn btn-light fsm mr-2'
return (<>
        <div className='d-flex my-2'>
            <button className={(active === 1)?activeClass:inactiveClass} onClick={()=>setactive(1)}>Multiple Leads (xls)</button>
            <button className={(active === 2)?activeClass:inactiveClass} onClick={()=>setactive(2)}>Single Lead</button>
        </div>
        <div className='hr-3'></div>
        {(active === 1)?
        <div className='my-2'>
            <div className='d-flex justify-content-between align-items-center flex-wrap'>
                <label className='flg ff-mst m-0'>Upload a <span className='text-1'>.xls</span> file</label>
                <button className='btn btn-3 fsm text-nowrap'>Download Template Xls File</button>
            </div>
            <div className='my-2'>
                <FileUpload/>
            </div>
            <div className='d-flex '>
                <button className='btn btn-outline-3 mr-2'>Cancel</button>
                <button className='btn btn-3'>Upload</button>
            </div>
        </div>:<></>}
        {(active === 2)?
        <div className='my-2'>
            <div className='d-flex justify-content-between align-items-center flex-wrap'>
                <label className='flg ff-mst m-0'>Add a <span className='text-1'>Lead</span></label>
            </div>
            <div className='my-2'>
              <div className='col-12 p-0 col-md-10 col-lg-6 col-xl-6'>
                <div className='form-group'>
                    <label>First Name</label>
                    <input className='form-control' required type='text' id='lfname'/>
                </div>
                <div className='form-group'>
                    <label>Middle Name</label>
                    <input className='form-control' required type='text' id='lmname'/>
                </div>
                <div className='form-group'>
                    <label>Last Name</label>
                    <input className='form-control' required type='text' id='llname'/>
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input className='form-control' required type='email' id='email'/>
                </div>
                <div className='form-group'>
                    <label>Phone Number</label>
                    <input className='form-control' required type='text' id='pno'/>
                </div>
                <div className='form-group'>
                    <label>Date of birth</label>
                    <input className='form-control' required type='date' id='dob'/>
                </div>
                <div className='form-group'>
                    <label>Location</label>
                    <input className='form-control' required type='text' id='loc'/>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Interested In
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <button className="dropdown-item" type="button">Product-1</button>
                        <button className="dropdown-item" type="button">Product-2</button>
                        <button className="dropdown-item" type="button">Product-3</button>
                    </div>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Campaign
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <button className="dropdown-item" type="button">Campaign-1</button>
                        <button className="dropdown-item" type="button">Campaign-2</button>
                        <button className="dropdown-item" type="button">Campaign-3</button>
                    </div>
                </div>
              
                <div className='d-flex justify-content-between'>
                    <button className='btn btn-outline-danger mr-2'>Reset</button>
                    <div>
                        <button className='btn btn-outline-3 mr-2'>Cancel</button>
                        <button className='btn btn-3'>Add</button>
                    </div>
                </div>
              </div>
            </div>
        </div>:<></>}
</>)
}

export default CreateLeads;
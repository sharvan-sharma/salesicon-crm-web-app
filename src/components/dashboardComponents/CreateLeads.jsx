import React,{useEffect,useState} from 'react'
import FileUpload from './createleads/FileUpload'
import {connect} from 'react-redux'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import CircularProgress from '../utilComponents/CircularProgress'
import MessageSnackbar from '../utilComponents/MessageSnackbar'

function CreateLeads(props){

    const [active,setactive] = useState(1)
    const [file,setFile] = useState(null)
    const [fileError,setFileError] = useState(false)
    const [err,seterr]= useState({exist:false,msg:''})
    const [progress,setprogress] = useState(false)
    const [success,setsuccess] = useState({exist:false,msg:''})

    const uploadFile = ()=>{
        if(file === null){
            setFileError(true)
        }else{
            setprogress(true)
            let formData = new FormData()
            formData.append('data',file)
            axios.post('/staffapi/lead/createmultiple',formData,{withCredentials:true,headers:{'Content-Type':'multipart/form-data'}})
            .then(result=>{
                setprogress(false)
                switch(result.data.status){
                    case 455 : seterr({exist:true,msg:'file size limit exceeds'});break;
                    case 200 : setsuccess({exist:true,msg:'mails scheduled'});break;
                    case 403 : seterr({exist:true,msg:'unauthorised to add leads'});break;
                    case 500 : seterr({exist:true,msg:'server error'});break;
                    default:console.log('default exec')
                }
            })
            .catch(err=>{
                setprogress(false)
                seterr({exist:true,msg:'server error'})
            })
        }
    }

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
                <FileUpload setFile={setFile} />
            </div>
            {(fileError)?
            <div className='my-2'>
                <Alert severity='error' variant='filled'>No File Selected</Alert>
            </div>:<></>}
            <div className='d-flex my-2'>
                <button disabled={progress} className='btn btn-outline-3 mr-2' onClick={()=>setFile(null)}>Cancel</button>
                {(progress)?<CircularProgress/>:<button disabled={progress} onClick={uploadFile}  className='btn btn-3'>Upload</button>}
            </div>
            {(err.exist)?
            <div className='my-2'>
                <Alert severity='error' variant='filled'>{err.msg}</Alert>
            </div>:<></>}
             {(success.exist)?
            <MessageSnackbar show={true} message={success.msg} />:<></>}
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
                        {
                            Object.entries(props.productsObject).map(item=><button key={item[0]} className="dropdown-item" type="button">{item[1].name}</button>)
                        }
                    </div>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Campaign
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        {
                            Object.entries(props.campaignsObject).map(item=><button key={item[0]} className="dropdown-item" type="button">{item[1].name}</button>)
                        }
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

const mapStateToProps = state=>({
    productsObject:state.products.productsObject,
    campaignsObject:state.campaigns.campaignsObject
})

export default connect(mapStateToProps)(CreateLeads);
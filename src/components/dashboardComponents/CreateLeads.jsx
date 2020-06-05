import React,{useEffect,useState} from 'react'
import FileUpload from '../utilComponents/FileUpload'
import {connect} from 'react-redux'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import CircularProgress from '../utilComponents/CircularProgress'
import MessageSnackbar from '../utilComponents/MessageSnackbar'
import LeadForm from './createleads/LeadForm'

function CreateLeads(props){

    const [active,setActive] = useState(1)
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
            <button className={(active === 1)?activeClass:inactiveClass} onClick={()=>setActive(1)}>Multiple Leads (xls)</button>
            <button className={(active === 2)?activeClass:inactiveClass} onClick={()=>setActive(2)}>Single Lead</button>
        </div>
        <div className='hr-3'></div>
        {(active === 1)?<div className='my-2'>
            <div className='d-flex justify-content-between align-items-center flex-wrap'>
                <label className='flg ff-mst m-0'>Upload a <span className='text-1'>.xls</span> file</label>
                <button className='btn btn-3 fsm text-nowrap'>Download Template Xls File</button>
            </div>
            <div className='my-2'>
                <FileUpload setFile={setFile} fileType='xls' maxSize={50000} />
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
        {(active === 2)?<LeadForm/>:<></>}
</>)
}


export default CreateLeads
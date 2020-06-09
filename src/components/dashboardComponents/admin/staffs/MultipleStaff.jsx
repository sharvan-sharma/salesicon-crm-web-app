import React,{useState} from 'react'
import Fileupload from '../../../utilComponents/FileUpload'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import Fade from '@material-ui/core/Fade'
import MessageSnackbar from '../../../utilComponents/MessageSnackbar'
import CircularProgress from '../../../utilComponents/CircularProgress'

function SingleStaff(){

     const [file,setFile] = useState(null)

     const [state,setstate] = useState({
         progress:false,
         error:{exist:false,msg:''},
         success:{exist:false,msg:''}

     })

     const uploadFile = ()=>{
        if(file === null){
            setstate({...state,error:{exist:true,msg:'No file selected'}})
        }else{
            setstate({...state,progress:true})
            let formData = new FormData()
            formData.append('data',file)
            axios.post('/adminapi/send/registerlink/multiple',formData,{withCredentials:true,headers:{'Content-Type':'multipart/form-data'}})
            .then(result=>{
                switch(result.data.status){
                    case 455 : setstate({...state,progress:false,error:{exist:true,msg:'file size limit exceeds'}});break;
                    case 200 : setstate({...state,progress:false,success:{exist:true,msg:'Mails Scheduled'}});break;
                    case 403 : setstate({...state,progress:false,error:{exist:true,msg:'Unauthorised to send Emails'}});break;
                    case 423 : setstate({...state,progress:false,error:{exist:true,msg:`Validation Error Type:${result.data.type}`}});break;
                    case 500 : setstate({...state,progress:false,error:{exist:true,msg:'server error'}});break;
                    default:console.log('default exec')
                }
            })
            .catch(err=>{
                setstate({...state,progress:false,error:{exist:true,msg:'server error'}})
            })
        }
    }

    return (
        <div className='col-12 p-0 my-2'>
            <div className='flg ff-mst my-2 d-flex justify-content-between align-items-center flex-wrap'>
                <label className='m-1'>Upload Staff Emails <span className='text-1'>(.xls)</span> File</label>
                <button className='btn btn-outline-3 fsm' onFocus={()=>setstate({...state,error:{exist:false,msg:''},success:{exist:false,msg:''}})}>Download template (.xls) File</button>
            </div>
            <div className='my-2' onFocus={()=>setstate({...state,error:{exist:false,msg:''},success:{exist:false,msg:''}})}>
                <Fileupload setFile={setFile} fileType='xls' maxSize={50000}  />
            </div>
            <div className='d-flex my-2' onFocus={()=>setstate({...state,error:{exist:false,msg:''},success:{exist:false,msg:''}})}>
                {(state.progress)?<CircularProgress/>:<button disabled={state.progress} onClick={uploadFile}  className='btn btn-3 mr-3'>Upload</button>}
                {(file !== null)?<button disabled={state.progress} className='btn btn-outline-3 ' onClick={()=>setFile(null)}>Cancel</button>:<></>}
            </div>
            {(state.error.exist)?
            <div className='my-2'>
                <Fade in={true}>
                    <Alert severity='error' variant='filled'>{state.error.msg}</Alert>
                </Fade>
            </div>:<></>}
             {(state.success.exist)?
            <MessageSnackbar show={true} message={state.success.msg} />:<></>}
        </div>
    )
}

export default SingleStaff
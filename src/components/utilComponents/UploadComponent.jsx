import React,{useState} from 'react'
import Fileupload from './FileUpload'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import Fade from '@material-ui/core/Fade'
import MessageSnackbar from './MessageSnackbar'
import CircularProgress from './CircularProgress'

function UploadComponent(props){

     const [state,setstate] = useState({
         progress:false,
         error:{exist:false,msg:''},
         success:{exist:false,msg:''},
         file:null
     })

     const setFile = (file,error)=>{
        if(error.exist){
            setstate({...state,file:null,error})
        }else{
            setstate({...state,file})
        }
     }

     const uploadFile = ()=>{
        if(state.file === null){
            setstate({...state,error:{exist:true,msg:'No file selected'}})
        }else{
            setstate({...state,progress:true})
            let formData = new FormData()
            formData.append('data',state.file)
            axios.post(props.url,formData,{withCredentials:true,headers:{'Content-Type':'multipart/form-data'}})
            .then(result=>{
                switch(result.data.status){
                    case 455 : setstate({...state,progress:false,error:{exist:true,msg:'file size limit exceeds'}});break;
                    case 200 : setstate({...state,file:null,progress:false,success:{exist:true,msg:'Mails Scheduled'}});break;
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
        <>
            <div className='my-2' onFocus={()=>setstate({...state,error:{exist:false,msg:''},success:{exist:false,msg:''}})}>
                <Fileupload setFile={setFile} fileType={props.fileType} maxSize={props.maxSize}  />
                {
                    (state.file !== null)?<Alert severity='info' variant='filled'>{state.file.name} selected to Upload</Alert>:<></>
                }
            </div>
            <div className='d-flex my-2' onFocus={()=>setstate({...state,error:{exist:false,msg:''},success:{exist:false,msg:''}})}>
                {(state.progress)?<CircularProgress/>:<button disabled={state.progress} onClick={uploadFile}  className='btn btn-3 mr-3'>Upload</button>}
                {(state.file !== null)?<button disabled={state.progress} className='btn btn-outline-3 ' onClick={()=>setFile(null,{exist:false})}>Cancel</button>:<></>}
            </div>
            {(state.error.exist)?
            <div className='my-2'>
                <Fade in={true}>
                    <Alert severity='error' variant='filled'>{state.error.msg}</Alert>
                </Fade>
            </div>:<></>}
             {(state.success.exist)?
            <MessageSnackbar show={true} message={state.success.msg} />:<></>}
        </>
    )
}

export default UploadComponent
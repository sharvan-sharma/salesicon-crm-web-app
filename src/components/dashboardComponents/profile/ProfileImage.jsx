import React,{useState} from 'react'
import CircularProgress from '../../utilComponents/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import FileUpload from '../../utilComponents/FileUpload'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {setUserPhoto} from '../../../redux/user/user.actions'


function ProfileImage(props){

    const [open,setOpen] = useState(false)
    const [File,setFile] = useState(null)
    const [err,seterr] = useState({exist:false,msg:''})
    const [progress,setprogress] = useState(false)
    const [update,setupdate] = useState(false)

    

    const submitForm = (e)=>{
        e.preventDefault()
        if(File === null){
            seterr({exist:true,msg:'file not selected'})
        }else{
            setprogress(true)
            let formdata = new FormData()
            formdata.append('file',File)
            axios.post('/staffapi/changestaffprofilephoto',formdata,{withCredentials:true,headers:{'Content-Type':'multipart/form-data'}})
            .then(result=>{
                 setprogress(false)
                 switch(result.data.status){
                     case 200:props.setUserPhoto(result.data.photo);setFile(null);setOpen(false);setupdate(!update);break;
                     case 401:seterr({exist:true,msg:'Unauthorised to change photo'});break;
                     case 455:seterr({exist:true,msg:'file size limit exceeds'});break;
                     case 422:seterr({exist:true,msg:`Can't change photo of user that doesn't exist`});break;
                     case 500:seterr({exist:true,msg:'server error'});break;
                     default:console.log('defaul exec profile image')
                 }
            })
            .catch(err=>{
                setprogress(false)
                seterr({exist:true,msg:'server error'})
            })
        }
        
    }


    return (
        <div className='col-12 col-md-4 col-lg-3 flex-column d-flex align-items-center'>
            {
            (File === null)?
                <>
                {
                (props.photo === null)?
                <img style={{width:'100%'}} src='/avatar.jpg'/>
                :<>
                {
                    (update)?
                    <img style={{width:'100%'}} key='t'  src={`http://localhost:5000${props.photo}`}/>:
                    <img style={{width:'100%'}} key='f' src={`http://localhost:5000${props.photo}`}/>
                }
                </>
                }
                </>
            
            :
            <div className='form-group preview'>
                <img style={{width:'100%'}} src={URL.createObjectURL(File)}/>
            </div>
            }
            {(!open)?<button onClick={()=>setOpen(true)} className='fsm btn btn-light my-2 shadow rounded ff-mst'>Change</button>:<></>}
            {(open)?
            <form onSubmit={submitForm}>
                <div className='form-group' onFocus={()=>seterr({exist:false,msg:''})}>
                    <FileUpload setFile={setFile} fileType='image' maxSize={500000} />
                    {/* <input type='file' required className='form-control' onChange={(e)=>setFile(e.target.files[0])}/> */}
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <button type='button' disabled={progress} onFocus={()=>seterr({exist:false,msg:''})} onClick={()=>{setFile(null);setOpen(false)}} className='btn shadow btn-danger'>Cancel</button>
                    {(progress)?<CircularProgress/>:
                    <button type='submit' disabled={progress} onFocus={()=>seterr({exist:false,msg:''})} className='btn btn-3 shadow'>Upload</button>
                    }
                </div> 
            </form>
            :<></>}

            {(err.exist)?
            <div className='my-2'>
                <Alert severity="error" variant="filled">{err.msg}</Alert>
            </div>:<></>}
        </div>     
    )

}

const mapDispatchToProps = dispatch=>({
    setUserPhoto:photo=>dispatch(setUserPhoto(photo))
})

const mapStateToProps = state=>({
    photo:state.user.photo
})

export default connect(mapStateToProps,mapDispatchToProps)(ProfileImage)
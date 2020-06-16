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


    const [state,setstate] = useState({
        file:null,
        open:false,
        error:{exist:false,msg:''},
        progress:false,
        update:false
    })

    const setFile = (file,error)=>{
        if(error.exist){
            setstate({...state,file:null,error})
        }else{
            setstate({...state,file})
        }
     }

    const submitForm = (e)=>{
        e.preventDefault()
        if(state.file === null){
            setstate({...state,error:{exist:true,msg:'Image not selected'}})
        }else{
            setstate({...state,progress:true})
            let formdata = new FormData()
            formdata.append('file',state.file)
            axios.post('/changeprofilephoto',formdata,{withCredentials:true,headers:{'Content-Type':'multipart/form-data'}})
            .then(result=>{
                 switch(result.data.status){
                     case 200:props.setUserPhoto(result.data.photo);setstate({...state,file:null,open:false,update:!state.update});break;
                     case 401:setstate({...state,progress:false,error:{exist:true,msg:'Unauthorised to Upload'}});break;
                     case 455:setstate({...state,progress:false,error:{exist:true,msg:'Filesize limit exceed'}});break;
                     case 422:setstate({...state,progress:false,error:{exist:true,msg:`Can't change photo of user that doesn't exist`}});break;
                     case 500:setstate({...state,progress:false,error:{exist:true,msg:'server error'}});break;
                     default:console.log('defaul exec profile image')
                 }
            })
            .catch(err=>{
                setstate({...state,progress:false,error:{exist:true,msg:'server error'}})
            })
        }
        
    }


    return (
        <div className='col-12 col-md-4 col-lg-3 flex-column d-flex align-items-center'>
            {
            (state.file === null)?
                <>
                {
                (props.photo === null)?
                <img style={{width:'100%'}} className='rounded shadow' src='/avatar.jpg'/>
                :<img style={{width:'100%'}} className='rounded shadow' key='f' src={props.photo}/>
                }
                </>
            
            :
            <img style={{width:'100%'}} className='rounded shadow' src={URL.createObjectURL(state.file)}/>
            }
            {(!state.open)?<button onClick={()=>setstate({...state,open:true})} className='fsm btn btn-light my-2 shadow rounded ff-mst'>Change</button>:<></>}
            {(state.open)?
            <form onSubmit={submitForm}>
                <div className='form-group' onFocus={()=>setstate({...state,error:{exist:false,msg:''}})}>
                    <FileUpload setFile={setFile} fileType='image' maxSize={500000} />
                    {
                        (state.file !== null)?<Alert severity='info' variant='filled'>{state.file.name} selected to Upload</Alert>:<></>
                    }
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <button type='button' disabled={state.progress} onClick={()=>setstate({...state,error:{exist:false,msg:''},file:null,open:false})} className='btn shadow btn-danger'>Cancel</button>
                    {(state.progress)?<CircularProgress/>:
                    <button type='submit' disabled={state.progress} onFocus={()=>setstate({...state,error:{exist:false,msg:''}})} className='btn btn-3 shadow'>Upload</button>
                    }
                </div> 
            </form>
            :<></>}

            {(state.error.exist)?
            <div className='my-2'>
                <Alert severity="error" variant="filled">{state.error.msg}</Alert>
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
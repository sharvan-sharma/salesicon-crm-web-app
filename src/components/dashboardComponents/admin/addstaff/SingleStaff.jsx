import React,{useRef,useState} from 'react'
import {isEmail} from '../../../../utils/validations'
import Alert from '@material-ui/lab/Alert'
import Fade from '@material-ui/core/Fade'
import MessageSnackbar from '../../../utilComponents/MessageSnackbar'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '../../../utilComponents/CircularProgress'

function SingleStaff(){

    const email = useRef('')

    const [state,setstate] = useState({
        progress:false,
        progress:false,progress:false,error:{exist:false,msg:''},
        success:false
    })

    const submitForm = (e)=>{
        e.preventDefault()
        if(isEmail(email.current.value)){
            setstate({...state,progress:true})
            axios.post('/adminapi/send/registerlink/single',{email:email.current.value},{withCredentials:true})
            .then(result=>{
                switch(result.data.status){
                    case 200: setstate({...state,progress:false,success:true});break;
                    case 423: setstate({...state,progress:false,error:{exist:true,msg:`Validation Error Type:${result.data.type}`}});break;
                    case 422: setstate({...state,progress:false,error:{exist:true,msg:'Staff Already Registered With this Email'}});break;
                    case 500: setstate({...state,progress:false,error:{exist:true,msg:'Server Error'}});break;
                    case 401: setstate({...state,progress:false,error:{exist:true,msg:'Unauthorised To Send Mail'}});break;
                    default: console.log('single mail reg  link deafult exec admin')
                }
            })
            .catch(err=>{console.log(err)
                setstate({...state,progress:false,error:{exist:true,msg:'Server Error'}})
            })
        }else{
            setstate({...state,error:{exist:true,msg:'Invalid Email'}})
        }
    }

    return (<form onSubmit={submitForm} className='my-4 col-12 p-0' >
                <div className='my-2'>
                    <label className='m-1 flg ff-mst'>Enter Staff Email</label>
                </div>
                <div className='col-12 p-0 col-md-10 col-lg-6'>
                     <TextField 
                     type='email'
                     id="outlined-basic" 
                     label="Staff Email" 
                     variant="outlined" 
                     onFocus={()=>setstate({...state,error:{exist:false,msg:''},success:false})}
                     inputRef={email}
                     required
                     fullWidth/>
                </div>
                {
                    <div className='my-2'>
                        {(state.progress)?<CircularProgress/>:
                        <button type='submit' disabled={state.progress} className='btn btn-3 my-2'>Send Regsitration Link</button>
                        }
                    </div>
                }
                
                <div className='my-2'>
                    {(state.error.exist)?
                        <Fade in={true}>
                            <Alert severity='error' variant='filled'>{state.error.msg}</Alert>
                        </Fade>:
                        <></>}
                </div>
                {(state.success)?<MessageSnackbar show={state.success} message='Mail Scheduled' />:<></>}
            </form>)
}

export default SingleStaff
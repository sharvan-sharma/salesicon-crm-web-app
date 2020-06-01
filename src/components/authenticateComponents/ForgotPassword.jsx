import React,{useRef,useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Fade from '@material-ui/core/Fade'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import LinearProgress from '../utilComponents/LinearProgress'

function ForgotPasswordForm(props){

    const email = useRef('')

    const [err,setErr] = useState({exist:0,msg:''})
    const [progress,setprogress] = useState(false)
    const [message,setMessage] = useState(false)

    const submitForm = (e)=>{
        setprogress(true)
        e.preventDefault()
        axios.post('/forgotpwd',
        {email:email.current.value},
        {withCredentials:true})
        .then(result=>{
            setprogress(false)
            let status = result.data.status
            if(status === 200){
                setMessage(true)
            }else if(status === 422 ){
                setErr({exist:1,msg:'Email is not Registered with us'})
            }else if(status === 423){
                setErr({exist:1,msg:'Insufficent Data'})
            }else if(status === 500){
                setErr({exist:1,msg:'Server Error'})
            }
        }).catch(err=>{
            setprogress(false)
            setErr({...err,exist:1,msg:'server error'})
        })
    }

return (    <Fade in={true} >
                <form onSubmit={submitForm} className='px-4'>
                    {(message)?
                    <div className='form-group my-5'>
                    <Alert>
                         <h5 className='text-break'>Password Reset Link has been sent to 
                            <b> {email.current.value}</b>
                        </h5>
                        <p>The Email contains a password reset link and it is going to expire within 10 minutes of generation.So
                            <strong> - Check it out</strong>
                        </p>
                    </Alert>
                    </div>
                    :<>
                    <label className='h4 mt-5 mb-3'>Enter Your Registered Email</label>
                    {(progress)?<div className='mb-3'><LinearProgress/></div>:<></>}
                    {(err.exist === 1)?<Alert severity='error' className='mb-3' >{err.msg}</Alert>:<></>}
                    <div className='form-group'>
                        <TextField
                            fullWidth
                            inputRef={email}
                            id="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            required
                            />
                    </div>
                    <div className = 'form-group d-flex justify-content-between mb-5 pb-5'>
                        <Link to='/login' className='btn btn-outline-dark'>Cancel</Link>
                        <button className='btn btn-dark ' type='submit' disabled={progress}>Send password Reset Link</button>
                    </div>
                      </>}
                    <div className='mt-5 mb-2 d-flex justify-content-center'>
                        Don't have an Account?<Link to='/signup' className='text-decoration-none'>Signup here</Link>
                    </div>
                </form>
            </Fade>)
}


export default ForgotPasswordForm
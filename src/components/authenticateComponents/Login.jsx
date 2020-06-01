import React,{useState,useRef} from 'react';
import TextField from '@material-ui/core/TextField'
import Fade from '@material-ui/core/Fade'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Alert from '@material-ui/lab/Alert'
import axios  from 'axios'
import {setCurrentUser} from '../../redux/user/user.actions'
import {connect} from 'react-redux'
import LinearProgress from '../utilComponents/LinearProgress'
import history from '../../history'

function LoginForm(props){

    const [err,setErr] = useState({exist:0,msg:''})
    const [progress,setprogress] = useState(false)

    const email = useRef('')
    const password = useRef('')

    const submitForm = (e)=>{
        e.preventDefault()
        setprogress(true)
        axios.post('/staffapi/login',{
            email:email.current.value,
            password:password.current.value
        },{withCredentials:true})
        .then(result=>{
            setprogress(false)
            let status =result.data.status
            if(status === 200){
                props.setCurrentUser(result.data)
                history.push('/')
            }else if(status === 401){
                setErr({...err,exist:1,msg:'Invalid Credentials'})
            }else if(status === 423){
                setErr({...err,exist:1,msg:'Insufficient Data'})
            }else if(status === 422){
                setErr({...err,exist:1,msg:'Unverified User'})
            }else if(status === 500){
                setErr({...err,exist:1,msg:'server error'})
            }
        })
        .catch(err=>{
            setprogress(false)
            setErr({...err,exist:1,msg:'Server Error'})
        })
    }

    return (
                <Fade in={true} >
                <form onSubmit={submitForm} className='px-4'>
                    <label className='fmd py-3'>
                       <Link to='/' className='text-decoration-none text-dark' >
                           <FontAwesomeIcon icon={faChevronLeft}/>
                        </Link> 
                        <span> Already Have an Account? Signin 
                        </span>
                    </label>
                    {(progress)?<div className='mb-2'><LinearProgress/></div>:<></>}
                    {(err.exist === 1)?
                    <Alert severity='error' variant='filled' className='mb-2'>
                        <span className='fm'>
                            {err.msg}
                        </span>
                    </Alert>:<></>}
                    <div className='form-group'>
                    <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                        inputRef={email}
                        />
                    </div>
                    <div className='form-group'>
                     <TextField
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        required
                        inputRef={password}
                        />
                    </div>
                    <div className = 'form-group d-flex justify-content-between mb-3 '>
                        <Link to='/forgotpassword'>Forgot Password ?</Link>
                        <button className='btn btn-dark ' type='submit' disabled={progress}>Sign in</button>
                    </div>
                     {/* <p className='text-center my-2'>------------<span className='text-muted fm'> or </span>--------------</p>
                    <div className='d-flex justify-content-center m-3'>
                       <a href='https://noteskeeper-md.herokuapp.com/crypt/oauth/login' className='btn btn-dark btn-block' >
                           Login Using  <span><b>C</b></span>ry<span><b>P</b></span>t<span className='fm'>Oauth2.0</span></a>
                    </div> */}
                    <div className='mt-5 mb-2 d-flex justify-content-center'>
                        Don't have an Account?<Link to='/signup' className='text-decoration-none'>Signup here</Link>
                    </div>
                </form>
            </Fade>)
}


const mapDispatchToProps = dispatch=>({
    setCurrentUser:userobj=>dispatch(setCurrentUser(userobj))
})

export default connect(null,mapDispatchToProps)(LoginForm)
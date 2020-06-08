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
        console.log('submit form exec')
        axios.post('/login',{
            email:email.current.value,
            password:password.current.value,
            type:props.type
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
                setErr({...err,exist:1,msg:`Vaidation Error Type:${result.data.type}`})
            }else if(status === 422){
                setErr({...err,exist:1,msg:`Your Account is not ${result.data.type} yet.`})
            }else if(status === 455){
                setErr({...err,exist:1,msg:`Your Account is Set To Inactive.`})
            }else if(status === 500){
                setErr({...err,exist:1,msg:'Something went wrong at our End,Please try again Later'})
            }
        })
        .catch(err=>{
            setprogress(false)
            setErr({...err,exist:1,msg:'Something went wrong at our End,Please try again Later'})
        })
    }

    return (
                <Fade in={true} >
                <form onSubmit={submitForm} className='px-4'>
                    <label className='my-3 ff-mst p-0 text-nowrap fmd col-12 d-flex justify-content-center'>
                            <Link to='/' className='mr-2 text-3 text-decoration-none' >
                                <FontAwesomeIcon icon={faChevronLeft}/>
                            </Link> 
                            {(props.type === 'staff')?
                            <span>
                                Staff Login
                            </span>:
                            <span >
                                Already Have an Account?
                            </span>
                            }
                    </label>
                    {(progress)?<div className='mb-2'><LinearProgress/></div>:<></>}
                    {(err.exist === 1)?
                    <Fade in={true}>
                        <Alert severity='error' variant='filled' className='mb-4'>
                            <span className='fm'>
                                {err.msg}
                            </span>
                        </Alert>
                    </Fade>:<></>}
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
                        <Link to={'/forgotpassword'+((props.type === 'admin')?'/admin':'/staff')} className='btn btn-link fsm p-0'>Forgot Password ?</Link>
                        <button className='btn btn-3' type='submit' disabled={progress}>Sign in</button>
                    </div>
                     {/* <p className='text-center my-2'>------------<span className='text-muted fm'> or </span>--------------</p>
                    <div className='d-flex justify-content-center m-3'>
                       <a href='https://noteskeeper-md.herokuapp.com/crypt/oauth/login' className='btn btn-dark btn-block' >
                           Login Using  <span><b>C</b></span>ry<span><b>P</b></span>t<span className='fm'>Oauth2.0</span></a>
                    </div> */}
                    <div className='mt-5 fsm text-nowrap ff-mst d-flex justify-content-center'>
                        {(props.type === 'admin')?
                            <span>Don't have an Account?
                                <Link to='/signup/admin' className='text-decoration-none'>Signup here</Link>
                            </span>
                            :<></>
                        }
                    </div>
                </form>
            </Fade>)
}


const mapDispatchToProps = dispatch=>({
    setCurrentUser:userobj=>dispatch(setCurrentUser(userobj))
})

export default connect(null,mapDispatchToProps)(LoginForm)
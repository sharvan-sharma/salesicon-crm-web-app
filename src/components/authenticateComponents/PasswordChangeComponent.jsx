import React,{useState} from 'react'
import PasswordForm from './SignupComponent/PasswordForm'
import Fade from '@material-ui/core/Fade'
import {Link} from 'react-router-dom'
import axios from 'axios'
import LinearProgress from '../utilComponents/LinearProgress'
import {connect} from 'react-redux'
import {setCurrentUser} from '../../redux/user/user.actions'
import Alert from '@material-ui/lab/Alert'

function PasswordChangeComponent(props){
    const [err,seterr] =useState({exist:0,msg:''})
    const [progress,setprogress] = useState(false)

    const setdata = (obj)=>{
        console.log(obj)
        setprogress(true)
        seterr({exist:0,msg:''})
        axios.post('/staffapi/changepassword',obj,{withCredentials:true})
        .then(result=>{
            setprogress(false)
            switch(result.data.status){
                 case 200 :  props.setCurrentUser(result.data);break;
                 case 500 :  seterr({exist:1,msg:'Something went wrong at our End'});break;
                 case 423 :  seterr({exist:1,msg:`validation error Type:${result.data.type}`});break;
                 case 401 :  seterr({exist:1,msg:'unauthorized Access'});break;
                 default : return ''
            }
        })
        .catch(err=>{
            setprogress(false)
            seterr({exist:1,msg:'Something went wrong at our End'})
        })
    }

    return (
                   <Fade in={true}>
                       <div className='px-4'>
                        {(err.exist === 1)?<div className='form-group my-2'><Alert severity='error' variant='filled'>{err.msg}</Alert></div>:<></>}
                        {(progress)?
                        <div className='d-flex flex-column align-items-center justify-content-center my-5'>
                            <img src='/preloader.png' className='img-fluid' alt=''></img>
                            <LinearProgress/>
                        </div>:
                        <div className='my-3'>
                            <PasswordForm data={{email:props.email}} setdata={setdata} />
                        </div>
                        }   
                        <div className='mt-5 mb-2 d-flex justify-content-center'>
                            Don't have an Account?<Link to='/signup' className='text-decoration-none'>Signup here</Link>
                        </div>
                        </div>
                    </Fade>
    )
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: userObject => dispatch(setCurrentUser(userObject)),
})

export default connect(null,mapDispatchToProps)(PasswordChangeComponent)
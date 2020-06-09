import React,{useState} from 'react';
import Stepper from './SignupComponent/Stepper'
import Fade from '@material-ui/core/Fade'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import LinearProgress from '../utilComponents/LinearProgress'
import Brand from '../utilComponents/Brand'


const Template = (props)=>{
    return (<Fade in={true} >
                <div className='px-4'>
                    <label className='my-3 ff-mst text-nowrap p-0 fmd col-12 d-flex justify-content-center'>
                            <Link to='/' className='mr-2 text-3 text-decoration-none ' >
                                <FontAwesomeIcon icon={faChevronLeft}/>
                            </Link> 
                            {(props.type === 'staff')?
                            <span >
                                Staff Signup
                            </span>:
                            <span >
                                Don't Have an Account?
                            </span>}
                    </label>
                    <Stepper type={props.type} token={props.token || ''} />
                    <div className='mt-5 mb-2 fsm text-nowrap ff-mst d-flex justify-content-center'>
                        {(props.type === 'admin')?
                            <span>Already have an Account?
                                <Link to='/login/admin' className='text-decoration-none'>Signin here</Link>
                            </span>
                            :<></>
                        }
                    </div>
                </div>
            </Fade>)
}

function Signup(props){

    const [state,setstate] = useState({
        loading:true,error:false,msg:'',data:{}
    })

    const makeTokenVerificationCall = ()=>{
        if(!props.token || props.token.length <20){
            setstate({...state,error:true,loading:false,msg:'Token specified in the request is Invalid'})
        }else{
            axios.post('/staffapi/verifytoken',{token:props.token},{withCredentails:true})
            .then(result=>{
                switch(result.data.status){
                    case 423: setstate({...state,error:true,loading:false,msg:'Validation Error Invalid Token'});break;
                    case 422: setstate({...state,error:true,loading:false,msg:'Token Expired'});break;
                    case 500: setstate({...state,error:true,loading:false,msg:'Something went wrong at our end, Please try again later'});break;
                    case 200: setstate({...state,loading:false,data:{email:result.data.email,admin_id:result.data.admin_id}});break;
                    default : console.log('default exec signup staff');break;
                }
            }).catch(err=>{
                setstate({...state,error:true,loading:false,msg:'Something went wrong at our end, Please try again later '})
            })
        }
    }

    if(props.type === 'admin'){
        return <Template type={props.type} />
    }else{
        if(state.loading){
            makeTokenVerificationCall()
            return (<div>
                        <div className='d-flex justify-content-center my-2'>
                            <Brand color='dark' />
                        </div>
                        <LinearProgress/>
                    </div>)
        }else if(state.error){
            return (<Alert severity='error' variant='filled'>{state.msg}</Alert>)
        }else{
            return <Template type={props.type} token={props.token} />
        }
    }
}

export default Signup
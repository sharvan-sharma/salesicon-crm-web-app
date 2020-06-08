import React,{useEffect,useState} from 'react';
import axios from 'axios'
import PreLoader from '../components/utilComponents/PreLoader'
import Alert from '@material-ui/lab/Alert'
import Authenticate from './Authenticate'
import {Link} from 'react-router-dom'

function ResetPassword(props){
    
    const [state,setstate] = useState({loading:true,error:false,msg:'',link:false})
    const [data,setdata] = useState({email:null})
    
    useEffect(()=>{
         axios.post('/resetpassword',{token:props.token},{withCredentials:true})
        .then(result=>{
            switch(result.data.status){
                case 200 :  setdata({email:result.data.email});setstate({...state,loading:false});break;
                case 500 :  setstate({...state,loading:false,error:true,msg:'Something Went Wrong At Our End ,Please Try Again Later'});break;
                case 422 :  setstate({...state,link:true,loading:false,error:true,msg:'Token has Expired,Please Regenerate Password Verification Link'});break;
                case 423 :  setstate({...state,loading:false,error:true,msg:'Token parameter is Invalid or Malformed'});break;
                default : return ''
            }
        })
        .catch(err=>{
            setstate({loading:false,error:true,msg:'Something Went Wrong At Our End ,Please Try Again Later'})
        })

    },[])

    // return <Authenticate  page={4} email = {data.email || ''} />

    if(state.loading){
        return <PreLoader/>
    }else if(state.error){
        return (
            <div className='d-flex full-screen-2 bg-3 flex-column justify-content-center align-items-center'>
                    <div className='form-group'>
                        <Alert severity='error' variant='filled'>{state.msg}</Alert>
                    </div>
                    {(state.link)?<Link to = {'/forgotpassword'+((props.type === 'admin')?'/admin':'')} className='btn btn-warning'>Regenerate Link</Link>:<></>}
            </div>
        )
    }else{
        return <Authenticate  page={4} email = {data.email} type={props.type} />
    }
}

export default ResetPassword
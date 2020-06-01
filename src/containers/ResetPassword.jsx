import React,{useEffect,useState} from 'react';
import axios from 'axios'
import PreLoader from '../components/utilComponents/PreLoader'
import Alert from '@material-ui/lab/Alert'
import Authenticate from './Authenticate'

function ResetPassword(props){
    
    const [state,setstate] = useState({loading:true,error:false,msg:''})
    const [data,setdata] = useState({email:null})
    
    // useEffect(()=>{
    //      axios.post('/resetpassword',{token:props.token},{withCredentials:true})
    //     .then(result=>{
    //         switch(result.data.status){
    //             case 200 :  setdata({email:result.data.email});setstate({...state,loading:false});break;
    //             case 500 :  setstate({loading:false,error:true,msg:'Something Went Wrong At Our End ,Please Try Again Later'});break;
    //             case 422 :  setstate({loading:false,error:true,msg:'Token has Expired,Please Regenerate Password Verification Link From forgot Password ?  section from login page'});break;
    //             case 423 :  setstate({loading:false,error:true,msg:'Token parameter is missing or Invalid Token'});break;
    //             default : return ''
    //         }
    //     })
    //     .catch(err=>{
    //         setstate({loading:false,error:true,msg:'Something Went Wrong At Our End ,Please Try Again Later'})
    //     })

    // },[])

    return <Authenticate  page={4} email = {data.email || ''} />

    // if(state.loading){
    //     return <PreLoader/>
    // }else if(state.error){
    //     return (
    //         <div className='d-flex fullscreen justify-content-center align-items-center'>
    //             <div className='col-12 col-lg-4 col-md-6 col-xl-4'>
    //                 <div className='form-group'>
    //                     <Alert severity='error' variant='filled'>{state.msg}</Alert>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }else{
    //     return <Authenticate  page={4} email = {data.email || ''} />
    // }
}

export default ResetPassword
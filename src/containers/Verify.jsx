
import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import {setCurrentUser} from '../redux/user/user.actions'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import history from '../history'
import {Link} from 'react-router-dom'
import PreLoader from '../components/utilComponents/PreLoader'
import Brand from '../components/utilComponents/Brand'

function VerifyEmail(props){
    const [state,setstate] = useState({flag:0,component:()=><></>})

    const ServerError = ()=>{
        return (
            <Alert variant='filled' severity='error'>
                <p className='h4'>Something Went Wrong At Our End</p>
                <p>Please try again later</p>
            </Alert>
        )
    }


    const ValidationError = ()=>{
        return (
            <Alert variant='filled' severity='error'>
                <p className='h4'>Invalid Token</p>
                <p>The Token associated with the Link attached to your email is Invalid or Malformed</p>
            </Alert>
        )
    }

    const TokenExpireError = ()=>{
        return (
            <Alert variant='filled' severity='error'>
                <p className='h4'>User Does Not Exist</p>
                <p>This can happen because of Not verifying within TimeFrame,Please Register Again</p>
                <p className='fsm'>Note : While Registering if you get 'User Already Exist Message ,Then wait for 10-20 minutes and Try Again</p>
                <p><Link to='/signup' className='btn btn-warning'>Click here to Register</Link></p>
            </Alert>
        )
    }

    const SuccessMessage = ()=>{
        return (
            <Alert variant='filled' severity='info'>
                <p className='h4'>Your Account is Successfully {(props.type === 'verified')?'Verified':'Approved'} </p>
                {(props.type === 'verified')?
                    <>
                        <p>Now, Your account is under approval by your Admin. 
                           <br/> We will Notify you when your Account is Approved.</p>
                    </>:
                    <>
                        <p>Now, You can <Link to = '/login' className='btn btn-outline-3'>Signin</Link></p>
                    </>
                }
            </Alert>
        )
    }
    
    const relUrl = ()=>{
        switch(props.type){
            case 'verified' : return '/staffapi/verifyemail'
            case 'approved' : return '/staffapi/verifyapproval'
            default : return '/staffapi/verifyemail'
        }
    }

    
    useEffect(()=>{
        if(props.token === undefined || props.token.length < 20){
            history.push('/')
        }else{
            axios.post(relUrl(),{token:props.token,type:props.type},{withCredentials:true})
            .then(res=>{
                switch(res.data.status){
                    case 200 : {
                            setstate({...state,flag:1,component:()=><SuccessMessage />})
                            break;
                    }
                    case 423 : {
                            setstate({...state,flag:1,component:()=><ValidationError />})
                            break;
                    }
                    case 422 : {
                            setstate({...state,flag:1,component:()=><TokenExpireError />})
                            break;
                    }
                    case 500 :{
                            setstate({...state,flag:1,component:()=><ServerError/>})
                            break;
                    }
                    default:setstate({...state,flag:0,component:()=><></>})
                }
            })
            .catch(err=>{
                setstate({...state,flag:1,component:()=><ServerError/>})
            })
        }
    },[])

    if(state.flag === 0){
       return <PreLoader/>
    }else if(state.flag === 1){
        return (<div className='full-screen-2 bg-3 p-4 d-flex flex-column justify-content-center align-items-center'>
                        <div className='fxl my-5'>
                            <Brand color='light' />
                        </div>
                        {state.component()}
                </div>)
    }

}

const mapDispatchToProps = dispatch=>({
setCurrentUser:userObject=>dispatch(setCurrentUser(userObject)),
})

export default connect(null,mapDispatchToProps)(VerifyEmail)
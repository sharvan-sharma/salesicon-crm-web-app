
import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import {setCurrentUser} from '../redux/user/user.actions'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import history from '../history'
import {Link} from 'react-router-dom'
import PreLoader from '../components/utilComponents/PreLoader'

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


     const TokenError = ()=>{
        return (
            <Alert variant='filled' severity='error'>
                <p className='h4'>Invalid Token</p>
                <p>The Approval Link associated with your email is Invalid or Malformed </p>
            </Alert>
        )
    }

    const UserDoesNotExist = ()=>{
        return (
            <Alert variant='filled' severity='error'>
                <p className='h4'>User Does Not Exist</p>
                <p>This can happen because of Not verifying within TimeFrame,Please Register Again</p>
                <p><Link to='/signup' className='btn btn-warning'>Click here to Register</Link></p>
            </Alert>
        )
    }
    
    
    useEffect(()=>{
        if(props.token !== ''){
            axios.post('/approve',
                {token:props.token},
                {withCredentials:true}
                ).then(res=>{
                switch(res.data.status){
                    case 200 : {
                            props.setCurrentUser(res.data)
                            history.push('/')
                            break;}
                    case 423 : {
                            setstate({...state,flag:1,component:()=><TokenError />})
                            break;
                    }
                    case 500 :{
                        setstate({...state,flag:1,component:()=><ServerError/>})
                        break;
                    }
                    case 401 :{
                        setstate({...state,flag:1,component:()=><UserDoesNotExist/>})
                        break;
                    }
                    default:setstate({...state,flag:0,component:()=><></>})
                }
            })
            .catch(err=>{
                setstate({...state,flag:1,component:()=><ServerError/>})
            })
        }else{
            history.push('/')
        }
    },[])

    if(state.flag === 0){
       return <PreLoader/>
    }else if(state.flag === 1){
        return (<div className='full-screen-2 bg-3 p-4 d-flex justify-content-center align-items-center'>
                        {state.component()}
                </div>)
    }

}

const mapDispatchToProps = dispatch=>({
setCurrentUser:userObject=>dispatch(setCurrentUser(userObject)),
})

export default connect(null,mapDispatchToProps)(VerifyEmail)
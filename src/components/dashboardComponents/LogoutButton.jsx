import React,{useState} from 'react'
import axios from 'axios'
import Alert  from '@material-ui/lab/Alert'
import CircularProgress from '../utilComponents/CircularProgress'
import history from '../../history'
import {setCurrentUser} from '../../redux/user/user.actions'
import {connect} from 'react-redux'

function LogoutButton(props){

    const [err,seterr] = useState({exist:false,msg:''})
    const [progress,setprogress] = useState(false)

    const logout = ()=>{
        setprogress(true)
        axios.get('/logout',{withCredentials:true})
        .then(result=>{
            props.setCurrentUser(result.data)
            history.push('/') 
        })
        .catch(err=>{
            setprogress(false)
            seterr({exist:true,msg:'server error'})
        })
    }

    return (
            <>
                {(progress)?<CircularProgress/>:
                <button className='logout-btn rounded-pill px-3 py-1' onClick={logout}>Logout</button>}
                {(err.exist)?<Alert severity='error' variant='filled'></Alert>:<></>}
            </>
    )
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: userObject => dispatch(setCurrentUser(userObject)),
})

export default connect(null,mapDispatchToProps)(LogoutButton)
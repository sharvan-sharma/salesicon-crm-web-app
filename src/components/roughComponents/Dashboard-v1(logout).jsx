import React,{useState} from 'react'
import Brand from '../components/utilComponents/Brand'
import axios from 'axios'
import Alert  from '@material-ui/lab/Alert'
import LinearProgress from '../components/utilComponents/LinearProgress'
import history from '../history'
import {setCurrentUser} from '../redux/user/user.actions'
import {connect} from 'react-redux'

function Dashboard(props){

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
        <div className='full-screen-2 bg-gradient d-flex flex-column justify-content-center align-items-center'>
            <div className='fxl'>
                <Brand color='light'/>
            </div>
            {(progress)?<LinearProgress/>:
            <button className='btn btn-3 my-2' onClick={logout}>Logout</button>}
            {(err.exist)?<Alert severity='error' variant='filled'></Alert>:<></>}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: userObject => dispatch(setCurrentUser(userObject)),
})

export default connect(null,mapDispatchToProps)(Dashboard)
import React,{useRef,useState} from 'react';
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import LinearProgress from '../../utilComponents/LinearProgress'
import Fade from '@material-ui/core/Fade'

function EmailForm(props){

    const email = useRef('')

    const [err,seterr] = useState({exist:0,msg:''})
    const [progress,setprogress] = useState(false)

    const submitForm = (e)=>{
        e.preventDefault()
        setprogress(true)
        axios.post('/checkemail',{
            email:email.current.value,
            type:props.data.type
        },{withCredentials:true})
        .then(result=>{
            setprogress(false)
            if(result.data.status === 200){
                props.setdata({...props.data,email:email.current.value})
                props.next()
            }else if(result.data.status === 422){
                seterr({exist:1,msg:'Email Address is already registered'})
            }else if(result.data.status === 423){
                seterr({exist:1,msg:'Email Address is invalid'})
            }else{
                seterr({exist:1,msg:'Something Went wrong at our end!!!'})
            }
        }).catch(err=>{
            setprogress(false)
            seterr({exist:1,msg:'Something Went wrong at our end!!!'})
        })
    }

return (<Fade in={true}>
            <form onSubmit={submitForm}>
            {(progress)?<LinearProgress/>:<></>}
            <label className='my-2 col-12 text-center text-3 ff-mst fmd'>Enter Your Email</label>
            <div className='form-group'>
                    <TextField
                        inputRef={email}
                        fullWidth
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                        />
                    </div>
            {(err.exist === 1)?<Alert severity='error' variant='filled' className='fsm'>{err.msg}</Alert>:<></>}
            <div className='d-flex justify-content-between my-2'>
              <button className='btn btn-outline-3' disabled={props.stepIndex === 0 || progress} onClick={props.back}>
                Back
              </button>
              <button variant="contained" color="primary" className='btn btn-3' disabled={progress} type='submit' >
                Next
              </button>
            </div>
        </form>
        </Fade>)
}

export default EmailForm
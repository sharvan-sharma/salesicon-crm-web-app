import React,{useEffect,useState} from 'react'
import Alert from '@material-ui/lab/Alert'
import LinearProgress from '../../utilComponents/LinearProgress'
import axios from 'axios'
import history from '../../../history'

function Message (props) {

    const  [upload,setupload] = useState({flag:true,error:false,msg:''})

    const Url = ()=>{
        switch(props.data.type){
            case 'staff': return '/staffapi/register'
            case 'admin': return '/adminapi/register'
            default : return '/adminapi/register'
        }
    }

    useEffect(()=>{
      axios.post(Url(),{
          ...props.data
      },{
          withCredentials:true
      }).then(result=>{
        let status = result.data.status
        if(status === 200){
            if(props.type === 'staff'){
                history.push('/')
            }else{
                setupload({...upload,flag:false})
            }
        }else if(status === 401){
            setupload({...upload,flag:false,error:true,msg:'User Already Exists'})
        }else if(status === 423){
            setupload({...upload,flag:false,error:true,msg:'Validation Error'})
        }else if(status === 500){
            setupload({...upload,flag:false,error:true,msg:'Something Went Wrong At our End'})
        }
      }).catch(err => {
         setupload({...upload,flag:false,error:true,msg:'Something Went Wrong At our End'})
      })
    },[])

    if(upload.flag){
        return <LinearProgress/>
    }else if(upload.error){
       return (<div className='d-flex justify-content-center'>
                <Alert severity="error">
                            {upload.msg}
                </Alert>
               </div>
        )
    }else{
        return (<div className='d-flex justify-content-center'>
                    <Alert severity="success">
                        <h5 className='text-break'>Verification mail has been sent to 
                            <b> {props.data.email}</b>
                        </h5>
                        <p>The Email contains a verification link and it is going to expire within 1hour of generation.So
                            <strong> - Check it out</strong>
                        </p>
                    </Alert>
                </div>)
    }

}

export default Message
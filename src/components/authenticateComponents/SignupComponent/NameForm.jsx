import React,{useRef,useState} from 'react';
import TextField from '@material-ui/core/TextField'
import  Fade from '@material-ui/core/Fade'
import {checkName} from '../../../utils/validations'
import Alert from '@material-ui/lab/Alert'

function NameForm(props){

  const fname = useRef('')
  const mname = useRef('')
  const lname = useRef('')
  const [err,seterr] = useState({exist:false,msg:''})

  const submitForm = (e)=>{
    e.preventDefault()
    let name = {
      firstname:fname.current.value,
      middlename:mname.current.value || '',
      lastname: lname.current.value || ''
    }
    if(checkName(name)){
      props.setdata({...props.data,name})
      props.next()
    }else{
      seterr({exist:true,msg:'Firstname, MiddleName and LastName atmost contain 20 character each.'})
    }
  }


return (
<Fade in={true}>
< form onSubmit={submitForm}>
            <label className='my-2 col-12 text-center text-3 fmd ff-mst'>Enter Your Name</label>
            {(err.exist)?<Alert variant='filled' severity='error' className='my-3'>{err.msg}</Alert>:<></>}
            <div className='form-group'>
                     <TextField
                        fullWidth
                        inputRef={fname}
                        id="fname"
                        label="FirstName"
                        type="text"
                        variant="outlined"
                        required
                        onFocus={()=>seterr({exist:false,msg:''})}
                        />
            </div>
            <div className='form-group'>
                     <TextField
                        fullWidth
                        inputRef={mname}
                        id="mname"
                        label="Middle Name"
                        type="text"
                        variant="outlined"
                        onFocus={()=>seterr({exist:false,msg:''})}
                        />
            </div>
            <div className='form-group'>
                     <TextField
                        fullWidth
                        inputRef={lname}
                        id="lname"
                        label='Last Name'
                        type="text"
                        variant="outlined"
                        onFocus={()=>seterr({exist:false,msg:''})}
                        />
            </div>
            <div className='d-flex justify-content-between'>
              <button className='btn btn-outline-3' disabled={props.stepIndex === 0  } onClick={props.back}>
                Back
              </button>
              <button variant="contained" color="primary" className='btn btn-3' disabled={err.exist} type='submit'>
                Next
              </button>
            </div>
        </ form >
        </Fade>)
}

export default NameForm
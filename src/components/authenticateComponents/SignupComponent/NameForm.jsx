import React,{useRef} from 'react';
import TextField from '@material-ui/core/TextField'
import  Fade from '@material-ui/core/Fade'

function NameForm(props){

  const fname = useRef('')
  const mname = useRef('')
  const lname = useRef('')

  const submitForm = (e)=>{
    e.preventDefault()
    props.setdata({...props.data,name:{
      firstname:fname.current.value,
      middlename:mname.current.value || '',
      lastname: lname.current.value || ''
    }})
    props.next()

  }


return (
<Fade in={true}>
< form onSubmit={submitForm}>
            <label className='h4'>Enter Your Name</label>
            <div className='form-group'>
                     <TextField
                        fullWidth
                        inputRef={fname}
                        id="fname"
                        label="FirstName"
                        type="text"
                        variant="outlined"
                        required
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
                        />
            </div>
            <div className='d-flex justify-content-between'>
              <button className='btn btn-outline-dark' disabled={props.stepIndex === 0} onClick={props.back}>
                Back
              </button>
              <button variant="contained" color="primary" className='btn btn-dark' type='submit'>
                Next
              </button>
            </div>
        </ form >
        </Fade>)
}

export default NameForm
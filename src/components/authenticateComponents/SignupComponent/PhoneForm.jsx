import React,{useRef,useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import LinearProgress from '../../utilComponents/LinearProgress'
import Fade from '@material-ui/core/Fade'
import PhoneInput from 'react-phone-input-2'
import {isPhone} from '../../../utils/validations/index'
import 'react-phone-input-2/lib/material.css'



function PhoneForm(props){
    const [phone,setphone] = useState({value:'',ccode:null,formattedValue:null})

    const [err,seterr] = useState({exist:0,msg:''})

    const submitForm = (e)=>{
        e.preventDefault()
        let phoneNumber = phone.formattedValue.split(' ').pop()
        if(isPhone(phoneNumber)){
            props.setdata({...props.data,phone:phoneNumber})
            props.next()
        }else{
            seterr({exist:1,msg:'invalid phone number'})
        }
       
    }

    return (
        <Fade in={true}>
            <form onSubmit={submitForm}>
                <div  className='d-flex flex-column align-items-center'>
                    <label className='my-2 col-12 text-center text-3 ff-mst'>Enter Your Phone Number</label>
                    <div className='form-group'>
                            <PhoneInput
                                inputProps={{
                                    name: 'Phone Number',
                                    required: true,
                                    autoFocus: true,
                                }}
                                onFocus={()=>seterr({exist:0,msg:''})}
                                autoFormat={false}
                                country='in'
                                value={phone.value}
                                onChange={(value,country,e,formattedValue)=>{
                                        setphone({value,ccode:country.dialCode,formattedValue})
                                    }}
                                inputStyle={{width:'100%'}}
                                enableSearch={true}
                            />
                    </div>
                </div>
                {(err.exist === 1)?<Alert severity='error'variant='filled' className='fsm'>{err.msg}</Alert>:<></>}

                <div className='d-flex justify-content-between my-2'>
                <button className='btn btn-outline-3' disabled={props.stepIndex === 0} onClick={props.back}>
                    Back
                </button>
                <button variant="contained" color="primary" className='btn btn-3' disabled={(err.exist === 1)?true:false} type='submit' >
                    Next
                </button>
                </div>
        </form>
        </Fade>
    )
}

export default PhoneForm
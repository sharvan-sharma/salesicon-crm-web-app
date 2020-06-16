import React,{useState} from 'react'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check'
import CancelIcon from '@material-ui/icons/Cancel'
import {isPhone} from '../../../utils/validations/index'
import PhoneInput from 'react-phone-input-2'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import {connect} from 'react-redux'
import {setUserPhone} from '../../../redux/user/user.actions'


function ProfilePhone(props){

    const [state,setstate] = useState({
        mode:'unedit',
        phone:{value:'',ccode:null,formattedValue:null},
        error:{exist:0,msg:''}
    }) 

    const submitForm = (e)=>{
        e.preventDefault()
        if(state.phone.formattedValue !== null){
            let phoneNumber = state.phone.formattedValue.split(' ').pop()
            if(isPhone(phoneNumber)){
                axios.post('/editprofile',{
                    type:'phone',
                    phone:phoneNumber
                },{withCredentials:true})
                .then(result=>{
                    switch(result.data.status){
                        case 200:props.setUserPhone(result.data.phone);setstate({...state,mode:'unedit'});break
                        case 401:setstate({...state,error:{exist:true,msg:'Unauthorised to update phone'}});break;
                        case 423:setstate({...state,error:{exist:true,msg:`Validation Error : ${result.data.type}`}});break;
                        case 500:setstate({...state,error:{exist:true,msg:'Something Went Wrong At Our End'}});break;
                        default :console.log('default exec profile name')
                    }
                })
                .catch(err=>{
                    setstate({...state,error:{exist:true,msg:'Something Went Wrong At Our End'}})
                })
            }else{
                setstate({...state,error:{exist:1,msg:'Invalid phone number'}})
            }
        }else{
                setstate({...state,error:{exist:1,msg:`Phone Number Can't be blank`}})
        }
    }

    return (
        <div className='col-12 my-2  px-4 py-2 ' >
            <div className='text-dark fmd'>Phone Number</div>
            {(state.mode === 'unedit')?
            <div className='d-flex my-2 align-items-center justify-content-between'>
                <div className='text-1 ff-mst'>{props.phone}</div>
                <IconButton onClick={()=>setstate({...state,mode:'edit'})} size='small' >
                    <EditIcon/>
                </IconButton>
            </div>:
            <form onSubmit={submitForm} >
                <div className='d-flex my-2 align-items-center justify-content-between'>
                    <div className='form-group m-0 py-2'>
                            <PhoneInput
                                inputProps={{
                                    name: 'Phone Number',
                                    required: true,
                                    autoFocus: true,
                                }}
                                onFocus={()=>setstate({...state,error:{exist:0,msg:''}})}
                                autoFormat={false}
                                country='in'
                                value={state.phone.value}
                                onChange={(value,country,e,formattedValue)=>{
                                        setstate({...state,phone:{value,ccode:country.dialCode,formattedValue}})
                                    }}
                                inputStyle={{width:'100%'}}
                                enableSearch={true}
                            />
                    </div>
                    <div className='d-flex align-items-center p-2'>
                        <div className='mr-2'>
                            <IconButton
                             type='submit'  
                             size='small'
                             onFocus={()=>setstate({...state,error:{exist:0,msg:''}})} 
                             >
                                <CheckIcon/>
                            </IconButton>
                        </div>
                        <div>
                            <IconButton 
                            onFocus={()=>setstate({...state,error:{exist:0,msg:''}})}
                            onClick={()=>setstate({...state,mode:'unedit'})} 
                            size='small' >
                                <CancelIcon/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                {(state.error.exist === 1)?
                <div className='my-2'>
                    <Alert  severity='error' variant='filled' >{state.error.msg}</Alert>
                </div>:
                <></>
                }
            </form>
            }
         </div>
    )

}
const mapDispatchToProps = dispatch=>({
setUserPhone:phone=>dispatch(setUserPhone(phone))
})

const mapStateToProps = state=>({
    phone:state.user.phone
})

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePhone)
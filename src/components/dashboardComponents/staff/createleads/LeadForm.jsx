import React,{useRef,useState,useEffect} from 'react'
import {connect} from 'react-redux'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import axios  from 'axios'
import CircularProgress from '../../../utilComponents/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import MessageSnackbar from '../../../utilComponents/MessageSnackbar'
import {isEmail,isPhone,checkName} from '../../../../utils/validations/index'
import LeadProducts from './LeadProducts'


function LeadForm (props){

    const fname = useRef('')
    const mname = useRef('')
    const lname = useRef('')
    const email = useRef('')
    const dob = useRef('')
    const loc = useRef('')

    const [products,setProducts] = useState({sel:{},rem:{}})
    const [campaign_id,setCampaignId] = useState(null)
    const [phone,setphone] = useState({value:'',ccode:null,formattedValue:null})
    const [err,seterr] = useState({exist:false,msg:''})
    const [success,setsuccess] = useState(false)
    const [progress,setprogress] = useState(false)


    const validate = data=>{
        const {lead_name,email,dob,location,interested_in,campaign_id,phone} = data
        if(!lead_name || !checkName(lead_name)){
            return {flag:false,msg:'Spaces Are not Allowed in Firstname'}
        }else if(!email || !isEmail(email)){
            return {flag:false,msg:'Invalid Email Address'}
        }else if(!phone || !isPhone(phone)){
            return {flag:false,msg:'Invalid Phone number'}
        }else if(!interested_in || !Array.isArray(interested_in) || interested_in.length === 0){
            return {flag:false,msg:'Atleast Select One product'}
        }else if((new Date(dob)).getTime() > (new Date()).getTime()){
            return  {flag:false,msg:'Invalid Date of Birth'}
        }else if(!location){
            return  {flag:false,msg:'Invalid Location'}
        }else if(campaign_id === null){
            return  {flag:false,msg:'Select A Campaign, or  if there is no Active camapign then create One'}
        }else{
            return {flag:true}
        }
    }

    const submitForm = (e)=>{
        e.preventDefault()
        let dataObj = {
            lead_name:{
                firstname:fname.current.value,
                middlename:mname.current.value,
                lastname:lname.current.value
            },
            email:email.current.value,
            dob:dob.current.value,
            location:loc.current.value,
            interested_in:Object.entries(products.sel).map(item=>item[0]),
            campaign_id,
            phone: (phone.formattedValue === null)?null:phone.formattedValue.split(' ').pop()
        }
        let result = validate(dataObj)
        if(result.flag){
            setprogress(true)
            axios.post('/staffapi/lead/createone',dataObj,{withCredentials:true})
            .then(result=>{
                setprogress(false)
                switch(result.data.status){
                    case 200:setsuccess(true);break;
                    case 423:seterr({exist:true,msg:`validation_error ${result.data.type}`});break;
                    case 500:seterr({exist:true,msg:'server_error'});break;
                    default:console.log('default exec lead form')
                }
            })
            .catch(err=>{
                setprogress(false)
                seterr({exist:true,msg:'server_error'})
            })}
        else{
            seterr({exist:true,msg:result.msg})
        }
    }


    return(
        <>
        <div className='mbl' style={{marginTop:'10vh'}}/>
        <div className='my-2 ff-mst'>
            Create <span className='text-1'>Single</span> Lead
        </div>
        <div className='hr-3'></div>
        <div className='my-2'>
            <div className='my-2'>
              <form onSubmit={submitForm} className='col-12 p-0 col-md-10 col-lg-6 col-xl-6'>
                <div className='form-group'>
                    <label>First Name</label>
                    <input className='form-control' onFocus={()=>seterr({exist:false,msg:''})} ref={fname} minLength={1} maxLength={20} required type='text' id='lfname'/>
                </div>
                <div className='form-group'>
                    <label>Middle Name</label>
                    <input className='form-control' onFocus={()=>seterr({exist:false,msg:''})} ref={mname} minLength={1} maxLength={20} type='text' id='lmname'/>
                </div>
                <div className='form-group'>
                    <label>Last Name</label>
                    <input className='form-control' onFocus={()=>seterr({exist:false,msg:''})} ref={lname} minLength={1} maxLength={20} type='text' id='llname'/>
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input className='form-control' onFocus={()=>seterr({exist:false,msg:''})} ref={email} required type='email' id='email'/>
                </div>
                <div className='form-group'>
                    <label>Phone Number</label>
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
                <div className='form-group'>
                    <label>Date of birth</label>
                    <input className='form-control' onFocus={()=>seterr({exist:false,msg:''})} ref={dob} max={new Date()} required type='date' id='dob'/>
                </div>
                <div className='form-group'>
                    <label>Location</label>
                    <input className='form-control' onFocus={()=>seterr({exist:false,msg:''})} ref={loc} minLength={1} maxLength={50} required type='text' id='loc'/>
                </div>
                <div onFocus={()=>seterr({exist:false,msg:''})}>
                        <LeadProducts setProducts={setProducts} />
                </div>
                {/* campaigns dropdown */}
                <div className="form-group">
                    <button type="button" onFocus={()=>seterr({exist:false,msg:''})} className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {/* name of selected campaign or message */}
                        {(campaign_id === null)?'Select A Campaign':props.campaignsObject[campaign_id].name}
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        {
                            Object.entries(props.campaignsObject).map(item=><button key={item[0]} 
                                                                            onClick={()=>setCampaignId(item[0])} 
                                                                            className="dropdown-item" type="button">
                                                                                {item[1].name}
                                                                            </button>)
                        }
                    </div>
                </div>
              {/* buttons */}
                <div className='d-flex'>
                     <div>
                        {(progress )?
                        <CircularProgress/>:
                        <button type='submit' disabled={progress || err.exist} onFocus={()=>seterr({exist:false,msg:''})}  className='btn btn-3'>Add Lead</button>
                        }
                    </div>
                </div>
                {(err.exist)?
                <div className='my-2'>
                    <Alert severity='error' variant='filled'>{err.msg}</Alert>
                </div>:<></>}
                {(success)?
                <MessageSnackbar show={true} message='Mail scheduled' />:<></>}
              </form>
            </div>
        </div>
        </>
    )
}


const dropdownObject = (defaultObject)=>{
    let obj = {}
    Object.entries(defaultObject).map(item=>{
        if(item[1].status === 'A'){
            obj[item[0]] = {name:item[1].name}
        } 
    })
    return obj
}

const mapStateToPorps = (state)=>({
    campaignsObject:dropdownObject(state.campaigns.campaignsObject)
})


export default connect(mapStateToPorps)(LeadForm) 
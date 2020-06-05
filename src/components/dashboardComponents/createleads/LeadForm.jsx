import React,{useRef,useState} from 'react'
import {connect} from 'react-redux'
import PhoneInput from 'react-phone-input-2'
import {isPhone} from '../../../utils/validations/index'
import 'react-phone-input-2/lib/material.css'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import axios  from 'axios'
import CircularProgress from '../../utilComponents/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import MessageSnackbar from '../../utilComponents/MessageSnackbar'

function LeadForm (props){

    const fname = useRef('')
    const mname = useRef('')
    const lname = useRef('')
    const email = useRef('')
    const dob = useRef('')
    const loc = useRef('')
    
    const [products,setProducts] = useState({sel:{},rem:props.productsObject})
    const [campaign_id,setCampaignId] = useState(null)
    const [phone,setphone] = useState({value:'',ccode:null,formattedValue:null})
    const [err,seterr] = useState({exist:false,msg:''})
    const [success,setsuccess] = useState(false)
    const [progress,setprogress] = useState(false)

    

    const addProduct = (id)=>{
        const remobj = products.rem
        const selobj = products.sel
        selobj[id] = remobj[id]
        delete remobj[id]
        setProducts({sel:{...selobj},rem:{...remobj}})
    }
    const removeProduct = (id)=>{
        const remobj = products.rem
        const selobj = products.sel
        remobj[id] = selobj[id]
        delete selobj[id]
        setProducts({sel:{...selobj},rem:{...remobj}})
    }

    const submitForm = (e)=>{
        e.preventDefault()
        setprogress(true)
        let phoneNumber = phone.formattedValue.split(' ').pop()
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
            phone:phoneNumber
        }
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
        })
    }


    return(
        <div className='my-2'>
            <div className='d-flex justify-content-between align-items-center flex-wrap'>
                <label className='flg ff-mst m-0'>Add a <span className='text-1'>Lead</span></label>
            </div>
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
                    <input className='form-control' onFocus={()=>seterr({exist:false,msg:''})} ref={loc} required type='text' id='loc'/>
                </div>
                {/* selected products */}
                <div className='d-flex col-12 p-0 flex-wrap my-2'>
                           {Object.entries(products.sel).map(item=>{
                               return (<label key={item[0]} className='bg-light rounded-pill px-2 m-1' onFocus={()=>seterr({exist:false,msg:''})} >
                                            <span>{item[1].name}</span>
                                            <IconButton size='small' onClick={()=>removeProduct(item[0])} color='inherit'>
                                                <CancelIcon/>
                                            </IconButton>
                                        </label>)
                           }) }
                </div>
                {/* products dropdown */}
                <div className="form-group">
                    <button type="button" onFocus={()=>seterr({exist:false,msg:''})} className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Products
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        {
                            Object.entries(products.rem).map(item=><button key={item[0]} 
                                                                            onClick={()=>addProduct(item[0])}
                                                                            className="dropdown-item" type="button">
                                                                                {item[1].name}
                                                                            </button>)
                        }
                    </div>
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
                        {(progress)?
                        <CircularProgress/>:
                        <button type='submit' disabled={progress} onFocus={()=>seterr({exist:false,msg:''})}  className='btn btn-3'>Add Lead</button>
                        }
                    </div>
                </div>
                {(err.exist)?
                <div className='my-2'>
                    <Alert severity='error' variant='filled'>{err.msg}</Alert>
                </div>:<></>}
                {(success)?
                <MessageSnackbar show={true} message='mail sent' />:<></>}
              </form>
            </div>
        </div>
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
    campaignsObject:dropdownObject(state.campaigns.campaignsObject),
    productsObject:dropdownObject(state.products.productsObject)
})

export default connect(mapStateToPorps)(LeadForm) 
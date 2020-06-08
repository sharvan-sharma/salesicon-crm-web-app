import React,{useState,useEffect,useRef} from 'react'
import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon  from '@material-ui/icons/Check'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import Fade from '@material-ui/core/Fade'
import axios from 'axios'
import Brand from '../../../utilComponents/Brand'
import LinearProgress from '../../../utilComponents/LinearProgress'
import Alert from '@material-ui/lab/Alert'
import {connect} from 'react-redux'
import {setLeadInteractionsObject} from '../../../../redux/leadInteractions/leadInteractions.actions'
import {editLead} from '../../../../redux/leads/leads.actions'
import LeadProfile from './lead/LeadProfile'
import LeadInteraction from './lead/LeadInteraction'
import CreateLeadInteraction from './lead/CreateLeadInteraction'
import LeadStatus  from './lead/LeadStatus'


const beautyfyDate = (date)=>{
    let dummydate = new Date(date)
    return dummydate.getDate()+'/'+(dummydate.getMonth()+1)+'/'+dummydate.getFullYear()
}



function Lead(props){

    const remdate = useRef(new Date())

    const [add,setAdd] = useState(false)
    const [state,setstate] = useState({loading:true,error:false,msg:''})
    const [err,seterr] = useState({exist:false,msg:''})
    const [err2,seterr2] = useState({exist:false,msg:''})
    const [progress,setprogress] = useState({on:false,bcode:null})
    const [reminderMode,setReminderMode] = useState('unedit')

    let date = new Date()
    let year = date.getFullYear()
    let month = ((date.getMonth()+1) < 10)?'0'+(date.getMonth()+1):(date.getMonth()+1)
    let day = (date.getDate() < 10)?'0'+date.getDate():date.getDate()
    let mindate = year+'-'+month+'-'+day
  
    useEffect(()=>{
        axios.post('/staffapi/leadinteraction/read',{lead_id:props.lead._id},{withCredentials:true})
        .then(result=>{
            switch(result.data.status){
                case 423:setstate({loading:false,error:true,msg:`vlidation error type:${result.data.type}`});break;
                case 200:props.setLeadInteractionsObject(result.data.leadInteractionsArray);setstate({...state,loading:false});break;
                case 500:setstate({loading:false,error:true,msg:'server error'});break;
                default:console.log('default exec lead')
            }
        }).catch(err=>{
            setstate({loading:false,error:true,msg:'server error'})
        })
    },[])

    const updateReminder = (e)=>{
        e.preventDefault()
        axios.post('/staffapi/updatereminder',
        {lead_id:props.lead._id,
         rem_date:remdate.current.value},
         {withCredentials:true})
         .then(result=>{
            switch(result.data.status){
                    case 401:seterr2({exist:true,msg:'UNauthorised to close Lead'});break;
                    case 423:seterr2({exist:true,msg:`validation error ${result.data.type}`});break;
                    case 422:seterr2({exist:true,msg:"Can't close Lead which doesnot exist"});break;
                    case 500:seterr2({exist:true,msg:'server error'});break;
                    case 200:props.editLead(result.data.lead);setReminderMode('unedit');break;
                    default:console.log('default exec close lead')
                }
         }).catch(err=>{
            seterr2({exist:true,msg:'server error'})
         })
    }

    
    if(state.loading){
        return (
            <div className='col-12 d-flex  justify-content-center align-items-center ' style={{height:'80vh'}}>
                <div className='col-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center align-items-center '>
                    <div className='fmd my-2'>
                        <Brand color='dark'/>
                    </div>
                    <LinearProgress/>
                </div>
            </div>
        )
      }else if(state.error){
        return (
            <div className='col-12 d-flex  justify-content-center align-items-center' style={{height:'80vh'}}>
                <div className='col-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center align-items-center '>
                    <Alert severity='error' variant='filled'>Error Occured while Loading Lead</Alert>
                </div>
            </div>
        )
      }else{
        return (<>
            <div className='d-flex flex-wrap align-items-center justify-content-between my-2'>
                <form onSubmit={updateReminder} className='d-flex align-items-center '>
                    <IconButton color='inherit' size='small' type='button' onClick={()=>props.setOpenLead({open:false,lead_id:null})}>
                        <BackIcon/>
                    </IconButton>
                    <label  className='text-dark m-1 text-nowrap'>Next Call Scheduled Date</label>
                    {(reminderMode !==  'edit')?<label  className='text-1 m-1'>{(props.leadsObject[props.lead._id].rem_date)?beautyfyDate(props.leadsObject[props.lead._id].rem_date):'--/--/---'}</label>:<></>}
                    {(reminderMode !==  'edit')?
                     <IconButton size='small' type='button' onClick={()=>setReminderMode('edit')} onFocus={()=>seterr2({exist:false,msg:''})}>
                        <EditIcon />
                    </IconButton>:<></>}
                    {(reminderMode === 'edit')?
                    <input type='date'
                     min={mindate} 
                     ref={remdate}
                     onFocus={()=>seterr2({exist:false,msg:''})}
                     className='form-control' required />:<></>}
                    {(reminderMode === 'edit')?
                    <>
                    <IconButton size='small' type='submit' onFocus={()=>seterr2({exist:false,msg:''})}>
                        <CheckIcon />
                    </IconButton>
                      <IconButton size='small' type='button' onClick={()=>setReminderMode('unedit')}>
                        <CancelIcon />
                    </IconButton>
                    </>:<></>}
                    {(err2.exist)?<Fade in={err.exist}><Alert severity='error' variant='filled' >{err2.msg}</Alert></Fade>:<></>}
                </form>
                <LeadStatus lead_id={props.lead._id} status={props.lead.status} />
                
            </div>
            <div className='hr-3'></div>
            <div className='d-flex flex-wrap'>
               
                <LeadProfile lead={props.lead}  />
                <div className='col-12 col-md-8 col-lg-8 col-xl-8 my-4  '  >
                    <div className='d-flex justify-content-between align-items-center'>
                            <label className='flg ff-mst my-2'><span className='text-1'>Lead </span>Interactions</label>
                           {(props.lead.status === 'A' && !add)?<div><IconButton color='inherit' size='small' onClick={()=>setAdd(true)}><AddIcon/></IconButton></div>:<></>}
                    </div>
                    
                    {(add && props.lead.status === 'A')?<CreateLeadInteraction setAdd={setAdd} lead_id={props.lead._id} />:<></>}
                    
                    <div className='lead-interaction bg-light' style={{height:'60vh'}}>
                        {(Object.entries(props.leadInteractionsObject).length === 0)?
                            <Alert severity='info' variant='filled'>No Interaction Yet</Alert>
                            :<></>
                            }
                         {
                            Object.entries(props.leadInteractionsObject).sort((item1,item2)=>new Date(item2[1].datetime)-new Date(item1[1].datetime))
                            .map(item=>{
                                    return <LeadInteraction key={item[0]} data={item[1]}/>
                                })
                         }
                    </div>
                </div>
            </div>
            </>)
    }
}

const mapDispatchToProps = dispatch=>({
    setLeadInteractionsObject:array=>dispatch(setLeadInteractionsObject(array)),
    editLead:lead=>dispatch(editLead(lead))
})

const mapStateToProps = state=>({
    leadInteractionsObject:state.leadInteractions.leadInteractionsObject,
    leadsObject:state.leads.leadsObject
})


export default connect(mapStateToProps,mapDispatchToProps)(Lead)
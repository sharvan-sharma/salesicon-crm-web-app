import React,{useState} from 'react'
import {connect} from 'react-redux'
import {editLead} from '../../../../../redux/leads/leads.actions'
import axios from 'axios'
import CircularProgress from '../../../../utilComponents/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Alert from '@material-ui/lab/Alert'

function LeadStatus(props){

    const status = props.leadsObject[props.lead_id].status

    const [state,setstate] = useState({
        progress:{on:false,bcode:null},
        error:{exist:false,msg:'',bcode:null},
        open:false
    })

    const changeStatus = (status)=>{
            setstate({...state,progress:{on:true,bcode:((status === 'Converted')?'c':'r')}})
            axios.post('staffapi/lead/changeStatus',{lead_id:props.lead_id,status},{withCredentials:true})
            .then(result=>{
                    switch(result.data.status){
                        case 401:setstate({...state,progress:{on:false,bcode:null},error:{exist:true,msg:'Unauthorised to change lead status',bcode:state.progress.bcode}});break;
                        case 423:setstate({...state,progress:{on:false,bcode:null},error:{exist:true,msg:`validation error ${result.data.type}`,bcode:state.progress.bcode}});break;
                        case 422:setstate({...state,progress:{on:false,bcode:null},error:{exist:true,msg:"Can't close Lead which doesnot exist",bcode:state.progress.bcode}});break;
                        case 500:setstate({...state,progress:{on:false,bcode:null},error:{exist:true,msg:'server error',bcode:state.progress.bcode}});break;
                        case 200:props.editLead(result.data.lead);setstate({...state,progress:{on:false,bcode:null},open:false});break;
                        default:console.log('default exec close lead')
                    }
            })
            .catch(err=>{
                setstate({...state,progress:{on:false,bcode:null},error:{exist:true,msg:'server error',bcode:state.progress.bcode}})
            })
    }

    if(status === 'Pending'){
        console.log(state.open)
        return (
            <div >
                <div className='d-flex align-items-center'>
                    <label  className='m-1 text-success'>Pending</label>
                    <IconButton size='small' onClick={()=>setstate({...state,open:!state.open})}>
                        {(state.open)?<ArrowDropUpIcon/>:<ArrowDropDownIcon/>}
                    </IconButton>
                </div>
                {
                 (state.open)?
                 <div className='d-flex flex-column shadow-lg'>
                     {(state.error.exist && state.error.bcode === 'c')?<Alert variant='filled' severity='error'>{state.error.msg}</Alert>:
                     <>
                        {(state.progress.on && state.progress.bcode === 'c')?<CircularProgress/>:
                        <button className='btn btn-light text-success my-1 btn-block' onClick={()=>changeStatus('Converted')}>Convert</button>}
                    </>}

                    <div className='hr-3' />

                    {(state.error.exist && state.error.bcode === 'r')?<Alert variant='filled' severity='error'>{state.error.msg}</Alert>:
                    <>
                     {(state.progress.on && state.progress.bcode === 'r')?<CircularProgress/>:
                     <button className='btn btn-light text-danger my-1 btn-block' onClick={()=>changeStatus('Rejected')}>Reject</button>}
                    </>}
                 </div>:
                 <>
                 </>
                }
            </div>
            
        )
    }else if(status === 'Rejected'){
        return <label className='bg-light text-danger m-1 p-2'>Rejected</label>
    }else if(status === 'Converted'){
        return <label className='bg-light text-success m-1 p-2'>Converted</label>
    }

    

}

const mapDispatchToProps = dispatch=>({
    editLead:lead=>dispatch(editLead(lead))
})

const mapStateToProps = state=>({
    leadsObject:state.leads.leadsObject
})


export default connect(mapStateToProps,mapDispatchToProps)(LeadStatus)
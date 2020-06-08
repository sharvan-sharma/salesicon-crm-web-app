import React,{useState,useEffect} from 'react'
import SearchBar from '../../Searchbar'
import axios from 'axios'
import {connect} from 'react-redux'
import {setLeadsObject,closeLead} from '../../../../redux/leads/leads.actions'
import Fade from '@material-ui/core/Fade'
import Alert from '@material-ui/lab/Alert'
import LinearProgress from '../../../utilComponents/LinearProgress'
import Brand from '../../../utilComponents/Brand'

const LeadGrid = (props)=>{

    const getStyleClass = (type)=>{
        switch(type){
            case 'Rejected' : return 'text-danger '
            case 'Converted' : return 'text-success '
            default : return 'text-1 '
        }
    }

    return (
                    <div className='d-flex shadow p-2 my-4 rounded flex-wrap align-items-center justify-content-between'>
                        <div className='ff-mst bold '>{props.lead.name.firstname}</div>
                        <div className='ff-mst bold '>{props.lead.email}</div>
                        <div className='text-1 ff-mst '>{props.lead.phone}</div>
                        <div className='ff-mst '><span className={getStyleClass(props.lead.status)}>{props.lead.status}</span></div>
                        <button className='btn btn-3' onClick={()=>props.setOpenLead({open:true,lead:props.lead})}>Open</button>
                    </div>
    )
}


function LeadsTable(props){
    
    const [state,setstate] = useState({loading:true,error:false})

    useEffect(() =>{
        axios.get('/staffapi/lead/readallleads',{withCredentials:true})
        .then(result=>{
            let status = result.data.status
            if(status === 500){
                setstate({loading:false,error:true})
            }else if(status === 423){
                setstate({loading:false,error:true})
            }else if(status === 200){
                props.setLeadsObject(result.data.leadsArray)
                setstate({...state,loading:false})
            }
        }).catch(err=>{
            setstate({loading:false,error:true})
        })
    }, [])

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
            <div className='col-12 d-flex  justify-content-center align-items-center ' style={{height:'80vh'}}>
                <div className='col-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center align-items-center '>
                    <Alert severity='error' variant='filled'>Error Occured while Loading Leads</Alert>
                </div>
            </div>
        )
      }else{
        return (<>
        
        <SearchBar type='leads'/>
        <div className='col-12 my-4'>
            {
                Object.entries(props.leadsObject).map((item)=><LeadGrid key={item[0]}  lead={item[1]} setOpenLead={props.setOpenLead}/>)
            }
            {
               (Object.entries(props.leadsObject).length === 0)?
               <Fade in={(Object.entries(props.leadsObject).length === 0)}>
                   <Alert severity='info' variant='filled' className='shadow p-2 my-4 rounded'>
                       No Lead Added 
                   </Alert>
               </Fade>:
               <></>
            }
        </div>
        </>)
        }
}

const mapStateToProps = state=>({
    leadsObject:state.leads.leadsObject
})

const mapDispatchToProps = dispatch=>({
    setLeadsObject : array=>dispatch(setLeadsObject(array)),
    closeLead:id=>dispatch(closeLead(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(LeadsTable);
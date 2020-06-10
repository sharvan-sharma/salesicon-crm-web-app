import React,{useState} from 'react'
import Status from '../../../utilComponents/Status'
import IconButton from '@material-ui/core/IconButton'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import MonthlyGraph from '../../../utilComponents/MonthlyGraph'
import WeeklyGraph from '../../../utilComponents/WeeklyGraph'


const CampaignsGrid = (props)=>{

    // const imagePath = (props.staff.photo === null)?'/avatar.jpg':'http://localhost:5000'+props.staff.photo

    const [state,setstate] = useState({
        expand:false
    })

    return (    <div className='my-4'>
                    <div className='d-flex shadow p-2  rounded flex-wrap align-items-center justify-content-between'>
                        <div className = 'd-flex align-items-center'>
                            <div className='mr-2'>
                                <IconButton size='small' onClick={()=>setstate({...state,expand:!state.expand})} >
                                    {(!state.expand)?<ExpandMore/>:<ExpandLess/>}
                                </IconButton>
                            </div>
                            {/* <img src={imagePath} className='mr-2' style={{width:'30px',height:'30px'}} alt={props.staff.name.firstname} /> */}
                            <div className='ff-mst bold '>{props.campaign.name}</div>
                        </div>
                        
                            {
                                (props.campaign.status === 'A')?
                                <label className='m-1 ff-mst bg-1 text-white rounded-pill px-2 py-1 shadow'>Active</label>:
                                <label className='m-1 ff-mst bg-light rounded-pill px-2 py-1 shadow'>Inactive</label>
                            }
                        
                        {/* <Status type='staffs' status={props.campaign.status} campaign_id={props.campaign._id} /> */}
                    </div>
                    <div  className='hr-3' />
                    {
                        (state.expand)?
                        <div className='px-0 py-4 d-flex flex-wrap bg-light shadow-lg'>
                             <div className = 'col-12 col-md-6 col-lg-6 d-flex flex-column align-items-center p-2'>
                                <WeeklyGraph type='campaigns' _id={props.campaign._id} createdAt={props.createdAt} />
                            </div>
                             <div className = 'col-12 col-md-6 col-lg-6 d-flex flex-column align-items-center p-2'>
                                <MonthlyGraph type='campaigns' _id={props.campaign._id} createdAt={props.createdAt} />
                            </div>
                        </div> 
                        :<></>
                    }
                </div>
    )
}


export default CampaignsGrid
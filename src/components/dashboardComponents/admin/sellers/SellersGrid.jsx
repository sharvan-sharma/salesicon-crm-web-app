import React,{useState} from 'react'
import Status from '../../../utilComponents/Status'
import IconButton from '@material-ui/core/IconButton'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import MonthlyGraph from '../../../utilComponents/MonthlyGraph'
import WeeklyGraph from '../../../utilComponents/WeeklyGraph'
import Tooltip from '@material-ui/core/Tooltip'


const SellersGrid = (props)=>{

    const imagePath = (props.staff.photo === null)?'/avatar.jpg':'http://localhost:5000'+props.staff.photo

    const [state,setstate] = useState({
        expand:false
    })

    const beautifyName = (name,n)=>{
        return (name.length > n)?name.substring(0,n):name
    }

    return (    <div className='my-4 shadow'>
                    <div className='d-flex  rounded flex-wrap align-items-center justify-content-between'>
                        <div className = 'col-12 col-lg-4  d-flex align-items-center px-2 py-1 '>
                            <div className='mr-2'>
                                <IconButton size='small' onClick={()=>setstate({...state,expand:!state.expand})} >
                                    {(!state.expand)?<ExpandMore/>:<ExpandLess/>}
                                </IconButton>
                            </div>
                            <img src={imagePath} className='mr-2 rounded' style={{width:'30px',height:'30px'}} alt={props.staff.name.firstname} />
                            <Tooltip title={props.staff.name.firstname} placement='bottom' arrow>
                                    <span className='ff-mst bold mr-2'>{beautifyName(props.staff.name.firstname)}</span>
                            </Tooltip>
                            <Status type='staffs' status={props.staff.status} staff_id={props.staff._id} />
                        </div>
                        {(props.mode === 'report')?<div className='d-flex align-items-center px-3 py-1 col-12 col-lg-2'>
                                <span className='text-success ff-mst mr-3'>Converted</span>
                                <span className='text-dark ff-mst'>{props.staff.count}</span>
                            </div>:<></>}
                        <div className='d-flex flex-wrap justify-content-between align-items-center px-3 py-1 col-12 col-lg-6'>
                                <div className='ff-mst bold'>{props.staff.email}</div>
                                <div className='text-1 ff-mst '>{props.staff.phone}</div>
                        </div>
                        
                    </div>
                    <div  className='hr-3' />
                    {
                        (state.expand)?
                        <div className='px-0 py-4 d-flex flex-wrap bg-light shadow-lg'>
                            <div className = 'col-12 col-md-6 col-lg-6 d-flex flex-column align-items-center p-2'>
                                <WeeklyGraph type='staffs'  _id={props.staff._id} createdAt={props.staff.createdAt} />
                            </div>
                            <div className = 'col-12 col-md-6 col-lg-6 d-flex flex-column align-items-center p-2'>
                                <MonthlyGraph type='staffs' _id={props.staff._id} createdAt={props.staff.createdAt} />
                            </div>
                        </div> 
                        :<></>
                    }
                </div>
    )
}


export default SellersGrid
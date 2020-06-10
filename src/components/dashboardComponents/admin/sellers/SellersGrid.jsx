import React,{useState} from 'react'
import Status from '../../../utilComponents/Status'
import IconButton from '@material-ui/core/IconButton'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import MonthlyGraph from '../../../utilComponents/MonthlyGraph'
import WeeklyGraph from '../../../utilComponents/WeeklyGraph'


const SellersGrid = (props)=>{

    const imagePath = (props.staff.photo === null)?'/avatar.jpg':'http://localhost:5000'+props.staff.photo

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
                            <img src={imagePath} className='mr-2' style={{width:'30px',height:'30px'}} alt={props.staff.name.firstname} />
                            <div className='ff-mst bold '>{props.staff.name.firstname}</div>
                        </div>
                        <Status type='staffs' status={props.staff.status} staff_id={props.staff._id} />
                        <div className='ff-mst bold '>{props.staff.email}</div>
                        <div className='text-1 ff-mst '>{props.staff.phone}</div>
                    </div>
                    <div  className='hr-3' />
                    {
                        (state.expand)?
                        <div className='px-0 py-4 d-flex flex-wrap bg-light shadow-lg'>
                            <div className = 'col-12 col-md-6 col-lg-6 d-flex flex-column align-items-center p-2'>
                                <WeeklyGraph type='staffs'  _id={props.staff._id} createdAt={props.createdAt} />
                            </div>
                            <div className = 'col-12 col-md-6 col-lg-6 d-flex flex-column align-items-center p-2'>
                                <MonthlyGraph type='staffs' _id={props.staff._id} createdAt={props.createdAt} />
                            </div>
                        </div> 
                        :<></>
                    }
                </div>
    )
}


export default SellersGrid
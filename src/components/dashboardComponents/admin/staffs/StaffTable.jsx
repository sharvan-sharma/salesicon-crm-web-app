import React,{useState,useEffect} from 'react'
import Brand from '../../../utilComponents/Brand'
import LinearProgress from '../../../utilComponents/LinearProgress'
import Alert from '@material-ui/lab/Alert'
import {connect} from 'react-redux'
import {setStaffsObject} from '../../../../redux/staffs/staffs.actions'
import Fade from '@material-ui/core/Fade'
import axios from 'axios'
import Status from '../../../utilComponents/Status'


const StaffGrid = (props)=>{

    const imagePath = (props.staff.photo === null)?'/avatar.jpg':'http://localhost:5000'+props.staff.photo

    return (
                    <div className='d-flex shadow p-2 my-4 rounded flex-wrap align-items-center justify-content-between'>
                        <img src={imagePath} style={{width:'30px',height:'30px'}} alt={props.staff.name.firstname} />
                        <div className='ff-mst bold '>{props.staff.name.firstname}</div>
                        <Status type='staffs' status={props.staff.status} staff_id={props.staff._id} />
                        <div className='ff-mst bold '>{props.staff.email}</div>
                        <div className='text-1 ff-mst '>{props.staff.phone}</div>
                    </div>
    )
}

function StaffTable(props){

    const [state,setstate] = useState({loading:true,error:false,msg:''})

    useEffect(()=>{
        axios.get('/adminapi/staff/readall',{withCredentials:true})
        .then(result=>{
            switch(result.data.status){
                case 200: props.setStaffsObject(result.data.staffArray);setstate({...state,loading:false});break;
                case 401: setstate({...state,loading:false,error:true,msg:'Unauthorised'});break;
                case 500: setstate({...state,loading:false,error:true,msg:'server error'});break;
                default : console.log('staff loading default exec admin')
            }
        })
        .catch(err=>{
            setstate({...state,loading:false,error:true,msg:'server error'})
        })
    },[])


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
                    <Alert severity='error' variant='filled'>Error Occured while Loading Staff</Alert>
                </div>
            </div>
        )
    }else{
        return (<>
            <div className='col-12 my-4'>
                 {
                Object.entries(props.staffsObject).map((item)=><StaffGrid key={item[0]} staff={item[1]}/>)
                }
                {
                (Object.entries(props.staffsObject).length === 0)?
                <Fade in={true}>
                    <Alert severity='info' variant='filled' className='shadow p-2 my-4 rounded'>
                        No Staff Registered Yet 
                    </Alert>
                </Fade>:
                <></>
                }
            </div></>)
    }
}


const mapStateToProps = state=>({
    staffsObject :state.staffs.staffsObject
})

const mapDispatchToProps = dispatch =>({
    setStaffsObject:array=>dispatch(setStaffsObject(array))
})

export default  connect(mapStateToProps,mapDispatchToProps)(StaffTable)
import React,{useState,useEffect} from 'react'
import Brand from '../../../utilComponents/Brand'
import LinearProgress from '../../../utilComponents/LinearProgress'
import Alert from '@material-ui/lab/Alert'
import {connect} from 'react-redux'
import {setStaffsObject} from '../../../../redux/staffs/staffs.actions'
import Fade from '@material-ui/core/Fade'
import axios from 'axios'
import SellersGrid from  './SellersGrid'


function SellersTable(props){

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
        return (
            <>
            <div className='mbl' style={{marginTop:'10vh'}} />
            <div className='my-2 ff-mst text-1'>
                Sellers
            </div>
            <div className='hr-3'/>
            <div className='col-12 p-0 my-4'>
                {
                    Object.entries(props.staffsObject).map((item)=><SellersGrid key={item[0]} staff={item[1]}/>)
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

export default  connect(mapStateToProps,mapDispatchToProps)(SellersTable)
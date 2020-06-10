import React,{useState,useEffect} from 'react'
import Brand from '../../../utilComponents/Brand'
import LinearProgress from '../../../utilComponents/LinearProgress'
import Alert from '@material-ui/lab/Alert'
import {connect} from 'react-redux'
import {setCampaignsObject} from '../../../../redux/campaigns/campaigns.actions'
import Fade from '@material-ui/core/Fade'
import axios from 'axios'
import CampaignsGrid from  './CampaignsGrid'


function CampaignsTable(props){

    const [state,setstate] = useState({loading:true,error:false,msg:''})

    useEffect(()=>{
        axios.get('/adminapi/campaigns/readall',{withCredentials:true})
        .then(result=>{
            switch(result.data.status){
                case 200: props.setCampaignsObject(result.data.campaignsArray);setstate({...state,loading:false});break;
                case 401: setstate({...state,loading:false,error:true,msg:'Unauthorised'});break;
                case 500: setstate({...state,loading:false,error:true,msg:'server error'});break;
                default : console.log('campaign loading default exec admin')
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
                    <Alert severity='error' variant='filled'>Error Occured while Loading Campaigns</Alert>
                </div>
            </div>
        )
    }else{
        return (<>
            <div className='col-12 my-4'>
                {
                    Object.entries(props.campaignsObject).map((item)=><CampaignsGrid key={item[0]} campaign={item[1]}/>)
                }
                {
                (Object.entries(props.campaignsObject).length === 0)?
                <Fade in={true}>
                    <Alert severity='info' variant='filled' className='shadow p-2 my-4 rounded'>
                        No Campaign Registered Yet 
                    </Alert>
                </Fade>:
                <></>
                }
            </div></>)
    }
}


const mapStateToProps = state=>({
    campaignsObject:state.campaigns.campaignsObject
})

const mapDispatchToProps = dispatch=>({
    setCampaignsObject : array=>dispatch(setCampaignsObject(array))
})

export default  connect(mapStateToProps,mapDispatchToProps)(CampaignsTable)
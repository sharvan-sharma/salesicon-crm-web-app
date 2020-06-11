import React,{useEffect,useState} from 'react'
import SearchBar from '../Searchbar'
import CampaignEditor from './campaigns/CampaignEditor'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import axios from 'axios'
import {connect} from 'react-redux'
import {setCampaignsObject,deleteCampaign} from '../../../redux/campaigns/campaigns.actions'
import Alert from '@material-ui/lab/Alert'
import Fade from '@material-ui/core/Fade'
import Menu2 from './campaigns/Menu2'
import LinearProgress from '../../utilComponents/LinearProgress'
import Brand from '../../utilComponents/Brand'
import CircularProgress from '../../utilComponents/CircularProgress'
import { Tooltip } from '@material-ui/core'

const CampaignDate = (props)=>{
    let date = new Date(props.datetime)
    let hours = (date.getHours() < 10)?'0'+date.getHours():date.getHours()
    let minutes =  (date.getMinutes() < 10)?'0'+date.getMinutes():date.getMinutes()
    return (
    <>{date.getDay()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+hours+':'+minutes} </>
    )
}

const Campaign = (props)=>{

    const [err,seterr] = useState({exist:false,msg:''})
    const [progress,setprogress] = useState(false)

    const deleteCampaign = ()=>{
        setprogress(true)
        axios.post('/staffapi/campaign/delete',{campaign_id:props.campaign._id},{withCredentials:true})
        .then(result=>{
            setprogress(false)
            switch(result.data.status){
                case 200: {
                    props.deleteCampaign(result.data.deleted_campaign_id)
                    break;}
                case 500: seterr({exist:true,msg:'something went wrong whiledeleting camapign,Try Again'});break;
                case 401: seterr({exist:true,msg:'Not Authorize to delete Campaign'});break;
                case 422: seterr({exist:true,msg:'Cannot Perform delete on camapign that doesnot exist'});break;
                case 423: seterr({exist:true,msg:`Validation Error : type:${result.data.type}`});break;
                default: console.log('default exec');
            }
        })
        .catch(err=>{
            setprogress(false)
            seterr({exist:true,msg:'server error'})
        })
    }

    const beautifyName = (name,n)=>{
        return (name.length > n)?name.substring(0,n)+'...':name
    }

    return (<>
                    <div className='d-flex shadow flex-wrap my-4 rounded align-items-center justify-content-between'>
                        <div className='d-flex align-items-center px-3 py-1 col-12 col-lg-4'>
                            <Tooltip title={props.campaign.name} placement='bottom' arrow>
                                    <span className='ff-mst mr-3'>{beautifyName(props.campaign.name,20)}</span>
                            </Tooltip>
                            <Menu2 status={props.campaign.status} key={props.campaign._id} campaign_id ={props.campaign._id}/>
                        </div>
                        <div className='ff-mst bold col-6 col-lg-4 px-3 py-1'><CampaignDate datetime={props.campaign.createdAt} /></div>
                        <div className='text-1 d-flex'>
                             <div>
                                <IconButton size='small' className='mr-2' color='inherit' onClick={()=>props.openEditor({open:true,mode:'edit',id:props.campaign._id})}>
                                    <EditIcon/>
                                </IconButton>
                            </div>
                            <div>
                                {(progress)?<CircularProgress/>:
                                    <IconButton size='small' color='inherit' onClick={deleteCampaign}>
                                        <DeleteIcon/>
                                    </IconButton>
                                }
                            </div>
                        </div>
                    </div>
                    {(err.exist)?<Alert className='shadow p-2 my-4' severity='error' variant='filled'>{err.msg}</Alert>:<></>}
            </>
    )
}

// let dbdata = [
//     {name:'Camapign-1',description:"dummy description added",date:'22/04/2019 06:48',status:'Active'},
//     {name:'Camapign-2',description:"dummy description added",date:'22/04/2019 06:48',status:'Active'},
//     {name:'Camapign-3',date:'22/04/2019 06:48',status:'Active'},
//     {name:'Camapign-4',date:'22/04/2019 06:48',status:'Active'},
//     {name:'Camapign-5',date:'22/04/2019 06:48',status:'Active'},
//     {name:'Camapign-6',date:'22/04/2019 06:48',status:'Active'}
// ]

function Campaigns(props){

    const [state,setstate] = useState({loading:true,error:false})
    const [editor,openEditor]= useState({open:false,mode:null,id:null})

    useEffect(() =>{
        axios.get('/staffapi/campaign/readallcampaigns',{withCredentials:true})
        .then(result=>{
            let status = result.data.status
            if(status === 500){
                setstate({loading:false,error:true})
            }else if(status === 423){
                setstate({loading:false,error:true})
            }else if(status === 200){
                props.setCampaignsObject(result.data.campaignsArray)
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
                <Alert severity='error' variant='filled'>Error Occured while Loading Campaigns</Alert>
            </div>
        </div>
    )
  }else{
    return (<>
            <div className='mbl' style={{marginTop:'10vh'}} /> 
            <div className='col-12 my-1 p-0 d-flex justify-content-between align-items-center'>
                <span className='ff-mst text-1' >Campaigns</span>
                <button className='btn btn-3 text-nowrap fsm' onClick={()=> openEditor({open:true,mode:'new',id:null})}>ADD NEW</button>
            </div>
            <div className='hr-3'/>
            <div className='col-12 p-0 my-2'>
            {
                Object.entries(props.campaignsObject).map((item)=><Campaign key={item[0]} deleteCampaign={props.deleteCampaign} campaign={item[1]} openEditor={openEditor} />)
            }
            {
               (Object.entries(props.campaignsObject).length === 0)?
               <Fade in={(Object.entries(props.campaignsObject).length === 0)}>
                   <Alert severity='info' variant='filled' className='shadow p-2 my-4 rounded'>
                       No Campaign created 
                   </Alert>
               </Fade>:
               <></>
            }
        </div>
        {(editor.open)?<CampaignEditor 
                         mode={editor.mode} 
                         name={(editor.id === null)?'':props.campaignsObject[editor.id].name } 
                         description={(editor.id === null)?'':props.campaignsObject[editor.id].description } 
                         campaign_id={(editor.id === null)?'':props.campaignsObject[editor.id]._id }
                         openEditor={openEditor} />
                         :<></>}
        </>)
        }
}
const mapStateToProps = state=>({
    campaignsObject:state.campaigns.campaignsObject
})

const mapDispatchToProps = dispatch=>({
    setCampaignsObject : array=>dispatch(setCampaignsObject(array)),
    deleteCampaign:id=>dispatch(deleteCampaign(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(Campaigns);
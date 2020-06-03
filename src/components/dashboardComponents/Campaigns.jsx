import React,{useEffect,useState} from 'react'
import ToggleMenu from './campaigns/ToggleMenu'
import SearchBar from './Searchbar'
import CampaignEditor from './campaigns/CampaignEditor'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const Campaign = (props)=>{
    return (
                    <div className='d-flex shadow p-2 my-4 rounded align-items-center justify-content-between'>
                        <div className='ff-mst bold'>{props.campaign.name}</div>
                        <div className='ff-mst bold'>{props.campaign.date}</div>
                        <div className='text-1 ff-mst'>{props.campaign.status}</div>
                        <div className='text-1'>
                            <IconButton size='small' className='mr-2' color='inherit' onClick={()=>props.openEditor({open:true,mode:'edit',id:props.id})}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton size='small' color='inherit'>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    </div>
    )
}

let dbdata = [
    {name:'Camapign-1',description:"dummy description added",date:'22/04/2019 06:48',status:'Active'},
    {name:'Camapign-2',description:"dummy description added",date:'22/04/2019 06:48',status:'Active'},
    {name:'Camapign-3',date:'22/04/2019 06:48',status:'Active'},
    {name:'Camapign-4',date:'22/04/2019 06:48',status:'Active'},
    {name:'Camapign-5',date:'22/04/2019 06:48',status:'Active'},
    {name:'Camapign-6',date:'22/04/2019 06:48',status:'Active'}
]

function Campaigns(props){
    useEffect(() =>  props.setactive(), [])

    const [campaignsArray,updateCampaigns] = useState(dbdata)
    const [editor,openEditor]= useState({open:false,mode:null,id:null})
   
return (<>
        {/* searchbar */}
        {/* addnew */}
        {/* edit old */}
        <div className='col-12 fsm d-flex justify-content-between align-items-center flex-wrap'>
            <div className='col-12 col-md-6 col-lg-6 p-0 fsm'>
                <SearchBar/>
            </div>
            <div className='d-flex py-1 fsm'>
                <div className='mr-2'>
                    <ToggleMenu/>
                </div>
                <div className='mr-2'>
                    <ToggleMenu/>
                </div>
                <div>
                    <button className='btn btn-3 text-nowrap fsm' onClick={()=> openEditor({open:true,mode:'new',id:null})}>ADD NEW</button>
                </div>
            </div>
        </div>
        
        <div className='col-12 my-4'>
            {
                campaignsArray.map((campaign,index)=><Campaign key={index} id={index} campaign={campaign} openEditor={openEditor} />)
            }
        </div>
        {(editor.open)?<CampaignEditor 
                         mode={editor.mode} 
                         name={(editor.id === null)?'':campaignsArray[editor.id].name } 
                         description={(editor.id === null)?'':campaignsArray[editor.id].description } 
                         openEditor={openEditor} />
                         :<></>}
</>)
}

export default Campaigns;
import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import Fade from '@material-ui/core/Fade'

const LeadProfile = (props)=>{
return (
                    <>
                    <div className='col-12 col-lg-6'>
                        <div className='text-dark fmd'>Name</div>
                        <div className='text-1 ff-mst'>{props.lead.name.firstname} {props.lead.name.middlename} {props.lead.name.lastname}</div>
                    </div>
                     <div className='col-12'>
                        <div className='text-dark fmd'>Email</div>
                        <div className='text-1 ff-mst'>{props.lead.email}</div>
                    </div>
                     <div className='col-12 col-lg-6'>
                        <div className='text-dark fmd'>Phone Number</div>
                        <div className='text-1 ff-mst'>{props.lead.phone}</div>
                    </div>
                     <div className='col-12 col-lg-6'>
                        <div className='text-dark fmd'>Date Of birth</div>
                        <div className='text-1 ff-mst'>{props.lead.dob}</div>
                    </div>
                     <div className='col-12 col-lg-6'>
                        <div className='text-dark fmd'>Location</div>
                        <div className='text-1 ff-mst'>{props.lead.location}</div>
                    </div>
                    <div className='col-12 col-lg-6'>
                        <div className='text-dark fmd'>Interested In</div>
                        <div className='d-flex flex-wrap'>
                            {
                             props.lead.interested_in.map((product,index)=><label key={index} className='text-1 m-1 ff-mst'>{product}</label>)
                            }
                        </div>
                    </div>
</>
)
}



let interaction = {datetime:'20/4/2020 13:42',response_type:'Positive',score:7,remarks:'Dummy Remarks are added for design purpose'}

const LeadInteraction=(props)=>{
    return (<div className='d-flex p-2 rounded shadow-lg flex-column bg-white my-2' >
                <label className='text-1 ff-mst'>{props.data.datetime}</label>
                <label >
                    <span className='text-success ff-mst'>{props.data.response_type} </span>
                    <span  className='text-1 ff-mst'>{props.data.score}</span>
                </label>
                <label className='text-1  m-0'>Remarks</label>
                <p className='text-muted fsm'>
                 {props.data.remarks}
                </p>
            </div>)
}

function Lead(props){

    const [add,setAdd] = React.useState(false)

    return (<>
            <div className='d-flex justify-content-between my-2'>
                <div>
                    <IconButton color='inherit' size='small' onClick={()=>props.setOpenLead({open:false,lead_id:null})}>
                        <BackIcon/>
                    </IconButton>
                    <label className='text-1 ff-mst ml-2'>Lead</label>
                </div>
                <div>
                    <IconButton color='inherit' size='small'>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
            <div className='hr-3'></div>
            <div className='d-flex flex-wrap'>
                <div className='col-12 col-md-4 col-lg-4 col-xl-4 py-4 my-4 shadow-lg d-flex flex-wrap justify-content-start' style={{height:'60vh'}}>
                    <LeadProfile lead={props.lead} />
                </div>
                <div className='col-12 col-md-8 col-lg-8 col-xl-8 my-4  '  >
                    <div className='d-flex justify-content-between'>
                            <label className='flg ff-mst my-2'><span className='text-1'>Lead </span>Interactions</label>
                           {(!add)?<div><IconButton color='inherit' size='small' onClick={()=>setAdd(true)}><AddIcon/></IconButton></div>:<></>}
                    </div>
                    
                    {(add)?
                    <Fade in ={true} >
                    <div className='col-12 p-2 my-2 shadow-lg rounded'>
                        <div className='d-flex'>
                            <div className="fsm btn-group mr-2">
                                <button type="button" class="btn btn-dark">Response</button>
                                <button type="button" className="btn btn-dark dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="sr-only">Toggle Dropdown</span>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item text-success" type="button">Positive</button>
                                    <button className="dropdown-item text-danger" type="button">Negative</button>
                                </div>
                            </div>
                            <div className="fsm btn-group">
                                <button type="button" class="btn btn-dark">Score</button>
                                <button type="button" className="btn btn-dark dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="sr-only">Toggle Dropdown</span>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    {
                                    [0,1,2,3,4,5,6,7,8,9].map(v=><button key={v} className="dropdown-item text-1" type="button">{v}</button>)   
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='d-flex col-12 p-0 my-1'>
                            <input required className='form-control mr-1' type='text' />
                            <div>
                                <IconButton color='inherit' size='small' onClick={()=>setAdd(false)}><AddIcon/></IconButton>
                            </div>
                            <div>
                                <IconButton color='inherit' size='small' onClick={()=>setAdd(false)}><CancelIcon/></IconButton>
                            </div>
                        </div>
                    </div>
                    </Fade>
                    :<></>}
                    
                    <div className='lead-interaction bg-light' style={{height:'60vh'}}>
                         {
                            [0,1,2,3,4,5,6,7].map((val)=>{
                                    return <LeadInteraction data={interaction} key={val} />
                                })
                            }
                    </div>
                </div>
            </div>
            </>)

}

export default Lead
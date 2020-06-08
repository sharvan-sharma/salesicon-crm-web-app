import React from 'react'

function LeadInteraction(props){

    let date = new Date(props.data.datetime)
    let day = date.getDate()
    let month = date.getMonth()+1 
    let year = date.getFullYear()
    let hours = date.getHours()
    hours = (hours < 10)?'0'+hours:hours
    let minutes = date.getMinutes()
    minutes = (minutes < 10)?'0'+minutes:minutes

    return (<div className='d-flex p-2 rounded shadow-lg bg-white flex-column my-2' >
                <label className='text-1 ff-mst'>
                    {day+'/'+month+'/'+year+' '+hours+':'+minutes}
                </label>
                <label >
                    {(props.data.response_id.response_type === 'positive')?
                    <span className='text-success ff-mst'>{props.data.response_id.response_type} </span>:
                    <span className='text-danger ff-mst'>{props.data.response_id.response_type} </span>}
                    <span  className='text-1 ff-mst'>{props.data.response_id.score}</span>
                </label>
                <label className='text-1  m-0'>Remarks</label>
                <p className='text-muted fsm'>
                 {props.data.remarks}
                </p>
            </div>)
}


export default LeadInteraction
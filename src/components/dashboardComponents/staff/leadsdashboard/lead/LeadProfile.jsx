import React from 'react'
import {connect} from 'react-redux'

function LeadProfile (props){
            let date = new Date(props.lead.dob)
            let day = date.getDate()
            let month = date.getMonth()+1 
            let year = date.getFullYear()
            return (
                 <div className='col-12 col-md-4 col-lg-4 col-xl-4 py-4 my-4 shadow-lg d-flex flex-wrap justify-content-start' style={{minHeight:'60vh'}}>
                    <div className='col-12 col-lg-6'>
                        <div className='text-dark fmd'>Name</div>
                        <div className='text-1 ff-mst'>{props.lead.name.firstname} {props.lead.name.middlename} {props.lead.name.lastname}</div>
                    </div>
                     <div className='col-12'>
                        <div className='text-dark fmd'>Email</div>
                        <div className='text-1 ff-mst text-break'>{props.lead.email}</div>
                    </div>
                     <div className='col-12 col-lg-6'>
                        <div className='text-dark fmd'>Phone Number</div>
                        <div className='text-1 ff-mst'>{props.lead.phone}</div>
                    </div>
                     <div className='col-12 col-lg-6'>
                        <div className='text-dark fmd'>Date Of birth</div>
                        <div className='text-1 ff-mst'>{day+'/'+month+'/'+year}</div>
                    </div>
                     <div className='col-12 col-lg-6'>
                        <div className='text-dark fmd'>Location</div>
                        <div className='text-1 ff-mst'>{props.lead.location}</div>
                    </div>
                    <div className='col-12 col-lg-6'>
                        <div className='text-dark fmd'>Interested In</div>
                        <div className='d-flex flex-wrap'>
                            {
                             props.lead.interested_in.map((product_id)=><label key={product_id} className='text-1 m-1 ff-mst'>{(props.productsObject[product_id] === undefined)?'':props.productsObject[product_id].name}</label>)
                            }
                        </div>
                    </div>
                </div>
    )
}

const mapStateToProps = state=>({
    productsObject:state.products.productsObject
})

export default connect(mapStateToProps)(LeadProfile)
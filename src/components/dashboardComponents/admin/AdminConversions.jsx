import React,{useState} from 'react'
import MonthlyGraph from '../../utilComponents/MonthlyGraph'
import WeeklyGraph from '../../utilComponents/WeeklyGraph'
import {connect} from 'react-redux'
import Skeleton from '@material-ui/lab/Skeleton';

function AdminConversions(props){
        const [weeklyReport,setWeeklyReport] = useState(null)

        const [monthlyReport,setMonthlyReport] = useState(null) 

        const monthlyReportCallback = (dataset)=>{
                setMonthlyReport(dataset)
        }

        const weeklyReportCallback = (dataset)=>{
                setWeeklyReport(dataset)
        }

        return (
        <div className='d-flex col-12 p-0 flex-wrap justify-content-around'>
                <div className=' col-lg-5 my-4  col-12 py-4 d-flex flex-column align-items-center shadow-lg'>
                     <WeeklyGraph _id='' type='all' createdAt={props.createdAt} datasetCallback={monthlyReportCallback} />
                     <div className='d-flex flex-wrap'>
                        <div className='col-12 col-lg-4 col-md-4' >
                                <p className='m-1 ff-mst text-danger text-center'>Rejected</p>
                                {
                                        (weeklyReport === null)?
                                        <Skeleton animation="wave" />:
                                        <p className='m-1 ff-mst text-center'>{weeklyReport[0]}</p>
                                }    
                        </div>
                        <div  className='col-12 col-lg-4 col-md-4'>
                                <p className='m-1 ff-mst text-success text-center'>Converted</p>
                                {
                                        (weeklyReport === null)?
                                        <Skeleton animation="wave" />:
                                        <p className='m-1 ff-mst text-center'>{weeklyReport[1]}</p>
                                }
                        </div>
                        <div  className='col-12 col-lg-4 col-md-4'>
                                <p className='m-1 ff-mst text-1 text-center'>Pending</p>
                                {
                                        (weeklyReport === null)?
                                        <Skeleton animation="wave" />:
                                        <p className='m-1 ff-mst text-center'>{weeklyReport[2]}</p>
                                }
                        </div>
                     </div>
                </div>
               <div className='col-lg-5 col-12 my-4 py-4 d-flex flex-column align-items-center shadow-lg'>
                    <MonthlyGraph _id='' type='all' createdAt={props.createdAt}  datasetCallback={weeklyReportCallback} />
                    <div className='d-flex flex-wrap'>
                        <div  className='col-12 col-lg-4 col-md-4'>
                                <p className='m-1 ff-mst text-danger text-center'>Rejected</p>
                                {
                                        (monthlyReport === null)?
                                        <Skeleton animation="wave" />:
                                        <p className='m-1 ff-mst text-center'>{monthlyReport[0]}</p>
                                }    
                        </div>
                        <div  className='col-12 col-lg-4 col-md-4'>
                                <p className='m-1 ff-mst text-success text-center'>Converted</p>
                                {
                                        (monthlyReport === null)?
                                        <Skeleton animation="wave" />:
                                        <p className='m-1 ff-mst text-center'>{monthlyReport[1]}</p>
                                }
                        </div>
                        <div  className='col-12 col-lg-4 col-md-4'>
                                <p className='m-1 ff-mst text-1 text-center'>Pending</p>
                                {
                                        (monthlyReport === null)?
                                        <Skeleton animation="wave" />:
                                        <p className='m-1 ff-mst text-center'>{monthlyReport[2]}</p>
                                }
                        </div>
                     </div>
                 </div>            
        </div>
        )
}

const mapStateToProps = state=>({
        createdAt:state.user.createdAt
})

export default connect(mapStateToProps)(AdminConversions)
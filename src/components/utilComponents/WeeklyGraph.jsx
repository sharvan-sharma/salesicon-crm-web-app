import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import Brand from './Brand'
import LinearProgress from './LinearProgress'
import Graph from './Graph'


const Loader = ()=>{
    return (<div className='col-12 col-lg-6'>
                <div className='my-2 d-flex justify-content-center'>
                    <Brand color='dark' />
                </div>
                <LinearProgress/>
            </div>)
}

const getYearAndWeek = (date = new Date())=>{
        const d = new Date(date)
        const year = d.getFullYear()
        const week = Math.ceil((d.getTime() - new Date(year,0,1).getTime())/(1000*60*60*24*7))

        return {y:year,w:week}
    }

function WeeklyGraph(props){

    const [state,setstate] = useState({
        loading:true,
        error:{exist:false,msg:''},
        dataArray:[],
        yw:getYearAndWeek(),
    })

    const weekRef= useRef('')

    const changeYearAndWeek = ()=>{
        const arr = weekRef.current.value.split('-')
        const mindate = new Date((new Date(arr[0],0,1).getTime())+(1000*24*60*60*7*(Number(arr[1].split('W')[1])-1)))
        const maxdate = new Date((new Date(arr[0],0,1).getTime())+(1000*24*60*60*7*(Number(arr[1].split('W')[1])-0))) 
        axios.post('/adminapi/conversions',{
            _id:props._id,
            maxdate,
            mindate,
            type:props.type
        },{withCredentials:true})
        .then(result=>{
            switch(result.data.status){
                case 500:setstate({...state,yw:{y:arr[0],w:arr[1].split('W')[1]},error:{exist:true,msg:'error while loading graph'}});break;
                case 401:setstate({...state,yw:{y:arr[0],w:arr[1].split('W')[1]},error:{exist:true,msg:'Unauthorised'}});break;
                case 423:setstate({...state,yw:{y:arr[0],w:arr[1].split('W')[1]},error:{exist:true,msg:`Validation error ${result.data.type}`}});break;
                case 200:generateDataArray(result.data.dataset);break;
                default:console.log('def chart admin axec')
            }
        })
        .catch(err=>{
            setstate({...state,yw:{y:arr[0],w:arr[1].split('W')[1]},error:{exist:true,msg:'error while loading graph'}})
        })
    }

    const disableWeekInput = ()=>{
        const yw1 = getYearAndWeek(props.createdAt)
        const yw2 = getYearAndWeek()
        if(yw1.y === yw2.y && yw1.m === yw1.m){
            return true
        }else{
            return false
        }
    }


    const getWeekMinMaxInput = (type)=>{
            const yw = (type === 'min')?getYearAndWeek(props.createdAt):getYearAndWeek()
            return `${yw.y}-W${yw.m}`
    }

    const generateDataArray = async (dataset)=>{
        let arr = [0,0,0] //r,c,p
        dataset.forEach(obj=>{
            switch(obj._id){
                case 'Rejected':arr[0]=obj.count;break;
                case 'Pending':arr[2]=obj.count;break;
                case 'Converted':arr[1]=obj.count;break;
                default:console.log('server data set other than r,c,p')
            }
        })

        setstate({...state,loading:false,dataArray:arr});

        if(props.type === 'all'){
            props.datasetCallback(arr)
        }
    }

    useEffect(()=>{
        const mindate = new Date((new Date(state.yw.y,0,1).getTime())+(1000*24*60*60*7*(Number(state.yw.w)-1)))
        const maxdate = new Date((new Date(state.yw.y,0,1).getTime())+(1000*24*60*60*7*(Number(state.yw.w)-0))) 
        axios.post('/adminapi/conversions',{
            _id:props._id,
            maxdate,
            mindate,
            type:props.type
        },{withCredentials:true})
        .then(result=>{
            switch(result.data.status){
                case 500:setstate({...state,loading:false,error:{exist:true,msg:'error while loading graph'}});break;
                case 401:setstate({...state,loading:false,error:{exist:true,msg:'Unauthorised'}});break;
                case 423:setstate({...state,loading:false,error:{exist:true,msg:`Validation error ${result.data.type}`}});break;
                case 200:generateDataArray(result.data.dataset);break;
                default:console.log('def chart admin axec')
            }
        })
        .catch(err=>{
            setstate({...state,loading:false,error:{exist:true,msg:'error while loading graph'}})
        })
    },[])

    if(state.loading){
            return <Loader/>
    }else{
           return (  

                       <>
                       <div className='d-flex flex-column align-items-center'>
                            <label className='my-1 ff-mst flg'><span  className='text-1'>Weekly</span> Report</label>
                            <input
                             disabled={disableWeekInput()}
                             min={getWeekMinMaxInput('min')} 
                             max={getWeekMinMaxInput('max')}
                             value={`${state.yw.y}-W${state.yw.w}`}
                             ref={weekRef}
                             type ='week'  
                             className='my-2 form-control-sm'   
                             onChange={changeYearAndWeek}
                             />
                          </div>
                             {
                                 (state.error.exist)?
                                 <div className='col-12 col-lg-6 '>
                                    <Alert variant='filled' severity='error'>{state.error.msg}</Alert>
                                </div>:<Graph dataArray={state.dataArray}  />
                            }
                        </>
                    )
    }


}

export default WeeklyGraph
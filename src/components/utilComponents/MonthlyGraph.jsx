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

const getYearAndMonth = (date = new Date())=>{
        const d = new Date(date)
        const year = d.getFullYear()
        const month = ((d.getMonth()+1) < 10)?('0'+(d.getMonth()+1)):(d.getMonth()+1)

        return {y:year,m:month}
    }

function MonthlyGraph(props){

    const [state,setstate] = useState({
        loading:true,
        error:{exist:false,msg:''},
        dataArray:[],
        ym:getYearAndMonth(),
    })

    const monthRef = useRef('')

    const changeYearAndMonth = ()=>{
        const arr = monthRef.current.value.split('-')
        const mindate = new Date(arr[0],Number(arr[1])-1,1)
        const maxdate = new Date(arr[0],Number(arr[1]),1)
        axios.post('/adminapi/conversions',
         {
             _id:props._id,
             mindate,
             maxdate,
             type:props.type
         },{withCredentials:true})
        .then(result=>{
            switch(result.data.status){
                case 500:setstate({...state,ym:{y:arr[0],m:arr[1]},error:{exist:true,msg:'error while loading graph'}});break;
                case 401:setstate({...state,ym:{y:arr[0],m:arr[1]},error:{exist:true,msg:'Unauthorised'}});break;
                case 423:setstate({...state,ym:{y:arr[0],m:arr[1]},error:{exist:true,msg:`Validation error ${result.data.type}`}});break;
                case 200:generateDataArray(result.data.dataset);break;
                default:console.log('def chart admin axec')
            }
        })
        .catch(err=>{
            setstate({...state,ym:{y:arr[0],m:arr[1]},error:{exist:true,msg:'error while loading graph'}})
        })
    }

    const disableMonthInput = ()=>{
        const ym1 = getYearAndMonth(props.createdAt)
        const ym2 = getYearAndMonth()
        if(ym1.y === ym2.y && ym1.m === ym1.m){
            return true
        }else{
            return false
        }
    }

     const getMonthMinMaxInput = (type)=>{
            const ym = (type === 'min')?getYearAndMonth(props.createdAt):getYearAndMonth()
            return `${ym.y}-${ym.m}`
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
        const mindate = new Date(state.ym.y,Number(state.ym.m)-1,1)
        const maxdate = new Date(state.ym.y,Number(state.ym.m),1)
        axios.post('/adminapi/conversions',
         {
             _id:props._id,
             mindate,
             maxdate,
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
                        <>  <div className='d-flex flex-column align-items-center'>
                                <label className='my-1 ff-mst flg'><span  className='text-1'>Monthly</span> Report</label>
                            
                                <input
                                disabled={disableMonthInput()}
                                min={getMonthMinMaxInput('min')} 
                                max={getMonthMinMaxInput('max')}
                                value={`${state.ym.y}-${state.ym.m}`}
                                ref={monthRef}
                                onChange={changeYearAndMonth}
                                type ='month'
                                className='my-2 form-control-sm' />
                             
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

export default MonthlyGraph

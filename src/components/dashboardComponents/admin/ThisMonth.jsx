import React,{useState,useRef} from 'react';
import {connect} from 'react-redux'
import {setStaffsObject} from '../../../redux/staffs/staffs.actions'
import {setCampaignsObject} from '../../../redux/campaigns/campaigns.actions'
import axios from 'axios'


const getYearAndMonth = (date = new Date())=>{
        const d = new Date(date)
        const year = d.getFullYear()
        const month = ((d.getMonth()+1) < 10)?('0'+(d.getMonth()+1)):(d.getMonth()+1)

        return {y:year,m:month}
    }

function ThisMonth(props){
    
    const monthRef = useRef('')

    const ym = getYearAndMonth(props.state.date)

    // const disableMonthInput = ()=>{
    //     const ym1 = getYearAndMonth(props.createdAt)
    //     const ym2 = getYearAndMonth()
    //     if(ym1.y === ym2.y && ym1.m === ym1.m){
    //         return true
    //     }else{
    //         return false
    //     }
    // }

    const Url=()=>{
        switch(props.screen){
            case 1:return '/adminapi/report/staff?type=top'
            case 2:return '/adminapi/report/staff?type=bottom'
            default:console.log('this month admin ')
        }
    }



    const changeYearAndMonth = ()=>{
        const arr = monthRef.current.value.split('-')
        const mindate = new Date(arr[0],Number(arr[1])-1,1)
        const maxdate = new Date(arr[0],Number(arr[1]),1)
        axios.post(Url(),{mindate,maxdate},{withCredentials:true})
        .then(result=>{
            switch(result.data.status){
                case 200: {
                    (props.screen === 1)?props.setStaffsObject(result.data.staffArray):props.setCampaignsObject(result.data.campaignsArray)
                    props.setstate({...props.state,loading:false,date:mindate});
                    break;
                }
                case 401: props.setstate({...props.state,loading:false,error:true,msg:'Unauthorised'});break;
                case 500: props.setstate({...props.state,loading:false,error:true,msg:'server error'});break;
                default : console.log('staff loading default exec admin')
            }
        })
        .catch(err=>{
            props.setstate({...props.state,loading:false,error:true,msg:'server error'})
        })

    }

    const getMonthMinMaxInput = (type)=>{
            const ym = (type === 'min')?getYearAndMonth(props.createdAt):getYearAndMonth()
            return `${ym.y}-${ym.m}`
    }


    return (
        <>
            <span className='text-white ff-mst mr-2 text-nowrap fsm'>Selected Month</span>
            <input
                // disabled={disableMonthInput()}
                min={getMonthMinMaxInput('min')} 
                max={getMonthMinMaxInput('max')}
                key={props.state.date.getMonth()}
                value={`${ym.y}-${ym.m}`}
                ref={monthRef}
                onChange={changeYearAndMonth}
                type ='month'
                className='form-control fsm' />
        </>
    )

}

const mapStateToProps = state=>({
    createdAt:state.user.createdAt
})

const mapDispatchToProps = dispatch =>({
    setStaffsObject:array=>dispatch(setStaffsObject(array)),
    setCampaignsObject : array=>dispatch(setCampaignsObject(array))
})


export default connect(mapStateToProps,mapDispatchToProps)(ThisMonth)
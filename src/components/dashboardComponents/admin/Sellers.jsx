import React from 'react'
import {Switch,Route} from 'react-router-dom'
import SellersTable from './sellers/SellersTable'
import {Link } from 'react-router-dom'

function Sellers(props){
        let activeClass = 'btn btn-3 mx-1 fsm'
        let InactiveClass = 'btn  btn-light mx-1 text-1 fsm'
        return (
                <>
            <div className='mbl' style={{marginTop:'10vh'}} />
            <div className='my-2 d-flex ff-mst '>
                <Link to='/sellers' className={(props.screen === 0)?activeClass:InactiveClass} >Sellers</Link>
                <Link to='/sellers/top5' className={(props.screen === 1)?activeClass:InactiveClass} >Top 5 Sellers</Link>
                <Link to='/sellers/bottom5' className={(props.screen === 2)?activeClass:InactiveClass} >Least 5 Sellers</Link>
            </div>
            <div className='hr-3'/>
            <SellersTable screen={props.screen}/>
            </>
        )
}


function SellersRouter(){
return (<Switch>
                <Route exact path='/sellers' component={()=><Sellers screen={0}/>}/>
                <Route exact path='/sellers/top5' component={()=><Sellers screen={1}/>}/>
                <Route exact path='/sellers/bottom5' component={()=><Sellers screen={2}/>}/>
        </Switch>)
}

export default SellersRouter
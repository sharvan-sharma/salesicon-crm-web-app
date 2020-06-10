import React from 'react'
import {Switch,Route} from 'react-router-dom'
import SellersTable from './sellers/SellersTable'


function Sellers(){
return (<Switch>
                <Route path='/sellers' component={SellersTable}/>
        </Switch>)
}

export default Sellers
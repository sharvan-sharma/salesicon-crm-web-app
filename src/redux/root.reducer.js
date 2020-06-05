import {combineReducers} from 'redux'
import userReducer from './user/user.reducer'
import campaignsReducer from './campaigns/campaigns.reducer'
import leadsReducer from './leads/leads.reducer'
import productsReducer from './products/products.reducer'
import leadInteractionsReducer from './leadInteractions/leadInteractions.reducer'

export default combineReducers({
    user:userReducer,
    campaigns:campaignsReducer,
    leads:leadsReducer,
    products:productsReducer,
    leadInteractions:leadInteractionsReducer,
})
import React,{useEffect,useState,Suspense} from 'react';
import axios from 'axios'
import Preloader from './components/utilComponents/PreLoader'
import ServerError from './components/utilComponents/ServerError'
import DashboardRouter from './containers/DashboardRouter'
import {Route,Switch,Redirect} from 'react-router-dom'
import querystring from 'query-string'
import {setCurrentUser} from './redux/user/user.actions'
import {connect} from 'react-redux'
import 'jquery/src/jquery'
import 'popper.js/dist/popper'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './styles/main.css'

const Contact = React.lazy(()=>import('./containers/Contact'))
const About = React.lazy(()=>import('./containers/About'))
const ResetPassword = React.lazy(()=>import('./containers/ResetPassword'))
const Verify = React.lazy(()=>import('./containers/Verify'))
const Authenticate = React.lazy(()=>import('./containers/Authenticate'))
const LandingPage = React.lazy(()=>import('./containers/LandingPage'))
const Page404 = React.lazy(()=>import('./containers/Page404'))


const typesArray = ['admin','staff']

function App(props) {

   const [screen,resetScreen] = useState({loading:true,error:false})

   useEffect(() => {
     axios.get('/checklogin',{
       withCredentials:true
     })
     .then(res=>{
          if(res.data.logged_in){
              props.setCurrentUser(res.data)
              resetScreen({...screen,loading:false})
          }else{
            setTimeout(()=>{
            resetScreen({...screen,loading:false})
            },2000)
          }
     })
     .catch(err=>{
        resetScreen({loading:false,error:true})
     })
   },[])

  if (screen.loading) {
    return <Preloader/>
  }else if (screen.error){
    return <ServerError/>
  } else {
    if (props.logged_in) {
      return (<Switch>
                <Route path='/' component={DashboardRouter} />
                <Route >
                  <Redirect to='/' />
                </Route>
              </Switch>)
    } else {
      return (<Switch>
                  <Route exact path='/' component={()=>(<Suspense fallback={<Preloader/>}><LandingPage/></Suspense>)} />
                  <Route path='/login/:type' component={(prop)=>{
                    const type = prop.match.params.type
                    if(typesArray.includes(type)){
                      return (<Suspense fallback={<Preloader/>}><Authenticate page={1} type={type} /></Suspense>)
                    }else{
                      return (<Suspense fallback={<Preloader/>}><Page404/></Suspense>)
                    }
                  }} />
                  <Route path='/signup/:type'  component={(prop)=>{
                    const type = prop.match.params.type
                    if(typesArray.includes(type)){
                      if(type  === 'staff'){
                        const val = querystring.parse(prop.location.search)
                        const token = val.token
                        return (<Suspense fallback={<Preloader/>}><Authenticate page={2} type={type} token={token} /></Suspense>)
                      }else{
                        return (<Suspense fallback={<Preloader/>}><Authenticate page={2} type={type}/></Suspense>)
                      }
                    }else{
                      return (<Suspense fallback={<Preloader/>}><Page404/></Suspense>)
                    }
                  }}/>
                  <Route path='/forgotpassword/:type'  component={(prop)=>{
                    const type = prop.match.params.type
                    if(typesArray.includes(type)){
                      return (<Suspense fallback={<Preloader/>}><Authenticate page={3} type={type} /></Suspense>)
                    }else{
                      return (<Suspense fallback={<Preloader/>}><Page404/></Suspense>)
                    }
                  }} />
                  <Route exact path='/resetpassword' component={(prop)=>{
                        const val = querystring.parse(prop.location.search)
                        const token = val.token
                        const type = val.type
                        return (<Suspense fallback={<Preloader/>}><ResetPassword token = {token} type={type} /></Suspense>)
                      }}/>
                  <Route path='/verifyemail' component={(prop)=>{
                        const val = querystring.parse(prop.location.search)
                        const token = val.token
                        return (<Suspense fallback={<Preloader/>}><Verify type='verified' token = {token} /></Suspense>)
                      }}/>
                  <Route exact path='/approval' component={(prop)=>{
                        const val = querystring.parse(prop.location.search)
                        const token = val.token
                        return (<Suspense fallback={<Preloader/>}><Verify type='approved' token = {token} /></Suspense>)
                      }}/>
                  <Route exact path='/oauth' component={(prop)=>{
                        return (<Suspense fallback={<Preloader/>}><Verify type='oauth' /></Suspense>)
                      }}/>
                  <Route exact path='/contact' component={()=>(<Suspense fallback={<Preloader/>}><Contact/></Suspense>)} />
                  <Route exact path='/about' component={()=>(<Suspense fallback={<Preloader/>}><About/></Suspense>)} />
                  <Route component={()=>(<Suspense fallback={<Preloader/>}><Page404/></Suspense>)}/>
              </Switch>)
    }
  }
}

const mapStateToProps = (state) => ({
  logged_in: state.user.logged_in,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: userObject => dispatch(setCurrentUser(userObject)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);


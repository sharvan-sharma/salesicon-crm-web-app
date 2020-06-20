import React from 'react'
import 'jquery/src/jquery'
import 'popper.js/dist/popper'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './styles/main.css'
import Brand from './components/utilComponents/Brand'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

 

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (<div className = 'full-screen d-flex justify-content-center align-items-center bg-gradient text'>
                    <div className='col-12 col-lg-6 col-md-8 col-xl-4'>
                        <p className='fxl my-4'><Brand color='light'/></p>
                        <p className='fxl text-danger ff-mst mb-0' >We're fixing it</p>
                        <p className='bold text-white mt-0 fsm'>This Page is having some technical hiccups. We know about the Problem and we're working to get things back to normal quickly.</p>
                        <p className='my-4'><a href='https://salesicon-crm.web.app' className='text-decoration-none rounded-pill text-dark btn ff-mst btn-light'>Back To <b>S</b>ales<b>I</b>con</a></p>
                    </div>
      </div>)
    }

    return this.props.children; 
  }
}

export default ErrorBoundary
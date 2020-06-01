import React from 'react'
import {Link } from 'react-router-dom'
//import Brand from './components/UtilComponents/Brand'

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
      return (<div className = 'fullscreen d-flex justify-content-center align-items-center bg-black text'>
                    <div className='col-12 col-lg-6 col-md-8 col-xl-4'>
                        {/* <p className='d-flex justify-content-center'><Brand color='Light'/></p> */}
                        <p><span className='display-3 text-danger'>We're fixing it</span></p>
                        <p className='bold'>This Page is having some technical hiccups.We know about the Problem and we're working to get things back to normal quickly</p>
                        <p><Link to='/' className='btn btn-light'>Back To NotesKeeper</Link></p>
                    </div>
      </div>)
    }

    return this.props.children; 
  }
}

export default ErrorBoundary
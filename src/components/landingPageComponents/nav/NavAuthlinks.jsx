import React from 'react';
import {Link} from 'react-router-dom'

export default function NavAuthlinks(){
    return (
        <div className="navbar-nav d-flex flex-row">
                <Link className="btn btn-outline-3 mr-2 text-3 rounded px-4 fm" to='/login'>Log in</Link>
                <Link className="btn btn-3 rounded px-4 fm" to='/signup'>Sign Up</Link>
       </div>
    )
}
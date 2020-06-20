import React from 'react';
import {Link} from 'react-router-dom'

export default function NavLinkList(){
    return (
        <ul className="navbar-nav mx-auto text-dark">
                <li className="nav-item dropdown mr-4">
                    <button className="nav-link dropdown-toggle text-secondary"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dashboard
                    </button>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="nav-link text-secondary" to="/login/staff">Staff Dashboard</Link>
                        <div className='hr-3' />
                        <Link className="nav-link text-secondary" to="/login/admin">Admin Dashboard</Link>
                    </div>
                </li>
                <li className="nav-item mr-4">
                    <Link className="nav-link text-secondary" to="/about">About</Link>
                </li>
                <li className="nav-item mr-4 ">
                    <Link className="nav-link text-secondary" to="/contact">Contact</Link>
                </li>
        </ul>
    )
}
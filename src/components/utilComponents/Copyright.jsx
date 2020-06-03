import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'

export default function Copyrights(){
    return (<>
        <span>&copy; {(new Date()).getFullYear()} | <b>S</b>ales<b>I</b>con </span> 
        <a className='text-black text-decoration-none' href="https://github.com/sharvan-sharma">
            <FontAwesomeIcon icon={faGithub} className='mr-2'/>sharvan-sharma 
        </a> 
    </>)
}

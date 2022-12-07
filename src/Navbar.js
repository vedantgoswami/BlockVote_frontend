import React from 'react'
import logo from './images/logo.png';
import {Link} from 'react-router-dom';
const Navbar = ({accounts}) => {
  return (
    <nav class="navbar navbar-dark bg-dark shadow mb-5">
      <Link to="/">
        <img src={logo} width="50px" style={{marginLeft: '10px'}}/>
        </Link>
        <p className="navbar-brand my-auto" style={{marginLeft: "0px"}}>BlockVote</p>
      <ul className='navbar-nav'>
        <li className="nav-item text-white">Account Address: </li>
        <li style={{fontSize: "10px"}} className="nav-item text-white">{accounts}</li>
      </ul>
      </nav>
  )
}

export default Navbar
import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap';
import logo from '../../../Images/logo.png';
import './brand.css';
export default class Brand extends Component {

  render() {
    return (
        <div >
        <Navbar bg="light" fixed="top">
        <Navbar.Brand width="100%" height="20px">
        <img
          alt=""
          src={logo}
          width="40"
          height="40"
         
        />{' '}
        MAX BID
      </Navbar.Brand>
    
    
        </Navbar>
        </div>
    )
  }
}

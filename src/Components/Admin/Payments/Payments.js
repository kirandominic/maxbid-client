import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Table } from 'react-bootstrap';
import NavigationAdmin from '../../NavigationBar/Navadmin/NavAdmin'
import {SidebarData} from '../Sidebar'
function Payments() {
    const [listOfPayments, setPayments] =useState([
    
    ])
  let c=0;
  
    useEffect(()=>{
Axios.get("https://max-bid.herokuapp.com/getPayments").then((response)=>{
  setPayments(response.data);
})
    },[])
 

  return (
    
    <div>
      
        <div>    <NavigationAdmin/>
</div>
<div className='sidebar'>
    <ul className='sidebarlist'> 
    {SidebarData.map((val,key)=>{
    return(
      <li key={key}
      className="row"  
      id={window.location.pathname === val.link ? "active" :""}
      onClick={()=>{window.location.pathname = val.link}}>
         <div className='a'>{val.icon}</div><div className='b'> {val.title}</div>
          
          </li>
    );
})}
</ul>
</div>
       <div className='usertable'>
       <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>Payment ID</th>
      <th>User Name</th>
      <th>Product Name</th>
      <th>Amount</th>
      <th>Date</th>

    </tr>
  </thead>
  <tbody>
{listOfPayments.map((payment)=>{

  return(
    <tr>
      <td >{++c}</td>
      <td>{payment._id}</td>
      <td>{payment.username}</td>
      <td>{payment.productname}</td>
      <td>{payment.amount}</td>
      <td>{payment.date}</td>
    </tr>
  )
})}
 </tbody>
</Table>
       </div>
    </div>
  )
}

export default Payments
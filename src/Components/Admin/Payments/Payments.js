import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Table } from 'react-bootstrap';
import NavigationAdmin from '../../NavigationBar/Navadmin/NavAdmin'
import {SidebarData} from '../Sidebar'
import { ToastContainer, toast } from 'react-toastify';
function Payments() {
    const [listOfPayments, setPayments] =useState([]);
    const [currentRate, setCurrentRate] =useState(0);
    const [newRate, setNewRate] =useState(0);


  let c=0;
  
    useEffect(()=>{
Axios.get("http://localhost:3001/getPayments").then((response)=>{

  setPayments(response.data);
})
Axios.get("http://localhost:3001/getRate").then((response)=>{
  console.log(response.data);
  if(response.data.message==='fail'){
    console.log("retrieving dates error");
  }
  else{
    setCurrentRate(response.data.rate);
  }
});



    },[])
 const  updateRate=async()=>{
   if(newRate===0){
     toast("Please Enter a value for rate");
     return;
   }
   else{
     console.log(newRate);
   await Axios.post("http://localhost:3001/updateRate",{rate:newRate}).then((res,err)=>{
      if(err){
        console.log(err);

      }
      else{
        if(res.data.message === 'sucess'){
          Axios.get("http://localhost:3001/getRate").then((response)=>{
  console.log(response.data);
  if(response.data.message==='fail'){
    console.log("retrieving dates error");
  }
  else{
    setCurrentRate(response.data.rate);
  }
});
          console.log("rate updated in the db")
          toast("Rate Updated");

        }
        else if(res.data.message === 'fail')
        {
          toast("Rate Update Faied");

        }

      }
    }
   )}
 }

  return (
    
    <div>
      <ToastContainer
position="top-center"
autoClose={1000}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss={false}
draggable={false}
pauseOnHover
width={300}
/>
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
<div>
<div className='dashboard'>
<div class="top">
  <div class="components" id="c1">
    <p>Advertisement Rate/day</p>
    <div className="nb">
      <span>{currentRate}</span>
    </div>
      <input type="number"  placeholder='Update Rate' value= {newRate} onChange={((e)=>{setNewRate(e.target.value)})}/> 
    <button ype="button" className='button' onClick={updateRate}>Update Rate</button>
  </div>
</div>
</div>

</div>
       <div className='usertable'>
       <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th >#</th>
      <th>Payment ID</th>
      <th>User Name</th>
      <th>Product Name</th>
      <th>Amount</th>
      <th>Date</th>

    </tr>
  </thead>
  <tbody>
{listOfPayments && listOfPayments.map((payment)=>{

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
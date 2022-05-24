import { useState,useEffect } from 'react'

import React from 'react'
import "./adminhome.css"
import {SidebarData} from './Sidebar'
import NavigationAdmin from '../NavigationBar/Navadmin/NavAdmin'
import Axios from 'axios';
import { Link } from "react-router-dom";

function AdminHome() {
  const [userCount, setUserCount] = useState('');
  const [newUserCount, setNewUserCount] = useState('');
  const [adcount, setAdcount] = useState('');
  const [activeAdCount, setactiveAdCount] = useState('');

  const [reportcount, setReportcount] = useState('');
  const [uncheckedreportcount, setuncheckedreportcount] = useState('');
  const [promoCount, setPromoCount] = useState('');



  useEffect(()=>{ 
    const token = localStorage.getItem('token')
    console.log(token);
    if(!token){
      localStorage.removeItem('token');
      window.location.pathname = "/login";}
      Axios.get("https://max-bid.herokuapp.com/getnewusercount").then((response) => {
        // setlistOfProducts(response.data);
        //console.log(response.data);
        setNewUserCount(response.data.newusercount);
    });
      Axios.get("https://max-bid.herokuapp.com/getusercount").then((response) => {
        // setlistOfProducts(response.data);
        //console.log(response.data);
        setUserCount(response.data.usercount);
    });
    Axios.get("https://max-bid.herokuapp.com/getadcount").then((response) => {
      // setlistOfProducts(response.data);
      //console.log(response.data);
      setAdcount(response.data.adCount);
  });
  Axios.get("https://max-bid.herokuapp.com/getactiveadcount").then((response) => {
      // setlistOfProducts(response.data);
      //console.log(response.data);
      setactiveAdCount(response.data.activeAdCount);
  });
  Axios.get("https://max-bid.herokuapp.com/reportcount").then((response) => {
      // setlistOfProducts(response.data);
      console.log(response.data);
      setReportcount(response.data.reportcount);
  });
  Axios.get("https://max-bid.herokuapp.com/promocount").then((response) => {
    // setlistOfProducts(response.data);
    console.log("promo"+response.data);
    setPromoCount(response.data.promoCount);
});
  Axios.get("https://max-bid.herokuapp.com/uncheckedreportcount").then((response) => {
      // setlistOfProducts(response.data);
      console.log(response.data);
      setuncheckedreportcount(response.data.uncheckedreportcount);
  });

    
    },[])
  return (
    <div>
    <NavigationAdmin/>
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
<div className='dashboard'>
      {/* <div className='users'></div> */}
<div class="top">
  <div class="components" id="c1">
    <p>Total Users</p>
    <div class="nb">
      <span>{userCount}</span><br/>
      <Link to={`/userlist`} ><span>New Users  {newUserCount }</span></Link>

      <p></p>
    </div>
    
  </div>

    
</div>
<div class="top">
  <div class="components" id="c1">
    <p>Total Advertisements</p>
    <div class="nb">
      <span>{adcount}</span>
    </div>
    
  </div>
</div>
<div class="top">
  <div class="components" id="c1">
    <p>Active Advertisements</p>
    <div class="nb">
      <span>{activeAdCount}</span>
    </div>
    
  </div>
</div>
<div class="top">
  <div class="components" id="c1">
    <p>Promoted Advertisements</p>
    <div class="nb">
      <span>{promoCount}</span>
    </div>
    
  </div>
</div>
<div class="top">
<div class="components" id="c1">
<p>Reported Advertisements</p> 
    <div class="nb">
      <span>{reportcount}</span>
    </div>
    <p>Unchecked</p>
    <div class="nb">
    <Link to={`/reportedProducts`} > <span>{uncheckedreportcount}</span></Link>
    </div>
    
    
  </div>
 
</div>
</div>
</div>
  )
}



export default AdminHome
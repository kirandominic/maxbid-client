import { useParams } from "react-router-dom";
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Axios from 'axios';
import { Table } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

import NavUser from '../../NavigationBar/NavigationUser/NavUser';

import { useState,useEffect } from 'react'
import * as axios from 'axios';
import '../../User/AddProduct/ViewProduct/viewproduct.css';
import {useNavigate} from "react-router-dom"

function Details() {
  const navigate = useNavigate();

     const [listOfUsers, setlistOfUsers] =useState([
    
    ])
    useEffect(()=>{ 
    
      const token = localStorage.getItem('token')
      console.log(token);
      if(!token){
        localStorage.removeItem('token');
        navigate("/login");}
        else{ 
          Axios.get("https://max-bid.herokuapp.com/getUsers").then((response)=>{
            setlistOfUsers(response.data);
        });};
    
      
    
    },[navigate]);
        const [listOfBids, setlistOfbids] =useState([])
     
      let c=0;
    const [viewproductobj, setView] = useState([]);
    const  {pid}  = useParams();
    
    function checkBid(bid)
    {
      if(bid===0){
       return (<span>NO bids yet</span>);
     }
      else{
       return (<span>{bid}</span>);
 
      }
    }
    function checkstatus(status)
    {
      var name;
      var phone;
      var email;
      if(status === "none"){
       return (<span>Status : Bidding in progress</span>);
     }
     else if(status === "noBids"){
      return (<span>Status : No Bids on this product</span>);
     }
      else{
        listOfUsers.forEach(element2=>{
          
          if(element2._id === status)
          {
            
          name = element2.fname;
          phone = element2.phone;
            email = element2.email;

          }
        })
        return (<div><span>Winner Name : {name}</span><br></br><span>Phone: {phone}</span><br></br><span>Email:{email}</span></div>);

      }
    }
 
  //  function setBid(bid){
  //    bidamount = bid;
  //    console.log(bidamount);
  //  }
  
    useEffect(() => {
        const token = localStorage.getItem('token')
    console.log(token);
    if(!token){
      localStorage.removeItem('token');
      navigate("/login");}
      else{ 
         axios.post("https://max-bid.herokuapp.com/get-bids",{id:pid}).then((response)=>{
            setlistOfbids(response.data);
      });
        axios.post("https://max-bid.herokuapp.com/get-product",{id:pid}).then((response) => {
          setView(response.data);
      });
    };
  
    

      }, [pid,navigate]);
    
  return (
    
    <div>
      <Row>{<NavUser/>}</Row>
{/* <p>{pid}</p> */}
        {viewproductobj.map((value,key) =>{
            
              var url = "https://max-bid.herokuapp.com/Images/Products/" + value.image;
              return(
                <div className = "product_list1">
                  <div>
                    <img className='imagebox' width ="400px" height="400px"src={url} alt= "no product"/>

                   </div>
                   <div className = "box1">
                  <label>Product   :{value.pname}</label><br/>
                  <label>Basic Bid   :{value.bid}</label><br/>
                  <label>Location    :{value.location}</label><br/>
                  <label>Information :{value.information}</label><br/>
                  <label>Highest bid :{checkBid(value.high_bid)}</label><br></br>
                  <label>{checkstatus(value.winner)}</label>
                  </div>
                  <div className = "box2"> 
                 

        </div>
                </div>
              )
                
                
            })}
                <div className = "bidlist">
                <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>User</th>
      <th>Date</th>
      <th>Bid</th>
    </tr>
  </thead>
  <tbody>
{listOfBids.map((bids)=>{

  return(
    <tr>
      <td >{++c}</td>
      <td>{bids.name}</td>
      <td>{bids.date}</td>
      <td>{bids.bid}</td>
       </tr>
  )
})}
 </tbody>
</Table>
                </div>  


    </div>

  )
}

export default Details
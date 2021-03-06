import { useParams } from "react-router-dom";
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Axios from 'axios';
import { Table } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import NavUser from "../../../NavigationBar/NavigationUser/NavUser";
import Popup from 'reactjs-popup';


import { useState,useEffect } from 'react'
import * as axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './viewproduct.css';
function ViewProduct() {
  const { pid } = useParams();

        const [listOfBids, setlistOfbids] =useState([])
        useEffect(()=>{ 
    
          const token = localStorage.getItem('token')
          console.log(token);
          if(!token){
            localStorage.removeItem('token');
            window.location.pathname = "/login";}
            else{ 
              Axios.post("https://max-bid.herokuapp.com/get-bids",{id:pid}).then((response)=>{
                setlistOfbids(response.data);
            });};
        
          
        
        },[pid])
      let c=0;
    const [viewproductobj, setView] = useState([]);
    function checkBid(bid)
    {
      if(bid===0){
       return (<span>NO bids yet</span>);
     }
      else{
       return (<span>{bid}</span>);
 
      }
    }
   const notifybid = () => toast("Bid Placed sucessfully");
 
 var bidamount;
   function setBid(bid){
     bidamount = bid;
     console.log(bidamount);
   }
   function reportProduct()
   {
   
    var pid=localStorage.getItem("pid");
    var reason = localStorage.getItem("reason");
    var reportedProductName = localStorage.getItem("reportedProductName");

    // console.log("content in reason '"+reason+"'")
    if(localStorage.getItem("reason") === null)
    {
      alert("please provide the reason") ;
       }
       else{
    Axios.post("https://max-bid.herokuapp.com/set-reason",{id:pid,reason:reason,name:reportedProductName}).then((response)=>{
      localStorage.removeItem('reason');
      localStorage.removeItem('reportedProductName');
                reason="";
                reportedProductName="";
      toast("This Product reported successfully");

                setTimeout( function ( ) {  window.location.reload();}, 1000 ); 
                
              });
}
   }
   function setReport(reason,name){
    localStorage.setItem('reason', reason);
    localStorage.setItem('reportedProductName', name);

   }
  
    function bidSubmit(e){
      e.preventDefault();
      var pid=localStorage.getItem("pid");
      if(!bidamount){
        alert("please enter the bid amount")

      }
         else if((bidamount<1)|| (bidamount>3450000000)){
        alert("Invalid amount");
      }
      else{
 
     axios.post("https://max-bid.herokuapp.com/get-bid",{pid:pid}).then((response) => {
       if((response.data[0].bid)>(bidamount))
       {alert("amount is less than basic bid")}
       else if(response.data[0].high_bid >= bidamount){
        alert('Please enter a value greater than the highest bid') 
  //         var uid= localStorage.getItem("uid");
  //         axios.post("https://max-bid.herokuapp.com/place-bid",{bid:bidamount,uid:uid,pid:pid}).then((response) => {
  // if(response.data.bidstatus === "sucess"){
  // console.log("bid placed sucessfully")
  // notifybid()
  // window.location.reload();
  // }
  // else{
  //   toast ("Bid not added Please try again")
  // }
  //         })
  
        // }
       }
       else{
         var uid= localStorage.getItem("uid");
         axios.post("https://max-bid.herokuapp.com/place-bid",{bid:bidamount,uid:uid,pid:pid}).then((response) => {
 if(response.data.bidstatus === "sucess"){
 console.log("bid placed sucessfully")
 notifybid()
 window.location.reload();
 }
 else{
   toast ("Bid not added Please try again")
 }
         })
 
       }
     })
     
  }  } 
    useEffect(() => {
        const token = localStorage.getItem('token')
    console.log(token);
    if(!token){
      localStorage.removeItem('token');
      window.location.pathname = "/login";}
      else{ 
        axios.post("https://max-bid.herokuapp.com/get-product",{id:pid}).then((response) => {
          setView(response.data);
      });
    };
  
    

      }, [pid]);
    
  return (
     <div>
    {/* //     <p>{pid}</p> */}
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
/>
    <Row>{<NavUser/>}</Row>
        {viewproductobj.map((value,key) =>{
            
              var url = "https://max-bid.herokuapp.com/Images/Products/" + value.image;
              return(
                <div className = "product_list1">
                  <div>
                     <img className="imagebox" width ="400px" height="400px"src={url} alt="no product"/>

                   </div>
                   <h3>{value.pname}</h3>

                   <div className = "box1">
                  <label>Basic Bid   :{value.bid}</label><br/>
                  <label>Location    :{value.location}</label><br/>
                  <label>Information :{value.information}</label><br/>
                  <label>Highest bid :{checkBid(value.high_bid)}</label>
                  </div>
                  <div className = "box2"> 
                  <form onSubmit={bidSubmit}>

          <input className="input-bid" type="number" name='bid'  id="bid"  autoComplete="off" placeholder="Enter Bid Amount" onChange={(event) => {
                    setBid(Number(event.target.value));
                  }}/>
          <button className="btn btn-light bid-button"value = {value._id} onClick={(event) => {localStorage.setItem('bid', event.target.value);
                  localStorage.setItem('pid', event.target.value);

                    bidSubmit();
                  }}>Place bid</button>
                  <Popup trigger={<button type="button" className="btn btn-light button-report">Report this product</button>} 
       position="right center ">
         <div >
         <input type="text" className="input-bid"name='reason'    autoComplete="off" placeholder="Enter the reason to report" onChange={(event) => {
                    setReport(event.target.value,value.pname);
                  }}/>
         <button className="btn btn-light bid-button" value = {value._id}  onClick={(event) => {
                  localStorage.setItem('pid', event.target.value);

                  reportProduct();
                  }}>Report</button>
        
        </div>
      </Popup>
                  
                          </form>

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

export default ViewProduct
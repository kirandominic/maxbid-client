import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Row } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img1 from '../../../Images/bg3.jpg'
import img2 from '../../../Images/bg5.jpg'
import NavUser from '../../NavigationBar/NavigationUser/NavUser';
import { useState,useEffect } from 'react'
import * as axios from 'axios';
import './HomeUser.css'
import Popup from 'reactjs-popup';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import Select from 'react-select';


 function HomeUser() {
   
  const [search, setSearch] = useState(['']);
  const [category,setCategory] = useState(['']); 

  const handleInputChange = (e) => {
    console.log(e.value);

setCategory(e.value);

//console.log(category);
  }
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
   function bidSubmit(e){
    var pid=localStorage.getItem("pid");
    if(!bidamount){
      alert("please enter the amount")
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
  }
   }

  const [productList, setProductList] = useState([]);
  const options = [
    { value: '', label: 'none' },
    { value: 'electronics', label: 'electronics' },
    { value: 'antiques', label: 'antiques' },
    { value: 'collectives', label: 'Collectives' }
  ]
  useEffect(()=>{ 
    
      const token = localStorage.getItem('token')
      console.log(token);
      if(!token){
        localStorage.removeItem('token');
        window.location.pathname = "/login";}
        else{ 
          axios.get("https://max-bid.herokuapp.com/get-products").then((response) => {
            setProductList(response.data);
        });};
    
      
    
    },[])

  return (
    
    <div className='bghome'>  <Row>{<NavUser/>}</Row>
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
    <div>
    <Carousel showThumbs={false} autoPlay={true}>
        
                <div >
                    <img  height="300px" width="100%"src={img1} alt="not AVAILABLE"/>
                </div>
               
                <div>
                    <img height="300px" width="100%"src={img2} alt="no product"/>
                </div>
            </Carousel>
          <div className=" searchselect">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" onChange = {(event) => {
              setSearch(event.target.value)
            }}aria-label="Search"/>
            </div>
            <div className="filterselect">
            <Select 
      closeMenuOnSelect={true}
      options={options}
      onChange={(e)=>{handleInputChange(e)}}
    />
    </div>
            {productList.filter((val)=>{
              if(search ===""){
                return val;
              }
              else if(val.pname.toString().toLowerCase().includes(search.toString().toLowerCase())){
                return val
              }
              return false;
            }).filter((val)=>{
              if(category ===""){
                return val;
              }
              else if(val.category.toString().toLowerCase().includes(category.toString().toLowerCase())){
                return val
              }
              return false;
            }).map((value,key) =>{
              if(value.email===localStorage.getItem("email") || value.status === 'disabled')
              {}
              
              else if(value.expired==="no")
              {

              var url = "https://max-bid.herokuapp.com/Images/Products/" + value.image;
              return(
                <div className = "product_list">
                  <div className="div-img">
                  

                     <Link to={`/View-product/${value._id}`} ><img  className="imagebo" src={url}alt="no product"/></Link>

                   </div>
                   <div className= "bid-details">
                  <h3>{value.pname}</h3>
                  <label>Basic Bid   :{value.bid}</label><br/>
                  <label>Location    :{value.location}</label><br/>
                  <label>Information :{value.information}</label><br/>
                  <label>Highest bid :{checkBid(value.high_bid)}</label>
                  </div>

                  <form onSubmit={bidSubmit}>
        <div>
        <Popup  trigger={<button type="button" className="btn btn-light pop-bid-button">Bid</button>} 
        
        position="right center">
          <div className="form3" > 
          <input type="number" name='bid'  id="bid" className="form__input1" autoComplete="off" onChange={(event) => {
                    setBid(Number(event.target.value));
                  }}/>
          <button className="btn btn-light pop-bid-button" value = {value._id} onClick={(event) => {
                              localStorage.setItem('pid', event.target.value);


                    bidSubmit();
                  }}>Place bid</button>
       </div>
       </Popup> 
        </div>
        </form>
                  </div>
              )
                }
                return false;
            })}
    </div>
    </div>
  )
}

export default HomeUser
import React from 'react'
import { useState,useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img1 from '../../../Images/bg3.jpg'
import img2 from '../../../Images/bg5.jpg'
import NavUser from '../../NavigationBar/NavigationUser/NavUser';
import {  Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as axios from 'axios';
import { Link } from "react-router-dom";
import "../../HomePage/HomeUser/history.css";
function BidHistory() {
  
    const [search, setSearch] = useState(['']);

    const [allBidList, setAllBidList] = useState([]);
    const u_id = localStorage.getItem('uid');

    useEffect(()=>{ 
        const token = localStorage.getItem('token')

        console.log(token);
        if(!token){
          localStorage.removeItem('token');
          window.location.pathname = "/login";}
          else{ 
            axios.post("https://max-bid.herokuapp.com/get-bidded-products",{uid:u_id}).then((response) => {
                console.log(response.data[0]);
                setAllBidList(response.data);
          });};
      
        
        
        },[u_id])
    
  return (
    <div>
            <div className='bghome'>  <Row>{<NavUser/>}</Row>
            </div>

        <Carousel showThumbs={false} autoPlay={true}>
        
        <div>
            <img  src={img1} alt="not AVAILABLE"/>
        </div>
       
        <div>
            <img src={img2} alt="no product"/>
        </div>
    </Carousel>
    <input className="form-control mr-sm-2" type="search" placeholder="Search" onChange = {(event) => {
              setSearch(event.target.value)
            }}aria-label="Search"/>
    {allBidList.filter((val)=>{
              if(search === ""){
                return val;
              }
              else if(val.product[0].pname.toString().toLowerCase().includes(search.toString().toLowerCase())){
                return val
              }
             return false;
            }).map((value) =>{
            
                var url = "https://max-bid.herokuapp.com/Images/Products/" + value.product[0].image;
                if((value.product[0].winner===u_id) && (value.product[0].status !=='disabled')){

                    return(
                    <div className = "product_list">
                        <div className="div-img">
                      <img  className="imagebo" src={url}alt="no product"/>
                       </div>
                       <div className= "bid-details">
                      <h3>{value.product[0].pname}</h3>
                      <label>Basic Bid   :{value.product[0].bid}</label><br/>
                      <label>Your Bid   :{value.bid}</label><br/>
                      <p>You won this product</p>
                      
      
                      </div>
                    </div>
                  )}
                  
                
                else if(value.product[0].expired==='no' && value.product[0].status !=='disabled'){
                    console.log("inside if 1");
                   if(value.product[0].high_bid > value.bid){
                    console.log("inside if 2");

                    return(
                    <div className = "product_list">
                        <div className="div-img">
                      <Link to={`/View-product/${value.product[0]._id}`} ><img  className="imagebo" src={url}alt="no product"/></Link>
                       </div>
                       <div className= "bid-details">
                      <h3>{value.product[0].pname}</h3>
                      <label>Basic Bid   :{value.product[0].bid}</label><br/>
                      <label>Your Bid   :{value.bid}</label><br/>
                      <label>Highest Bid   :{value.product[0].high_bid}</label><br/>
                      <p>Highest bid changed</p>
                      <Link to={`/View-product/${value.product[0]._id}`} ><button className="input-bid">check now</button></Link>
                      
      
                      </div>
                    </div>
                  )}
                  else{
                    console.log("inside else 2");
return(
                    <div className = "product_list">
                    <div className="div-img">
                  <Link to={`/Details/${value.product[0]._id}`} ><img  className="imagebo" src={url}alt="no product"/></Link>
                   </div>
                   <div className= "bid-details">
                  <h3>{value.product[0].pname}</h3>
                  <label>Basic Bid   :{value.product[0].bid}</label><br/>
                  <label>Your Bid   :{value.bid}</label><br/>
                  <label>Highest Bid   :{value.product[0].high_bid}</label><br/>
                  <label>Location    :{value.product[0].location}</label><br/>
                  <label>Information :{value.product[0].information}</label><br/>
                  
  
                  </div>
                </div>
            )}
                }
                else if(value.product[0].expired==='yes' && value.product[0].status ==='disabled'){
                    return(
                        <div className = "product_list">
                            <div className="div-img">
                          <img  className="imagebo" src={url} alt="no product"/>
                           </div>
                           <div className= "bid-details">
                          <h3>{value.product[0].pname}</h3>
                          <span>This item is expired</span>
                          <label>Basic Bid   :{value.product[0].bid}</label><br/>
                          <label>Your Bid   :{value.bid}</label><br/>
    
                          <label>Location    :{value.product[0].location}</label><br/>
                          <label>Information :{value.product[0].information}</label><br/>
                          
          
                          </div>
                        </div>
                      )

                }
                else if(value.product[0].status ==='disabled'){
                    return(
                        <div className = "product_list wer">
                          <div ClassName="wer">
                          <img  className="imagebo" src={url} alt="no product"/>                   </div>
                          <div className= "bid-details">
                          <h3>{value.product[0].pname}</h3>
                          <label>Information :{value.product[0].information}</label><br/>
                          <span> This Item has been disabled</span>
          
                          </div>
                        </div>
                      )
                }
                return false;
                }
            )}
    </div>
  )

}

export default BidHistory
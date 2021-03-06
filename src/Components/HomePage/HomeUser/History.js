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
import "./history.css";




function History() {
  const [search, setSearch] = useState(['']);

    const [productList, setProductList] = useState([]);

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
        function checkIfPromoted(promostatus,pid){
          if(promostatus ==='inactive'){
            return(
              <Link to={`/promoteProduct/${pid}`} ><button type="button" className="btn btn-warning">Promote This Product</button></Link>
              )
            
          }
          else if(promostatus ==='active'){
            return(<button type="button" className="btn btn-success">Promoted</button>)

          }
        }
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
    {productList.filter((val)=>{
              if(search ===""){
                return val;
              }
              else if(val.pname.toString().toLowerCase().includes(search.toString().toLowerCase())){
                return val
              }
              return false;
            }).map((value,key) =>{
           
              
        if(value.email === localStorage.getItem('email')){
            
            var url = "https://max-bid.herokuapp.com/Images/Products/" + value.image;
            if(value.status === 'disabled')
            {
              return(
                <div className = "product_list wer">
                  <div ClassName="wer">
                  <img  className="imagebo" src={url} alt="no product"/>                   </div>
                  <div className= "bid-details">
                  <h3>{value.pname}</h3>
                  <label>Information :{value.information}</label><br/>
                  <span> This Item has been disabled</span>
  
                  </div>
                </div>
              )

            }
            else if(value.status !== 'disabled' && value.expired === 'yes'&& value.winner !== 'none'){
              return(
                <div className = "product_list">
                  <div>
                  <Link to={`/Details/${value._id}`} ><img ClassName='imagebox' width ="400px" height="400px"src={url} alt= "no product"/></Link>
                   </div>
                   <div>
                  <label>Product   :{value.pname}</label><br/>
                  <label>Basic Bid   :{value.bid}</label><br/>
                  <label>Location    :{value.location}</label><br/>
                  <label>Information :{value.information}</label><br/>
                  <label>This item has expired click the image to view the details</label><br/>

                  
  
                  </div>
                </div>
              )

            }
            else if (value.status !== 'disabled' && value.expired === 'no'){
              var pid = value._id;
            return(
              <div className = "product_list">
                  <div className="div-img">
                <Link to={`/Details/${value._id}`} ><img  className="imagebo" src={url} alt="no product"/></Link>
                 </div>
                 <div className= "bid-details">
                <h3>{value.pname}</h3>
                <label>Basic Bid   :{value.bid}</label><br/>
                <label>Location    :{value.location}</label><br/>
                <label>Information :{value.information}</label><br/>
{checkIfPromoted(value.promostatus,pid)}
                

                </div>
              </div>
            )
            }
            
            else{
              return(
                <div className = "product_list">
                  <div>
                  <Link to={`/Details/${value._id}`} ><img ClassName='imagebox' width ="400px" height="400px"src={url} alt= "no product"/></Link>
                   </div>
                   <div>
                  <label>Product   :{value.pname}</label><br/>
                  <label>Basic Bid   :{value.bid}</label><br/>
                  <label>Location    :{value.location}</label><br/>
                  <label>Information :{value.information}</label><br/>
                  
  
                  </div>
                </div>
              )

            }
        }
            return false;     
                }
            )}
    </div>
  )
}

export default History
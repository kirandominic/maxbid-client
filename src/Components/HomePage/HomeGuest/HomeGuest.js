import React from 'react'
import NavHomeGuest from '../../NavigationBar/Navigation_Home_Guest/NavHomeGuest'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img1 from '../../../Images/bg3.jpg'
import img2 from '../../../Images/bg5.jpg'
import { useState,useEffect } from 'react'
import * as axios from 'axios';


function HomeGuest() {
  const [search, setSearch] = useState(['']);

  const [productList, setProductList] = useState([]);

  useEffect(()=>{ 
  
    
     
        axios.get("https://max-bid.herokuapp.com/get-products").then((response) => {
          setProductList(response.data);
      });
  
    
  
  },[])
   
  return (
    <div className='bg'>      <Row>{<NavHomeGuest/>}</Row>
    <div>
    <Carousel showThumbs={false} autoPlay={true}>
        
                <div>
                    <img height="300px" width="100%" src={img1} alt="not AVAILABLE"/>
                </div>
                <div>
                    <img alt="product not available"height="300px" width="100%"src={img2} />
                </div>
                
            </Carousel>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" onChange = {(event) => {
              setSearch(event.target.value)
            }}aria-label="Search"/>
            {productList.filter((val)=>{
              if(search === ""){
                return val;
              }
              else if(val.pname.includes(search)){
                return val
              }
              return false;
            }).map((value,key) =>{
            
              if(value.expired==="no" && value.status === 'disabled')
              {

              var url = "https://max-bid.herokuapp.com/Images/Products/" + value.image;
              return(
                <div className = "product_list">

                  <div className="div-img">
                  
                  <img  className="imagebo" alt="no product"src={url}/>

                   </div>
                   <div className= "bid-details">
                  <h3>{value.pname}</h3>
                  <label>Basic Bid   :{value.bid}</label><br/>
                  <label>Location    :{value.location}</label><br/>
                  <label>Information :{value.information}</label><br/>
                  <label>Highest bid :{value.high_bid}</label>
            

                  </div>
                </div>
                
              )
                
                }

                return false;

            })}
    </div>
    </div>
  )
}

export default HomeGuest
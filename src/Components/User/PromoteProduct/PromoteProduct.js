import React from 'react'
import { Row } from 'react-bootstrap';
import NavUser from '../../NavigationBar/NavigationUser/NavUser';
import GooglePayButton from '@google-pay/button-react';
import "./promoteproduct.css"
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom"

import { useState,useEffect } from 'react'
import * as axios from 'axios';

function PromoteProduct() {

  
  const  {pid}  = useParams();
  const navigate = useNavigate();

  const [viewproductobj, setView] = useState([]);
  const [totalcost, setCost] = useState(0);
  const [days, setDays] = useState();
  const [billid2, setBillId] = useState('');
var daysRemaining;
  useEffect(() => {
    const token = localStorage.getItem('token')
console.log(token);
if(!token){
  localStorage.removeItem('token');
  navigate("/login");}
  else{ 
    axios.post("https://max-bid.herokuapp.com/get-product",{id:pid}).then((response) => {
      console.log(response.data[0]);
      if(response.data[0].promostatus==='active' ){
        alert("Product is already promoted");
        navigate("/history");;
      }
      else{
      setView(response.data);
      }
  });
};



  }, [pid]);
  function checkBid(bid)
  {
    if(bid===0){
     return (<span>NO bids yet</span>);
   }
    else{
     return (<span>{bid}</span>);

    }
  }
  function daysremainig(date3){
    var date1 = new Date(date3);
    var date2 = new Date();
    // To calculate the time difference of two dates
    var Difference_In_Time = date1.getTime() - date2.getTime();
    // To calculate the no. of days between two dates
    var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
    daysRemaining = Difference_In_Days;
    localStorage.setItem('daysRemaining',daysRemaining);
  }
 function calculateCost(event,inputdays){
   event.preventDefault();
  setDays(inputdays);
  console.log(days);
   if(!inputdays){
     setDays(0);
     setCost(0);
   }
   else{
     var remainingDays = localStorage.getItem('daysRemaining');
     if(days>=remainingDays){
       console.log("inside if");
       alert("Your Product is only valid for "+remainingDays +" days. Please Enter valid number of days." );
       setDays(0);
       setCost(0);
     }
     else{
      console.log("inside else");
       var cost = inputdays * 12;
       setCost(cost);
     }
   }
 }
 function UpdateProductPromotion(){
   var uid = localStorage.getItem('uid');

   axios.post("https://max-bid.herokuapp.com/addpayment",{pid:pid,uid:uid,amount:totalcost,days:days}).then((response) =>{
     console.log(response.data);
  if(response.data.write_status==='success'){
   // console.log(response.data);
    //console.log("payment added successfully");
    console.log(response.data.BillId);
    const billid1 = (response.data.BillId);
    setBillId(billid1);
    console.log(billid2);
    alert("Payment was successful and the product is promoted.");


    
           
    navigate(`/bill/${billid1}`);

  }
  else if(response.data.write_status==='fail'){
    console.log("payment writing failed");

  }
   })
  
 }
 function paymentbuttons(){
   if(totalcost > 0 ){
     return(<div className="googlebutton">
     <GooglePayButton
       environment="TEST"
       paymentRequest={{
         apiVersion: 2,
         apiVersionMinor: 0,
         allowedPaymentMethods: [
           {
             type: 'CARD',
             parameters: {
               allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
               allowedCardNetworks: ['MASTERCARD', 'VISA'],
             },
             tokenizationSpecification: {
               type: 'PAYMENT_GATEWAY',
               parameters: {
                 gateway: 'example',
                 gatewayMerchantId: 'exampleGatewayMerchantId',
               },
             },
           },
         ],
         merchantInfo: {
           merchantId: '12345678901234567890',
           merchantName: 'Maxbid Admin',
         },
         transactionInfo: {
           totalPriceStatus: 'FINAL',
           totalPriceLabel: 'Total',
           totalPrice: String(totalcost),
           currencyCode: 'INR',
           countryCode: 'IN',
         },
         callbackIntents: [ 'PAYMENT_AUTHORIZATION'],
       }}
       onLoadPaymentData={paymentRequest => {
         console.log('Success', paymentRequest);
         UpdateProductPromotion();


       }}
       onPaymentAuthorized={paymentData => {
           console.log('Payment Authorised Success', paymentData)
           return { transactionState: 'SUCCESS'}
         }
       }
   
       existingPaymentMethodRequired='false'
       buttonColor='white'
       buttonType='pay'
     />
     </div>)
   }
 }
  return (

    
    <div >
       <Row>{<NavUser/>}</Row>
      <hr />
      

<body>



</body>
      <div className="paymentbox">
      {viewproductobj.map((value,key) =>{
            
            var url = "https://max-bid.herokuapp.com/Images/Products/" + value.image;
            return(
              <div className = "card-container">
                <div >
                  <img  className="imagebo" src={url} alt="no product"/>

                 </div>
                 <div > 
                <h1>{value.pname}</h1>
                <div className="details">
                <p className="price">Basic Bid   :{value.bid}</p>
                <p>Location    :{value.location}</p>
                <p>Information :{value.information}</p>
                <p>Highest bid :{checkBid(value.high_bid)}</p>
                {daysremainig(value.date)}
                </div>
                </div>
                <div className = "box2"> 
               

      </div>
              </div>
            )
              
              
          })}
<div className="payment card-container">
      <p for="rate" >Rate per day: 12 rupees</p>
      <p for="rate" >     Remaining Days {daysRemaining}</p>

      <input type="number"  placeholder="Number of Days" value = {Number(days)}className="days" min ="1"onChange={(event) => {
                  
                    calculateCost(event,event.target.valueAsNumber);
                  }}></input>
      <p for="cost">Total Cost  {totalcost}</p>
      {paymentbuttons()}

      </div>

      
      </div>
      </div>
  )
}

export default PromoteProduct
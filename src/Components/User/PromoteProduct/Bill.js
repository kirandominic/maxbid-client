import React from 'react'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react'
import * as axios from 'axios';

function Bill() {
 
    const [viewbillobj,setBill] =useState([]);


    const {bid} =useParams();

    
    // const [uid, setUid] = useState('');

    // const [pid, setPid] = useState('');
    console.log("bid  "+bid)
//  async function getproduct(){

//     await axios.post("https://max-bid.herokuapp.com/get-product",{id:pid}).then((response) => {
//         if(!response.data){
//          console.log("Product not found");
//         }
//         else{
//         // localStorage.setItem("billproductname",response.data[0].pname);
//         setView(response.data);

//         }
//     });
  

// }
// async function getuser(){
//    await axios.post("https://max-bid.herokuapp.com/get-user",{uid:uid}).then((response) => {
//         if(!response.data){
//          console.log("user not found");
//         }
//         else{
//             // localStorage.setItem("billusername",response.data[0].fname);

//          setUser(response.data[0]);

        
//         }
//     });
// }
    useEffect(() => {

    const token = localStorage.getItem('token')
    console.log(token);
    if(!token){
      localStorage.removeItem('token');
      window.location.pathname = "/login";}
      else{ 
        
         axios.post("https://max-bid.herokuapp.com/get-bill",{bid:bid}).then((response) => {
            console.log(response.data[0]);
        
          setBill(response.data);
  

      });
    };
    
    
    
      }, [bid]);
  return (
      
    <div className="bill"><br/><br/><br/><br/><br/><br/>
      <div>
        <p>Thank you for shopping with us</p>
        <p>We have recieved your Payment and the product will be promoted </p>

      <table>
      {viewbillobj.map(function(product) {
          return(

              <div>
                    <tr><td><h3>Bill ID</h3></td><td><h3>:{product._id}</h3></td></tr><br/><br/>

                  <tr><td>Customer Name</td><td>:  {product.username}</td></tr><br/>
                  <tr><td>Product Name</td><td>:   {product.productname}</td></tr><br/>
                  <tr><td><h4>Amount</h4></td><td><h4>:   RS {product.amount}</h4></td></tr>


</div> )
      })}
      </table>
      
      </div>
        <div className = "noprint">
        <br/><br/> <button className="input-bid" onClick={()=>{window.print();}}>print</button> <br/><br/>
              
              <button className="input-bid"><a href="/history" >goback</a></button>
    
              </div>

    </div>

  )
}

export default Bill
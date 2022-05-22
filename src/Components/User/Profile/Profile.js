import React from 'react'
import NavUser from '../../NavigationBar/NavigationUser/NavUser';
import "./profile.css";
import Axios from 'axios';
import { useState,useEffect } from 'react'
import profile from "../../../Images/profile.png";
import * as axios from 'axios';
import Popup from 'reactjs-popup';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"

const profileimg = localStorage.getItem('profile');
const uid = localStorage.getItem('uid');




var profileurl = "https://max-bid.herokuapp.com/Images/UserDocuments/" + profileimg;

function Profile() {
    const navigate = useNavigate();

    const [promoCount, setPromoCount] = useState('');
    const [activeAdCount, setactiveAdCount] = useState('');
    const [adcount, setAdcount] = useState('');
    const [user, setUser] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newpassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const email = localStorage.getItem('email');

    useEffect(()=>{ 
        const token = localStorage.getItem('token')
        console.log(token);
        if(!token){
          localStorage.removeItem('token');
          navigate("/login");
        }
          
         Axios.post("https://max-bid.herokuapp.com/getadcount",{email:email}).then((response) => {
          // setlistOfProducts(response.data);
          //console.log(response.data);
          setAdcount(response.data.adCount);
      });
       Axios.post("https://max-bid.herokuapp.com/getactiveadcount",{email:email}).then((response) => {
          // setlistOfProducts(response.data);
          //console.log(response.data);
          setactiveAdCount(response.data.activeAdCount);
      });

       Axios.post("https://max-bid.herokuapp.com/promocount",{email:email}).then((response) => {
        // setlistOfProducts(response.data);
        //console.log("promo"+response.data);
        setPromoCount(response.data.promoCount);
    });   
     Axios.post("https://max-bid.herokuapp.com/get-user",{uid:uid}).then((response) => {
         console.log("promo"+ response.data[0]);

        setUser(response.data[0]);
        setFname(response.data[0].fname);
        setLname(response.data[0].lname);
        setPhone(response.data[0].phone);
        setAddress(response.data[0].address);
    }); 
        },[email,navigate])


    
        const onSubmit1=async ()=>{
        const uid = localStorage.getItem('uid');
      const formData = new FormData();
      formData.append("uid",uid);
      formData.append("fname",fname);
      formData.append("lname",lname);
      formData.append("phone",phone);
      formData.append("address",address);
      axios.post('https://max-bid.herokuapp.com/updateUsers',formData).then((response)=>{
       // console.log(response);
        if(response.data.error_status==='fail')
        { 
          alert ("This email is already signed");
        }
        else{
            toast ("profile updated");
            navigate("/profile");
        }
    });
}
    const onSubmitPassword=async ()=>{
        if(!currentPassword){
            toast ("Current Password is required");
        }
        else if(!newpassword1){
            toast ("New Password is required");
        }
        else if(!newPassword2){
            toast ("Confirm Password is required");
        }
        else{
            if(newpassword1!==newPassword2){
                toast ("Passwords Doesn't match");
            }
            else if(newpassword1===newPassword2){

        await axios.post('https://max-bid.herokuapp.com/checkpassword',{email:email,password:currentPassword}).then(async(response) => {
            if(response.data.checkPassword==="success"){    
                await axios.post('https://max-bid.herokuapp.com/updatepassword',{email:email,password:newpassword1}).then((response) => {

                    if(response.data.updatePassword==="success"){ toast("Password sucessfully updated");window.location.reload();}
                })

            }
            else if(response.data.checkPassword==="fail") {
                toast("Current password is wrong");
            }
            console.log(Response.data);
            
        })
    }
    }

    }
    
  

  return (
   <div>      <ToastContainer
   position="top-center"
   hideProgressBar
   autoClose={1000}

   newestOnTop={false}
   rtl={false}
   pauseOnFocusLoss={false}
   draggable={false}
   pauseOnHover
   width={300}
   />
       <div><NavUser></NavUser></div>  
       <div className="profile-box">
                <div class="profile block"></div>
                    <div class="profile-picture big-profile-picture clear">
                        <img width="150px" alt={profile} src={profileurl} />
                    </div>
                    <h1 class="user-name">{user.fname}</h1>
                        <div class="profile-description">
                        <p>Phone Number {user.phone}</p>
                        <p>Email        {user.email}</p>
                        <p>Address        {user.address}</p>
                        </div>
                        <Popup trigger={<button type="button" className="btn btn-light button-report">Update Details</button>} 
       position="right center ">
           <div className="updateform">
      <form>

<div className="input1">   
  <input type="text" name='fname' value={fname} id="fname" onChange={(e)=>{setFname(e.target.value)}}className="form__input" autoComplete="off" placeholder=" "/>
  <label htmlFor="lname" className="form__label">First Name</label>
</div>
<div className="input1">   
  <input type="text" name='lname'  value={lname} id="lname" onChange={(e)=>{setLname(e.target.value)}}className="form__input" autoComplete="off" placeholder=" "/>
  <label htmlFor="lname" className="form__label">Last Name</label>
</div>

<div className="input1">
  <input type="text" name='phone'  id="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}}className="form__input" autoComplete="off" placeholder=" "/>
  <label htmlFor="phone" className="form__label">Phone Number</label>
</div>

<div className="input1">
<input type="text" name='address' id="address" value={address} onChange={(e)=>{setAddress(e.target.value)}}className="form__input" autoComplete="off" placeholder=" "/>
<label htmlFor="address" className="form__label">Address</label>
</div>

<div className="wrap">
  <button className="button" onClick={onSubmit1} >Submit</button>
</div>
</form>
</div>
      </Popup>
      <Popup trigger={<button type="button" className="btn btn-light button-report" >Change Password</button>} 
       position="right center ">
           <div className="updateform">

      <div className="input1">
        <input type="password"name='currentPassword'  id="currentPassword" className="form__input" onChange={(e)=>{setCurrentPassword(e.target.value)}} autoComplete="off" placeholder=" "/>
        <label htmlFor="currentPassword" className="form__label">Current Password</label>
        </div>

      <div className="input1">
        <input type="password"name='password'  id="password" className="form__input"  onChange={(e)=>{setNewPassword1(e.target.value)}}autoComplete="off" placeholder=" "/>
        <label htmlFor="password" className="form__label">New Password</label>
        </div>
        
        <div className="input1">
        <input type="password" name='cpassword' id="cpassword" className="form__input" onChange={(e)=>{setNewPassword2(e.target.value)}} autoComplete="off" placeholder=" "/>
        <label htmlFor="cpassword" className="form__label">Confirm Password</label>
        </div>

<div className="wrap">
  <button className="button" type='submit' onClick={onSubmitPassword}>Submit</button>
</div>
</div>
      </Popup>
                </div>
                <div>
 
                </div>
<div class="top1">
    <div className="title"><div class="components-user">
        <p>Total Advertisements</p>
    </div>
    </div>
    <p class="price">
        <span>{adcount}</span>
    </p>
</div>
<div class="top1">
    <div className="title"><div class="components-user">
        <p>Active Advertisements</p>
    </div>
    </div>
    <p class="price">
        <span>{activeAdCount}</span>
    </p>
</div>
<div class="top1">
    <div className="title"><div class="components-user">
        <p>Promoted Advertisements</p>
    </div>
    </div>
    <p class="price">
        <span>{promoCount}</span>
    </p>
</div>
{/* <div class="top1">
    <div className="title"><div class="components-user">
        <p>Total Advertisements</p>
    </div>
    </div>
    <p class="price">
        <span>99</span>
    </p>
</div> */}

</div>
  )

  
}

export default Profile
import * as axios from 'axios';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useState} from 'react';
import {useNavigate,} from "react-router-dom"
import NavigationLogin from '../NavigationBar/Navigation_Login/NavigationLogin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  // const notify = () => toast("Welcome to MAX-Bid");
  const formik = useFormik({
    initialValues:{
      password:'',
      confirmpassword:'',
      otp:'',

    },
    validationSchema : yup.object({ 
      password : yup.string().max(20,'Password Should not exceed 20 Characters').required('Please provide the Password').min(8,'Password must contain atleast 8 characters'),
      confirmpassword : yup.string().max(20,'Password Should not exceed 20 Characters').required('Please provide the Password').min(8,'Password must contain atleast 8 characters'),
otp:yup.number('Enter Numeric Values'),
    }),
    onSubmit:values=>{
      axios.post('http://localhost:3001/changepassword',{

          email:email,
          password:values.password,
          otp:values.otp
          
         }).then((response)=>{
           //console.log(response);
           localStorage.clear();
           if(response.data.message==='Invalid OTP'){
            toast.error("Invalid OTP");

          }
           if(response.data.status==="admin")
           {
            
            localStorage.setItem('token', response.data.user);
            localStorage.setItem('uid', response.data.id);
            toast("Welcome "+response.data.fname)


            setTimeout( function ( ) {  window.location.pathname = "/AdminHome"; }, 1000 );  ;
           }
           else if(response.data.login_status==="success")
           {
            
             localStorage.setItem('status', response.data.status);
             

             if(localStorage.getItem('status')==='un_approved')
             {
              navigate("/Home-Guest")
            }
             else if(response.data.user){
                
                localStorage.setItem('token', response.data.user);
                localStorage.setItem('email', values.email);
                localStorage.setItem('uid', response.data.id);
                localStorage.setItem('profile', response.data.profile);
                toast("Welcome "+response.data.fname )
                setTimeout( function ( ) {                navigate("/Home")
              }, 1000 );  ;
             }

           }
           else if(response.data.login_status==="fail")
           {
            //alert(response.data.login_status);
             alert("Username/Password is incorrect");
           }
       });
    }
  })
  function getotp()
  {
      console.log(email);
      if(email ===''){
          toast.error("Email is Required");
      }
      else
      {
      try {
          axios.post('http://localhost:3001/forgotcheck',{email:email}).then((res=>{
              console.log(res);
              if(res.data.message==='Email not Registered'){
                  toast.error('Email not Registered');
  
              }
              else{
                toast('OTP Send to Registered Email');

              }
          }));
  
      } catch (err) {
        toast.error(err);
      }
  
      }
  }


  return (
    <div >
      <NavigationLogin/>
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
width={300}
/>
        <div className="note">
          <p>Login now on Max-Bid</p>
        </div>
        <div className="form1" >
        <form onSubmit={formik.handleSubmit}>

        <div className="input1">
        <input type="text" name='email'{...formik.getFieldProps("email")} id="email" className="form__input" autoComplete="off" placeholder=" " value={email}onChange={(e) => {setEmail(e.target.value)}}/>
        {formik.touched.email && formik.errors.email ? <span style={{color:'red'}}>{formik.errors.email}</span> : null}
        <label htmlFor="email" className="form__label">Email</label>
        </div>

        <button  className="button" type="button" onClick={() => {getotp()}}>Get OTP</button>

        <div className="input1">
        <input type="number"name='otp' {...formik.getFieldProps("otp")} id="otp" className="form__input" autoComplete="off" placeholder=" "/>
        {formik.touched.otp && formik.errors.otp ? <span style={{color:'red'}}>{formik.otp}</span> : null}
        <label htmlFor="otp" className="form__label">OTP</label>
        </div>



        <div className="input1">
        <input type="password"name='password' {...formik.getFieldProps("password")} id="password" className="form__input" autoComplete="off" placeholder=" "/>
        {formik.touched.password && formik.errors.password ? <span style={{color:'red'}}>{formik.errors.password}</span> : null}
        <label htmlFor="password" className="form__label">Password</label>
        </div>
        
        <div className="input1">
        <input type="password"name='confirmpassword' {...formik.getFieldProps("confirmpassword")} id="confirmpassword" className="form__input" autoComplete="off" placeholder=" "/>
        {formik.touched.confirmpassword && formik.errors.confirmpassword ? <span style={{color:'red'}}>{formik.errors.confirmpassword}</span> : null}
        <label htmlFor="confirmpassword" className="form__label">Confirm Password</label>
        </div>

        <div className="wrap">
          <button className="button" type='submit'>Login</button>
        </div>
        </form>
      </div>
      </div>
  )
}

export default ForgotPassword
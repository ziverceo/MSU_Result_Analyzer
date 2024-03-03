import React, { useState } from 'react'
import {toast, Toaster} from 'react-hot-toast';
import logocircle from '../assets/icons/ZiverCircle.png';
import { Link, useNavigate } from 'react-router-dom';
import { CgSpinnerTwo } from "react-icons/cg";
import { db , auth } from '../firebase/Firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {doc,getDoc} from 'firebase/firestore';
import {ResendOTP} from "otp-input-react"
import Cookies from 'js-cookie';



const StudLogin = () => {
  const [Loading,setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [ph,setPh] = useState('');
  const [otp,setOtp] = useState('');
  const [user, setUser] = useState(null);

  const [Uname , setUname] = useState('');
  const [college , setCollege] = useState('');
  const [roll,setRoll] = useState('');

  const Navigate = useNavigate();
  const StudDept = ()=> {
    Navigate('/StudDept');
  }

  const FetchUserData = async() => {
    await getDoc(doc(db , 'StudentData',ph))
    .then((docSnap) => {
      let usr = docSnap.data().username;
      let clg = docSnap.data().college;
      let rol = docSnap.data().roll;
      setUname(usr);
      setCollege(clg);
      setRoll(rol);
    })
  }

const checknewuser = async() => {
  try 
  {
    setLoading(true);
    const docRef = doc(db,'StudentData',ph);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
      FetchUserData();
      SendOTP();
    } else {
      toast.error('No user found! Create new account'); 
      setLoading(false)
    }
  } 
  catch (error) 
  {
    toast.error('error checking user...');
    setLoading(false);
    console.log(error);
  }
}

const SendOTP = async() => {
  try {
    const formatPh = "+91" + ph;
    const recaptcha =  new RecaptchaVerifier(auth,"recaptcha-container",{'size':'invisible'})
    const confirmation = await signInWithPhoneNumber(auth,formatPh,recaptcha)
    setUser(confirmation)
    toast.success('OTP send sucessfully');
    setShowOTP(true);
    setLoading(false);
  } catch (error) {
    console.error(error)
  }

}

const verifyOTP = async() => {
    try {
      setLoading(true);
      await user.confirm(otp);
      setLoading(false);
      toast.success('Login successfull');
      Cookies.set('MSU_name',Uname);
      Cookies.set('MSU_college',college);
      Cookies.set('MSU_Roll',roll);
      Cookies.set('user','Stud');
      StudDept();
    } 
    catch (error) {
      console.log(error);
      setLoading(false);
    }
}
  
  return (
    <div className='w-11/12 md:w-2/5 h-auto mx-auto mt-24 md:mt-44 items-center flex flex-col md:justify-center gap-10 bg-gradient-to-b from-white/10 to-white/80 rounded-md drop-shadow-2xl py-10 overflow-hidden'>
      <Toaster toastOptions={{ duration: 1000 }} />
      <div id="recaptcha-container"></div>
      <div className='flex flex-col items-center gap-3'>
          <img className='size-16 md:size-24' src={logocircle}  alt="" />
          <p className='text-white md:text-lg font-audiowide'>Student Login</p>
      </div>
      <div className='w-full flex flex-col items-center gap-3'>
        <input value={ph} onChange={(e) => setPh(e.target.value)} className='w-4/5 md:w-1/2 md:h-12 h-10 rounded-md drop-shadow-xl px-3 placeholder:text-gray-500' type="number" placeholder='Enter Your mobile number' required />
        {showOTP ? (
                    <>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} className='w-4/5 h-10 md:w-1/2 md:h-12 rounded-md drop-shadow-xl px-3' type="number" placeholder='Enter OTP' />
                        <div className='w-1/2 text-white font-audiowide'>
                        <ResendOTP />
                        </div>
                        <button onClick={verifyOTP} className='w-4/5 md:w-1/2 md:h-12 h-10 flex items-center justify-center gap-3 rounded-md drop-shadow-xl bg-primary text-white font-audiowide text-sm active:scale-95 ease-in-out duration-100'>
                            {Loading && 
                                <CgSpinnerTwo className='animate-spin' size={20} />
                            }
                            <span>Verify OTP</span>
                        </button>
                    </>
                ):(
                    <button onClick={checknewuser} className='w-4/5 h-10 md:w-1/2 md:h-12 flex items-center justify-center gap-3 rounded-md drop-shadow-xl bg-primary text-white font-audiowide text-sm active:scale-95 ease-in-out duration-100'>
                        {Loading && 
                            <CgSpinnerTwo className='animate-spin' size={20} /> 
                        }
                        <span>Send OTP</span>
                    </button>
                    
                )}
                <p className='font-audiowide text-sm text-primary'>or</p>
                <p className='absolute bottom-3 font-audiowide text-primary text-xs'>New to MSU Result Scraper ? <span> <Link className='hover:underline' to='/StudentRegister' >Sign Up</Link></span></p>
      </div>
    </div>
  )
}

export default StudLogin

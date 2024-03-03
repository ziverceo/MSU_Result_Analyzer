import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logocircle from '../assets/icons/ZiverCircle.png';
import { Link } from 'react-router-dom';
import { CgSpinnerTwo } from "react-icons/cg";
import {toast, Toaster} from 'react-hot-toast';
import { db , auth } from '../firebase/Firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {doc,setDoc,getDoc} from 'firebase/firestore';
import {ResendOTP} from "otp-input-react"
import Cookies from 'js-cookie';




const StudentRegister = () => {
    const [Loading,setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);


    const [name, setName] = useState('');
    const [regNo, setRegNo] = useState('');
    const [otp,setOtp] = useState('');
    const [ph,setPh] = useState('');
    const [college,setCollege] = useState('');

    const Navigate = useNavigate();
    

    const StudDept = ()=> {
      Navigate('/StudDept');
    }

    useEffect(() => {
      const Token = Cookies.get('MSU_name')
      if(Token){
        StudDept();
      }
    });

    const Home = () => {
      Navigate('/');
    }


    

    const HandleSubmit = async() => {
      await setDoc(doc(db,"StudentData",ph),{
          username:name,
          roll:regNo,
          phone:ph,
          college:college
      });
      toast.success("Account Created Sucessfully");
      Cookies.set('MSU_name',name);
      Cookies.set('MSU_college',college);
      Cookies.set('MSU_Roll',regNo);
      Cookies.set('user','Stud');
      StudDept();
      setName('');
      setRegNo('');
      setCollege('');
      setPh('');
      StudDept();
  }

  const checknewuser = async() => {
    try 
    {
      setLoading(true);
      const docRef = doc(db,'StudentData',ph);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        toast.error('User already found...'); 
        setLoading(false)
      } else {
        SendOTP();
      }
    } 
    catch (error) 
    {
      toast.error('error checking user...');
      setLoading(false)
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
        setLoading(false)
        HandleSubmit();
      } 
      catch (error) {
        console.log(error);
        setLoading(false);
      }
  }


  return (
    <div className='w-full h-full'>
        <div className='w-11/12 md:w-2/5 h-auto mx-auto mt-12 md:mt-32 items-center flex flex-col md:justify-center gap-10 bg-gradient-to-b from-white/10 to-white/80 rounded-md drop-shadow-2xl py-10 overflow-hidden'>
        <Toaster toastOptions={{ duration: 1000 }} />
        <div id="recaptcha-container"></div>
            <div className='flex flex-col items-center gap-3'>
                <img className='size-16 md:size-24' src={logocircle}  alt="" />
                <p className='text-white md:text-lg font-audiowide'>Student Register</p>
            </div>
            <div className='w-full flex flex-col items-center gap-3'>
                <input value={name} onChange={(e) => setName(e.target.value)} className='w-4/5 md:w-1/2 md:h-12 h-10 rounded-md drop-shadow-xl px-3 focus:ring-primary placeholder:text-gray-500' type="text" placeholder='Enter Username' />
                <input value={regNo} onChange={(e) => setRegNo(e.target.value)} className='w-4/5 md:w-1/2 md:h-12 h-10 rounded-md drop-shadow-xl px-3 focus:ring-primary placeholder:text-gray-500' type="number" placeholder='Enter Msu Register number' />
                <select value={college} onChange={(e) => setCollege(e.target.value)} id="college" class="w-4/5 md:w-1/2 md:h-12 h-10 bg-white text-gray-500 text-mg rounded-lg px-2">
                  <option selected>Choose your college</option>
                  <option value="Merit college of Arts and science">Merit college</option>
                  <option value="Sri paramakalyani college of Arts and science">Paramakalyani college</option>
                  <option value="Ambai arts college">Ambai Arts college</option>
                  <option value="Tiruvalluvar college">Tiruvalluvar college</option>
                </select>
                <input value={ph} onChange={(e) => setPh(e.target.value)} className='w-4/5 md:w-1/2 md:h-12 h-10 rounded-md drop-shadow-xl px-3 placeholder:text-gray-500' type="number" placeholder='Enter Your mobile number' />
    
                {showOTP ? (
                    <>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} className='w-4/5 h-10 md:w-1/2 md:h-12 rounded-md drop-shadow-xl px-3' type="number" placeholder='Enter OTP' />
                        <div className='w-1/2 text-white font-audiowide'>
                          <ResendOTP onResendClick={SendOTP} />
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
            </div>
            <p className='absolute bottom-3 font-audiowide text-primary text-xs'>Already have an Account ? <span> <Link className='hover:underline' to='/StudLogin' >LogIn</Link></span></p>
        </div>
    </div>
  )
}

export default StudentRegister

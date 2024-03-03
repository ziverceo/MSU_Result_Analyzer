import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './styles/Home.css'
import banner from '../assets/images/banner_img.png'
import light from '../assets/images/light.svg'
import design1 from '../assets/images/des1.svg'
import design2 from '../assets/images/des2.svg'
import { AnimatePresence,motion } from "framer-motion"
import { RiArrowRightDoubleFill } from "react-icons/ri";
import Cookies from 'js-cookie';





const Home = () => {

  const [arrow1,arrow1Open] = useState(false);
  const [arrow2,arrow2Open] = useState(false);
  const [user,setUser] = useState(false);
  


  const btn1Hover = () => {
    arrow1Open(!arrow1);
  }
  const btn2Hover = () => {
    arrow2Open(!arrow2);
  }

  const Navigate = useNavigate();

  const UserSelection = () => {
    Navigate('/UserSelection');
  }

  const studentLogin = () => {
    Navigate('/StudLogin');
  }


  useEffect(()=> {
    const Token = Cookies.get('user')
    if(Token){
      setUser(true)
    }
    else{
      setUser(false)
    }
  })


  const dashboard_navigate = ()=> {
  if(Token != null){
    if(Token == 'Prof'){
      ProfDept();
    }
    else if(Token == 'Stud'){
      StudDept();
    }
    else{
      alert("Invalid user type!")
    }
  }
 }


  
  
  return (
    <div>

      {/* heading and nav */}
      <div className='container mx-auto w-11/12 font-audiowide flex flex-col gap-8 md:gap-5 text-white mt-36 md:mt-16 drop-shadow-xl z-0'>
        <div className='w-full flex items-center justify-center'>
          <p className='text-sm md:text-xl drop-shadow-xl'>Tired of handling Result Data ?</p>
        </div>
        <div className='w-full flex items-center justify-center'>
          <div className='flex flex-col gap-3'>
            <p className='text-xs md:text-lg drop-shadow-xl'>Try our new...</p>
            <p className='text-[1.74rem] md:text-7xl drop-shadow-xl'>MSU Result Analyzer</p>
          </div>
        </div>

      {user ? (
          <div className='w-full flex items-center justify-center text-sm'>
            <button onClick={UserSelection} onMouseOver={btn1Hover} onMouseLeave={btn1Hover} className='flex items-center justify-start pl-6 md:pl-12 gap-2 w-32 h-8 md:w-44 md:h-10 border border-white bg-secondary text-primary rounded-3xl active:scale-90 ease-in-out duration-300 drop-shadow-xl'>Try Now 
              <AnimatePresence>
                {arrow1 && 
                  <motion.div 
                    initial={{x:-5, opacity:0}}
                    animate={{x:0,opacity:1}}
                    exit={{x:-5,opacity:0}}
                  >
                    <RiArrowRightDoubleFill size={20} />
                  </motion.div>
                }
              </AnimatePresence>
              </button>
            </div>
      ):(
        <div className='w-full flex items-center justify-center text-sm gap-3'>
          <button onClick={UserSelection} onMouseOver={btn1Hover} onMouseLeave={btn1Hover} className='flex items-center justify-start pl-6 md:pl-12 gap-2 w-32 h-8 md:w-44 md:h-10 border border-white bg-secondary text-primary rounded-3xl active:scale-90 ease-in-out duration-300 drop-shadow-xl'>Try Now 
          <AnimatePresence>
            {arrow1 && 
              <motion.div 
                initial={{x:-5, opacity:0}}
                animate={{x:0,opacity:1}}
                exit={{x:-5,opacity:0}}
              >
                <RiArrowRightDoubleFill size={20} />
              </motion.div>
            }
          </AnimatePresence>
          </button>
          <button onClick={studentLogin} onMouseOver={btn2Hover} onMouseLeave={btn2Hover} className='flex items-center justify-start pl-8 md:pl-14 gap-2 w-32 h-8 md:w-44 md:h-10 border border-white rounded-3xl active:scale-90 ease-in-out duration-300 drop-shadow-xl'>
          {user ? (
                      <div>
                        <span>Hello {uName}</span>
                      </div>
                  ):(
                      <div>
                        <span>Sign In</span>
                      </div>
                    )
          }
            <AnimatePresence>
              {arrow2 && 
                <motion.div 
                  initial={{x:-5, opacity:0}}
                  animate={{x:0,opacity:1}}
                  exit={{x:-5,opacity:0}}
                >
                  <RiArrowRightDoubleFill size={20} />
                </motion.div>
              }
            </AnimatePresence>
          </button>
        </div>
      )}
      </div>
      
      {/* banner */}
      <div className='w-full relative flex justify-center'>
          <img className='absolute -bottom-10 scale-150 md:scale-110 md:-bottom-64 z-0' src={light} alt="light_effect" />
          <img className='asolute z-10' src={banner} alt="banner_person" />
      </div>
      <img className='absolute left-10 bottom-20 h-44 md:h-fit md:bottom-10 md:left-32 z-0' src={design1} alt="" />
      <img className='absolute right-10 h-44 top-10 md:h-fit md:top-36 md:right-32 z-0' src={design2} alt="" />
    </div>
  )
}

export default Home

import { AnimatePresence, motion } from 'framer-motion'
import { Sling as Hamburger } from 'hamburger-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/images/ziver_logo.png'
import Cookies from 'js-cookie';

const Nav = () => {
    const [navOpen,setnavOpen] = useState(false);
    const [uName,setuName] = useState('');
    const [user, setuser] = useState(false);

    const navigate = useNavigate();
    const User_selection = () => {
      navigate('/UserSelection')
    }
    useEffect(() => {
      const Token = Cookies.get('MSU_name')
      if(Token){
        setuName(Token);
        setuser(true);
      }
    });

  return (
    <div className='w-full h-auto'>
        <div className='w-11/12 md:w-10/12 relative mx-auto px-2 md:px-6 text-white font-audiowide bg-white/20 rounded-md h-auto flex justify-between items-center backdrop-blur-3xl z-10'>
            <div>
                <img className='w-8 h-8' src={logo} alt="ziver_logo" />
            </div>
            <div className='md:hidden'>
                <Hamburger toggled={navOpen} toggle={setnavOpen} rounded duration={0.5} color='#ffffff'/>
            </div>
            <div className='hidden md:block text-sm'>
                <div className='flex items-center gap-20'>
                  <ul className='flex items-center gap-14'>
                    <Link to='/' className='hover:underline cursor-pointer drop-shadow-md'>Home</Link>
                    <a href='https://portfolio-psi-eight-35.vercel.app/' target='_blank' className='hover:underline cursor-pointer drop-shadow-md'>Who am i</a>
                    <Link to='' className='hover:underline cursor-pointer drop-shadow-md'>Terms and conditions</Link>
                  </ul>
                  <button className='w-auto px-14 h-10 my-3 border border-white rounded-3xl'>
                  {user ? (
                      <div>
                        <span>Hello {uName}</span>
                      </div>
                  ):(
                      <div>
                        <span>Sign up to Continue</span>
                      </div>
                    )
                  }
                  </button>
                </div>
            </div>
        </div>
        
        <AnimatePresence>
            {navOpen && 
                <motion.div
                initial={{y:-50, opacity:0}}
                animate={{y:0,opacity:1}}
                exit={{y:-50,opacity:0}}
                className='md:hidden absolute w-full z-20'>
                <div className='relative h-auto w-11/12 mx-auto text-white text-sm font-audiowide bg-white/20 rounded-md top-2 backdrop-blur-3xl' >
                    <div className='flex flex-col w-full items-center py-2 gap-5'>
                      <ul className='flex flex-col items-center gap-5'>
                        <Link to='/'>Home</Link>
                        <a href='https://portfolio-psi-eight-35.vercel.app/' target='_blank'>Who am i</a>
                        <Link >Terms and conditions</Link>
                      </ul>
                      <div className='w-11/12'>
                        <button className='h-8 w-full border rounded-md border-white'>
                          {user ?
                            <div>
                              <span>Hello {uName}</span>
                            </div>:
                            <div>
                              <span>Sign up to continue</span>
                            </div>
                          }
                        </button>
                      </div>
                    </div>
                </div>
                </motion.div>
            }
        </AnimatePresence>

    </div>
  )
}

export default Nav

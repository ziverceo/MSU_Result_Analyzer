import React, { useEffect } from 'react'
import './styles/Home.css'
import arrow from '../assets/icons/arrow.png'
import prof from '../assets/images/Professor.svg'
import stud from '../assets/images/Student.svg'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const UserSelection = () => {
  const Navigate = useNavigate();

  const StudentLogin = () => {
    Navigate('/StudLogin');
  }

  const ProfDept = ()=> {
    Navigate('/ProfDept');
  }
  const StudDept = () => {
    Navigate('/StudDept');
  }

  const ProfessorLogin = () => {
    Navigate('/ProfLogin');
  }


  useEffect(() => {
    const Token = Cookies.get('user')
    if(Token != null){
      if(Token == 'Prof'){
        ProfDept()
      }
      else if(Token == 'Stud'){
        StudDept()
      }
      else{
        alert("Invalid user type!")
      }
    }
  });
  return (
    <div>
      <div className='w-full text-white font-audiowide mt-16 md:mt-52'>
        <div className='w-full flex justify-center'>
          <p className='text-2xl md:text-5xl'>MSU Result Scraper</p>
        </div>
        <div className='w-full flex justify-center md:mt-10'>
          <p className='text-md md:text-xl'>use as</p>
        </div>
      </div>
      <div className='w-full flex flex-col md:flex-row-reverse md:justify-between absolute -bottom-1 md:bottom-0'>
          <div className='text-white font-audiowide flex items-center self-end gap-10 md:gap-24'>
            <div className='flex flex-col items-center gap-4'>
              <button onClick={ProfessorLogin} className='w-32 h-10 md:w-48 md:h-12 border rounded-lg text-sm hover:bg-secondary hover:scale-110 duration-200 ease-in-out hover:text-primary active:scale-90'>Professor</button>
              <img className='w-10 h-10 md:w-16 md:h-16 scale-x-[-1]' src={arrow} alt="" />
            </div>
            <div>
              <img className='h-72 md:h-96 lg:h-auto' src={prof} alt="professor_img" />
            </div>
          </div>
          <div className='text-white font-audiowide flex items-center self-start md:gap-24'>
            <div>
              <img className='h-72 md:h-96 lg:h-auto' src={stud} alt="professor_img" />
            </div>
            <div className='flex flex-col items-center gap-2'>
              <button onClick={StudentLogin} className='w-32 h-10 md:w-48 md:h-12 border rounded-lg text-sm hover:bg-secondary hover:scale-110 duration-200 ease-in-out hover:text-primary active:scale-90'>Student</button>
              <img className='w-10 h-10 md:w-16 md:h-16' src={arrow} alt="" />
            </div>
          </div>
      </div>
    </div>
  )
}

export default UserSelection
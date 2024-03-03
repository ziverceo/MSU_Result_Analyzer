import React from 'react'
import './App.css'
import Nav from './components/Nav'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import UserSelection from './pages/UserSelection'
import ProfessorRegister from './pages/ProfessorRegister'
import StudentRegister from './pages/StudentRegister'
import StudLogin from './pages/StudLogin'
import ProfLogin from './pages/ProfLogin';
import StudDept from './pages/StudDept'
import ProfDept from './pages/ProfDept'



const App = () => {
  return (
    <div className='bg w-full h-screen bg-primary bg-cover overflow-hidden bg-blend-multiply pt-4'>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/UserSelection' element={<UserSelection/>} />
          <Route path='/ProfessorRegister' element={<ProfessorRegister/>} />
          <Route path='/StudentRegister' element={<StudentRegister/>} />
          <Route path='/StudLogin' element={<StudLogin/>} />
          <Route path='/ProfLogin' element={<ProfLogin/>} />
          <Route path='/StudDept' element={<StudDept/>} />
          <Route path='/ProfDept' element={<ProfDept/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

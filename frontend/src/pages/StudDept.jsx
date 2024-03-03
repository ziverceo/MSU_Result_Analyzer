import React, { useEffect, useRef, useState } from 'react'
import logocircle from '../assets/icons/ZiverCircle.png';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import {MagnifyingGlass} from 'react-loader-spinner'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function StudData({res}){
  const Stud = res[0]
  return(
      <ul className='md:w-2/3 flex flex-col gap-3 md:flex-row justify-around'>
        {Object.entries(Stud).map(([key, value]) => (
          <li className='text-white font-audiowide text-xs md:text-lg' key={key}>
            <strong>{key} : </strong> {value}
          </li>
        ))}
      </ul>
  )
}


function TableData({res}){
  
  const result_data = res[1];
  return (
    <table className='border-separate w-11/12 md:w-2/3 text-sm text-left rtl:text-right border rounded-md'>
      <thead className='text-xs w-full text-gray-700 uppercase bg-slate-200 sticky rounded-md'>
        <tr>
          <th className='px-6 py-3 text-center font-bold'>S.No</th>
          <th className='px-6 py-3 text-center font-bold'>Subject Code</th>
          <th className='px-6 py-3 text-center font-bold'>Grade</th>
        </tr>
      </thead>
      <tbody>
          {Object.entries(result_data).map(([subjectCode, grade],index) => (
            <tr className='bg-white border-b' key={subjectCode}>
              <td className='px-3 py-1 text-center'>{index + 1}</td>
              <td className='px-3 py-1 text-center'>{subjectCode}</td>  
              <td className='px-3 py-1 text-center'>{grade}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

function MassResult({res}){
  const columns = Object.keys(res[1]);
  return (
    <table className='border-separate w-full text-sm text-left rtl:text-right border'>
    <thead className='text-xs w-full text-gray-700 uppercase bg-slate-200 sticky top-0'>
      <tr>
        {columns.map(column => (
          <th className='px-6 py-3 text-center font-bold' key={column}>{column}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {res.map((row, rowIndex) => (
        <tr className='bg-white border-b' key={rowIndex}>
          {columns.map((column, columnIndex) => (
            <td className='px-3 py-1 text-center' key={columnIndex} > {row[column]} </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
  );
}


const StudDept = () => {
  const name = Cookies.get('MSU_name');
  const college = Cookies.get('MSU_college');
  const roll = Cookies.get('MSU_Roll');
  const [load, setLoad] = useState(false)
  const [res , showRes] = useState(false)
  const [Result, setResult] = useState(null)
  const [bulk, setbulk] = useState(false)

  const tableRef = useRef(null);

  const HandleSubmitStud = async (e) => {
    e.preventDefault();
    setLoad(true)
    try {
      const response = await fetch('https://msu-server.onrender.com/student',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({roll}),
      });
      console.log(response)
      const data = await response.json();
      console.log(data)
      setResult(data);
      showRes(true)
      setbulk(false)
      setLoad(false)
    } catch (error) {
      console.log(error)
      setLoad(false)
      toast.error('error submitting form')
    }
  }

  const HandleSubmitClass = async (e) => {
    e.preventDefault();
    setLoad(true)
    try {
      const response = await fetch('https://msu-server.onrender.com/studentclass',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({roll}),
      });
      console.log(response)
      const data = await response.json();
      console.log(data)
      setResult(data);
      showRes(true)
      setbulk(true)
      setLoad(false)
    } catch (error) {
      console.log(error)
      setLoad(false)
      toast.error('error submitting form')
    }
  }

  const generatePDF = () => {
    html2canvas(tableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 size: 210 x 297 mm
      pdf.save('table.pdf');
    });
  };

  return (
    <div className=' w-full h-screen'>
      {
        load && (
          <div className='absolute top-0 h-full w-full flex items-center justify-center z-20 bg-black/50 backdrop-blur-sm'>
            <div className='flex flex-col items-center justify-center gap-5'>
              <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{}}
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="blue"
            />
            <h2 className='text-xl font-audiowide text-white'>Fetching Results...</h2>
            <p className='text-sm font-audiowide text-white'>This might take a while...Please be patient...!</p>
          </div>
        </div>
        )
      }
      <div className='w-full h-5/6'>
      <Toaster/>
      {res ? (
        <div className='w-full h-full flex  flex-col items-center gap-5 mt-5'>
          {bulk && (
            <h1 className='text-white text-xl font-audiowide'>MSU UG Exam Result</h1>
          )}
          {bulk ? (
            <div className='w-full h-full flex flex-col items-center justify-around'>
              <div className ='bg-slate-200 w-11/12 h-5/6 rounded-md drop-shadow-lg overflow-scroll mx-auto no-scrollbar'>
                <MassResult res= {Result} />
              </div>
              {/* <button onClick={generatePDF} className='w-full md:w-1/4 h-12 rounded-md text-white font-bold bg-sky-500'>Download as PDF</button> */}
            </div>
            
          )
          :(
            <div className = 'flex flex-col gap-5 md:gap-10 w-11/12 md:w-10/12 h-5/6 mx-auto text-xs bg-gradient-to-b from-white/10 mt-5 md:mt-16 rounded-md drop-shadow-lg to-white/80' >
              <div className='w-full h-16  flex items-center justify-center'>
                <h1 className='text-white text-xl font-audiowide'>MSU UG Exam Result</h1>
              </div>
              <div className='w-full h-auto flex items-center justify-center'>
                <StudData res = {Result} />
              </div>
              <div className="w-full h-auto flex items-center justify-center">
                <TableData res= {Result} />
              </div>
            </div>
          )}

        </div>
      ):(
        <div className='w-11/12 md:w-2/5 h-auto mx-auto mt-32 md:mt-52 items-center flex flex-col md:justify-center gap-10 bg-gradient-to-b from-white/10 to-white/80 rounded-md drop-shadow-2xl py-10 overflow-hidden'>
          <div className='flex flex-col items-center gap-3'>
            <img className='size-16 md:size-24' src={logocircle}  alt="" />
            <p className='text-white md:text-lg font-audiowide'>Welcome {name}</p>
            <p className='text-white md:text-md font-audiowide'> {college} </p>
          </div>
          <div className='w-full flex flex-col items-center gap-3'>
            <button onClick={HandleSubmitStud} className='w-4/5 md:w-1/2 md:h-12 h-10 flex items-center justify-center gap-3 rounded-md drop-shadow-xl bg-primary text-white font-audiowide text-sm active:scale-95 ease-in-out duration-100'>Fetch your Own Result</button>
            <button onClick={HandleSubmitClass} className='w-4/5 md:w-1/2 md:h-12 h-10 flex items-center justify-center gap-3 rounded-md drop-shadow-xl bg-primary text-white font-audiowide text-sm active:scale-95 ease-in-out duration-100'>Fetch Your class Details</button>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default StudDept

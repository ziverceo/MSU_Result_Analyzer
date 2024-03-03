import React, { useEffect, useRef, useState } from 'react'
import logocircle from '../assets/icons/ZiverCircle.png';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import {MagnifyingGlass} from 'react-loader-spinner'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


function MassResult({res}){
  const tableRef = useRef(null);
  const columns = Object.keys(res[1]);

  const generatePDF = () => {
    html2canvas(tableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 size: 210 x 297 mm
      pdf.save('table.pdf');
    });
  };

  return (
    <table ref={tableRef} className='border-separate w-full text-sm text-left rtl:text-right border'>
      <thead className='text-xs w-full text-gray-700 uppercase bg-slate-200 sticky top-0'>
      <tr>
        {columns.map(column => (
          <th className='px-6 py-3 text-center font-bold' key={column}>{column}</th>
        ))}
      </tr>
    </thead>
      <tbody className="w-full">
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


const ProfDept = () => {
  const name = Cookies.get('MSU_name');
  const college = Cookies.get('MSU_college');
  const clg_code = Cookies.get('MSU_clg_code');
  const [load, setLoad] = useState(false)
  const [res , showRes] = useState(false)
  const [Result, setResult] = useState(null)
  const [dept, setdept] = useState('cs');
  const [year, setyear] = useState('1st');
  const [batch , setBatch] = useState('2020')
  const [exam , setExam] = useState('a');

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true)
    try {
      const response = await fetch('https://msu-server.onrender.com/classres' , {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({batch,dept,year,clg_code,exam}),
      });
      console.log(response)
      const data = await response.json();
      console.log(data)
      setResult(data);
      showRes(true)
        setLoad(false)
    } catch (error) {
      console.log(error)
      setLoad(false)
      toast.error('error submitting form')
    }
  }

  

  return (

    <div className=' w-full h-screen'>
    {
      load && (
        <div className='absolute top-0 h-full w-full flex items-center justify-center z-20 bg-black/70 backdrop-blur-md'>
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
          <div className='w-full h-full flex flex-col items-center justify-around gap-5'>
          <h1 className='text-white text-xl font-audiowide'>MSU UG Exam Result</h1>
            <div className ='bg-slate-200 w-11/12 h-5/6 rounded-md drop-shadow-lg overflow-scroll mx-auto no-scrollbar'>
              <MassResult res= {Result} />
            </div>
            {/* <button onClick={generatePDF} className='w-full md:w-1/4 h-12 rounded-md text-white font-bold bg-sky-500'>Download as PDF</button>   */}
          </div>
      </div>
    ):(
      <div className='w-11/12 md:w-2/5 h-auto mx-auto mt-20 md:mt-40 items-center flex flex-col md:justify-center gap-10 bg-gradient-to-b from-white/10 to-white/80 rounded-md drop-shadow-2xl py-10 overflow-hidden'>
      <div className='flex flex-col items-center gap-3'>
        <img className='size-16 md:size-24' src={logocircle}  alt="" />
        <p className='text-white md:text-lg font-audiowide'>Welcome Prof . {name} </p>
        <p className='text-white md:text-md font-audiowide'> {college} </p>
      </div>
      <div className='w-full flex flex-col items-center gap-3'>
      <select value={batch} onChange={(e) => setBatch(e.target.value)} id="batch" className="w-4/5 md:w-1/2 md:h-12 h-10 bg-white text-gray-500 text-mg rounded-lg px-2">
          {/* <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option> */}
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
        <select value={exam} onChange={(e) => setExam(e.target.value)} id="Exam" className="w-4/5 md:w-1/2 md:h-12 h-10 bg-white text-gray-500 text-mg rounded-lg px-2">
          <option value="a">April</option>
          <option value="n">November</option>
        </select>
        <select value={dept} onChange={(e) => setdept(e.target.value)} id="Department" className="w-4/5 md:w-1/2 md:h-12 h-10 bg-white text-gray-500 text-mg rounded-lg px-2">
          <option value="cs">Computer science</option>
          <option value="mat">Mathematics</option>
          <option value="phy">Physics</option>
          <option value="che">Chemistry</option>
          <option value="eng">English</option>
          <option value="com">Commerce</option>
        </select>
        <select value={year} onChange={(e) => setyear(e.target.value)}  id="year" className="w-4/5 md:w-1/2 md:h-12 h-10 bg-white text-gray-500 text-mg rounded-lg px-2">
          <option value="1st">First year</option>
          <option value="2nd">Second year</option>
          <option value="3rd">Third year</option>
        </select>

        <button onClick={HandleSubmit} className='w-4/5 md:w-1/2 md:h-12 h-10 flex items-center justify-center gap-3 rounded-md drop-shadow-xl bg-primary text-white font-audiowide text-sm active:scale-95 ease-in-out duration-100'>Fetch Results</button>
      </div>
  </div>
    )}
  </div>
  </div>
  )
}

export default ProfDept
  
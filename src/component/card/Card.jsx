import React from 'react'
import { BsHourglassSplit } from "react-icons/bs";
import './Card.css'
export default function Card({item}) {
  return (
    <div className='main-card-container'>
       <div className='comapny-detail-container'>
        <img className='company-logo' src={item.logoUrl} alt=""/>
        <div>
            <p className='company-name'>{item.companyName}</p>
            <p className='company-role'>{item.jobRole}</p>
            <p className='company-location'>{item.location}</p>
        </div>
       </div>
       <p className='company-salary'>Estimated Salary: ₹{item.maxJdSalary == null && item.minJdSalary == null ? 0
        : item.minJdSalary == null ? item.maxJdSalary : item.maxJdSalary == null ? item.minJdSalary :
        `${item.minJdSalary} - ${item.maxJdSalary}`} LPA ✅</p>
        <div className='about-container'>
            <p className='about-comapny'>About Company:</p>
            <p className='about-us'>About us</p>
            <div className='description'>
                {item.jobDetailsFromCompany.substr(0,250)}
               
            </div>
            <div className='white-div'>   </div>
            <button className='job-btn'>View job</button>
          
        </div>
        <div>
            <p className='company-exp'>Minimum Experience</p>
             <p>{item.minExp == null ? "fresher" : `${item.minExp} years`}</p>
        </div>
        <button className='easy-btn'><span>⚡</span> Easy Apply</button>
        <button className='referral-btn'>Unlock referral ask</button>
    </div>
  )
}

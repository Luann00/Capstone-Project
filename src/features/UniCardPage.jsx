import React from 'react'
import UniCard from '../components/UniCard';
import NavBarStudent from '../components/NavBarStudent';
import './UniCardPage.css';

const UniCardPage = () => {
  return (
   <div className='card-page'>
 
 <div className='navbar'>  <NavBarStudent/>
</div>
<div className='title'> <h1> List of partner universities </h1>
<span>Pick your top three preferred universities from the list below!</span></div>


   

   <div className='card-container'>
   <UniCard/>
   </div>
   
  
   </div> 
   

   
  )
}

export default UniCardPage
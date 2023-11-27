import React from 'react'
import UniCard from '../components/UniCard';
import NavBarStudent from '../components/NavBarStudent';
import './UniCardPage.css';

const UniCardPage = () => {
  return (
   <div className='card-page'>
 
 <div className='navbar'>  <NavBarStudent/>
</div>

   

   <div className='card-container'>
   <UniCard/>
   </div>
   
  
   </div> 
   

   
  )
}

export default UniCardPage
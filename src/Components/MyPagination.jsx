import React, { useState } from 'react';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';

const MyPagination = ({ currentPage, totalPages, onPageChange }) => {

  const [loading, setLoading] = useState(true);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='flex justify-center items-center '>
      <button 
        onClick={handlePrevious} 
        disabled={currentPage === 1}
        
      >
        <ArrowBackIosNewSharpIcon/>
      </button>
      <span className='px-4 py-2 bg-gray-100'>{currentPage}</span>
      <button 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
      
      >
        <ArrowForwardIosSharpIcon/>
      </button>
    </div>
  );
};

export default MyPagination;
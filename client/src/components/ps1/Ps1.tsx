import React, { useEffect, useState } from 'react';
import theme from '../../styles/theme.json'
import { HiOutlineArrowRight } from 'react-icons/hi';


export const Ps1 = () => {
  const [hostname, setHostname] = useState('');

  useEffect(() => {
    if (typeof window !== undefined) {
      setHostname(window.location.hostname);
    }
  }, []);

  return (
    <div className='py-1'>
      <span className='bg-white'
        style={{
          color: theme.yellow,
        }}
      >
        <HiOutlineArrowRight />
      </span>
      
    </div>
  );
};

export default Ps1;

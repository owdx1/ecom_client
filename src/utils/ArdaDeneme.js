import React from 'react'
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';


const ArdaDeneme = () => {
    let sayi = 31;
  return (
    <div>
        <h1>{sayi}</h1>

        <Link to='/arda-2'>link1</Link>
        <a href='/arda-2'>link2</a>
        <p>selam</p>
        <br/>
        <Typography>selam</Typography>

    </div>



    
  )
}

export default ArdaDeneme
import React from 'react'
import '../styles/Landing.css';
import {Button} from '@mui/material';
import {Link} from 'react-router-dom';
import titleimg from '../styles/assets/keys.png'

const Login = () => {
  return (
    <div className='whole_page'>
        <div className='nav-bar'>
            <h1 className='title'>MyPass <i className="fa-solid fa-lock"></i></h1>
        </div>
        <div className='hero'>
            <div className='text-div'>
                <div className='title-div'><h2 className='title'>MyPass <i className="fa-solid fa-lock"></i></h2> <h2>&emsp;Password Manager</h2> </div>
                <h4>Never forget your passwords again.</h4>
                <p>According to the HYPR report, 37 percent of people deal with more than 20 passwords, and that’s just in their personal life.</p>
                
                <Link className='lnk' to='/Home'><Button className='btn' variant='contained'>Try now</Button></Link>
            </div>
            <div className='image-div'>
                <img src={titleimg} alt="photo"/>
            </div>
        </div>
        
    </div>
  )
}

export default Login
import React from 'react';
import {Button, TextField} from '@mui/material';
import '../styles/Home.css';

function FormDialog(props) {
  const { reset, handleSubmit, handleInputChange, DESCRIPTION, WEBSITE, EMAIL, PASSWORD } = props;

  return (
    <>
        <div className='form_dialog'>
          <div className='form_container'>
            <div className='form_header'>
              <div><h3>MyPass <i className="fa-solid fa-lock"></i></h3></div>
              <i className="fa-solid fa-xmark" onClick={reset}></i>
            </div>
            <form onSubmit={handleSubmit}>
              <label>Description/Title</label>
              <TextField name='DESCRIPTION' label={<i className="fa-sharp fa-solid fa-t"></i>} type='text' variant="outlined" value={DESCRIPTION} onChange={handleInputChange} inputProps={{ maxLength: 40}} className='textfield'/>
              <label>Website/App</label>
              <TextField name='WEBSITE' label={<i className="fa-solid fa-link"></i>} type='text' variant="outlined" value={WEBSITE} onChange={handleInputChange} inputProps={{ maxLength: 80}} className='textfield'/>
              <label>Email/Phone</label>
              <TextField name='EMAIL' label={<i className="fa-solid fa-envelope"></i>} type='text' variant="outlined" value={EMAIL} onChange={handleInputChange} inputProps={{ maxLength: 50}} className='textfield'/>
              <label>Password</label>
              <TextField name='PASSWORD' label={<i className="fa-solid fa-key"></i>} type='password' variant="outlined" value={PASSWORD} onChange={handleInputChange} inputProps={{ maxLength: 80}} className='textfield'/>
              <Button className='btn-add' type='submit' variant="contained" size="medium"> Save </Button>
            </form>
          </div>
        </div>
    </>
  );
}

export default FormDialog;

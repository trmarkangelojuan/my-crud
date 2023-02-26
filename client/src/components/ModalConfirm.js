import React from 'react';
import {Button} from '@mui/material';
import '../styles/Home.css';

function ConfirmDialog(props){
    const { no, yes } = props;

    return (
        <>
            <div className='confirm_dialog'>
                <div className='container'>
                    <div>Are you sure?</div>
                    <div className='confirmation_buttons'><Button className='no_btn' variant="text" onClick= {no}>No</Button><Button variant="text" onClick={yes}>Yes</Button></div>
                </div>
            </div>
        </>
    )
}

export default ConfirmDialog;
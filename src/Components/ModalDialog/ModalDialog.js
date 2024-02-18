import React from 'react';
import { Modal, Typography, Box } from '@mui/material';
import Card from '../Card';

const ModalDialog = ({ open, handleClose }) => {
  const username=(localStorage.getItem('username') || '');

  return (
    <Modal
    style={{width:"100%",height:"100%"}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <div style={{justifyContent:"center",alignItems:"center"}} className="modal-body">
            <Typography id="modal-modal-title" variant="h6" component="h2">
            
            </Typography>
            <Card />
            <h2 style={{fontSize:"43px",textDecoration:"none",backgroundColor:"white",color:"gray",marginLeft:"18px"}} >HAVE A GREAT SHOPPING WITH US DEAR {username}&#x2764;&#x2764;</h2>

        </div>
    </Modal>
  )
}

export default ModalDialog;
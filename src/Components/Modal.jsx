import React from "react";
import { Box, Modal as MuiModal } from "@mui/material";
import cancelIcon from '../assets/x-mark.png'

const Modal = ({ open, onClose, selectedImage }) => {
  if (!open || !selectedImage) return null;
  return (
    <div>
      <MuiModal open={open} onClose={onClose} className="flex justify-center items-center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
          width='40vw'
          bgcolor={"skyblue"}
          position={"relative"}
          
        >
          <div className="flex flex-col items-center">
          <img className="w-8 absolute right-4 top-2" onClick={()=>onClose()} src={cancelIcon} />
            <div className="w-[74%]" >
            {selectedImage && <div><img src={selectedImage} /> </div>}
            </div> 
            </div>
        </Box>
      </MuiModal>
    </div>
  );
};

export default Modal;

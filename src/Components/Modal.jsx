import React, { useState } from "react";
import { Box, Modal as MuiModal } from "@mui/material";

const Modal = ({ open, onClose, selectedImage }) => {
    console.log("selectedimage", selectedImage);
  if (!open || !selectedImage) return null;
  return (
    <div>
      <MuiModal open={open} onClose={onClose}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          onClick={()=>onClose()}
        
        >
            <div className="w-[50%]" >
            {selectedImage && <div><img src={selectedImage} /> <p>{}</p> </div>}
            </div>
          
        </Box>
      </MuiModal>
    </div>
  );
};

export default Modal;

import React from 'react'
import { useParams, useLocation } from 'react-router-dom'

const ImageDetails = () => {

    const { id } = useParams();
    const location = useLocation();
    const { image } = location.state || {};

    if(!image){
        return <div>Image not Found</div>;
    }

  return (
    <div className="flex justify-center items-center h-screen">
    <img src={image.download_url} alt={image.author} style={{ maxHeight: '80%', maxWidth: '80%' }} />
  </div>
  )
}

export default ImageDetails
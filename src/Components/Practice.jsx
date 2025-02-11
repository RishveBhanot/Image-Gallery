import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Box } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';

const ImageDetails = () => {
  const { id } = useParams(); // Get image ID from the URL
  const location = useLocation();
  const { image: stateImage } = location.state || {}; // Get image from navigation state if available

  const [image, setImage] = useState(stateImage || null);
  const [loading, setLoading] = useState(!stateImage); // Only show loading if image is not in state
  const [error, setError] = useState(null);

  // Function to fetch image by ID if not available in state
  const fetchImageById = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://picsum.photos/id/${id}/info`);
      if (!response.ok) {
        throw new Error("Image not found");
      }
      const data = await response.json();
      setImage(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch image only if it's not already in state
  useEffect(() => {
    if (!stateImage) {
      fetchImageById();
    }
  }, [id]); // Fetch again if ID changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                        <TailSpin
                          visible={true}
                          height="80"
                          width="80"
                          color="#4fa94d"
                          ariaLabel="tail-spin-loading"
                          radius="1"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      </Box>
      </div>
    );
  }

  if (error || !image) {
    return <div className="text-center mt-10 text-red-500">Image not found</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <img
        src={image.download_url}
        alt={image.author}
        style={{ maxHeight: "80%", maxWidth: "80%" }}
      />
    </div>
  );
};

export default ImageDetails;

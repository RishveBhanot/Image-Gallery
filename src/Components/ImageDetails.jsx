import React, { Suspense, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { TailSpin } from "react-loader-spinner";


const ImageDetails = () => {
  //Extracting the id params from the url to use to to render that particular image.
  const { id } = useParams();

  //Use to get the current url of the route or page.
  const location = useLocation();

  //Get image from navigation state if available
  const { image: stateImage } = location.state || {}; 

  // if state image is truthy it means there is an image then that image will be assigned to 'image' variable otherwise it returns null.
  const [image, setImage] = useState(stateImage || null); 

  const [loading, setLoading] = useState(!stateImage);
  const [error, setError] = useState(null);

  const fetchImageById = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://picsum.photos/id/${id}/info`);
      if (!response.ok) {
        throw new Error("Image not found");
      }
      const data = await response.json();
      setImage(data);
      setLoading(false)
    } catch (error) {
      setError(error.message);
    } 
  };

  //Fetch image only if its not already available in state. it means that "stateImage" has not that particular image so we call fetchImageById to get that particular image of that id which user type in manually in the url to render that image. 
  useEffect(() => {
    if (!stateImage) {
      fetchImageById();
    }
  }, [id]); //Fetch again if ID changes.

  if (loading) {
    return(
    <div className="text-center mt-20">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
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
    )
  }

  return (
 <div className="flex justify-center items-center h-screen">
  <img src={image.download_url} alt={image.author} style={{ maxHeight: "80%", maxWidth: "80%"}} />
 </div>
  );
};

export default ImageDetails;

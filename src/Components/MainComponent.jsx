import React, { useState, useEffect, Suspense } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';

const ImagesCard = React.lazy(() => import('./ImagesCard'));
const MyPagination = React.lazy(() => import('./MyPagination'));
const Modal = React.lazy(() => import('./Modal'));

const MainComponent = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [imagesPerPage, setImagesPerPage] = useState(8);
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputValue, setInputValue] = useState(searchParams.get("limit") || "");
  const navigate = useNavigate();

  //Use to open the modal.
  const handleOpenModal = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  //Use to close the modal.
  const handleCloseModal = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  //  Fetching the images from an API
  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://picsum.photos/v2/list");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  //Fetching Images from an API when component first mounts.
  useEffect(() => {
    fetchImages();
  }, []);


  //Manually typing the limit in the url to render that particular number of images on the webpage. Whenever searchParams change then this use effect re-render that number of images.
  useEffect(() => {
    const limitFromUrl = searchParams.get("limit");
    if (limitFromUrl) {
      const parsedLimit = parseInt(limitFromUrl, 10);
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        setImagesPerPage(parsedLimit);
      } else {
        setImagesPerPage(8);
      }
    }
  }, [searchParams]);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  //When user type limits he wants to see in the input field then exactly that number of images will be render on that webpage. 
  const handleEnter = (e) => {
    e.preventDefault();
    const parsedLimit = parseInt(inputValue, 10);

    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      setLoading(true);
      setImagesPerPage(parsedLimit);
      setCurrentPage(1); // reset to page 1
      setSearchParams({ limit: inputValue });
      fetchImages(); // Fetch images again with the new limit
    } else {
      setImagesPerPage(8);
      setCurrentPage(1); // reset to page 1
      console.error("Invalid limit value. Using default value.");
    }
  };

  const lastImageIndex = currentPage * imagesPerPage;
  const firstImageIndex = lastImageIndex - imagesPerPage;
  const currentImages = data.slice(firstImageIndex, lastImageIndex);

  const totalPages = Math.ceil(data.length / imagesPerPage);

  //This function is used to navigate to route in which individual image is displayed on which user clicks. This state is also send with this because it contains the current image on which user clicked. So when user navigates to successfully that component then useLocation hook can use this state to display/render that particular image.
  const handleImageClick = (image) => {
    navigate(`image/${image.id}`, {state : { image }});
  };

  return (
    <div>
      <div className='text-center text-3xl font-semibold mb-8'>Image Gallery</div>
      {loading ? (
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
      ) : (
        <Suspense fallback={<div><Box display="flex" justifyContent="center" alignItems="center" height="100vh">
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
        </Box></div>}>
          <ImagesCard currentImages={currentImages} openModal={handleOpenModal} handleImageClick={handleImageClick} />
          <div className="flex justify-evenly items-center">
            <form onSubmit={handleEnter}>
              <label>Filter Images: </label>
              <input
                onChange={(e) => setInputValue(e.target.value)}
                className="border-2 border-sky-400 w-[80px]"
                type="number"
                value={inputValue}
              />
              <button type="submit">Enter</button>
            </form>
            <MyPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handleChangePage}
            />
          </div>
          <Modal open={open} onClose={handleCloseModal} selectedImage={selectedImage} />
        </Suspense>
      )}
    </div>
  );
};

export default MainComponent;
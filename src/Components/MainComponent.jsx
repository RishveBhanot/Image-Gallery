import React from "react";
import { useEffect, useState } from "react";
import ImagesCard from "./ImagesCard";
import MyPagination from "./MyPagination";
import { TailSpin } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";
import Modal from "./Modal";

const MainComponent = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [imagesPerPage, setImagesPerPage] = useState(8);
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageUrl , setImageUrl] = useState("")
  const [inputValue, setInputValue] = useState(searchParams.get('limit') || "")

    const handleOpenModal = (image) =>{
        console.log("images", image)
        setOpen(true);
        setImageUrl(image.download_url)
        setSelectedImage(image)
    }
    console.log(imageUrl, "imaging")
    // console.log("hello", selectedImage)

    const handleCloseModal = () =>{
        setOpen(false);
        setImageUrl(null)
    }

  
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

  useEffect(() => {
    fetchImages();
  },[])

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

  const handleEnter = (e) => {
    e.preventDefault();
    const limitInput = searchParams.get("limit");
    const parsedLimit = parseInt(limitInput, 10);

    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      setLoading(true)
      setImagesPerPage(parsedLimit);
      setCurrentPage(1);
      setSearchParams({limit : inputValue})
      fetchImages() 
    } else {
      setImagesPerPage(8);
      setCurrentPage(1);
      console.error("Invalid limit value. Using default value.");
    }
  };

  const lastImageIndex = currentPage * imagesPerPage;
  const firstImageIndex = lastImageIndex - imagesPerPage;
  const currentImages = data.slice(firstImageIndex, lastImageIndex); // No need for the data && check

  const totalPages = Math.ceil(data.length / imagesPerPage);

  return (
    <div>
      <div className="text-center text-3xl font-semibold mb-8">
        Image Gallery
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
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
        </div>
      ) : (
        <>
          <ImagesCard currentImages={currentImages} imageUrl={imageUrl}  openModal={handleOpenModal} />
          <div className="flex justify-evenly items-center">
            <form onSubmit={handleEnter}>
              {" "}
              {/* Form submit handles enter */}
              <label>Filter Images: </label>
              <input
                onChange={(e) => setInputValue(e.target.value)}
                className="border-2 border-sky-400 w-[80px]"
                type="number"
                value={inputValue} // Controlled input
              />
              <button type="submit">Enter</button> {/* Button type submit */}
            </form>
            <MyPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handleChangePage}
            />
            
          </div>
        </>
      )}
      <Modal open={open} onClose={handleCloseModal} selectedImage={selectedImage}/>
    </div>
  );
};

export default MainComponent;

import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainComponent from "./Components/MainComponent";
import React, { Suspense } from "react";
import { Box } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';



const ImageDetails = React.lazy(() => import("./Components/ImageDetails"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainComponent />} />
        {/* Wrap the ImageDetails route inside Suspense */}
        <Route
          path="/image/:id"
          element={
            <Suspense fallback={<div className="text-center mt-20">
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
            </div>}>
              <ImageDetails />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

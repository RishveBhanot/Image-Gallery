import { useEffect, useState } from "react";
import "./App.css";
import ImagesCard from "./Components/ImagesCard";
import MyPagination from "./Components/MyPagination";
import { TailSpin } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";
import MainComponent from "./Components/MainComponent";

function App() {

  return (
    <div>
      <MainComponent/>
    </div>
  );
}

export default App;


import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainComponent from "./Components/MainComponent";
import ImageDetails from "./Components/ImageDetails";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainComponent/>}/>
        <Route path="/image/:id" element={<ImageDetails/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;


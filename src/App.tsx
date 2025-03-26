import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import AstronomyPictureOfTheDay from "./pages/AstronomyPictureOfTheDay";
import MyLocation from "./pages/MyLocation";
import Earth from "./pages/Earth";

function App() {
  return (
    <BrowserRouter>
      <div className="text-[#EAEAEA] w-full min-h-screen flex flex-col scrollbar-hide">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apod" element={<AstronomyPictureOfTheDay />} />
          <Route path="/my-location" element={<MyLocation />} />
          <Route path="/earth" element={<Earth />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

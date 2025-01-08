import HomePage from "../Sections/Pages/Home";
import {Routes,Route} from 'react-router-dom';
import TrendingNews from "../Sections/Pages/Trending";
import CommunitySection from "../Sections/Pages/Community";
import NearestSafePlace from "../Sections/Pages/NearestSafe";
import AboutUs from "../Sections/Pages/About";

export default function RenderDashboard() {
  return(
    <>
     
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trending" element={<TrendingNews />} />
        <Route path="/community" element={<CommunitySection />}/>
        <Route path="/safeRoute" element={<NearestSafePlace />}/>
        <Route path="/AboutUs" element={<AboutUs />}/>
      </Routes>
     
     </>
    );
}

import HomePage from "../Sections/Pages/Home";
import {Routes,Route} from 'react-router-dom';
import TrendingNews from "../Sections/Pages/Trending";
import CommunitySection from "../Sections/Pages/Community";
import NearestSafePlace from "../Sections/Pages/NearestSafe";
import AboutUs from "../Sections/Pages/About";
import OpportunityPage from "../Sections/Pages/Opportunities";
import LegalChatbot from "../Sections/Pages/Legal";
import DeepfakeDetection from "../Sections/Pages/Deepfake";
import NoticePage from "../Sections/Pages/Notice";
import Schemes from "../Sections/Pages/Schemes";
import CourseList from "../Sections/Pages/Courses";

export default function RenderDashboard() {
  return(
    <>
     
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trending" element={<TrendingNews />} />
        <Route path="/community" element={<CommunitySection />}/>
        <Route path="/safeRoute" element={<NearestSafePlace />}/>
        <Route path="/AboutUs" element={<AboutUs />}/>
        <Route path="/jobs" element={<OpportunityPage />}/>
        <Route path="/legal" element={<LegalChatbot />}/>
        <Route path="/fake" element={<DeepfakeDetection />}/>
        <Route path="/notice" element={<NoticePage />}/>
        <Route path="/schemes" element={<Schemes />}/>
        <Route path="/courses" element={<CourseList />}/>
      </Routes>
     
     </>
    );
}

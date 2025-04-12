import './App.css';
import Navbar from './Navbar/Navbar.jsx';
import Mainnavbar from './Navbar/Mainnavbar.jsx';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Firstpage from './Firstpage/Firstpage.jsx';
import Footer from './Footer/Footer.jsx';
import Formpage from './Firstpage/Formpage.jsx';
import Patientpage from './Mainpages/Patientpage.jsx';

function App() {
  return (
    <Router>
      <MainComponent />
    </Router>
  );
}

function MainComponent() {
  const location = useLocation();

  return (
    <div className="App">
      {/* Conditionally render Navbar or Mainnavbar */}
      {location.pathname === "/patientpage" ? <Mainnavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route path="/form" element={<Formpage />} />
        <Route path="/patientpage" element={<Patientpage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

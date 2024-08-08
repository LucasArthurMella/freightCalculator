import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import MainSidebar from '../components/MainSidebar';
import Home from './Home';
import CalculateFreight from './CalculateFreight';
import Historic from './Historic';
import { useState } from 'react';

const MainPage = () => {
  const [burguerToggle, setBurguerToggle] = useState(false);

  return(
    <Router>
      <Header setBurguerToggle={setBurguerToggle} />
      <div style={{ display: 'flex' }}>
        <MainSidebar 
          burguerToggle={burguerToggle} 
          setBurguerToggle={setBurguerToggle} 
        />
        <main style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/calculate-freight" element={< CalculateFreight />} />
            <Route path="/history" element={< Historic />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default MainPage;

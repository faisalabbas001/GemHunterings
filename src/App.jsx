import './App.css';
import AppComponent from './AppComponent';
import { BrowserRouter, Routes, Route } from'react-router-dom';
import LeaderBoard from './Pages/LeaderBoard';
import NotFound from './Pages/NotFound';
import Calculater from  "./Pages/calculater";
function App() {
 

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<AppComponent />}/>
          <Route path="/leader-board" element={<LeaderBoard />} />
          <Route path="/calculater" element={<Calculater/>} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;

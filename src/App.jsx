import './App.css';
import { useState, useEffect } from 'react';
import Header from './Components/Header';
import Showdow from './Components/Showdow';
import Footer from './Components/Footer';
import Loader from './Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false);  
    }, 2000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
      <Loader loading={loading} /> 
      {!loading && (
        <>
        <ToastContainer />
          <Header />
          <Showdow />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;

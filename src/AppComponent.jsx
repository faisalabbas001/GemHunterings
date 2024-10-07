import './App.css';
import { useState, useEffect } from 'react';
import Header from './Components/Header';
import Showdow from './Components/Showdow';
import Footer from './Components/Footer';
import Loader from './Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CompoundCard from './Components/Cards/MainCard';
import CompoundButtonCard from './Components/Cards/CompoundButtonCard';
import UnStackButton from './Components/Cards/UnStackButton';
import UnLockGemsCard from './Components/Cards/UnLockGemsCard';
import CollectRewardsCard from './Components/Cards/CollectRewardCard';
import WithDrawGemsCard from './Components/Cards/WithDrawGemCard';
import PurchaseProtectionCard from './Components/Cards/PurChaseProtectionCard';
import ResetCoolDownCard from './Components/Cards/ResetCoolDownCard';
import AttackCard from './Components/Cards/AttactCard';

function AppComponent() {
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
          {/* Main Container for Cards */}
          <div className=" flex flex-col justify-end items-center lg:min-h-screen mt-16 lg:mt-10 p-4">
  {/* First Row of Cards */}
  <div className="flex justify-center gap-3 flex-wrap mb-6 ">
    <CompoundCard />
    <CompoundButtonCard />
    <UnStackButton />
    {/* <UnLockGemsCard /> */}
    <CollectRewardsCard />
    {/* <WithDrawGemsCard /> */}
    <PurchaseProtectionCard />
    <ResetCoolDownCard />
    <AttackCard />
  </div>

</div>

          <Footer />
        </>
      )}
    </>
  );
}

export default AppComponent;

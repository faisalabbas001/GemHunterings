import {useState} from 'react';
import PurchaseProtection from '../../models/PurchaseProtection';
const ProtectionCard = () => {
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const [isProtectionsShieldActive, setisProtectionsShieldActive] = useState(false);
  return (
    <div>
     <div
      className="w-[150px] h-[200px] rounded-lg overflow-hidden relative shadow-lg flex  justify-center items-center"
      style={{
        backgroundImage: `url("/BuyProtection.jpeg")`,
        backgroundSize: 'cover', // Ensures the image covers the entire div
        backgroundPosition: 'center', // Centers the image
      }}
    >
      {/* Card content with centered text */}
      <div className=" ">
        <div className="font-normal text-xl ttext-black text-center">Purchase Protection</div>
      </div>
  
      {/* Button Section */}
      <div className=" absolute bottom-0 w-full ">
        <button
        //   onClick={handleOpen}

        onClick={() => setisProtectionsShieldActive(val => !val)}
          className="bg-[#CDC1FF]  w-full font-normal text-white py-2 px-4 border rounded-3xl transition duration-300"
        >
          Button
        </button>

            {/* Modal */}

            {/* {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
 
  <PurchaseProtection/>
             

          
          </div>
        </div>
      )} */}

        </div>
      </div>
       {/* Purchase Protection Model */}
       {isProtectionsShieldActive && <PurchaseProtection setisProtectionsShieldActive={setisProtectionsShieldActive} />}
    </div>
  );
};

export default ProtectionCard;
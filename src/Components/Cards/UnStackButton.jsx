import {useState} from 'react';
import UnStack from '../../models/UnStack';
const CompoundButtonCard = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <div>
      <div
      className="w-[150px] h-[200px] rounded-lg overflow-hidden relative shadow-lg flex  justify-center items-center"
      style={{
        backgroundImage: `url("/Unstake.jpeg")`,
        backgroundSize: 'cover', // Ensures the image covers the entire div
        backgroundPosition: 'center', // Centers the image
      }}
    >
      {/* Card content with centered text */}
      <div className=" ">
        <div className="font-normal text-xl text-black text-center">UNSTAKE</div>
      </div>
  
      {/* Button Section */}
      <div className=" absolute bottom-0 w-full ">
        <button
          onClick={handleOpen}
          className="bg-[#97F9FB]  w-full font-normal text-white py-2 px-4 border rounded-3xl transition duration-300"
        >
          Button
        </button>

            {/* Modal */}

            {open && (
        <div className="fixed inset-0  z-10 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
            <h1 className=' text-center  ms-2 -mb-3 mt-1'>Unstake Gems</h1>
 
          <UnStack handleClose={handleClose} />
             

          
          </div>
        </div>
      )}

        </div>
      </div>
    </div>
  );
};

export default CompoundButtonCard;

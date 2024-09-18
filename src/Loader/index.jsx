const Loader = ({ loading }) => {
    
    if (!loading) {
      return null;
    }
  
    return (
      <div className="h-[100vh] bg-[#101116] w-full flex justify-center items-center">
        <img
          className="animate-spin" 
          height={100}
          width={100}
          src="/loader.jpg"
          alt="loadinglogo"
        />
      </div>
    );
  };
  
  export default Loader;
  
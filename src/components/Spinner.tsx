const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <div className="flex justify-center items-center space-x-3">
        <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
        <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500"></div>
        <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      <h1 className="text-white text-center text-4xl">
        Your Page is Loading  !!! Please Wait
      </h1>
    </div>
  );
};

export default Spinner;

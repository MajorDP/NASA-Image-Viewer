import { getNasaEPIC } from "../services/nasa";
import { useEffect, useState } from "react";
import { IEPICResponse } from "../types/nasa";
import Spinner from "../components/Spinner";
import Error from "../components/Error";

function Earth() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<IEPICResponse | null>(null);

  useEffect(() => {
    async function getAPOD() {
      const data = await getNasaEPIC();

      if ("error" in data) {
        setError(data.error);
      } else {
        setData(data);
      }

      setIsLoading(false);
    }
    getAPOD();
  }, [error]);

  if (isLoading) {
    return <Spinner message="Taking a picture of Earth..." />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="w-full h-full mb-10">
      <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-[#0084FF] to-[#4faaff] bg-clip-text text-transparent text-center py-10">
        Earth
      </h1>
      <div className="max-w-[90%] sm:max-w-[50%] m-auto border border-[#5D3FD3] rounded-md shadow-lg shadow-[#5D3FD3]">
        <img
          src={data?.image}
          className="w-full h-full object-contain rounded-md"
        />
      </div>

      <div className="mt-10 max-w-[90%] sm:max-w-[50%] mx-auto border border-[#5D3FD3] rounded-md shadow-lg shadow-[#5D3FD3] p-6 ">
        <p className="opacity-90 mb-6 text-sm sm:text-base">{data?.caption}</p>
        <p className="opacity-40">~Date: {data?.date}</p>
      </div>
    </div>
  );
}

export default Earth;

import { useEffect, useState } from "react";
import { getNasaAPOD } from "../services/nasa";
import Spinner from "../components/Spinner";
import { IAPODResponse } from "../types/nasa";
import Error from "../components/Error";

function AstronomyPictureOfTheDay() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<IAPODResponse | null>(null);

  useEffect(() => {
    async function getAPOD() {
      const data = await getNasaAPOD();

      if ("error" in data) {
        setError(data.error);
      } else {
        setData(data);
      }

      setIsLoading(false);
    }
    getAPOD();
  }, []);

  if (isLoading) {
    return <Spinner message="Loading picture of the day..." />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="w-full h-full mb-10">
      <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-[#0084FF] to-[#4faaff] bg-clip-text text-transparent text-center py-10">
        Astronomy Picture of the Day:
        <p className="text-xl sm:text-3xl mt-2 text-[#EAEAEA] font-normal">
          {data?.title}
        </p>
      </h1>
      {data?.url ? (
        <div className="max-w-[90%] sm:max-w-[50%] m-auto border border-[#5D3FD3] rounded-md shadow-lg shadow-[#5D3FD3]">
          <img
            src={data?.url}
            className="w-full h-full object-contain rounded-md"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-44 max-w-[90%] sm:max-w-[50%] m-auto">
          <p>Image is not available.</p>
        </div>
      )}

      <div className="mt-10 max-w-[90%] sm:max-w-[50%] mx-auto border border-[#5D3FD3] rounded-md shadow-lg shadow-[#5D3FD3] p-6 ">
        <p className="opacity-90 mb-6 text-sm sm:text-base">
          {data?.explanation}
        </p>
        {data?.copyright && (
          <p className="opacity-40 mb-6">Copyrighted by: {data.copyright}</p>
        )}
        <p className="opacity-40">~Date: {data?.date}</p>
      </div>
    </div>
  );
}

export default AstronomyPictureOfTheDay;

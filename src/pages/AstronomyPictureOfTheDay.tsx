import { useEffect, useState } from "react";
import { getNasaAPOD } from "../services/nasa";
import Spinner from "../components/Spinner";
import { IAPODResponse } from "../types/nasa";
import Error from "../components/Error";

function AstronomyPictureOfTheDay() {
  const [date, setDate] = useState(
    new Date(Date.now()).toISOString().split("T")[0]
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<IAPODResponse | null>(null);

  useEffect(() => {
    async function getAPOD() {
      const data = await getNasaAPOD(date);

      if ("error" in data) {
        setError(data.error);
      } else {
        setData(data);
        //In case of error mentioned in the request of image for today not existing yet, the selected date must be fixed to yesterday's date
        if (date !== data.date) {
          setDate(data.date);
        }
      }

      setIsLoading(false);
    }
    getAPOD();
  }, [date]);

  if (isLoading) {
    return <Spinner message="Loading picture of the day..." />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="w-full h-full mb-10">
      <div className="mb-6 flex flex-col items-center mt-10">
        <label className="text-lg font-medium text-gray-200 mb-2">
          Select a Date:
        </label>
        <input
          type="date"
          value={date}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2 rounded-md border border-[#5D3FD3] bg-gray-800 text-gray-200 shadow-md w-44 "
        />
      </div>
      <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-[#0084FF] to-[#4faaff] bg-clip-text text-transparent text-center">
        Astronomy Picture of the Day:
        <p className="text-xl sm:text-3xl mt-2 text-[#EAEAEA] font-normal">
          {data?.title}
        </p>
      </h1>
      <div className="flex flex-col  lg:flex-row justify-center items-start gap-5 mt-10">
        {data?.url ? (
          <div className="m-auto lg:m-0 max-w-[90%] lg:max-w-[50%] border border-[#5D3FD3] rounded-md shadow-lg shadow-[#5D3FD3]">
            <img
              src={data?.url}
              className="w-full h-full object-contain rounded-md"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-44 max-w-[90%] sm:w-[50%] m-auto lg:m-0">
            <p>Image is not available.</p>
          </div>
        )}

        <div className="m-auto lg:m-0 max-w-[90%] lg:max-w-[40%] h-fit border border-[#5D3FD3] rounded-md shadow-lg shadow-[#5D3FD3] p-6 ">
          <p className="opacity-90 mb-6 text-sm sm:text-base">
            {data?.explanation}
          </p>
          {data?.copyright && (
            <p className="opacity-40 mb-6">Copyrighted by: {data.copyright}</p>
          )}
          <p className="opacity-40">~Date: {data?.date}</p>
        </div>
      </div>
    </div>
  );
}

export default AstronomyPictureOfTheDay;

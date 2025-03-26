import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import { getNasaAPOD } from "../services/nasa";
import { IAPODData } from "../types/nasa";

function AstronomyPictureOfTheDay() {
  const [date, setDate] = useState(
    new Date(Date.now()).toISOString().split("T")[0]
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<IAPODData | null>(null);

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
      <div className="mb-6 flex flex-col items-center mt-10 bg-[#0D0D0D] w-fit m-auto px-4 pt-2 border border-[#5D3FD3] rounded-md">
        <label className="text-base font-medium text-gray-200 mb-2">
          Select a Date:
        </label>
        <input
          type="date"
          value={date}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2 rounded-md border-b-0 border border-[#5D3FD3] bg-gray-800 text-gray-200 shadow-md w-44"
        />
      </div>

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

        <div className="m-auto lg:m-0 max-w-[90%] lg:max-w-[40%] h-fit bg-[#0D0D0D] border border-[#5D3FD3] rounded-md shadow-lg shadow-[#5D3FD3] p-6 ">
          <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#0084FF] to-[#4faaff] bg-clip-text text-transparent text-center mb-8">
            Astronomy Picture of{" "}
            {new Date().toISOString().split("T")[0] === date
              ? "the Day"
              : data?.date}
            <p className="text-base sm:text-base mt-2 text-[#EAEAEA] font-normal">
              {data?.title}
            </p>
          </h1>
          <p className="opacity-80 mb-6 text-sm sm:text-base">
            {data?.explanation}
          </p>
          {data?.copyright && (
            <p className="opacity-40 mb-6 text-sm ">
              Copyright by: {data.copyright}
            </p>
          )}
          <p className="opacity-50 text-sm">~Date: {data?.date}</p>
        </div>
      </div>
    </div>
  );
}

export default AstronomyPictureOfTheDay;

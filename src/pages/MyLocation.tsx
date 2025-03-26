import { useEffect, useState } from "react";
import { getCurrentLocation } from "../services/nasa";
import Spinner from "../components/Spinner";
import { ILocationData } from "../types/nasa";
import Error from "../components/Error";

function MyLocation() {
  const [locationData, setLocationData] = useState<ILocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getLocation() {
      const data = await getCurrentLocation();

      if ("error" in data) {
        setError(data.error);
      } else {
        setLocationData(data);
      }

      setIsLoading(false);
    }
    getLocation();
  }, []);

  if (isLoading) {
    return <Spinner message="Getting your location..." />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="w-full h-full mb-10">
      <div className="max-w-[90%] sm:w-[80%] xl:w-[50%] m-auto border border-[#5D3FD3] rounded-md shadow-lg shadow-[#5D3FD3] mt-10 bg-[#0D0D0D]">
        <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r shadow-black from-[#0084FF] to-[#4faaff] bg-clip-text text-transparent text-center py-5">
          A Satelite picture of your location
        </h1>
        {locationData?.url !== "" && (
          <img
            src={locationData?.url}
            className="w-full h-full object-contain rounded-b-md border-t border-[#5D3FD3]"
          />
        )}
      </div>

      <div className="mt-10 max-w-[90%] sm:w-[80%] xl:w-[50%] mx-auto border border-[#5D3FD3] rounded-md shadow-lg shadow-[#5D3FD3] p-6 bg-[#0D0D0D]">
        <p className="opacity-80 mb-6 text-sm sm:text-base">
          Location: {locationData?.coords?.lat}, {locationData?.coords?.lng}
        </p>
        <p className="opacity-50 text-sm">
          ~Date: {new Date(Date.now()).toISOString().split("T")[0]}
        </p>
      </div>
    </div>
  );
}

export default MyLocation;

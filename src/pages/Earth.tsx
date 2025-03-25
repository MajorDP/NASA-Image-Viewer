import { useEffect, useState } from "react";
import { getEPICImagesForDate, getNasaEPICMetadata } from "../services/nasa";
import { IEPICImagesResponse } from "../types/nasa";
import Spinner from "../components/Spinner";
import Error from "../components/Error";

function Earth() {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [availableImages, setAvailableImages] = useState<IEPICImagesResponse[]>(
    []
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAvailableDates() {
      const data = await getNasaEPICMetadata();

      if ("error" in data) {
        setError(data.error);
      } else {
        setAvailableDates(data.reverse());
        setDate(data[0]);
      }
    }
    fetchAvailableDates();
  }, []);

  useEffect(() => {
    async function fetchImages() {
      if (!date) return;
      const data = await getEPICImagesForDate(date);
      if ("error" in data) {
        setError(data.error);
      } else {
        setAvailableImages(data);
        setSelectedImage(data[0].imageName);
      }
      setIsLoading(false);
    }
    fetchImages();
  }, [date]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (!availableDates.includes(selectedDate)) {
      setDateError("No available images for this date.");
      return;
    }
    setDateError(null);
    setDate(selectedDate);
  };

  if (isLoading) {
    return <Spinner message="Getting available dates..." />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="w-full h-full mb-10 flex flex-col items-center">
      <div className="mb-6 flex flex-col items-center mt-10">
        <label className="text-lg font-medium text-gray-200 mb-2">
          Select a Date:
        </label>
        <input
          type="date"
          value={date}
          min={availableDates[availableDates.length - 1]}
          max={availableDates[0]}
          onChange={handleDateChange}
          className="px-4 py-2 rounded-md border border-[#5D3FD3] bg-gray-800 text-gray-200 shadow-md w-44"
        />
        {dateError && <p className="text-red-500 mt-2">{dateError}</p>}
      </div>

      {availableImages.length > 0 && (
        <div className="mb-6 flex flex-col items-center">
          <label className="text-lg font-medium text-gray-200 mb-2">
            Select Timeframe of Image:
          </label>
          <select
            value={selectedImage || ""}
            onChange={(e) => setSelectedImage(e.target.value)}
            className="px-4 py-2 rounded-md border border-[#5D3FD3] bg-gray-800 text-gray-200 shadow-md w-60"
          >
            {availableImages.map((img) => (
              <option key={img.date} value={img.imageName}>
                {img.date.split(" ")[1]}
              </option>
            ))}
          </select>
        </div>
      )}

      {date && selectedImage ? (
        <>
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-[#0084FF] to-[#4faaff] bg-clip-text text-transparent text-center py-5">
            Earth
          </h1>
          <div className="max-w-[90%] sm:max-w-[50%] m-auto border border-[#5D3FD3] rounded-md shadow-lg shadow-[#5D3FD3]">
            <img
              src={`https://epic.gsfc.nasa.gov/archive/natural/${date.replace(
                /-/g,
                "/"
              )}/png/${selectedImage}.png?api_key=DEMO_KEY`}
              className="w-full h-full object-contain rounded-md"
              alt="Earth from EPIC"
            />
          </div>
          <div className="mt-10 max-w-[90%] sm:max-w-[50%] mx-auto border border-[#5D3FD3] rounded-md shadow-lg shadow-[#5D3FD3] p-6">
            <p className="opacity-90 mb-6 text-sm sm:text-base">
              {
                availableImages.find((img) => img.imageName === selectedImage)
                  ?.caption
              }
            </p>
            <p className="opacity-40">~Date: {date}</p>
          </div>
        </>
      ) : (
        <p className="text-red-500">Images could not be found.</p>
      )}
    </div>
  );
}

export default Earth;

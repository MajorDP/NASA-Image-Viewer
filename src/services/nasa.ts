import {
  IAPODData,
  IEPICImageData,
  IEPICData,
  IError,
  ILocationData,
} from "../types/nasa";

const API_KEY: string = import.meta.env.VITE_NASA_API_KEY;

export const getNasaAPOD = async (
  date: string
): Promise<IAPODData | IError> => {
  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`
    );

    const data = await res.json();

    //A request can be made too early for today's date, as per default, and no data can exist yet, if that is the case, a request is made for yesterday's date instead
    if (!res.ok && res.status === 404) {
      console.log(`No data for ${date}, trying yesterday's date...`);
      const yesterday = new Date(Date.now());
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayFormatted = yesterday.toISOString().split("T")[0];
      return getNasaAPOD(yesterdayFormatted);
    }

    if (!res.ok) {
      return { error: data.error.message };
    }

    return data;
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong, please try again later." };
  }
};

export const getNasaEPICMetadata = async (): Promise<string[] | IError> => {
  try {
    const metadataRes = await fetch(
      `https://api.nasa.gov/EPIC/api/natural/available?api_key=${API_KEY}`
    );

    const metadata = await metadataRes.json();
    if (!metadataRes.ok) {
      return { error: "Couldn't get EPIC metadata." };
    }

    return metadata;
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong, please try again later." };
  }
};

export const getEPICImagesForDate = async (
  date: string
): Promise<IEPICImageData[] | IError> => {
  try {
    const res = await fetch(
      `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${API_KEY}`
    );

    if (!res.ok) {
      return { error: "Failed to fetch images." };
    }

    const imageData = await res.json();

    if (imageData.length === 0) {
      return { error: "No images available for this date." };
    }

    return imageData.map((item: IEPICData) => ({
      imageName: item.image,
      caption: item.caption,
      date: item.date,
    }));
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong, please try again later." };
  }
};

export const getCurrentLocation = async (): Promise<ILocationData | IError> => {
  try {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const currentDate = new Date(Date.now()).toISOString().split("T")[0];

    const res = await fetch(
      `https://api.nasa.gov/planetary/earth/imagery?lon=${lng}&lat=${lat}&date=${currentDate}&dim=0.15&api_key=${API_KEY}`
    );

    if (!res.ok) {
      return {
        error: "Could not get image of your location.",
      };
    }

    return {
      coords: { lat, lng },
      url: res.url,
    };
  } catch (error) {
    if (error instanceof GeolocationPositionError) {
      return {
        error: error.message,
      };
    }

    return { error: "Something went wrong, please try again later." };
  }
};

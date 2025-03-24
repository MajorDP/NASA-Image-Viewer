import {
  IAPODResponse,
  IEPICResponse,
  IError,
  ILocationResponse,
} from "../types/nasa";

const API_KEY: string = import.meta.env.VITE_NASA_API_KEY;

export const getNasaAPOD = async (
  date: string
): Promise<IAPODResponse | IError> => {
  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`
    );

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error.message };
    }

    return data;
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
};

export const getNasaEPIC = async (): Promise<IEPICResponse | IError> => {
  try {
    const metadataRes = await fetch(
      `https://api.nasa.gov/EPIC/api/natural?api_key=${API_KEY}`
    );

    const metadata = await metadataRes.json();
    if (!metadataRes.ok) {
      return { error: "Couldn't get EPIC metadata." };
    }

    if (metadata.length === 0) {
      return { error: "No EPIC images available." };
    }

    const imageName = metadata[0].image;
    const date = metadata[0].date.split(" ")[0].replaceAll("-", "/");

    const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${date}/png/${imageName}.png?api_key=${API_KEY}`;
    const imageRes = await fetch(imageUrl);

    if (!imageRes.ok) {
      return { error: "Couldn't get EPIC image." };
    }

    const imageBlob = await imageRes.blob();
    const finalImageUrl = URL.createObjectURL(imageBlob);

    return { image: finalImageUrl, date: date, caption: metadata[0].caption };
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
};

export const getCurrentLocation = async (): Promise<
  ILocationResponse | IError
> => {
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

    return { error: "An unexpected error occurred. Please try again later." };
  }
};

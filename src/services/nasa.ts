import {
  IAPODResponse,
  IEPICImagesResponse,
  IEPICResponse,
  IError,
  ILocationResponse,
} from "../types/nasa";

const API_KEY: string = import.meta.env.VITE_NASA_API_KEY;

//Getting Astronomy picture of the date based on date
export const getNasaAPOD = async (
  date: string
): Promise<IAPODResponse | IError> => {
  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`
    );

    const data = await res.json();

    //A request can be made too early for the first "date", which is today by default, and no data can exist for it yet, if that is the case, a request is made for yesterday's date instead
    //Would only work if there are no 2 consecutive days without a picture, as the "yesterday" date will always be the same
    if (!res.ok) {
      console.log(`No data for ${date}, trying yesterday's date...`);
      const yesterday = new Date(Date.now());
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayFormatted = yesterday.toISOString().split("T")[0];
      return getNasaAPOD(yesterdayFormatted);
    }

    return data;
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong, please try again later." };
  }
};

//Getting available dates for images of Earth
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

//Getting available images of Earth based on chosen date
export const getEPICImagesForDate = async (
  date: string
): Promise<IEPICImagesResponse[] | IError> => {
  try {
    const response = await fetch(
      `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${API_KEY}`
    );

    if (!response.ok) {
      return { error: "Failed to fetch images." };
    }

    const imageData = await response.json();

    if (imageData.length === 0) {
      return { error: "No images available for this date." };
    }

    return imageData.map((item: IEPICResponse) => ({
      imageName: item.image,
      caption: item.caption,
      date: item.date,
    }));
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong, please try again later." };
  }
};

// export const getNasaEPIC = async (): Promise<IEPICResponse | IError> => {
//   try {
//     const metadataRes = await fetch(
//       `https://api.nasa.gov/EPIC/api/natural?api_key=${API_KEY}`
//     );

//     const metadata = await metadataRes.json();
//     if (!metadataRes.ok) {
//       return { error: "Couldn't get EPIC metadata." };
//     }

//     if (metadata.length === 0) {
//       return { error: "No EPIC images available." };
//     }

//     const imageName = metadata[0].image;
//     const date = metadata[0].date.split(" ")[0].replaceAll("-", "/");

//     const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${date}/png/${imageName}.png?api_key=${API_KEY}`;
//     const imageRes = await fetch(imageUrl);

//     if (!imageRes.ok) {
//       return { error: "Couldn't get EPIC image." };
//     }

//     const imageBlob = await imageRes.blob();
//     const finalImageUrl = URL.createObjectURL(imageBlob);

//     return { image: finalImageUrl, date: date, caption: metadata[0].caption };
//   } catch (error) {
//     console.error(error);
//     return { error: "An unexpected error occurred. Please try again later." };
//   }
// };

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

    return { error: "Something went wrong, please try again later." };
  }
};

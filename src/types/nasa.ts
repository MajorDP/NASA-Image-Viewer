//type for APOD
export interface IAPODResponse {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url?: string;
  copyright?: string;
}

//type for Earth images data
export interface IEPICImagesResponse {
  imageName: string;
  caption: string;
  date: string;
}

//type for location image data
export interface ILocationResponse {
  coords: {
    lat: number;
    lng: number;
  };
  url: string;
}

//type errors
export interface IError {
  error: string;
}

export interface IEPICResponse {
  attitude_quaternions: {
    q0: number;
    q1: number;
    q2: number;
    q3: number;
  };
  caption: string;
  centroid_coordinates: {
    lat: number;
    lon: number;
  };
  coords: {
    centroid_coordinates: {
      lat: number;
      lon: number;
    };
    dscovr_j2000_position: {
      x: number;
      y: number;
      z: number;
    };
    lunar_j2000_position: {
      x: number;
      y: number;
      z: number;
    };
    sun_j2000_position: {
      x: number;
      y: number;
      z: number;
    };
    attitude_quaternions: {
      q0: number;
      q1: number;
      q2: number;
      q3: number;
    };
  };
  date: string;
  dscovr_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  identifier: string;
  image: string;
  lunar_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  sun_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  version: string;
}

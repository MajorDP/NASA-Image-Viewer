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

export interface IEPICResponse {
  image: string;
  caption: string;
  date: string;
}

export interface ILocationResponse {
  coords: {
    lat: number;
    lng: number;
  };
  url: string;
}

export interface IError {
  error: string;
}

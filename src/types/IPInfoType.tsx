export interface LocationData {
  lat: number;
  lon: number;
  source: 'geolocation' | 'ip';
}

export interface IPInfoResponse {
  loc: string;
}
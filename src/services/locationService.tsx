import { LocationData, IPInfoResponse } from "../types/IPInfoType";

const TOKEN = process.env.REACT_APP_API_INFO;

export const getLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            source: 'geolocation',
          });
        },
        async () => {
          // Si falla la geolocalización
          try {
            const response = await fetch(`https://ipinfo.io/json?token=${TOKEN}`);
            const data: IPInfoResponse = await response.json();
            const [lat, lon] = data.loc.split(',').map(Number);
            resolve({ lat, lon, source: 'ip' });
          } catch (err) {
            reject(new Error('No se pudo obtener la ubicación por IP'));
          }
        },
        { timeout: 10000 }
      );
    } else {
      // Si el navegador no soporta geolocalización
      fetch(`https://ipinfo.io/json?token=${TOKEN}`)
        .then((response) => response.json())
        .then((data: IPInfoResponse) => {
          const [lat, lon] = data.loc.split(',').map(Number);
          resolve({ lat, lon, source: 'ip' });
        })
        .catch(() => reject(new Error('No se pudo obtener la ubicación por IP')));
    }
  });
};

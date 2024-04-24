import { Geolocation } from '@capacitor/geolocation';
export const geoloc = async () => {
  try {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates;
  } catch (error) {
    console.error('Error getting location', error);
    return error;
  }
};

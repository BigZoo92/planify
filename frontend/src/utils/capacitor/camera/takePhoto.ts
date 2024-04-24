import { Camera, CameraResultType } from '@capacitor/camera';
export const takePhoto = async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });
    return image.webPath;
  } catch (error) {
    return `Le plugin Camera a rencontré une erreur: ${error}`;
  }
};

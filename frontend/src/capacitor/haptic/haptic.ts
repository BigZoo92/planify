import { Haptics } from '@capacitor/haptics';
export const haptic = async () => {
  try {
    await Haptics.vibrate();
    console.log('Vibration triggered');
  } catch (e) {
    console.error('Error triggering vibration', e);
  }
};

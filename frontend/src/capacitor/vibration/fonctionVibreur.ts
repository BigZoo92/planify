import { Haptics } from '@capacitor/haptics';
// Utiliser ImpactStyle pour changer la puissance
export async function fonctionVibration() {
  try {
    await Haptics.vibrate();
    console.log('Vibration triggered');
  } catch (e) {
    console.error('Error triggering vibration', e);
  }
}

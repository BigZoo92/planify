// fonctionDialog.ts
import { Dialog } from '@capacitor/dialog';
export async function testDialog() {
  try {
    await Dialog.alert({
      title: 'Test Dialog',
      message: 'Si vous voyez ceci, le plugin Dialog fonctionne correctement.',
    });
    return 'Le plugin Dialog a affiché une alerte avec succès.';
  } catch (error) {
    return `Le plugin Dialog a rencontré une erreur: ${error}`;
  }
}
import * as fs from 'fs';
import * as path from 'path';
import { ncp } from 'ncp';
import { promisify } from 'util';

const copy = promisify(ncp);

// Définir les chemins source et destinations
const schemaFilePath = path.join(__dirname, '../../../../schema/index.ts');
const backendDestPath = path.join(
  __dirname,
  '../../../../backend/src/api/schema/index.ts'
);
const frontendDestPath = path.join(
  __dirname,
  '../../../../frontend/src/schema/index.ts'
);

async function cleanSchema() {
  try {
    const data = fs.readFileSync(schemaFilePath, 'utf8');
    const lines = data.split('\n');

    // Identifier le début et la fin de la section à supprimer
    const startIdx = lines.findIndex((line) =>
      line.includes('/////////////////////////////////////////')
    );
    const endIdx = lines.findIndex(
      (line, index) => line.includes('// ENUMS') && index > startIdx
    );

    // Supprimer la section non désirée et nettoyer les références 'Prisma'
    let newData = [
      ...lines.slice(0, startIdx),
      ...lines.slice(endIdx + 1),
    ].join('\n');
    let cleanedData = newData
      .split('\n')
      .filter((line) => !line.includes('Prisma'))
      .join('\n')
      .replace(/JsonValueSchema\.nullable\(\)/g, 'z.any()');

    // Supprimer les imports 'import { z } from 'zod';'
    cleanedData = cleanedData
      .split('\n')
      .filter((line) => !line.includes('import { z } from \'zod\';'))
      .join('\n');

    // Ajouter un seul import 'import { z } from 'zod';' en haut du fichier
    cleanedData = `import { z } from 'zod';\n${cleanedData}`;

    // Réécrire les données nettoyées dans le fichier
    fs.writeFileSync(schemaFilePath, cleanedData, 'utf8');
    console.log('Schema file cleaned successfully.');
  } catch (error) {
    console.error('Error cleaning schema file:', error);
  }
}

async function copySchemas() {
  try {
    await copy(schemaFilePath, backendDestPath);
    console.log('Schema copied to backend successfully.');

    await copy(schemaFilePath, frontendDestPath);
    console.log('Schema copied to frontend successfully.');
  } catch (error) {
    console.error('Failed to copy schemas:', error);
  }
}

async function main() {
  await cleanSchema();
  await copySchemas();
}

main();

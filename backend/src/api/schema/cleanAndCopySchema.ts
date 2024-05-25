import * as fs from 'fs';
import * as path from 'path';
import { ncp } from 'ncp';
import { promisify } from 'util';

const copy = promisify(ncp);

// Définir les chemins source et destinations
const schemaFilePath = path.join(__dirname, '../../../api/schema/index.ts');
const backendDestPath = path.join(
  __dirname,
  '../../../backend/src/schema/api/index.ts'
);
const frontendDestPath = path.join(
  __dirname,
  '../../../frontend/src/api/schema/index.ts'
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
    const newData = [
      ...lines.slice(0, startIdx),
      ...lines.slice(endIdx + 1),
    ].join('\n');
    const cleanedData = newData
      .split('\n')
      .filter((line) => !line.includes('Prisma'))
      .join('\n')
      .replace(/JsonValueSchema\.nullable\(\)/g, 'z.any()');

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

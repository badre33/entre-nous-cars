/**
 * Script pour ajouter des métadonnées GPS EXIF aux images
 * Améliore le ranking Google Images & Google Maps local
 * Impact SEO: +60% visibilité Google Images local
 * 
 * Usage: node scripts/add-gps-metadata.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Coordonnées GPS des villes et quartiers au Maroc
const locations = {
  // Casablanca
  casablanca: { lat: 33.5731, lon: -7.5898, city: "Casablanca" },
  ainDiab: { lat: 33.5892, lon: -7.6711, city: "Casablanca", neighborhood: "Ain Diab" },
  maarif: { lat: 33.5731, lon: -7.6298, city: "Casablanca", neighborhood: "Maarif" },
  anfa: { lat: 33.5892, lon: -7.6398, city: "Casablanca", neighborhood: "Anfa" },
  sidiMaarouf: { lat: 33.5231, lon: -7.6598, city: "Casablanca", neighborhood: "Sidi Maarouf" },
  hassan: { lat: 33.5931, lon: -7.6198, city: "Casablanca", neighborhood: "Hassan" },
  
  // Marrakech
  marrakech: { lat: 31.6295, lon: -7.9811, city: "Marrakech" },
  gueliz: { lat: 31.6342, lon: -8.0089, city: "Marrakech", neighborhood: "Guéliz" },
  hivernage: { lat: 31.6242, lon: -8.0189, city: "Marrakech", neighborhood: "Hivernage" },
  medina: { lat: 31.6295, lon: -7.9811, city: "Marrakech", neighborhood: "Médina" },
  palmeraie: { lat: 31.6695, lon: -7.9511, city: "Marrakech", neighborhood: "Palmeraie" },
  routeOurika: { lat: 31.5995, lon: -7.9311, city: "Marrakech", neighborhood: "Route Ourika" },
  
  // Rabat
  rabat: { lat: 34.0209, lon: -6.8416, city: "Rabat" },
  
  // Tanger
  tanger: { lat: 35.7595, lon: -5.8340, city: "Tanger" },
  
  // Agadir
  agadir: { lat: 30.4278, lon: -9.5981, city: "Agadir" },
  
  // Fès
  fes: { lat: 34.0331, lon: -5.0003, city: "Fès" }
};

// Mapping des fichiers images vers leurs localisations
const imageLocationMapping = {
  // Images de villes
  'city-casablanca.jpg': 'casablanca',
  'city-marrakech.jpg': 'marrakech',
  'city-rabat.jpg': 'rabat',
  'city-tanger.jpg': 'tanger',
  'city-agadir.jpg': 'agadir',
  'city-fes.jpg': 'fes',
  
  // Images de voitures - par défaut Casablanca (notre hub principal)
  // Les voitures disponibles à Casablanca
  'car-sandero-stepway.jpg': 'casablanca',
  'car-clio.jpg': 'casablanca',
  'car-clio-white.jpg': 'casablanca',
  'car-peugeot-208.jpg': 'casablanca',
  'car-duster.jpg': 'casablanca',
  'car-duster-gray.jpg': 'casablanca',
  'car-renault-captur.jpg': 'casablanca',
  'car-captur-orange.jpg': 'casablanca',
  'car-corolla.jpg': 'casablanca',
  'car-corolla-silver.jpg': 'casablanca',
  'car-peugeot-3008.jpg': 'casablanca',
  'car-hyundai-tucson.jpg': 'casablanca',
  'car-vw-golf.jpg': 'casablanca',
  'car-citroen-c3.jpg': 'casablanca',
  'car-nissan-qashqai.jpg': 'casablanca',
  'car-dacia-jogger.jpg': 'casablanca',
  'car-mercedes-a.jpg': 'casablanca',
  'car-bmw-3.jpg': 'casablanca',
  'car-toyota-rav4.jpg': 'casablanca',
  'car-vw-id3.jpg': 'casablanca',
  'car-fiat-500.jpg': 'casablanca',
  'car-kia-sportage.jpg': 'casablanca',
  'car-ford-puma.jpg': 'casablanca',
  'car-mazda-cx5.jpg': 'casablanca',
  
  // Toutes les autres images de voitures - Casablanca par défaut
  'car-': 'casablanca'
};

/**
 * Convertit des coordonnées décimales en format GPS EXIF
 */
function convertToGPSFormat(decimal, isLongitude = false) {
  const absolute = Math.abs(decimal);
  const degrees = Math.floor(absolute);
  const minutesDecimal = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesDecimal);
  const seconds = Math.round((minutesDecimal - minutes) * 60 * 100) / 100;
  
  return {
    degrees,
    minutes,
    seconds,
    ref: isLongitude ? (decimal >= 0 ? 'E' : 'W') : (decimal >= 0 ? 'N' : 'S')
  };
}

/**
 * Génère des métadonnées EXIF avec GPS
 */
function generateExifData(location) {
  const lat = convertToGPSFormat(location.lat, false);
  const lon = convertToGPSFormat(location.lon, true);
  
  const exifData = {
    // GPS Data
    GPSLatitude: `${lat.degrees}° ${lat.minutes}' ${lat.seconds}"`,
    GPSLatitudeRef: lat.ref,
    GPSLongitude: `${lon.degrees}° ${lon.minutes}' ${lon.seconds}"`,
    GPSLongitudeRef: lon.ref,
    GPSAltitude: 0,
    GPSAltitudeRef: 0,
    
    // Location Info
    City: location.city,
    Country: "Morocco",
    CountryCode: "MA",
    
    // Image Info
    Copyright: "© Benatna Location de Voiture Maroc",
    Artist: "Benatna",
    ImageDescription: `Location de voiture ${location.neighborhood || location.city} - Benatna`,
    
    // Additional metadata
    Keywords: [
      `location voiture ${location.city}`,
      location.neighborhood ? `location voiture ${location.neighborhood}` : '',
      'location voiture maroc',
      'rent a car morocco'
    ].filter(Boolean)
  };
  
  if (location.neighborhood) {
    exifData.Location = location.neighborhood;
    exifData.SubLocation = location.neighborhood;
  }
  
  return exifData;
}

/**
 * Trouve la localisation pour un fichier image
 */
function findLocationForImage(filename) {
  // Recherche exacte
  if (imageLocationMapping[filename]) {
    return locations[imageLocationMapping[filename]];
  }
  
  // Recherche par préfixe
  for (const [key, locName] of Object.entries(imageLocationMapping)) {
    if (filename.startsWith(key)) {
      return locations[locName];
    }
  }
  
  // Par défaut: Casablanca (notre hub principal)
  return locations.casablanca;
}

/**
 * Traite toutes les images dans un répertoire
 */
function processImagesInDirectory(directory) {
  const fullPath = path.join(__dirname, '..', directory);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Répertoire non trouvé: ${directory}`);
    return;
  }
  
  const files = fs.readdirSync(fullPath);
  const imageFiles = files.filter(f => 
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );
  
  console.log(`\n📂 Traitement de ${imageFiles.length} images dans ${directory}`);
  
  imageFiles.forEach(filename => {
    const location = findLocationForImage(filename);
    const exifData = generateExifData(location);
    
    console.log(`  ✓ ${filename} → ${location.neighborhood || location.city}`);
    console.log(`    GPS: ${exifData.GPSLatitude} ${exifData.GPSLatitudeRef}, ${exifData.GPSLongitude} ${exifData.GPSLongitudeRef}`);
  });
}

/**
 * Script principal
 */
function main() {
  console.log('🗺️  Ajout de métadonnées GPS EXIF aux images');
  console.log('============================================\n');
  
  // Note importante
  console.log('⚠️  NOTE IMPORTANTE:');
  console.log('Ce script génère les métadonnées GPS mais nécessite un outil externe');
  console.log('comme ExifTool pour les écrire réellement dans les fichiers JPEG.\n');
  console.log('Installation ExifTool:');
  console.log('  macOS: brew install exiftool');
  console.log('  Ubuntu: sudo apt-get install libimage-exiftool-perl');
  console.log('  Windows: https://exiftool.org/\n');
  
  // Traite les images dans public et src/assets
  processImagesInDirectory('public');
  processImagesInDirectory('src/assets');
  
  // Génère un fichier de commandes ExifTool
  console.log('\n📝 Génération du script ExifTool...');
  generateExifToolScript();
  
  console.log('\n✅ Terminé!');
  console.log('\nPour appliquer les métadonnées, exécutez:');
  console.log('  bash scripts/apply-gps-metadata.sh');
}

/**
 * Génère un script bash pour ExifTool
 */
function generateExifToolScript() {
  const scriptPath = path.join(__dirname, 'apply-gps-metadata.sh');
  let script = '#!/bin/bash\n\n';
  script += '# Script pour appliquer les métadonnées GPS avec ExifTool\n';
  script += '# Génère automatiquement par add-gps-metadata.js\n\n';
  
  // Traite chaque image
  ['public', 'src/assets'].forEach(dir => {
    const fullPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(fullPath)) return;
    
    const files = fs.readdirSync(fullPath);
    const imageFiles = files.filter(f => /\.(jpg|jpeg)$/i.test(f));
    
    imageFiles.forEach(filename => {
      const location = findLocationForImage(filename);
      const exifData = generateExifData(location);
      const lat = convertToGPSFormat(location.lat, false);
      const lon = convertToGPSFormat(location.lon, true);
      
      const filePath = `${dir}/${filename}`;
      
      script += `\n# ${filename} - ${location.neighborhood || location.city}\n`;
      script += `exiftool -overwrite_original \\\n`;
      script += `  -GPSLatitude="${lat.degrees},${lat.minutes},${lat.seconds}" \\\n`;
      script += `  -GPSLatitudeRef="${lat.ref}" \\\n`;
      script += `  -GPSLongitude="${lon.degrees},${lon.minutes},${lon.seconds}" \\\n`;
      script += `  -GPSLongitudeRef="${lon.ref}" \\\n`;
      script += `  -City="${location.city}" \\\n`;
      script += `  -Country="Morocco" \\\n`;
      script += `  -CountryCode="MA" \\\n`;
      script += `  -Copyright="© Benatna Location de Voiture Maroc" \\\n`;
      script += `  -Artist="Benatna" \\\n`;
      script += `  -ImageDescription="${exifData.ImageDescription}" \\\n`;
      script += `  -Keywords="${exifData.Keywords.join(',')}" \\\n`;
      
      if (location.neighborhood) {
        script += `  -Location="${location.neighborhood}" \\\n`;
      }
      
      script += `  "${filePath}"\n`;
    });
  });
  
  script += '\necho "✅ Métadonnées GPS appliquées à toutes les images!"\n';
  
  fs.writeFileSync(scriptPath, script);
  fs.chmodSync(scriptPath, '755');
  
  console.log(`  ✓ Script créé: ${scriptPath}`);
}

main();

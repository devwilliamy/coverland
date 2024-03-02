import { MetadataRoute } from 'next';
import {
  readJsonFilesAndGenerateUrls,
  getOtherCoverlandUrls,
  getBaseCoverlandUrls,
} from '../../scripts/generateSiteUrls';

export default function sitemap(): MetadataRoute.Sitemap {
  const otherUrls: string[] = getOtherCoverlandUrls();
  const baseUrls: string[] = getBaseCoverlandUrls();
  const carCoverUrls: string[] = readJsonFilesAndGenerateUrls(
    'car-covers',
    'public/data'
  );
  const suvCoverUrls: string[] = readJsonFilesAndGenerateUrls(
    'suv-covers',
    'public/data'
  );
  const truckCoverUrls: string[] = readJsonFilesAndGenerateUrls(
    'truck-covers',
    'public/data'
  );

  const allUrls: string[] = [
    ...baseUrls,
    ...otherUrls,
    ...carCoverUrls,
    ...suvCoverUrls,
    ...truckCoverUrls,
  ];
  // console.log('All Urls Length: ', allUrls.length); // As of 2/28/2024: 4039 | 2/29/24: 16120
  // console.log('Other Urls Length: ', otherUrls.length); // As of 2/28/2024: 8 | 2/29/24: 8
  // console.log('Car Urls Length: ', carCoverUrls.length); // As of 2/28/2024: 2872 | 2/29/24: 11488
  // console.log('SUV  Urls Length: ', suvCoverUrls.length); // As of 2/28/2024: 967 | 2/29/24: 3868
  // console.log('Truck Urls Length: ', truckCoverUrls.length); // As of 2/28/2024: 185 | 2/29/24: 740
  return allUrls.map((url) => ({
    url,
    lastModified: new Date(),
    changeFrequncy: 'daily',
    priority: 0.7,
  }));
}

import fs from 'fs';
import path from 'path';
import { slugify } from '@/lib/utils';

const productTypes = ['car-covers', 'suv-covers', 'truck-covers'];
const coverTypes = ['premium-plus'];

export const readJsonFilesAndGenerateUrls = (
  productType: string,
  filePath: string
): string[] => {
  let coverlandUrls: string[] = [];
  const directoryPath = `${filePath}/${productType}`;

  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      // If the file is a directory, recurse into it
      coverlandUrls = coverlandUrls.concat(
        readJsonFilesAndGenerateUrls(productType, filePath)
      );
    } else if (path.extname(file) === '.json') {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const carData = JSON.parse(fileContents);

      const generatedUrlsFromCarData = carData.map((car: any) => {
        const make = slugify(car.make);
        const model = slugify(car.model);
        const parentGeneration = car.parent_generation;

        return coverTypes.flatMap((coverType) => {
          const baseUrl = `https://coverland.com/${productType}/${coverType}`;
          return [
            `${baseUrl}/${make}`,
            `${baseUrl}/${make}/${model}`,
            `${baseUrl}/${make}/${model}/${parentGeneration}`,
          ];
        });
      });
      coverlandUrls = [...coverlandUrls, ...generatedUrlsFromCarData];
    }
  });

  const removedUrlDuplicates = new Set(coverlandUrls.flat());

  return Array.from(removedUrlDuplicates);
};

export const getOtherCoverlandUrls = () => {
  const baseUrl = 'https://coverland.com';
  return [
    // (auth routes)
    // `${baseUrl}/account/update-password`,
    // `${baseUrl}/forgot-password`,
    // `${baseUrl}/login`,
    // `${baseUrl}/signup`,
    // (no footer routes)
    `${baseUrl}/checkout`,
    // (other main routes)
    `${baseUrl}/about`,
    // `${baseUrl}/buying-guides`,
    `${baseUrl}/contact`,
    // `${baseUrl}/coupon-codes`,
    // `${baseUrl}/customer-reviews`,
    // `${baseUrl}/faqs`,
    `${baseUrl}/policies/privacy-policy`,
    `${baseUrl}/policies/return-policy`,
    `${baseUrl}/policies/shipping-policy`,
    `${baseUrl}/policies/privacy-policy`,
    `${baseUrl}/policies/warranty-policy`,
    // `${baseUrl}/profile`,
    // `${baseUrl}/thank-you`,
  ];
};

export const getBaseCoverlandUrls = () => {
  const baseUrl = 'https://coverland.com';
  const urls = [baseUrl];

  productTypes.forEach((productType) => {
    const productUrl = `${baseUrl}/${productType}`;
    urls.push(productUrl);

    coverTypes.forEach((coverType) => {
      const coverUrl = `${productUrl}/${coverType}`;
      urls.push(coverUrl);
    });
  });

  return urls;
};

export const generateAndWriteSiteUrlsToFile = (
  writeToFile: boolean = false,
  writeFilePath: string = 'public/data/site_urls.json'
) => {
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

  //   console.log('All Urls Length: ', allUrls.length); // As of 2/28/2024: 4039
  //   console.log('Other Urls Length: ', otherUrls.length); // As of 2/28/2024: 8
  //   console.log('Car Urls Length: ', carCoverUrls.length); // As of 2/28/2024: 2872
  //   console.log('SUV  Urls Length: ', suvCoverUrls.length); // As of 2/28/2024: 967
  //   console.log('Truck Urls Length: ', truckCoverUrls.length); // As of 2/28/2024: 185

  if (writeToFile) {
    fs.appendFile(writeFilePath, JSON.stringify(allUrls, null, 2), (err) => {
      if (err) {
        console.error('Error appending to file:', err);
      } else {
        console.log(
          `[Generate Site Url]: Data appended to file successfully: ${writeFilePath}`
        );
      }
    });
  }
};

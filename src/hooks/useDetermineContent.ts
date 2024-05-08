import { Asset } from 'next-video/dist/assets.js';
import { StaticImageData } from 'next/image';

// --------- Carousel Videos
import CarCarousel from '@/videos/Mustang 360 degree 16;9_Black Background.mp4';
import SUVCarousel from '@/videos/7sec Listing Video_Compressed.mp4';
import TruckCarouselVideo from '@/videos/Truck Listing Video.mp4';
import ChallengerCarousel from '@/videos/Challenger 360 Square.mp4';
import CorvetteCarousel from '@/videos/Corvette 360 Video Square.mp4';
import ClassicMustangCarouselVideo from '@/videos/Classic Mustang 360 Square.mp4';
import MiataSquare from '@/videos/Mazda Miata_BKRD_360_1;1.mp4';
import ChargerSquare from '@/videos/Dodge Charger_BKRD_360_1;1.mp4';

// --------- Carousel Thumbnails
import Car360Thumb from '@/images/PDP/Product-Details-Redesign-2/car-360-thumb.webp';
import TruckListingThumb from '@/images/PDP/Product-Details-Redesign-2/truck-7-thumb.webp';
import SUVListingThumb from '@/video/7second image.webp';
import ChallengerThumb from '@/images/PDP/PDP-Redesign-v3/challenger-thumbnail.webp';
import CorvetteThumb from '@/images/PDP/PDP-Redesign-v3/corvette-thumbnail.webp';
import ClassicMustangThumb from '@/images/PDP/PDP-Redesign-v3/classic-mustang-thumbnail.webp';
import MustangThumb from '@/images/PDP/PDP-Redesign-v3/mustang-thumbnail.webp';
import ChargerThumb from '@/images/PDP/PDP-Redesign-v3/dodge-charger-thumbnail.webp';
import MiataThumb from '@/images/PDP/PDP-Redesign-v3/mazda-miata-thumbnail.webp';

// --------- Zoom Videos
import ChallengerZoom from '@/videos/Challenger Zoom Video.mp4';
import MiataZoom from '@/videos/Mazda Miata_BKRD_Zoom.mp4';
// import MustangZoom from '@/videos/Mustang zoom';
import ChargerZooom from '@/videos/Dodge Charger_BKRD_Zoom.mp4';
import CorvetteZoom from '@/videos/Corvette Zoom.mp4';
import ClassicMustangZoom from '@/videos/Classic Mustang Zoom Video.mp4';

// --------- Wide 360 Videos
import Corvette360 from '@/videos/Corvette 360 Video.mp4';
import Challenger360 from '@/videos/Challenger 360 Video.mp4';
import ClassicMustang360 from '@/videos/Classic Mustang 360 Video.mp4';
import Mustang360 from '@/videos/Mustang 360 degree 16;9_Black Background.mp4';
import Miata360 from '@/videos/Mazda Miata_BKRD_360_16;9.mp4';
import Charger360 from '@/videos/Dodge Charger_BKRD_360.mp4';

import { useParams } from 'next/navigation';
type ParamsType = {
  make?: string;
  model?: string;
  year?: string;
  productType?: string;
  coverType?: string;
};

function useDetermineContent() {
  const { productType, model, make, year } = useParams<ParamsType>();

  let carouselSquare360: Asset;
  let carouselThumb: StaticImageData;
  let zoomVideo: Asset;
  let wide360: Asset;

  switch (productType) {
    case 'truck-covers': {
      carouselSquare360 = TruckCarouselVideo;
      carouselThumb = TruckListingThumb;
      break;
    }
    case 'suv-covers': {
      carouselSquare360 = SUVCarousel;
      carouselThumb = SUVListingThumb;
      break;
    }
    default: {
      carouselSquare360 = CarCarousel;
      carouselThumb = Car360Thumb;
      break;
    }
  }

  const isCorvette = make === 'chevrolet' && model === 'corvette';
  const isChallenger = make === 'dodge' && model === 'challenger';
  const isCharger = make === 'dodge' && model === 'charger';
  const isMazdaMiata = make === 'mazda' && model === 'miata-mx-5';
  const isMustang = model === 'mustang';
  const isClassicMustang =
    make === 'ford' && model === 'mustang' && year === '1964-1968';
  switch (true) {
    case isChallenger:
      carouselSquare360 = ChallengerCarousel;
      carouselThumb = ChallengerThumb;
      zoomVideo = ChallengerZoom;
      wide360 = Challenger360;
      break;
    case isCorvette:
      carouselSquare360 = CorvetteCarousel;
      carouselThumb = CorvetteThumb;
      zoomVideo = CorvetteZoom;
      wide360 = Corvette360;
      break;
    case isClassicMustang:
      carouselSquare360 = ClassicMustangCarouselVideo;
      carouselThumb = ClassicMustangThumb;
      zoomVideo = ClassicMustangZoom;
      wide360 = ClassicMustang360;
      break;
    case isMustang:
      carouselSquare360 = Mustang360;
      carouselThumb = MustangThumb;
      zoomVideo = ClassicMustangZoom; // !--------Replace--------!  
      wide360 = Mustang360;
      break;
    case isMazdaMiata:
      carouselSquare360 = MiataSquare;
      carouselThumb = MiataThumb;
      zoomVideo = MiataZoom;
      wide360 = Miata360;
      break;
    case isCharger:
      carouselSquare360 = ChargerSquare;
      carouselThumb = ChargerThumb;
      zoomVideo = ChargerZooom;
      wide360 = Charger360;
      break;
    default:
      carouselSquare360 = CorvetteCarousel;
      carouselThumb = CorvetteThumb;
      zoomVideo = CorvetteZoom;
      wide360 = Corvette360;
  }
  return { carouselSquare360, carouselThumb, zoomVideo, wide360 };
}
export default useDetermineContent;

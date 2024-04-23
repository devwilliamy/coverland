import { Asset } from 'next-video/dist/assets.js';
import { StaticImageData } from 'next/image';

// --------- Listing Videos
import CarCarousel from '@/videos/Mustang 360 degree 16;9_Black Background.mp4';
import SUVCarousel from '@/videos/7sec Listing Video_Compressed.mp4';
import TruckCarouselVideo from '@/videos/Truck Listing Video.mp4';
import ChallengerCarouselVideo from '@/videos/Challenger 360 Square.mp4';
import CorvetteCarouselVideo from '@/videos/Corvette 360 Video Square.mp4';
import ClassicMustangCarouselVideo from '@/videos/Classic Mustang 360 Square.mp4';

// --------- Listing Thumbnails
import Car360Thumb from '@/images/PDP/Product-Details-Redesign-2/car-360-thumb.webp';
import TruckListingThumb from '@/images/PDP/Product-Details-Redesign-2/truck-7-thumb.webp';
import SUVListingThumb from '@/video/7second image.webp';
import ChallengerListingThumb from '@/images/PDP/PDP-Redesign-v3/challenger-thumbnail.webp';
import CorvetteListingThumb from '@/images/PDP/PDP-Redesign-v3/corvette-thumbnail.webp';
import ClassicMustangThumb from '@/images/PDP/PDP-Redesign-v3/classic-mustang-thumbnail.webp';
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

  let baseCarouselVideo: Asset;
  let baseCarouselThumb: StaticImageData;

  switch (productType) {
    case 'truck-covers': {
      baseCarouselVideo = TruckCarouselVideo;
      baseCarouselThumb = TruckListingThumb;
      break;
    }
    case 'suv-covers': {
      baseCarouselVideo = SUVCarousel;
      baseCarouselThumb = SUVListingThumb;
      break;
    }
    default: {
      baseCarouselVideo = CarCarousel;
      baseCarouselThumb = Car360Thumb;
      break;
    }
  }

  const isCorvette = model === 'corvette';
  const isChallenger = model === 'challenger';
  const isClassicMustang =
    make === 'ford' && model === 'mustang' && year === '1964-1968';

  const determineVideos = (): {
    featured360: Asset;
    carouselVideoThumbnail: StaticImageData;
  } => {
    let featured360;
    let carouselVideoThumbnail;
    switch (true) {
      case isChallenger:
        featured360 = ChallengerCarouselVideo;
        carouselVideoThumbnail = ChallengerListingThumb;
        break;
      case isCorvette:
        featured360 = CorvetteCarouselVideo;
        carouselVideoThumbnail = CorvetteListingThumb;
        break;
      case isClassicMustang:
        featured360 = ClassicMustangCarouselVideo;
        carouselVideoThumbnail = ClassicMustangThumb;
        break;
      default:
        featured360 = baseCarouselVideo;
        carouselVideoThumbnail = baseCarouselThumb;
    }
    return { featured360, carouselVideoThumbnail };
  };
  const { featured360, carouselVideoThumbnail } = determineVideos();
  return { featured360, carouselVideoThumbnail };
}
export default useDetermineContent;

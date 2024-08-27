import React, { Fragment, useState, useMemo } from 'react';
import Image from 'next/image';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import ReviewImageDialog from './ReviewImageDialog';
import ReviewSeeMoreImages from './ReviewSeeMoreImages';
import useStoreContext from '@/hooks/useStoreContext';
import { useStore } from 'zustand';
import { TReviewData } from '@/lib/types/review';
import ReviewMediaSection from './ReviewMediaSection';
type ReviewMedia = TReviewData & {
  review_video: string;
  review_video_thumbnail: string;
};
const reviewMedia = [
  {
    rating_stars: 5,
    helpful: 4,
    reviewed_at: '2024-06-17T06:31:12.901+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description:
      "I've tried a lot of car covers from amazon/walmart and one of them have damaged my paint. Some others don't protect as well when there's heavy rain.",
    make_slug: null,
    review_title: 'Much better than cheap covers',
    review_author: 'Lucas Scott',
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/1-review-1.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/1-review-2.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'yes',
    recommend: 'yes',
    review_video: null,
    review_video_thumbnail: null,
  },
  {
    rating_stars: 5,
    helpful: 3,
    reviewed_at: '2022-04-01T10:22:47.7+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description:
      "My wife found this on Facebook and she got it for my for my Ford F-150. It's been a great gift and I use it almost every day to make sure bird droppings, dust, and other thing don't dirty my vehicle. It is easy to put on and away.",
    make_slug: null,
    review_title: 'Tremendously Happy',
    review_author: 'Gary Lawrence',
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/10-review-1.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/10-review-2.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/10-review-3.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'no',
    recommend: 'yes',
    review_video: null,
    review_video_thumbnail: null,
  },
  {
    rating_stars: 5,
    helpful: 3,
    reviewed_at: '2024-05-19T13:17:11.768+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description:
      'I bought one of these for my Charger 2 years ago and its still doing a great job. My dad liked it and wanted one for his car and so did my step sister. We all have similar cars. When it gets really windy, the straps work perfect. I prefer to roll it up like sleeping bag and store in my trunk.',
    make_slug: null,
    review_title: 'Works so good family wanted one',
    review_author: 'Benjamin Lee',
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/11-review-1.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/11-review-2.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'yes',
    recommend: 'yes',
    review_video: null,
    review_video_thumbnail: null,
  },
  {
    rating_stars: 5,
    helpful: 5,
    reviewed_at: '2023-06-25T03:10:33.044+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description:
      "I love camping and off-roading, but it always meant my car was covered in dirt and sap when I got home. This car cover is easy to put on and take off, even when I'm exhausted from a weekend in the wilderness. It definitely saved me a lot of car washes!",
    make_slug: null,
    review_title: 'Keeps my SUV Pristine',
    review_author: 'Alexander Khan',
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/12-review-1.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/12-review-2.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/12-review-3.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'no',
    recommend: 'yes',
    review_video: null,
    review_video_thumbnail: null,
  },
  {
    rating_stars: 5,
    helpful: 6,
    reviewed_at: '2024-06-01T09:35:34.984+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description:
      'Great fit. Keeps my 2022 Miata looking pristine. Good if not better fit than other custom-made car covers I ordered in the past. Other brands took weeks and even months. This one shipped quickly. Definitely recommended if you care about your vehicle.',
    make_slug: null,
    review_title: 'Keeps my MX-5 beauty pristine',
    review_author: 'Kevin Hernandez',
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/2-review-1.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/2-review-2.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/2-review-3.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'yes',
    recommend: 'yes',
    review_video: null,
    review_video_thumbnail: null,
  },
  {
    rating_stars: 5,
    helpful: 9,
    reviewed_at: '2022-02-09T17:29:36.298+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description:
      'Needed something for my Camaro so the birds do not destroy it. Custom-fit is great. It was custom as described. Soft material on the inside. So far my car looks as good as new.',
    make_slug: null,
    review_title: 'Good for my baby',
    review_author: 'Joseph Mccoy',
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/3-review-1.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/3-review-2.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/3-review-3.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'no',
    recommend: 'yes',
    review_video: null,
    review_video_thumbnail: null,
  },
  {
    rating_stars: 5,
    helpful: 22,
    reviewed_at: '2024-03-02T03:42:27.578+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description:
      "Fits like a glove even with a wing. Couldn't be happier, satisfied with the quality. ",
    make_slug: null,
    review_title: 'Rare to find',
    review_author: "Isaiah O'Connor",
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/4-image-1.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/4-image-2.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/4-image-3.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'yes',
    recommend: 'yes',
    review_video: null,
    review_video_thumbnail: null,
  },
  {
    rating_stars: 5,
    helpful: 3,
    reviewed_at: '2024-04-08T08:47:33.649+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description:
      "There's been reports of catalytic converters stolen around the area so I wanted something to cover my car and keep it discreet.  Comes with a bag so I just roll it up when I go out for a drive. It fits in the trunk and doesn't take up much space.",
    make_slug: null,
    review_title: 'Easy to put on',
    review_author: 'Frank Davis',
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/7-review-1.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/7-review-2.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'yes',
    recommend: 'yes',
    review_video: null,
    review_video_thumbnail: null,
  },
  {
    rating_stars: 5,
    helpful: 4,
    reviewed_at: '2022-08-29T23:04:49.016+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description: 'Looks good for my baby beast. Booyah',
    make_slug: null,
    review_title: 'Clean hellcat',
    review_author: 'Brian Walker',
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/8-review-1.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/8-review-2.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/8-review-3.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/8-review-4.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/8-review-5.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'yes',
    recommend: 'yes',
    review_video: null,
    review_video_thumbnail: null,
  },
  {
    rating_stars: 4,
    helpful: 10,
    reviewed_at: '2023-05-21T01:40:18.726+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description:
      "Living in the city with more cars than garage space can be a nightmare, but this cover has made a huge difference for my car. It's quick and easy to use,",
    make_slug: null,
    review_title: 'Kinda like having a garage',
    review_author: 'Anthony Lee',
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Chevrolet-Corvette-2003-Carey-Braha-2.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/6-review-1.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/6-review-2.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/6-review-3.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/6-review-4.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'yes',
    recommend: 'yes',
    review_video: null,
    review_video_thumbnail: null,
  },
  {
    rating_stars: 5,
    helpful: 13,
    reviewed_at: '2024-02-18T11:08:43.725+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description:
      "I didn't know using a crappy car cover can damage your car paint. Last 2 car covers I bought from walmart and amazon scratched up my truck. Then my buddy recommended me coverland because it was custom fit and better. It's a whole different level. I could tell  when it came in the inside was much softer. I got the perfect color and it looks incredible. The stripes are clean. It's so much faster now without having to dust leaves and branches everyday.",
    make_slug: null,
    review_title: "Why I'll never do generic car covers again",
    review_author: 'Michelle Harris',
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Chevrolet-Silverado-2003-Christopher-Narog-5.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Chevrolet-Silverado-2003-Christopher-Narog-6.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'yes',
    recommend: 'yes',
    review_video: null,
    review_video_thumbnail:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Chevrolet-Silverado-2003-Christopher-Narog-5.webp',
  },
  {
    rating_stars: 5,
    helpful: 7,
    reviewed_at: '2024-03-29T17:07:01.322+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description:
      "Found Coverland's custom-fit car cover for my Challenger. It was already made custom-fit and in stock with same day free shipping. Purchased it, shipped same day, arrived in 4. Fit is good, material is top-notch. Inside is really soft. No more worrying about dust, scratches, or sun damage. Worth the penny.",
    make_slug: null,
    review_title: 'Great cover',
    review_author: 'Mary Jackson',
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Dodge-Challenger-2021-Caitlyn-2.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Dodge-Challenger-2021-Caitlyn-3.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/5-review-1.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/5-review-2.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/5-review-3.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'yes',
    recommend: 'yes',
    review_video: null,
    review_video_thumbnail:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Dodge-Challenger-2021-Caitlyn-2.webp',
  },
  {
    rating_stars: 5,
    helpful: 19,
    reviewed_at: '2022-08-18T08:43:54.893+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description:
      "Gave it shot and I was very surprised. I've had a lot of cheaper car covers from Amazon and it wasn't as good as this.There was no residue powder, and this one had air vents that protected it from trapping moisture inside. ",
    make_slug: null,
    review_title: "Didn't know it was this good",
    review_author: 'Liam Rodriguez',
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Ford-Mustang-2006-Sean-Kramer-2.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/9-image-1.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/9-image-2.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/9-image-3.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'yes',
    recommend: 'yes',
    review_video: null,
    review_video_thumbnail: null,
  },
  {
    rating_stars: 5,
    helpful: 15,
    reviewed_at: '2023-09-30T02:26:21.461+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description:
      'Got one for my Tesla, dad loved it, got him one too. Now my brother wants one for his Camaro.  Holds up great in wind. Rolls up easy for storage.',
    make_slug: null,
    review_title: 'So good, bought three',
    review_author: 'Charles Allen',
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Tesla-Y-1.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Tesla-Y-2.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Tesla-Y-3.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Tesla-Y-4.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Tesla-Y-5.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Tesla-Y-6.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'yes',
    recommend: 'no',
  },
  {
    rating_stars: 5,
    helpful: 4,
    reviewed_at: '2022-11-21T17:41:19.915+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description:
      "Now that we're retired we've been  traveling more and leaving our car parked for longer stretches. This coverland custom fit car cover gives us peace of mind that our car will be safe and sound when we return.",
    make_slug: null,
    review_title: 'Great for my weekend vehicle',
    review_author: 'Gregory Fowler',
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/ford-bronco-car-cover-2-1.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/ford-bronco-car-cover-2-2.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'yes',
    recommend: 'no',
  },
  {
    rating_stars: 5,
    helpful: 3,
    reviewed_at: '2023-02-16T14:01:53.639+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description:
      'Had to change the address before it shipped and Sam was very quick to correct the error. Service and fit is excellent. It even has front and back labels for easy installation',
    make_slug: null,
    review_title: 'Quick delivery',
    review_author: 'James Thompson',
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/ford-f-150-car-cover-11-1.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/ford-f-150-car-cover-11-2.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/ford-f-150-car-cover-11-3.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'yes',
    recommend: 'yes',
    review_video: null,
    review_video_thumbnail: null,
  },
  {
    rating_stars: 5,
    helpful: 3,
    reviewed_at: '2023-12-26T16:02:58.289+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description:
      "After moving to a new house without a garage, I knew I had to protect my car from the elements. The Florida sun here is brutal. This car cover has been a lifesaver. It's durable and keeps my paint from fading.",
    make_slug: null,
    review_title: 'Protects it from the elements',
    review_author: 'Michael Stewart',
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/ford-f-150-car-cover-7-1.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/ford-f-150-car-cover-7-2.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'yes',
    recommend: 'yes',
    review_video: null,
    review_video_thumbnail: null,
  },
  {
    rating_stars: 5,
    helpful: 18,
    reviewed_at: '2023-01-09T21:26:44.742+00:00',
    gpt_review_id: null,
    model: null,
    year_generation: null,
    submodel1: null,
    submodel2: null,
    mirror: null,
    review_description:
      "I needed a reliable outdoor cover for my Ford Mustang. I chose Coverland since they had it in stock with free shipping and a lifetime warranty. The lining is soft and it doesn't scratch the paint. Been using it everyday, it still looks as good as new! Might even get another one for my brother's chevy.",
    make_slug: null,
    review_title: '2018 Roush Mustang',
    review_author: 'Jacob Martinez',
    review_image:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/image1-1.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/review/image2-2.webp',
    model_slug: null,
    size: null,
    sku: null,
    parent_generation: null,
    product_type: null,
    product_name: null,
    type: 'Car Covers',
    make: null,
    verified_status: 'yes',
    recommend: 'yes',
    review_video: null,
    review_video_thumbnail: null,
  },
];

export const useMediaSplit = (reviewMedia: ReviewMedia[]) => {
  const { videos, images } = useMemo(() => {
    return reviewMedia.reduce(
      (acc, media) => {
        if (media.review_video_thumbnail) {
          acc.videos.push(media);
        } else {
          acc.images.push(media);
        }
        return acc;
      },
      { videos: [] as ReviewMedia[], images: [] as ReviewMedia[] }
    );
  }, [reviewMedia]);

  return { videos, images };
};
export const ReviewHeaderGalleryMobile: React.FC = () => {
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  //   const store = useStoreContext();
  //   if (!store) throw new Error('Missing Provider in the tree');
  //   const reviewImages = useStore(store, (s) => s.reviewImages);
  //   const reviewImages = useMemo(() => sampleData, []);
  console.log('reviewMedia:', reviewMedia);
  const { videos, images } = useMediaSplit(reviewMedia);

  console.log('Videos:', videos);
  console.log('Images:', images);

  return (
    <section className="flex flex-col gap-4 p-2 lg:hidden">
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <ReviewMediaSection
          title="Reviews with videos"
          emptyMessage="No video reviews available"
          mediaItems={videos}
          rowType="video"
          onMediaClick={(index) => {
            setSelectedMediaIndex(reviewMedia.indexOf(videos[index]));
            setReviewDialogOpen(true);
          }}
        />
        <ReviewMediaSection
          title="Reviews with images"
          emptyMessage="No image reviews available"
          mediaItems={images}
          rowType="image"
          onMediaClick={(index) => {
            setSelectedMediaIndex(reviewMedia.indexOf(images[index]));
            setReviewDialogOpen(true);
          }}
        />
        {reviewDialogOpen && (
          <ReviewImageDialog
            onClose={() => setReviewDialogOpen(false)}
            isMobile={true}
            initialImageIndex={selectedMediaIndex}
          />
        )}
      </Dialog>
    </section>
  );
};

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default ReviewHeaderGalleryMobile;

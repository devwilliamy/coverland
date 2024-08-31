import React from 'react';
import Link from 'next/link';
import { FaYoutube, FaFacebook, FaTiktok } from 'react-icons/fa';
import { PiInstagramLogoFill } from 'react-icons/pi';

const IconCircle = ({ children }) => (
  <div className="rounded-full bg-gray-200 p-2">
    {children}
  </div>
);

const iconComponents = {
  youtube: FaYoutube,
  instagram: PiInstagramLogoFill,
  facebook: FaFacebook,
  tiktok: FaTiktok,
};

const SocialMediaLink = ({ platform, href, ariaLabel }) => {
  const IconComponent = iconComponents[platform];

  return (
    <Link
      href={href}
      target="_blank"
      aria-label={ariaLabel}
    >
      <IconCircle>
        <IconComponent className="h-full w-full" />
      </IconCircle>
    </Link>
  );
};

const SocialMediaLinks = () => (
  <div className="flex space-x-4">
    <SocialMediaLink
      platform="youtube"
      href="https://www.youtube.com/@CoverLandUSA/shorts"
      ariaLabel="Go to Coverland Youtube page"
    />
    <SocialMediaLink
      platform="instagram"
      href="https://www.instagram.com/coverland_us/"
      ariaLabel="Go to Coverland Instagram page"
    />
    <SocialMediaLink
      platform="facebook"
      href="https://www.facebook.com/CoverlandUSA"
      ariaLabel="Go to Coverland Facebook page"
    />
    <SocialMediaLink
      platform="tiktok"
      href="https://www.tiktok.com/@coverlandusa"
      ariaLabel="Go to Coverland TikTok page"
    />
  </div>
);

export default SocialMediaLinks;
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

export default function InsightsTab() {
  const params = useParams();
  const productType = params?.productType;

  return (
    <div className="flex w-full flex-col gap-5 p-4">
      {productType === 'car-covers' && <CarInsights />}
      {productType === 'suv-covers' && <SuvInsights />}
      {productType === 'truck-covers' && <TruckInsights />}
    </div>
  );
}

const carInsightAdvantages = [
  'Superior Protection: Our covers offer unparalleled protection against a range of elements, including rain, snow, sun, dust, and more. With durable materials and expert craftsmanship, your vehicle stays shielded from damage year-round.',
  'Custom Fit: Say goodbye to ill-fitting covers that leave parts of your vehicle exposed. Our custom fit car covers are tailored to the exact dimensions of your vehicle, ensuring a snug and secure fit. This personalized approach provides maximum coverage without any loose ends.',
  'All-Weather Performance: From scorching heat to freezing cold, our covers are built to withstand any weather condition. Designed to be car covers for all weather, they provide reliable protection no matter what Mother Nature throws your way.',
  'Longevity: Invest in quality that lasts. Our covers are made from high-quality materials that stand the test of time. With proper care and maintenance, they keep your vehicle looking its best for years to come, saving you money in the long run',
  'Easy Installation and Removal: Our covers are designed for convenience. With easy installation and removal, you can quickly cover and uncover your vehicle whenever needed. This hassle-free process ensures that protecting your vehicle is effortless.',
  'Versatility: Whether you need an outdoor car protector, an all-season car cover, or something else entirely, we have you covered. Our versatile range of covers caters to a variety of needs and preferences, ensuring that every customer finds the perfect solution for their vehicle.',
  'Personalization Options: Make your cover as unique as your vehicle with our personalized options. Choose from a range of designs, colors, and customizations to create a cover that reflects your style and personality.',
  'Peace of Mind: With our covers, you can enjoy peace of mind knowing that your vehicle is protected from harm. Whether parked in your driveway, garage, or out on the street, your vehicle remains safe and secure under the shield of our covers.',
];

const suvInsightQualities = [
  'Our custom SUV covers are meticulously crafted to fit your vehicle like a glove, ensuring optimal protection and a sleek appearance.',
  'Great selection of covers, designed to shield your vehicle from dust, dirt, and other environmental factors.',
  'Keep your SUV dry and protected with our waterproof and  breathable car covers, ideal for rainy weather and wet conditions',
  'We offer a selection of small and large SUV car covers. They will offer ample coverage and durability to keep your vehicle shielded.',
  "Our covers ensure comprehensive protection against sun, rain, and other elements, preserving your SUV's appearance.",
  'Our waterproof SUV covers provide peace of mind in any weather, ensuring your vehicle stays dry and secure.',
  'Our outdoor SUV cover reliably protects your vehicle, whether parked indoors or outdoors.',
  'Our range of car covers for SUVs, designed to accommodate the size and shape of your vehicle for optimal coverage.',
  'Conveniently purchase your SUV covers with our easy online ordering process, ensuring quick delivery to your specified location.',
];

const CarInsights = () => {
  return (
    <>
      <p className="text-[20px] font-[700] lg:text-[24px]">Car Covers</p>
      <p className="pb-10 text-[18px]  lg:text-[22px]">
        Looking for reliable protection for your car? You've come to the right
        place. Here, you'll find a range of options to protect your vehicle from
        the elements and keep it looking its best. Our custom fit car covers are
        tailored to the exact dimensions of your vehicle, ensuring a snug and
        secure fit. This personalized approach provides maximum protection
        without any loose ends.
      </p>
      <p className="text-[16px] font-[700] lg:text-[20px]">
        Advantages of our covers:
      </p>
      <ul className="flex w-full list-inside list-disc flex-col gap-3 text-[14px] lg:text-[18px]">
        {carInsightAdvantages.map((item) => (
          <li key={item} className="list-item w-full">
            {item}
          </li>
        ))}
      </ul>
      <p className="text-[18px] font-[700]">
        Experience the advantages of our car covers today and give your vehicle
        the protection it deserves. In our store you can choose and buy car
        cover at the best price.
      </p>
    </>
  );
};
const SuvInsights = () => {
  return (
    <>
      <p className="text-[20px] font-[700] lg:text-[24px]">SUV Covers </p>
      <p className="pb-10 text-[18px]  lg:text-[22px]">
        Welcome to our SUV Covers section! If you're in need of protective
        solutions for your SUV, you're in the right place. Here, we offer a
        diverse array of options to safeguard your vehicle in various conditions
      </p>
      <p className="text-[16px] font-[700] lg:text-[20px]">
        Why are our covers the best?
      </p>
      <ul className="flex w-full list-inside list-disc flex-col gap-3 text-[14px] lg:text-[18px]">
        {suvInsightQualities.map((item) => (
          <li key={item} className="list-item w-full">
            {item}
          </li>
        ))}
      </ul>
      <p className="text-[18px] font-[700]">
        Browse our selection and order the perfect cover for your SUV today,
        ensuring it receives the protection it deserves.
      </p>
    </>
  );
};
const TruckInsights = () => {
  return (
    <>
      <p className="text-[20px] font-[700] lg:text-[24px]">Truck Covers </p>

      <p className="pb-10 text-[18px]  lg:text-[22px]">
        Your pickup truck is a reliable workhorse, always ready to tackle tough
        tasks. It deserves top-notch care to maintain its performance and
        appearance. Opting for a tailored truck cover ensures that your vehicle
        remains shielded from various elements, whether it's harsh weather
        conditions or unexpected bumps and scratches. Investing in truck covers
        and complementary accessories not only safeguards your vehicle but also
        minimizes the need for insurance claims and preserves its condition over
        time. Treat your pickup to the protection it deserves and enjoy peace of
        mind knowing it's well-protected and maintained.
      </p>
      <p className="text-[16px] font-[700] lg:text-[20px]">
        Protective properties
      </p>
      <p className="flex w-full text-[14px] lg:text-[18px]">
        Regardless of its location - be it at a job site or parked in your
        driveway - a stationary vehicle remains susceptible to potential harm
        from extended exposure to the elements. To extend the lifespan of your
        car, it's wise to consider investing in a resilient truck cover. By
        providing a protective barrier against wind, rain, dirt, and snow, a
        durable truck cover ensures that your vehicle remains in prime condition
        for years to come. Our covers boast weatherproof qualities, fend off
        animal droppings effectively, and come with UV protection, ensuring
        durability for outdoor use. Featuring a robust design, they offer
        superior breathability and sturdiness. Crafted to the highest standards,
        our truck covers shield your vehicle's body from discoloration,
        scratches, and other potential damage with ease.
      </p>
      <p className="text-[20px] font-[700]">Ease of use</p>
      <p className="flex w-full text-[14px] lg:text-[18px]">
        Our truck covers boast effortless installation, removal, and storage,
        making them ideal for use on-site or at home. Engineered for a tailored
        fit, they effortlessly slide over the truck without requiring any
        special hardware or additional effort to achieve the perfect snugness.
      </p>
      <p className="flex w-full text-[14px] lg:text-[18px]">
        Check out our selection of truck covers today and buy for your vehicle
        the protection it deserves. With our easy-to-use covers and durable
        construction, you can enjoy peace of mind wherever the road takes you.
      </p>
    </>
  );
};

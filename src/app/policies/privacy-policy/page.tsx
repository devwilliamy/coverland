import React from 'react';
import { PolicyDetailItem } from '../util';

type Props = {};

export default function PrivacyPolicy({}: Props) {
  return (
    <div className="pb-[3vh]">
      <p className="py-[5vh] font-thin italic">
        Effective date: November 1, 2023
      </p>
      <PolicyDetailItem title="Introduction">
        Welcome to Coverland, your trusted provider of high-quality car covers
        and automotive accessories. Protecting the privacy and security of our
        customers is paramount to us. This Data Privacy Policy outlines how we
        handle your personal information when you interact with our website and
        services.
      </PolicyDetailItem>
      <PolicyDetailItem title="Company Identity and Contact Information">
        <ul className="list-none">
          <li className="flex gap-[0.25vw]">
            <p className="font-black">Name: </p> <p>Coverland</p>
          </li>
          <li className="flex gap-[0.25vw]">
            <p className="font-black">Address: </p>
            <p>15529 Blackburn Ave., Norwalk, CA 90650</p>
          </li>
          <li className="flex gap-[0.25vw]">
            <p className="font-black">Email: </p> <p>info@coverland.com</p>
          </li>
          <li className="flex gap-[0.25vw]">
            <p className="font-black">Phone: </p> <p>800-799-5165</p>
          </li>
        </ul>
      </PolicyDetailItem>
      <PolicyDetailItem title="Types of Data Collected">
        <p className="mb-[3vh]">
          In the course of providing car covers and related services, we collect
          information such as:
        </p>
        <li>
          Personal details like name, email address, and telephone number.
        </li>
        <li>Vehicle information like make, model, and year of manufacture. </li>
        <li>
          Billing information like order information, shipping address and
          billing address.
        </li>
        <li>Website usage data and preferences </li>
      </PolicyDetailItem>
      <PolicyDetailItem title="Purpose of Data Collection">
        <p className="mb-[3vh]">We collect your data to:</p>
        <li>Process and manage your orders for car covers.</li>
        <li>Provide tailored recommendations and services.</li>
        <li>Conduct market research to improve our products.</li>
        <li>Communicate with you about offers and new products</li>
      </PolicyDetailItem>
      <PolicyDetailItem title="Data Collection Methods">
        <p className="mb-[3vh]">We collect data through:</p>
        <li>Online order forms and customer accounts.</li>
        <li>
          Automated technologies like cookies, to understand your preferences
          and improve your website experience.
        </li>
      </PolicyDetailItem>
      <PolicyDetailItem title="Data Sharing and Disclosure">
        <p className="mb-[3vh]">Your data may be shared with:</p>
        <li>
          Third-party service providers for logistics and payment processing.
        </li>
        <li>Marketing partners for promotional activities.</li>
        <p className="mt-[3vh]">
          Data may be disclosed if legally required or to protect our rights and
          interests.
        </p>
      </PolicyDetailItem>
      <PolicyDetailItem title="User Rights and Choices">
        <p className="mb-[3vh]">You have the right to:</p>
        <li>Access and review your personal information. </li>
        <li>Request correction or deletion of your data.</li>
        <li>Opt out of receiving marketing communications.</li>
        <p className="mt-[3vh]">
          These rights can be exercised by contacting us using the provided
          information.
        </p>
      </PolicyDetailItem>
      <PolicyDetailItem title="Data Security Measures">
        <p>
          We employ stringent security measures, including SSL encryption, to
          safeguard your personal information against unauthorized access and
          misuse.
        </p>
      </PolicyDetailItem>
      <PolicyDetailItem title="Use of Cookies and Tracking Technologies">
        <p>
          Cookies are used on our website to enhance user experience and gather
          insights about user interactions. You can manage your cookie
          preferences in your web browser.
        </p>
      </PolicyDetailItem>
      <PolicyDetailItem title="Updates to the Data Privacy Policy">
        Cookies are used on our website to enhance user experience and gather
        insights about user interactions. You can manage your cookie preferences
        in your web browser.
      </PolicyDetailItem>
      <PolicyDetailItem title="Contact Information for Privacy Concerns">
        For any questions or concerns regarding this policy or your data, please
        contact us at info@coverland.com.
      </PolicyDetailItem>
    </div>
  );
}

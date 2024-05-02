import React from 'react';
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon, MapPinIcon, BookOpenIcon, CalendarIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Interactive Map',
    description:
      'Explore a dynamic map of Dallas County for strategic food truck placement. Utilize real-time analytics to identify high-traffic areas.',
    icon: MapPinIcon,
  },
  {
    name: 'User Accounts',
    description:
      'Create personalized accounts for your food truck business. Log in to access a tailored experience, including analytics, event details, and community features.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Blog Platform',
    description:
      'Engage with the food truck community through our integrated blog platform. Share valuable insights, resources, and updates with fellow food truck owners.',
    icon: BookOpenIcon,
  },
  {
    name: 'Event Calendar',
    description:
      'Stay informed about the latest events in Dallas County. Receive real-time updates on local happenings to plan your food truck schedule effectively.',
    icon: CalendarIcon,
  },
];

export default function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7" style={{ color: "#08F" }}>
            Elevate Your Food Truck Business
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            All-in-One Solution
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Access an array of features designed to enhance your food truck experience. From strategic map placement to community engagement, we've got you covered.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: "#08F" }}>
                    {<feature.icon className="h-6 w-6 text-white" aria-hidden="true" />}
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

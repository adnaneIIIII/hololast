'use client';

import { Marquee } from '@/components/marquee';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';

export function Highlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'bg-blue-500/10 p-1 py-0.5 font-bold text-blue-500',
        className,
      )}
    >
      {children}
    </span>
  );
}

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export function TestimonialCard({
  description,
  name,
  img,
  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4',
        // theme styles
        'border border-border bg-card/50 shadow-sm',
        // hover effect
        'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
        className,
      )}
      {...props}
    >
      <div className="select-none text-sm font-normal text-muted-foreground">
        {description}
        <div className="flex flex-row py-1">
          <Star className="size-4 fill-orange-500 text-orange-500" />
          <Star className="size-4 fill-orange-500 text-orange-500" />
          <Star className="size-4 fill-orange-500 text-orange-500" />
          <Star className="size-4 fill-orange-500 text-orange-500" />
          <Star className="size-4 fill-orange-500 text-orange-500" />
        </div>
      </div>

      <div className="flex w-full select-none items-center justify-start gap-5">
        <Image
          width={40}
          height={40}
          src={img || ''}
          alt={name}
          className="size-10 rounded-full ring-1 ring-blue-500/20 ring-offset-2"
        />

        <div>
          <p className="font-medium text-foreground">{name}</p>
          <p className="text-xs font-normal text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    name: 'Liam Thompson',
    role: 'UK',
    img: 'https://randomuser.me/api/portraits/men/81.jpg',
    description: (
      <p>
        I&apos;m blown away by the picture quality and speed.
        <Highlight className="text-gray-300">
          Channels load instantly and the sports streams are crystal clear.
        </Highlight>{' '}
        Best IPTV service I&apos;ve tried by far.
      </p>
    ),
  },
  {
    name: 'Emily Davis',
    role: 'USA',
    img: 'https://randomuser.me/api/portraits/women/46.jpg',
    description: (
      <p>
        Just switched from cable and couldn&apos;t be happier.
        <Highlight >
          The variety of channels and smooth playback exceeded my expectations.
        </Highlight>{' '}
        Highly recommended!
      </p>
    ),
  },
  {
    name: 'Carlos Mendez',
    role: 'Mexico',
    img: 'https://randomuser.me/api/portraits/men/75.jpg',
    description: (
      <p>
        I subscribed for the sports, but the movies and VOD are a big bonus.
        <Highlight >
          Streams are fast, stable, and support is super responsive.
        </Highlight>{' '}
        Great value.
      </p>
    ),
  },
  {
    name: 'Sophie Laurent',
    role: 'France',
    img: 'https://randomuser.me/api/portraits/women/52.jpg',
    description: (
      <p>
        I&apos;ve tried a few IPTV providers before, but this is on another level.
        <Highlight >
          The setup was easy and the quality is fantastic, even during live games.
        </Highlight>
      </p>
    ),
  },
  {
    name: 'David Wilson',
    role: 'Canada',
    img: 'https://randomuser.me/api/portraits/men/11.jpg',
    description: (
      <p>
        The 24/7 support is amazing. I had one issue during setup and it was resolved in minutes.
        <Highlight >
          Excellent service and flawless streaming.
        </Highlight>
      </p>
    ),
  },
  {
    name: 'Isabella Rossi',
    role: 'Italy',
    img: 'https://randomuser.me/api/portraits/women/65.jpg',
    description: (
      <p>
        I mainly watch series and documentaries.
        <Highlight >
          The VOD library is huge and always updated with fresh content.
        </Highlight>{' '}
        Five stars from me.
      </p>
    ),
  },
  {
    name: 'Ahmed Khan',
    role: 'UAE',
    img: 'https://randomuser.me/api/portraits/men/34.jpg',
    description: (
      <p>
        Very reliable. Even during peak hours, there&apos;s no buffering.
        <Highlight >
          Clear HD streams and tons of sports channels I couldn&apos;t find elsewhere.
        </Highlight>
      </p>
    ),
  },
  {
    name: 'Nina Petrova',
    role: 'Russia',
    img: 'https://randomuser.me/api/portraits/women/18.jpg',
    description: (
      <p>
        Everything works flawlessly on my Firestick.
        <Highlight >
          It&apos;s rare to find an IPTV service this smooth and well-supported.
        </Highlight>
      </p>
    ),
  },
  {
    name: 'Marcus Brown',
    role: 'USA',
    img: 'https://randomuser.me/api/portraits/men/41.jpg',
    description: (
      <p>
        Been using it for 3 months now. Super happy.
        <Highlight >
          The sports streams are ultra-stable and there&apos;s zero delay during live matches.
        </Highlight>
      </p>
    ),
  },
  {
    name: 'Hana Suzuki',
    role: 'Japan',
    img: 'https://randomuser.me/api/portraits/women/58.jpg',
    description: (
      <p>
        I watch mostly Asian content and was surprised at how much is available.
        <Highlight >
          Great variety and excellent subtitles.
        </Highlight>{' '}
        Very happy with this service!
      </p>
    ),
  },
  {
    name: 'George Papadopoulos',
    role: 'Greece',
    img: 'https://randomuser.me/api/portraits/men/23.jpg',
    description: (
      <p>
        Setup was fast using IPTV Smarters.
        <Highlight >
          The EPG and VOD work great. Streams haven&apos;t lagged once.
        </Highlight>
      </p>
    ),
  },
  {
    name: 'Fatima Al-Mansouri',
    role: 'Qatar',
    img: 'https://randomuser.me/api/portraits/women/73.jpg',
    description: (
      <p>
        I love the clean interface and huge channel selection.
        <Highlight >
          Even kids&apos; channels are in perfect quality. Great for the whole family.
        </Highlight>
      </p>
    ),
  },
];


export default function Testimonials() {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 relative overflow-hidden" id='#Testimonials'>
      {/* Decorative elements - Fixed for mobile */}
      <div className="w-full max-w-6xl mx-auto py-10 relative">
        {/* Mobile-friendly blur elements */}
        <div className="absolute left-0 top-20 z-10 h-32 w-32 md:h-64 md:w-64 md:-left-20 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute right-0 bottom-20 z-10 h-32 w-32 md:h-64 md:w-64 md:-right-20 rounded-full bg-blue-500/5 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-center text-3xl font-semibold lg:text-5xl font-bold leading-[1.2] tracking-tighter text-foreground md:text-4xl">
            What Our Users Are Saying
          </h2>
          <div className="w-24 mt-8 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full"></div>

          <h3 className="mx-auto mb-8 mt-8 max-w-lg text-balance text-center text-base md:text-lg font-medium tracking-tight text-muted-foreground px-2">
            Don&apos;t just take our word for it. Here&apos;s what{' '}
            <span className="bg-gradient-to-r from-orange-500 to-sky-500 bg-clip-text text-transparent">
              real users
            </span>{' '}
            are saying about{' '}
            <span className="font-semibold text-orange-500">MNTdigital</span>
          </h3>
        </motion.div>

        <div className="relative mt-6 max-h-screen overflow-hidden">
          <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
            {Array(Math.ceil(testimonials.length / 3))
              .fill(0)
              .map((_, i) => (
                <Marquee
                  vertical
                  key={i}
                  className={cn({
                    '[--duration:60s]': i === 1,
                    '[--duration:30s]': i === 2,
                    '[--duration:70s]': i === 3,
                  })}
                >
                  {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: Math.random() * 0.8,
                        duration: 1.2,
                      }}
                    >
                      <TestimonialCard {...card} />
                    </motion.div>
                  ))}
                </Marquee>
              ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-background from-20%"></div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-background from-20%"></div>
        </div>
      </div>
    </section>
  );
}
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import {
  
  Users,
  Heart,
  Lightbulb,
  Sparkles,
  Rocket,
  Target,
  Video,
  Cast,
  Globe,
  
} from 'lucide-react';
import { Spotlight } from './ui/spotlight';
import { BorderBeam } from './ui/border-beam';
import Container from './global/container';






export default function Features() {
  const aboutData = {
    title: 'About Us',
    subtitle:
      'Experience the future of television with our premium IPTV streaming service. Unlike traditional cable TV, our 4K IPTV solution delivers over 23,000 live channels, 125,000+ movies, and 37,000+ TV series directly to your devices through high-speed internet .',
    mission:
      'Enjoy crystal-clear 4K resolution on supported channels and content. Our advanced streaming technology ensures minimal buffering and maximum picture quality, even during peak viewing hours.',
    vision:
      'Stream on any device including Smart TVs, Android devices, iOS, Fire TV Stick, MAG boxes, and more. Our IPTV service works seamlessly across all platforms with dedicated apps for optimal performance.',
    className: 'relative overflow-hidden  py-20',
  };

  const missionRef = useRef(null);

  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });

  return (
    <section className="relative w-full overflow-hidden pt-20">
      {/* <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(17, 100.00%, 50.00%, 0.08) 0, hsla(17, 97.60%, 51.20%, 0.10) 50%, hsla(336, 100%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(333, 100%, 85%, 0.08) 0, hsla(335, 100%, 55%, 0.04) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(115, 100.00%, 85.10%, 0.06) 0, hsla(125, 91.90%, 48.60%, 0.06) 80%, transparent 100%)"
      /> */}

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <Container>
        <div className="mx-auto max-w-2xl space-y-6 text-center my-20">
          <h1 className="text-center text-4xl font-semibold lg:text-5xl">
            Features
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full"></div>

          <p>
            Get started with mntdigital IPTV in just 3 simple steps.<br/> Setup takes
            less than 5 minutes!
          </p>
        </div>
           
      </Container>
        </motion.div>

        {/* Mission & Vision Section */}
        <div ref={missionRef} className="relative mx-auto mb-24 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={
              missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative z-10 grid gap-12 md:grid-cols-3"
          >
            <motion.div
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="group relative block overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br p-10 backdrop-blur-3xl"
            >
              <BorderBeam
                duration={9}
                size={300}
                className="from-transparent via-orange-500/40 text-white to-transparent"
                reverse
              />

              <div className="mb-6 inline-flex aspect-square h-16 w-16 flex-1 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm">
                <Video className="h-8 w-8 text-primary" />
              </div>

              <div className="space-y-4">
                <h2 className="mb-4 bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-2xl font-bold text-transparent">
                  4K Ultra HD Streaming Quality
                </h2>

                <p className="text-lg leading-relaxed text-sm text-muted-foreground">
                  {aboutData.mission}
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="group relative block overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br p-10 backdrop-blur-3xl"
            >
              <BorderBeam
                duration={19}
                size={300}
                className="from-transparent via-orange-500/40 text-white to-transparent"
                reverse
              />
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm">
                {/* <Target className="h-8 w-8 text-white text-center" /> */}
                <Cast  className="h-8 w-8 text-white text-center" />
              </div>

              <h2 className="mb-4 bg-gradient-to-r  from-primary/90 to-primary/70 bg-clip-text text-2xl font-bold text-transparent">
                Multi-Device Compatibility
              </h2>

              <p className="text-lg leading-relaxed text-sm text-muted-foreground">
                {aboutData.subtitle}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="group relative block overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br p-10 backdrop-blur-3xl"
            >
              <BorderBeam
                duration={8}
                size={300}
                className="from-transparent text-center via-orange-500/40 to-transparent"

                reverse
              />
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm">
                {/* <Target className="h-8 w-8 text-white text-center" /> */}
                <Globe  className="h-8 w-8 text-white text-center" />
              </div>

              <h2 className="mb-4 bg-gradient-to-r  from-primary/90 to-primary/70 bg-clip-text text-2xl font-bold text-transparent">
                Choose MNTdigital Premium IPTV 
              </h2>

              <p className="text-lg leading-relaxed text-sm text-muted-foreground">
                {aboutData.vision}
              </p>
            </motion.div>
          </motion.div>
        </div>

       
      </div>
    </section>
  );
}

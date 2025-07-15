"use client";
import Companies from "@/components/_holo/companies";
import Hero from "@/components/_holo/hero";
import LogoTicker from "@/components/_holo/LogoTicker";
import Navbar from "@/components/_holo/navbar";
import PricingSection from "@/components/_holo/pricing-chef";
import Contact from "@/components/_holo/contact";
import FooterSection from "@/components/_holo/footer";
import Analysis from "@/components/_holo/analysis";
import { bannerSection } from "@/services";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import Component from "@/components/_holo/testimonials_mnt";
import Devices from "@/components/_holo/devices";
import Faq from "@/components/_holo/FAQs";
import CallToAction from "@/components/_holo/CallToAction";
import BlogPost from "@/components/_holo/blog";
import Testimonials from "@/components/_holo/ui/testimonials-marquee";

type Product = {
  compareAtPrice: number;
  description: string;
  id: string;
  isFeatured: boolean;
  name: string;
  price: number;
  publishedAt: string;
  shortdescription: string;
  status: string;
  images: { url: string }[];
};

type GetProductResponse = {
  product: Product[];
};

// type BlogItem = {
//   id: string;
//   title: string;
//   content: string;
//   category: string;
//   createdAt: Date;
// };
export default function Page() {
  // SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "mntdigital",
    url: "https://mntdigital.com",
    logo: {
      "@type": "ImageObject",
      url: "https://mntdigital.com/iptv-service.png",
    },
    sameAs: [
      "https://facebook.com/mntdigital",
      "https://instagram.com/mntdigital",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@mntdigital.com",
      telephone: "+212611223344",
      contactType: "customer support",
      areaServed: "Worldwide",
      availableLanguage: ["English", "French", "Arabic"],
    },
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "mntdigital",
    url: "https://mntdigital.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://mntdigital.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  // Testimonials

  interface Testimonial {
    img: StaticImageData | string;
    quote: string;
    name: string;
    role: string;
  }
  const testimonials: Testimonial[] = [
    {
      img: "/test1.jpeg",
      quote:
        "Thank you for sending me the subscription details so quickly. I have entered all details in IPTV Smarters and I must say how very quick the channels are opening. Only looked at a few so far.",
      name: "Sarah Johnson",
      role: "USA",
    },
    {
      img: "/test3.jpeg",
      quote:
        "I took a 12-month subscription. Been excellent. Would recommend. 👍",
      name: "Michael Chen",
      role: "USA",
    },
    {
      img: "/test2.jpeg",
      quote:
        "I took out a 6-month subscription yesterday. Been excellent so far. Very fast and faultless streams. Loads of VOD content as well.",
      name: "Jessica Martinez",
      role: "Canada",
    },
  ];

  // Products

  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = (await bannerSection()) as GetProductResponse;
    setProduct(res.product);
    console.log(res.product);
  };

  // const [blogPosts, setBlogPosts] = useState<BlogItem[]>([]);

  // useEffect(() => {
  //   const Posts_ = async () => {
  //     const blogp = await PostesASC();
  //     setBlogPosts(blogp);
  //   };
  //   Posts_();
  // }, []);

  return (
    <>
      {/* <Banner /> */}
      <Navbar />
      {/* <Earth/> */}
      <Hero />
      {/* <Newhero/> */}
      <Companies />
      {/* <HeroSection /> */}
      <LogoTicker />
      {/* <ProductShow /> */}
      <PricingSection {...product} />
      
      <Analysis />
      {/* <Component /> */}
      <BlogPost />
      {/* <Pricing product={product} />*/}
      <Devices />
      <Testimonials/>
      <Contact />
      <Faq />
      {/* <LanguageSupport /> */}
      <CallToAction />
      <FooterSection />
    </>
  );
}

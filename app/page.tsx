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
import { useEffect, useState } from "react";
import Devices from "@/components/_holo/devices";
import Faq from "@/components/_holo/FAQs";
import CallToAction from "@/components/_holo/CallToAction";
import BlogPost from "@/components/_holo/blog";
import Testimonials from "@/components/_holo/ui/testimonials-marquee";
import SignupModal from "@/components/SignupModal";
import Head from "next/head";
import Features from "@/components/featurs";


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

export default function Page() {
  // SEO
 




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

  const [showModal, setShowModal] = useState(true);

  const handleSubscribe = (email: string) => {
    console.log('User subscribed with email:', email);
  };



  return (
    <>
    <Head>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "mntdigital",
              "description": "Watch 1000+ sports, news, and entertainment channels instantly with mntdigital. Includes free trial and flexible plans.",
              "provider": {
                "@type": "Organization",
                "name": "mntdigital",
                "url": "https://mntdigital.com",
                "ContactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+1-782-222-1472",
                  "contactType": "customer service",
                  "email": "support@mntdigital.com"
                }, 
              },
              "areaServed": {
                "@type": "Country",
                "name": "Worldwide"
              },
              "serviceType": "IPTV Subscription",
              "url": "https://mntdigital.com",
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Free Trial",
                  "price": "0",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "eligibleDuration": {
                    "@type": "QuantitativeValue",
                    "value": 1,
                    "unitCode": "DAY"
                  }
                },
                {
                  "@type": "Offer",
                  "name": "1 Month Plan",
                  "price": "13.99",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "eligibleDuration": {
                    "@type": "QuantitativeValue",
                    "value": 1,
                    "unitCode": "MON"
                  }
                },
                {
                  "@type": "Offer",
                  "name": "6 Months Plan",
                  "price": "36.99",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "eligibleDuration": {
                    "@type": "QuantitativeValue",
                    "value": 6,
                    "unitCode": "MON"
                  }
                },
                {
                  "@type": "Offer",
                  "name": "1 Year Plan",
                  "price": "49.99",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "eligibleDuration": {
                    "@type": "QuantitativeValue",
                    "value": 12,
                    "unitCode": "MON"
                  }
                }
              ]
            })
          }}
        />
    </Head>
      {/* <SignUpModal /> */}
  
   <div>
     
      {/* Modal */}
      {showModal && (
        <SignupModal 
          onSubscribe={handleSubscribe}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
      {/* <Banner /> */}
      <Navbar />
      {/* <Earth/> */}
      <Hero />
      {/* <Newhero/> */}
      <Companies />
      {/* <HeroSection /> */}
      <LogoTicker />
      <Features />
      {/* <ProductShow /> */}
      <PricingSection  />
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

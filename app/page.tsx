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

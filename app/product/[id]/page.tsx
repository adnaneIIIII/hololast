"use client"
import FooterSection from "@/components/_holo/footer";
import Navbar from "@/components/_holo/navbar";
import Header from "@/components/_home/header";
import ProductPage from "@/components/ProductPage";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

function ProductIdRoute({ params }: { params: { id: string } }) {
  type Product = {
  id: string;
  Product_name: string;
  description: string;
  shortdescription: string;
  price?: number; // Optional image URL
  compareAtPrice?: number; // Optional author field
  images?: string[]; // Optional tags field
  createdAt: string;
};

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const res = await fetch(`/api/product/${params.id}`);
  //       if (!res.ok) throw new Error("Not found");
  //       const data: Product = await res.json();
  //       setProduct(data);
  //     } catch (err) {
  //       console.error(err);
  //       setProduct(null); // show “not found” message later
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   /* include params.id in dep array */
  //   fetchProduct();
  // }, [params.id]);




    useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/product/${params.id}`);
        if (!res.ok) throw new Error("Not found");
        const data: Product = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setProduct(null); // show “not found” message later
      } finally {
        setLoading(false);
      }
    };
    /* include params.id in dep array */
    fetchBlog();
  }, [params.id]);



  if (loading)
    return (
      <div className="w-full min-h-screen h-dvh flex flex-col items-center justify-center bg-background/80 backdrop-blur-md fixed inset-0 z-[9999]">
        <div className="border-2 border-t-primary border-border rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );
  if (!product) return <p>Product post not found.</p>;
  // SEO




    const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProductPosting",
    headline: product.Product_name,
    description: product.description,
    image: product.images,

    author: {
      "@type": "Person",
      name: "Ayoub elhrichi",
    },
    publisher: {
      "@type": "Organization",
      name: "mntdigital",
      logo: {
        "@type": "ImageObject",
        url: "https://mntdigital.com/Mntdigital-w.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mntdigital.com/product/${params.id}`,
    },
  };
  return (
    <>
    <Navbar/>
      <div className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductPage data={product} />  
        <div className="mt-16">{/* <FeaturedProducts />  */}</div>
      </div>
      <FooterSection/>
    </>
  );
}

export default ProductIdRoute;

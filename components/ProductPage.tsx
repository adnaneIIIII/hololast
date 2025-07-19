"use client";

import React from "react";
import Image from "next/image";
import { ShoppingBag, StarIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import formatCurrency from "@/components/formatCurrency";
import ImageSlider from "@/components/imageSlider";
import { Button } from "./ui/button";

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

function ProductPage({ data }: { data: Product | null }) {

  return (
    
    <div className="container mx-auto py-8 px-4 md:px-0">
      {/* Breadcrumb Navigation */}
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data?.Product_name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Product Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Image Slider */}
        <ImageSlider images={data?.images} />

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-white">{data?.Product_name}</h1>
         <div className="flex justify-between "> <p className="mt-2 text-2xl text-primary ">
            {formatCurrency(data?.price || 0)}
          </p>
          <p className="mt-2 text-2xl  text-orange-500 line-through">
            {formatCurrency(data?.compareAtPrice || 0)}
          </p>
</div>
          {/* Ratings */}
          <div className="mt-2 flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className="w-5 h-5 text-yellow-500 fill-yellow-500"
              />
            ))}
            <span className="text-sm text-gray-400 ml-2">(4.9)</span>
          </div>

          {/* Short Description */}
          <p className="mt-4 text-gray-400">{data?.shortdescription}</p>

          {/* Buy Button */}
          <Button  className="w-full py-6 bg-orange-500 text-white hover:text-black"  asChild>
             <a   href={`https://mntdigitals.com/checkout/${data?.id}`}
             
                      target="_blank"
                      rel="noopener noreferrer"
                    >

              <ShoppingBag className="w-5 h-5 mr-2" /> Buy Now
            </a>
</Button>
          {/* Payment Methods */}
          <div className="flex justify-center mt-6">
            <Image
              src="/payment.svg"
              alt="sports Broadcasting: Live Football Match Streaming"
              width={450}
              height={80}
            />
          </div>

          {/* Product Description */}
          <div className="mt-6">
            <Accordion type="single" defaultValue="item-1" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Description</AccordionTrigger>
    <AccordionContent>
      <div
        className="prose prose-lg max-w-none text-lg"
        dangerouslySetInnerHTML={{ __html: data?.description || "" }}
      />
    </AccordionContent>
  </AccordionItem>
</Accordion>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
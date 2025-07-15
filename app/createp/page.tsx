"use client";

import ImageSlider from "@/components/imageSlider";
import { useEffect, useState } from "react";

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

export default function ContactList() {
  const [contacts, setContacts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await fetch("/api/product");
      const data = await res.json();
      setContacts(data);
      setLoading(false);
    };

    fetchContacts();
  }, []);

  if (loading) return (<div className="w-full min-h-screen h-dvh flex flex-col items-center justify-center bg-background/80 backdrop-blur-md fixed inset-0 z-[9999]">
        <div className="border-2 border-t-primary border-border rounded-full w-8 h-8 animate-spin"></div>
      </div>)

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Submitted post</h1>
      {contacts.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <ul className="space-y-4">
          {contacts.map((contact) => (
            <li key={contact.id} className="border p-4 rounded">
              <p>
                <strong>Product title:</strong> {contact.Product_name}
              </p>
              <p>
                <strong>shortdescription:</strong> {contact.shortdescription}
              </p>
              <p>
                <strong>compareAtPrice:</strong> {contact.compareAtPrice}
              </p>
              <p>
                <strong>price:</strong> {contact.price}
              </p>
              <p>
                {/* <strong>description:</strong> {contact.description} */}
                <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: contact.description || "" }}
              />
              </p>
              <div>
                <ImageSlider images={contact.images} />
                
              </div>
              <p className="text-sm text-gray-500">
                <strong>Submitted:</strong>{" "}
                {new Date(contact.createdAt).toLocaleString()}
              </p>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

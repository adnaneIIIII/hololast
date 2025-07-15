"use client";

import Header from "@/components/_home/header";
import Head from "next/head";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuidv4 } from "uuid";
import Tiptap from "@/components/RichTextEditor/Tiptap";
import Image from "next/image";
import { UploadDropzone } from "@/utils/uploadthing";
import { XIcon } from "lucide-react";

export default function ProductPage() {
  const [images, setImages] = useState<string[]>([]);

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

const [formData, setFormData] = useState({
  Product_name: "",
  shortdescription: "",
  description: "",
  price: "",
  compareAtPrice: "",
  images: "",
});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const [content, setContent] = useState<string>("");

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    const data = {
      id: uuidv4(),
      content: newContent,
    };
    console.log("Content Updated:", data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    // Include both content and images array in the data to send
    const dataToSend = {
      ...formData,
      description: content,
      images, // Add the images array
    };

    try {
      const res = await fetch("/api/product", {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      setLoading(false);

      if (result.success) {
        setResponse("Form submitted successfully!");
        setFormData({
          Product_name: "",
          description: "",
          shortdescription: "",
          price: "",
          compareAtPrice: "",
          images: "",
        });
        setContent(""); // clear tiptap
      } else {
        setResponse("Failed to submit form.");
      }
    } catch (err) {
      setLoading(false);
      setResponse("Something went wrong.");
    }
  };

  return (
    <>
      <Head>
        <title>
          mntdigital | Creative Content & Social Media Marketing Agency
        </title>
      </Head>
      {/* Header */}
      <Header />
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl  px-4 sm:px-6  py-8 bg-slate-50 items-center justify-center flex rounded-3xl">
          <div className=" rounded-lg shadow-sm  transition-all">
            <div className="text-5xl font-bold text-black/80 py-14  tracking-wider">
              Create Product
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Details</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <Label className="text-gray-900">Product Name</Label>
                <Input
                  key="Product_name"
                  name="Product_name"
                  value={formData.Product_name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="flex-1 text-gray-900 block w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <Label className="text-gray-900">Short Description</Label>
                <Input
                  key="shortdescription"
                  name="shortdescription"
                  value={formData.shortdescription}
                  onChange={handleChange}
                  placeholder="shortdescription"
                  className="flex-1 text-gray-900 block w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <Label className="text-gray-900">Compare Price</Label>
                <Input
                  key="compareAtPrice"
                  name="compareAtPrice"
                  value={formData.compareAtPrice}
                  onChange={handleChange}
                  placeholder="compareAtPrice"
                  className="flex-1 text-gray-900 block w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <Label className="text-gray-900">Price</Label>
                <Input
                  key="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="price"
                  className="flex-1 text-gray-900 block w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />




 <Label>Image</Label>
                   <Input
                  type="hidden"
                  value={formData.images}
                  key="images"
                  name="images"
                />
                    {images.length > 0 ? (
                      <div className="flex gap-5">
                        {images.map((image, index) => (
                          <div
                            key={index}
                            className="relative w-[100px] h-[100px]">
                            <Image
                              height={100}
                              width={100}
                              src={image}
                              alt={"product image"}
                              className="w-full h-full object-cover rounded-lg border"
                            />
                            <button
                              onClick={() => handleDelete(index)}
                              type="button"
                              className="absolute -top-1 -right-1 p-1 rounded-lg bg-red-500 text-white">
                              <XIcon className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <UploadDropzone
                        endpoint="imageUploader"
                        className=""
                        onClientUploadComplete={(res) => {
                          setImages(res.map((r) => r.url));
                        }}
                        onUploadError={(error: Error) => {
                          alert("Something went wrong");
                        }}
                      />
                    )}




{/* 
                <Label className="text-gray-900">Image</Label>

                <Input
                  type="hidden"
                  value={formData.images}
                  key="images"
                  name="images"
                />
                {images.length > 0 ? (
                  <div className="flex gap-5">
                    {images.map((image, index) => (
                      <div key={index} className="relative w-[100px] h-[100px]">
                        <Image
                          height={100}
                          width={100}
                          src={image}
                          alt="Uploaded image"
                          className="w-full h-full object-cover rounded-lg border"
                        />
                        <button
                          onClick={() => handleDelete(index)}
                          type="button"
                          className="absolute -top-1 -right-1 p-1 rounded-lg bg-red-500 text-white"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="imageUploader"
                    className=""
                    onClientUploadComplete={(res) => {
                      const uploadedUrls = res.map((r) => r.url);
                      setImages(uploadedUrls); // Update the images array state
                      setFormData((prev) => ({
                        ...prev,
                        images: uploadedUrls.join(",") // Update formData with all image URLs
                      }));
                    }}
                    onUploadError={(error: Error) => {
                      alert("Something went wrong with the upload");
                    }}
                  />
                )} */}

                <div className=" flex-col gap-3 ">
                  <Label className="text-gray-900">Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => {
                      const newContent = e.target.value;
                      setContent(newContent);
                    }}
                    key="content"
                    name="content"
                    placeholder="Product Content"
                    className="text-gray-900  hidden ..."
                  />
                </div>
                <div className="">
                  <Tiptap
                    content={content}
                    onChange={handleContentChange}
                    className="w-full h-96 text-black "
                  />
                </div>

                <div className="flex justify-start gap-3 mt-4">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-orange-400 border-orange-500 text-white hover:bg-orange-600"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>

            {response && <p className="mt-4">{response}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

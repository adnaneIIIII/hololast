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
    title: "",
    content: "",
    category: "",
    author: "",
    tags: "",
    imgUrl: "",
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

    // Inject tiptap content into formData before submitting
    const dataToSend = {
      ...formData,
      content, // use tiptap content here
    };

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      setLoading(false);

      if (result.success) {
        setResponse("Form submitted successfully!");
        setFormData({
          title: "",
          content: "",
          category: "",
          author: "",
          tags: "",
          imgUrl: "",
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
          holoiptv | Creative Content & Social Media Marketing Agency
        </title>
      </Head>
      {/* Header */}
      <Header />
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50 items-center flex rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <div className=" rounded-lg shadow-sm p-6 transition-all">
                <div className="text-5xl font-bold text-black/80 py-14  tracking-wider">
                  CheckOut
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                  Details
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <Label className="text-gray-900">title</Label>
                    <Input
                      key="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="title"
                      className="flex-1 text-gray-900 block w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Label className="text-gray-900">Category</Label>
                    <Input
                      key="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="category"
                      className="flex-1 text-gray-900 block w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Label className="text-gray-900">Tags</Label>
                    <Input
                      key="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="tags"
                      className="flex-1 text-gray-900 block w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Label className="text-gray-900">Image</Label>

                    <Input
                      type="hidden"
                      value={formData.imgUrl}
                      key="imgUrl"
                      name="imgUrl"
                    />
                    {images.length > 0 ? (
                      <div className="flex gap-5">
                        {images.map((image, index) => (
                          <div
                            key={index}
                            className="relative w-[100px] h-[100px]"
                          >
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
                          setImages(uploadedUrls);

                          // Optional: pick the first one to use as main image
                          if (uploadedUrls.length > 0) {
                            setFormData((prev) => ({
                              ...prev,
                              imgUrl: uploadedUrls[0],
                            }));
                          }
                        }}
                      />
                    )}

                    <Label className="text-gray-900">Author</Label>
                    <Input
                      key="author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="author"
                      className="flex-1 text-gray-900 block w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <div className=" flex-col gap-3 ">
                      <Label className="text-gray-900">Description</Label>
                      <Textarea
                        value={formData.content}
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
        </div>
      </div>
    </>
  );
}

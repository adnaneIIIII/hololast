"use client";

import Header from "@/components/_home/header";
import { Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSingleProduct } from "@/services";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export default function ProductPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

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

    const res = await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify(formData),
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
      });
    } else {
      setResponse("Failed to submit form.");
    }
  };

  return (
    <>
      <Head>
        <title>
          MntDigital | Creative Content & Social Media Marketing Agency
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

                    <Label className="text-gray-900">title</Label>
                    <Input
                      key="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="category"
                      className="flex-1 text-gray-900 block w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />

                    <Label className="text-gray-900">Email</Label>
                    <Textarea
                      key="content"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="Email"
                      className="flex-1 text-gray-900 block w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />

                    {/* COUNTRY SELECT DROPDOWN */}

                    <div className="flex justify-start gap-3 mt-4">
                      <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-orange-400 border-orange-500 text-white hover:bg-orange-600"
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </button>

                      {/* <Button className="w-full py-6 bg-orange-400 border-orange-500 text-white hover:bg-orange-600 ">
                        Submit Now
                        {loading ? "Submitting..." : "Submited"}
                      </Button> */}
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

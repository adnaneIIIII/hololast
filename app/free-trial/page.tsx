"use client";

import { Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Head from "next/head";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Header from "@/components/_home/header";

export default function Page() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    productname: "Free Trial",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
  
      const result = await res.json();
  
     
    } catch (error) {
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50 items-center flex rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <div className=" rounded-lg shadow-sm p-6 transition-all">
                <div className="text-5xl font-bold text-black/80 py-14  tracking-wider">
                  Order Your Free Trial
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                  Details
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <div className=" md:flex md:items-center gap-6 ">
                      <div className=" md:w-[50%] ">
                        <Label className="text-gray-900">FirstName</Label>
                        <Input
                          key="firstname"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleChange}
                          placeholder="Firstname"
                          className="flex-1 text-gray-900 block w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className=" md:w-[50%] gap-3 ">
                        <Label className="text-gray-900">LastName</Label>
                        <Input
                          key="lastname"
                          name="lastname"
                          value={formData.lastname}
                          onChange={handleChange}
                          placeholder="Lastname"
                          className="flex-1 text-gray-900 block w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <Label className="text-gray-900">Email</Label>
                    <Input
                      key="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="flex-1 text-gray-900 block w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Label className="text-gray-900">Phone</Label>
                    <Input
                      key="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      className="flex-1 text-gray-900 block w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Input
                      type="text"
                      name="productname"
                      value={formData.productname}
                      onChange={handleChange}
                      placeholder="Productname"
                      className="flex-1 hidden text-gray-900  w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />

                    {/* COUNTRY SELECT DROPDOWN */}
                    <Label className="text-gray-900">Country</Label>
                    <Select
                      key="country"
                      name="country"
                      value={formData.country}
                      onValueChange={(value) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          country: value,
                        }))
                      }
                    >
                      <SelectTrigger
                        id="country"
                        className="text-gray-900 border p-2 w-full"
                      >
                        <SelectValue
                          placeholder="Choose..."
                          className="text-gray-900"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United_States">
                          United States
                        </SelectItem>
                        <SelectItem value="United_Kingdom">
                          United Kingdom
                        </SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Philippines">Philippines</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>

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
            <div className="lg:col-span-5 mt-14 border-0">
              <Card className="mb-2 bg-slate-50 border-0">
                <CardContent className="pt-4">
                  <h2 className="mb-4 text-xl font-semibold text-gray-900">
                    Order Summary
                  </h2>
                  <div className="lg:col-span-5">
                    <div className="space-y-6">
                      {/* What You Get */}

                      <div className="space-y-4">
                        {/* Product preview */}
                        <div className="flex items-center gap-4 border-b border-black/10 pb-4">
                          <div className="flex-grow">
                            <h3 className="text-sm font-medium text-gray-900">
                              &apos;free trial&apos; - 24 hours
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Modern Design
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              0$
                            </p>
                          </div>
                        </div>
                        <div className="mt-6 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="font-medium text-gray-900">
                              $0
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Compare Price</span>
                            <span className="font-medium text-red-400 line-through">
                              $0
                            </span>
                          </div>
                          <div className="flex justify-between border-t border-black/10 pt-2 mt-2">
                            <span className="font-medium text-gray-900">
                              Total
                            </span>
                            <span className="font-bold text-gray-900">$0</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                          <Lock className="h-4 w-4" />
                          <span>Secure Checkout - SSL Encrypted</span>
                        </div>

                        <p className="text-xs text-gray-500 text-center">
                          Ensuring your financial and personal details are
                          secure during every transaction.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

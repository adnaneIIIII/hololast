import React, { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    const res = await fetch("/api/contactform", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    setLoading(false);

    if (result.success) {
      setResponse("Form submitted successfully!");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",
      });
      // router.push(`/pay/${params?.id}`);
    } else {
      setResponse("Failed to submit form.");
    }
  };

  return (
    <div className="bg-black">
      {/* Contact Section */}
      <section
        id="contact"
        className="w-full  py-12 md:py-24 lg:py-32 bg-card flex justify-center text-white"
      >
        <div className="container  px-4 md:px-6">
          <div className="grid gap-6  lg:grid-cols-2 lg:gap-12">
            <div className="flex  flex-col justify-center space-y-4">
              <div className="space-y-2 ">
                <h2 className="text-3xl  font-bold tracking-tighter sm:text-5xl">
                  Get in Touch
                </h2>
                <p className="max-w-[600px]  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ready to elevate your social media presence? Contact us today
                  to discuss how we can help your business grow.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 " />
                  <div>
                    <h3 className="font-bold">Address</h3>
                    <p className="">
                      Bureau 9, 2ème étage, Immeuble Al Youbia, Ave Allal Ben
                      Abdellah, Fes 30000, Morocco
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 " />
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="">support@mntdigital.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 " />
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="">+1 (782) 222-1472</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="rounded-full bg-white/10 p-2 hover:bg-white/20"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="#"
                  className="rounded-full bg-white/10 p-2 hover:bg-white/20"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="rounded-full bg-white/10 p-2 hover:bg-white/20"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="rounded-full bg-white/10 p-2 hover:bg-white/20"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div className="rounded-lg border bg-zinc-800  p-6 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="first-name"
                      className="text-sm font-medium leading-none"
                    >
                      First name
                    </label>
                    <Input
                      key="firstname"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      placeholder="Firstname"
                      className="flex-1 text-gray-900 block w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="last-name"
                      className="text-sm font-medium leading-none"
                    >
                      Last name
                    </label>
                    <Input
                      key="lastname"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      placeholder="Lastname"
                      className="border-zinc-900 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none"
                  >
                    Email
                  </label>
                  <Input
                    key="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border-zinc-900 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium leading-none"
                  >
                    Company
                  </label>
                  <Input
                    key="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="border-zinc-900 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none"
                  >
                    Message
                  </label>
                  <Textarea
                    key="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="message"
                    className="min-h-[120px] border-zinc-900 text-white"
                  />
                </div>
                <div className="flex justify-start gap-3 mt-4">
                  <button
                    type="submit"
                    className="w-full py-2 text-black rounded-lg bg-white border-orange-500 hover:bg-orange-600"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>

                  {/* <Button className="w-full py-6 bg-orange-400 border-orange-500 text-white hover:bg-orange-600 ">
                        Submit Now
                        {loading ? "Submitting..." : "Submited"}
                      </Button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

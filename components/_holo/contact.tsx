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
  X,
  CheckCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Success Modal Component
const SuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-zinc-900 rounded-lg shadow-2xl max-w-md w-full p-6 border border-zinc-700">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="mb-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3">
            Message Sent Successfully!
          </h3>
          
          <p className="text-zinc-300 mb-6">
            Thank you for contacting us. We&apos;ve received your message and will get back to you within 24 hours.
          </p>
          
          <div className="space-y-2 text-sm text-zinc-400 mb-6">
            <p>📧 A confirmation email has been sent to your inbox</p>
            <p>⏰ Expected response time: 24 hours</p>
          </div>
          
          <button
            onClick={onClose}
            className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
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
        // Show success modal
        setShowSuccessModal(true);
      } else {
        setResponse("Failed to submit form.");
      }
    } catch (error) {
      setLoading(false);
      setResponse("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-black">
      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />

      {/* Contact Section */}
      <section
        id="contact"
        className="w-full py-12 md:py-24 lg:py-32 bg-card flex justify-center"
      >
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Get in Touch
                </h2>
                <p className="max-w-[600px] text-zinc-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ready to elevate your social media presence? Contact us today
                  to discuss how we can help your business grow.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 text-orange-500" />
                  <div>
                    <h3 className="font-bold text-white">Address</h3>
                    <p className="text-zinc-300">
                      1412 Broadway 21st Floor, New York, NY 10018, United States
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 text-orange-500" />
                  <div>
                    <h3 className="font-bold text-white">Email</h3>
                    <p className="text-zinc-300">support@mntdigital.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 text-orange-500" />
                  <div>
                    <h3 className="font-bold text-white">Phone</h3>
                    <p className="text-zinc-300">+1 (782) 222-1472</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-zinc-800 p-6 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="text-sm font-medium leading-none text-white"
                    >
                      First name
                    </label>
                    <Input
                      id="firstname"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      placeholder="Firstname"
                      className="border-zinc-600 text-white bg-zinc-900 placeholder:text-zinc-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastname"
                      className="text-sm font-medium leading-none text-white"
                    >
                      Last name
                    </label>
                    <Input
                      id="lastname"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      placeholder="Lastname"
                      className="border-zinc-600 text-white bg-zinc-900 placeholder:text-zinc-400"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none text-white"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border-zinc-600 text-white bg-zinc-900 placeholder:text-zinc-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium leading-none text-white"
                  >
                    Phone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="border-zinc-600 text-white bg-zinc-900 placeholder:text-zinc-400"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none text-white"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    className="min-h-[120px] border-zinc-600 text-white bg-zinc-900 placeholder:text-zinc-400"
                    required
                  />
                </div>
                
                {/* Error message */}
                {response && !response.includes("successfully") && (
                  <div className="text-red-400 text-sm">{response}</div>
                )}
                
                <div className="flex justify-start gap-3 mt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 text-black rounded-lg bg-white border-orange-500 hover:bg-orange-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {loading ? "Submitting..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
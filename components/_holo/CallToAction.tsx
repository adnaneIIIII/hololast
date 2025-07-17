import { useState } from "react";
import { Input } from "../ui/input";
import { X, CheckCircle, Mail, Gift } from "lucide-react";

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
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full p-6 border">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="mb-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Welcome to the Club! 🎉
          </h3>
          
          <p className="text-gray-600 mb-6">
            You&apos;re all set! We&apos;ve added you to our exclusive list and you&apos;ll be the first to know about our latest releases and best deals.
          </p>
          
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gift className="h-5 w-5 text-orange-500" />
              <span className="font-semibold text-orange-700">What&apos;s Next?</span>
            </div>
            <div className="space-y-2 text-sm text-orange-700">
              <p>📧 Check your inbox for a welcome email</p>
              <p>🎁 Exclusive deals coming your way</p>
              <p>🚀 Be first to access new releases</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Awesome, got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CallToAction() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/deal", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      setLoading(false);

      if (result.success) {
        setResponse("Form submitted successfully!");
        setFormData({
          email: "",
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
    <div className="py-[72px] sm:py-24 flex justify-center">
      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />

      <div className="container max-w-xl relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get instant access
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg max-w-2xl mx-auto">
            Be the first to know Get the latest releases and best deals
            delivered to your inbox.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex justify-center gap-2.5 max-w-sm mx-auto sm:flex-row items-center"
        >
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="flex-1 text-white block w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            required
          />
          <div className="flex justify-start gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-5 rounded-lg bg-orange-500 border-orange-500 text-white hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "Getting access..." : "Get access"}
            </button>
          </div>
        </form>

        {/* Error message */}
        {response && !response.includes("successfully") && (
          <div className="text-red-500 text-sm text-center mt-4">{response}</div>
        )}
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SignupModalProps {
  onClose?: () => void;
  onSubscribe?: (email: string) => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ onClose, onSubscribe }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [response, setResponse] = useState("");

  // Show modal after 3s if not already seen in this session
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenModal');
    if (hasSeenModal) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenModal', 'true');
    if (onClose) onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim()) return;

    setLoading(true);
    setIsLoading(true);
    setResponse("");

    const res = await fetch("/api/deal", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    setLoading(false);
    setIsLoading(false);

    if (result.success) {
      setResponse("Form submitted successfully!");
      setFormData({ email: "" });

      if (onSubscribe) {
        onSubscribe(formData.email);
      }

      setIsSubscribed(true);
      sessionStorage.setItem('hasSeenModal', 'true');

      setTimeout(() => {
        handleClose();
      }, 3000);
    } else {
      setResponse("Failed to submit form.");
    }
  };

  const handleNotNow = () => {
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-6xl w-full mx-4 transform transition-all duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>

        <div className="text-center">
          {!isSubscribed ? (
            <div className="flex justify-center items-center">
              <div className='w-[40%]'>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Subscribe & Stay Updated!
                </h2>
                <p className="text-gray-600 mb-6">
                  Get the latest IPTV offers and updates straight to your inbox.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                    <button
                      type="button"
                      onClick={handleNotNow}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Not Now
                    </button>
                  </div>
                  {response && (
                    <p className="text-sm text-gray-600 mt-2">{response}</p>
                  )}
                </form>
              </div>
              <div className='w-[60%]'>
                <Image
                  src="/cta-img.webp"
                  alt="IPTV Service"
                  width={950}
                  height={950}
                  className="mx-auto"
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <div className='w-[40%]'>
                <div className="text-green-600 text-4xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Thank You for Subscribing!
                </h2>
                <p className="text-gray-600 mb-4">
                  You&apos;ll be the first to know about our latest IPTV offers and updates.
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Stay tuned — exciting content is on the way!
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleClose}
                    className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className='w-[60%]'>
                <Image
                  src="/cta-img.webp"
                  alt="IPTV Service"
                  width={950}
                  height={950}
                  className="mx-auto"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupModal;

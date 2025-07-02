import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function CallToAction() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

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
      // router.push(`/pay/${params?.id}`);
    } else {
      setResponse("Failed to submit form.");
    }
  };

  return (
    <div className=" py-[72px] sm:py-24 flex justify-center">
      <div className="container max-w-xl relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get instant access
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            Be the first to know Get the latest releases and best deals
            delivered to your inbox.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex justify-center  gap-2.5 max-w-sm mx-auto sm:flex-row items-center "
        >
          <Input
            key="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="flex-1 text-gray-900 block w-full rounded-none rounded-r-md py-2 px-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="flex  justify-start gap-3">
            <button
              type="submit"
              className="w-full  py-2 px-5 rounded-lg bg-orange-400 border-orange-500 text-white hover:bg-orange-600"
            >
              {loading ? "Get access..." : "Get access"}
            </button>

            {/* <Button className="w-full py-6 bg-orange-400 border-orange-500 text-white hover:bg-orange-600 ">
                        Submit Now
                        {loading ? "Submitting..." : "Submited"}
                      </Button> */}
          </div>
          {/* <Button className="py-5 px-5 ">Get access</Button> */}
        </form>
      </div>
    </div>
  );
}

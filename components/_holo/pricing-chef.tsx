import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";
import { bannerSection } from "@/services";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  originalPrice?: string;
  savings?: string;
  connection: string;
  features: string[];
  isPopular?: boolean;
  buttonVariant?: "default" | "secondary";
}

interface Product {
  compareAtPrice: number;
  description: string;
  id: string;
  isFeatured: boolean;
  name: string;
  price: number;
  publishedAt: string;
  shortdescription: string;
  status: string;
  images: { url: string }[];
}

type GetProductResponse = {
  product: Product[];
};

const pricingPlans: PricingPlan[] = [
  {
    id: "1-month",
    name: "1 Month Plan",
    price: "$15.99",
    period: "per month",
    connection: "1 connection",
    features: [
      "23,000+ Live Channels",
      "125,000+ Movies",
      "37,000+ Series",
      "4K/FHD/HD Quality",
      "99.9% Uptime",
      "24/7 Support",
      "All Devices",
      "Anti-Freeze System",
    ],
    buttonVariant: "secondary",
  },
  {
    id: "6-months",
    name: "6 Months Plan",
    price: "$39.99",
    period: "6 months",
    originalPrice: "$83.94",
    savings: "Save $47",
    connection: "1 connection",
    features: [
      "23,000+ Live Channels",
      "125,000+ Movies",
      "37,000+ Series",
      "4K/FHD/HD Quality",
      "99.9% Uptime",
      "24/7 Support",
      "All Devices",
      "Anti-Freeze System",
      "Free Updates",
    ],
    buttonVariant: "secondary",
  },
  {
    id: "12-months",
    name: "12 Months Plan",
    price: "$59.99",
    period: "12 months",
    originalPrice: "$167.88",
    savings: "Save $118",
    connection: "1 connection",
    features: [
      "23,000+ Live Channels",
      "125,000+ Movies",
      "37,000+ Series",
      "4K/FHD/HD Quality",
      "99.9% Uptime",
      "24/7 Support",
      "All Devices",
      "Anti-Freeze System",
      "Free Updates",
      "Priority Support",
    ],
    isPopular: true,
    buttonVariant: "default",
  },
];

export default function PricingSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = (await bannerSection()) as GetProductResponse;
      setProducts(res.product);
      console.log(res.product);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load pricing data');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get price display
  const getPriceDisplay = (index: number, fallbackPrice: string) => {
    if (loading) return "Loading...";
    if (products[index]?.price !== undefined) {
      return `$${products[index].price}`;
    }
    return fallbackPrice;
  };

  // Helper function to get product ID for checkout
  const getProductId = (index: number) => {
    return products[index]?.id || '';
  };

  if (error) {
    return (
      <section className="py-16 px-4 min-h-screen" id="pricing">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Pricing</h2>
          <p className="text-red-400">Error loading pricing data. Please try again later.</p>
          <Button onClick={fetchProducts} className="mt-4">
            Retry
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 min-h-screen" id="pricing">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Pricing
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            You can try our service before you pay - no billing required
          </p>
        </div>

        {/* Free Trial Banner */}
        <Link href="/free-trial">
          <div className="border-orange-500 border-2 rounded-lg p-4 mb-12 text-center hover:bg-orange-500/10 transition-colors">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="flex items-center gap-2 font-semibold underline hover:text-orange-300 text-lg transition-colors">
                <Zap className="h-5 w-5" /> 24h Free Trial Available
              </span>
            </div>
            <p className="text-orange-100 text-sm">
              Try our service risk-free for 24 hours before committing to any
              plan - no credit card required.
            </p>
          </div>
        </Link>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`relative h-full flex flex-col transition-all duration-300 hover:scale-105 ${
                plan.isPopular
                  ? "ring-2 ring-orange-500 shadow-2xl shadow-orange-500/20"
                  : "hover:border-gray-600"
              }`}
            >
              {plan.isPopular && (
                <Badge className="absolute -top-3 right-4 bg-orange-500 hover:bg-orange-600">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <h3 className="text-xl font-bold mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold">
                    {getPriceDisplay(index, plan.price)}
                  </span>
                  <span className="text-gray-400 ml-1">/ {plan.period}</span>
                </div>
                <div className="text-sm text-gray-400 mb-2">
                  {plan.connection}
                </div>
                {plan.savings && (
                  <div className="flex justify-center">
                    <Badge
                      variant="secondary"
                      className="justify-center flex w-20 bg-green-600 hover:bg-green-700 text-white"
                    >
                      {plan.savings}
                    </Badge>
                  </div>
                )}
              </CardHeader>

              <CardContent className="flex flex-col flex-grow pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button pushed to bottom */}
                <div className="mt-auto pt-4">
                  {loading || !getProductId(index) ? (
                    <Button
                      className={`w-full ${
                        plan.isPopular
                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                      }`}
                      variant={plan.buttonVariant}
                      disabled={true}
                    >
                      {loading ? "Loading..." : "Unavailable"}
                    </Button>
                  ) : (
                    <Button
                      className={`w-full ${
                        plan.isPopular
                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                      }`}
                      variant={plan.buttonVariant}
                      asChild
                    >
                      <a
                        href={`https://mntdigitals.com/checkout/${getProductId(index)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Started
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
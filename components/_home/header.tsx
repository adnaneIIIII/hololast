"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href={"/"}>
            <Image
              src={"/Mntdigitals-bo.png"}
              width={120}
              height={100}
              alt="sports Broadcasting: Live Football Match Streaming"
              className="h-18 w-28 relative"
            />
          </Link>
          <div className="hidden sm:flex items-center space-x-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-600">
                Cart
              </span>
            </div>

            <div className="flex items-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white">
                <span className="text-xs font-bold">2</span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-600">
                Details
              </span>
            </div>

            <div className="flex items-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white">
                <span className="text-xs font-bold">3</span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">
                Checkout
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

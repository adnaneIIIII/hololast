"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import Head from "next/head";
import { MenuIcon, X } from "lucide-react"; // You can also use a custom close icon
import { ModeToggle } from "../toggle";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Head>
        <title>IPTV Services - Best IPTV Provider</title>
        <meta
          name="description"
          content="Looking for the best IPTV services? Explore our top-notch IPTV options to stream live TV, sports, and movies!"
        />
        <meta
          name="keywords"
          content="IPTV, IPTV services, best IPTV, IPTV provider, streaming services"
        />
        <meta
          property="og:title"
          content="IPTV Services - Best IPTV Provider"
        />
        <meta
          property="og:description"
          content="Explore top IPTV services for seamless streaming."
        />
        <meta property="og:image" content="/path-to-image.jpg" />
        <meta property="og:url" content="https://mntdigital.com/" />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className=" border-b p-2">
        <div className="px-4">
          <div className="py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="relative">
              <div className="absolute w-full top-1 bottom-0 bg-gradient-to-r from-[#a52f0092] to-[#3d3721c1] blur-md"></div>
              <Link href={"/"}>
                <Image
                  src={"/Mntdigitals-wo.png"}
                  width={120}
                  height={100}
                  alt="IPTV service offering high-quality streaming"
                  className="h-14 w-28 relative"
                  priority={false}
                  loading="lazy"
                />
              </Link>
            </div>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="sm:hidden z-50 relative"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className=" h-10 w-10" />
              ) : (
                <MenuIcon className=" h-10 w-10" />
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="md:flex gap-6 items-center hidden">
              <Link href="/#lFeatures" className="hover: text-sm">
                Features
              </Link>
              <Link href="/list-channels" className="hover: text-sm">
                Channels list
              </Link>
              <Link href="/#pricing" className="hover: text-sm">
                Pricing
              </Link>
              <Link href="/how-it-work" className="hover: text-sm">
                How it Work
              </Link>
              <Link href="/#contact" className="hover: text-sm">
                Contact
              </Link>
              <Button variant={"default"}>
                <Link href="/free-trial">Get free Trial</Link>
              </Button>
              <ModeToggle/>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <nav className="sm:block md:hidden px-4 pb-6">
            <ul className="flex flex-col gap-4 mt-4 ">
              <Link href="#lFeatures" onClick={() => setMobileOpen(false)}>
                Features
              </Link>
              <Link href="/#pricing" onClick={() => setMobileOpen(false)}>
                Pricing
              </Link>
              <Link href="/how-it-work" onClick={() => setMobileOpen(false)}>
                How it Work
              </Link>
              <Link href="/#contact" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
              <Button variant={"default"}>
                <Link href="/#pricing">Get for free</Link>
              </Button>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}

export default Navbar;

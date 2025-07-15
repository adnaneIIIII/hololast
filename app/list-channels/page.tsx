"use client";

import channels from "@/components/structured_channels.json";

import React, { useState } from "react";
import { Tv, FolderOpen, Search, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/_holo/navbar";

const colors = [
  "from-pink-500 via-red-500 to-yellow-500",
  "from-cyan-500 via-blue-500 to-purple-500",
  "from-green-400 via-teal-500 to-indigo-500",
  "from-yellow-400 via-orange-500 to-rose-500",
];

export default function ChannelExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filterChannels = (channel: string) =>
    channel.toLowerCase().includes(searchTerm.toLowerCase());

  const categories = Object.entries(channels);

  const visibleCategories = categories.filter(([, data]) =>
    Object.values(data as any).some((channels) =>
(channels as string[]).some((ch: string) => filterChannels(ch))
    )
  );

  return (
    <>
         <Navbar/>
    <div className="p-6 sm:p-8 max-w-7xl mx-auto">


      {/* Search */}
      <div className="sticky top-4 z-10 mb-10">
        <div className="flex items-center gap-3 bg-black/70 border border-gray-600 backdrop-blur-lg px-5 py-3 rounded-full shadow-xl max-w-md mx-auto">
          <Search className="" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedCategory(null); // reset on search
            }}
            placeholder="Search channels..."
            className="w-full bg-transparent  outline-none text-white placeholder-gray-400 text-lg"
          />
        </div>
      </div>

      {/* Category Grid or Selected View */}
      {!selectedCategory ? (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        >
          {visibleCategories.map(([category], i) => (
            <motion.button
              key={category}
              layout
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedCategory(category)}
              className={`bg-white/10 ${
                colors[i % colors.length]
              } p-6 rounded-md text-white font-semibold shadow-lg flex items-center justify-center text-center h-32`}
            >
              <FolderOpen className="mr-2" />
              {category}
            </motion.button>
          ))}
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="space-y-10"
          >
            {/* Back button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-white hover:underline mb-4"
            >
              <ArrowLeft />
              Back to categories
            </button>

            {/* Channel sections */}
            {Object.entries(
              channels[selectedCategory as keyof typeof channels] || {}
            ).map(([sub, list], idx) => {
              const filtered = (list as string[]).filter(filterChannels);
              if (filtered.length === 0) return null;

              return (
                <div key={sub} className="space-y-4">
                  <h2 className="text-2xl font-bold text-white/60 underline">
                    {sub}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filtered.map((ch, i) => (
                      <div
                        key={i}
                        className={`bg-white/10 ${

                          colors[i % colors.length]
                        } p-4 rounded-md shadow-lg flex items-center gap-2 text-white font-medium hover:scale-105 transition-transform duration-300`}
                      >
                        <Tv className="w-5 h-5" />
                        {ch}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
    </>
  );
}

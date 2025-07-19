import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import FooterSection from "./footer";

type Blog = {
  id: string;
  title: string;
  content: string;
  category: string;
  imgUrl?: string; // Optional image URL
  author?: string; // Optional author field
  tags?: string; // Optional tags field
  createdAt: string;
  updatedAt: string;
};

export default function BlogPost() {
  const [contacts, setContacts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setContacts(data);
      setLoading(false);
    };

    fetchContacts();
  }, []);

  if (loading)
    return (
         <div className="flex items-center justify-center h-screen">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
    );

  return (
    <section className=" py-16 px-4 sm:px-6 lg:px-8" id="blog"> 
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold  mb-4">
            Latest Blog Posts
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full"></div>
          <p className=" mt-6 text-lg max-w-2xl mx-auto">
            Stay updated with the latest IPTV trends, <br/>guides, and industry
            insights
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(contacts) && contacts.length > 0 ? (
            contacts.slice(0, 3).map((post) => (
                <Link key={post.id}
                      className="flex items-center"
                      href={`/post/${post.id}`}
                    >
              <Card
                key={post.id}
                className=" border-gray-700 overflow-hidden group hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-2"
              >
              
                <div className="relative overflow-hidden">
                  <Image
                    src={
                      post.imgUrl?.startsWith("http") ||
                      post.imgUrl?.startsWith("/")
                        ? post.imgUrl
                        : "/placeholder.svg"
                    }
                    alt={post.title || "Popular Movie: Action Thriller Available on IPTV"}
                    width={400}
                    height={240}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500  px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-4  text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.createdAt.toString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.createdAt.toString()}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold  mb-3 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className=" mb-6 line-clamp-3 leading-relaxed">
                    <div
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: post?.content || "" }}
                    />
                  </p>

                  <Button
                    variant="ghost"
                    className="text-orange-400 hover:text-white hover:bg-orange-500 transition-all duration-300  h-auto  font-semibold group/btn asChild"
                  >
                    <Link
                      className="flex items-center"
                      href={`/post/${post.id}`}
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              
              </Card>
               </Link>
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center">
              No blog posts found.
            </p>
          )}
        </div>

        {/* View All Button */}
      </div>
    </section>
  );
}

"use client";
import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";
import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "@/components/_holo/navbar";
import FooterSection from "@/components/_holo/footer";

export default function ProductPage({ params }: { params: { id: string } }) {
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

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${params.id}`);
        if (!res.ok) throw new Error("Not found");
        const data: Blog = await res.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
        setBlog(null);       // show “not found” message later
      } finally {
        setLoading(false);
      }
    };

    /* include params.id in dep array */
    fetchBlog();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (!blog)   return <p>Blog post not found.</p>;
    // SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.content,
    image: blog.imgUrl,

    author: {
      "@type": "Person",
      name: "Ayoub elhrichi",
    },
    publisher: {
      "@type": "Organization",
      name: "HOLOIPTV",
      logo: {
        "@type": "ImageObject",
        url: "https://HOLOIPTV.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://HOLOIPTV.com/blog/${params.id}`,
    },
  };
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className="min-h-screen ">
        {/* Header */}

        <Navbar />

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-12">
          <article className="prose prose-lg prose-gray max-w-none">
            {/* Post Header */}
            <div className="not-prose mb-8">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                  {blog?.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold  leading-tight mb-6">
                {blog?.title}
              </h1>

              <div className="flex items-center space-x-6 text-gray-600 mb-8">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Ayoub el.</span>
                </div>
                {/* <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{blogPosts?.createdAt}</span>
                </div> */}
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>8 min read</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="not-prose mb-8">
              <Image
                src={
                  blog.imgUrl?.startsWith("http") ||
                  blog.imgUrl?.startsWith("/")
                    ? blog.imgUrl
                    : "/placeholder.svg"
                }
                alt={blog.title}
                width={400}
                height={240}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* blogPostst Content */}
            <div className="prose prose-lg max-w-none">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
              />
            </div>

            {/* Tags */}
            <div className="not-prose mt-12 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                  Premium IPTV
                </span>
                <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                  IPTV services
                </span>
                <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                  Best IPTV
                </span>
                <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                  IPTV Subscription
                </span>
                <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                  Stream anytime
                </span>
              </div>
            </div>

            {/* Author Bio */}
            <div className="not-prose mt-12 p-6  rounded-lg">
              <div className="flex items-start space-x-4">
                <Image
                  src="/ayoub.jpg?height=80&width=80"
                  alt="Author avatar"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div>
                  <h4 className="text-lg font-semibold  mb-2">ayoubelhrichi</h4>
                  <p className=" mb-3">
                    Experienced IPTV Technician with over 8 years of expertise
                    in setting up, maintaining, and optimizing IPTV systems.
                    Passionate about cutting-edge broadcast technologies and
                    committed to delivering high-quality streaming solutions
                    while sharing knowledge within the tech community.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      Twitter
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      LinkedIn
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </main>
        <FooterSection />
      </div>
    </>
  );
}

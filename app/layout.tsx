import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { generateMetadata } from "@/utils";
import Head from "next/head";
import Clarity from "@/components/Clarity";
import Script from "next/script";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";

const geistSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata = generateMetadata({
  email: "support@mntdigital.com",
  telephone: "+17822221472",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "mntdigital",
    "url": process.env.NEXT_PUBLIC_APP_URL,
    "logo": `${process.env.NEXT_PUBLIC_APP_URL}/iptv-service.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+17822221472",
      "contactType": "customer service",
      "email": "support@mntdigital.com",
      "areaServed": "Worldwide",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://twitter.com/mntdigital",
      "https://www.linkedin.com/company/mntdigital"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
       
      </head>
      <body className={`${geistSans.className} antialiased`}>
 <head>
        {/* Clarity Script */}
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/sfg01wp9qh";
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "sfg01wp9qh");`,
          }}
        />
      </head>
       
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

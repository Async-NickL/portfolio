import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/footer";

const syne = Syne({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-primary",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-secondary",
});

export const metadata = {
  title: {
    default: "Nikhil Kole | Full Stack Developer",
    template: "%s | Nikhil Kole"
  },
  description: "Portfolio of Nikhil Kole, a Full Stack Developer and Creative Thinker based in Kolhapur. Specializing in building exceptional digital experiences with Next.js, React, and modern web technologies.",
  keywords: [
    "Nikhil Kole",
    "Full Stack Developer",
    "Software Engineer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
    "Kolhapur",
    "Frontend Developer",
    "Backend Developer"
  ],
  authors: [{ name: "Nikhil Kole", url: "https://github.com/Async-NickL" }],
  creator: "Nikhil Kole",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Nikhil Kole | Full Stack Developer",
    description: "Creating digital experiences that matter. Explore my projects, skills, and journey as a developer.",
    siteName: "Nikhil Kole Portfolio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/favcon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} selection:bg-primary selection:text-background ${inter.variable} font-sans bg-[#060010] antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

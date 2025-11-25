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
  title: "Portfolio",
  description: "Portfolio Website",
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

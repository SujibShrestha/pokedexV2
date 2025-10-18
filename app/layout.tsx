import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // choose weights you need
});

export const metadata: Metadata = {
  title: "Pokedex",
  description: "A pokedex website / app made using nextJs that let you search / explore pokemon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 <html lang="en">
      <body 
        className={poppins.className}
      >
        <ThemeProvider
          attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
        {children}
      </ThemeProvider>
      </body>
    </html>
  );
}

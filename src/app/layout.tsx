import type { Metadata } from "next";
//import { Poppins } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";

// const poppins = Poppins({
//   weight: ['400', '500', '600', '700'],
//   subsets: ['latin'],
//   display: 'swap',
// })

const mainlux= localFont({
  src: "../../public/digitype-studio-mainlux-light.otf",
})

export const metadata: Metadata = {
  title: "Renovision",
  description: "Rénovation numérique de vos photos immobilières",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${mainlux.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

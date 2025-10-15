import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Childhood.ink - La Newsletter qui Grandit avec Votre Enfant",
  description:
    "Recevez des conseils personnalisés adaptés à l'âge de votre enfant. Activités, santé, administratif, financier : les bonnes informations au bon moment.",
  openGraph: {
    title: "Childhood.ink - Newsletter Éducative pour Parents",
    description:
      "Des conseils personnalisés livrés aux moments clés de la vie de votre enfant",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}


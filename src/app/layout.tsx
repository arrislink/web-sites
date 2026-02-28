import type { Metadata } from "next";
import "./[locale]/globals.css";

export const metadata: Metadata = {
  title: "Arrislink - Private AI & Narrative Technology | 微棱信息",
  description: "Enterprise-grade Private AI deployment and consumer AI narrative products. 企业级私有 AI 部署与消费级 AI 叙事产品。",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arrislink.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'zh': '/zh',
    },
  },
  openGraph: {
    title: "Arrislink - Private AI & Narrative Technology",
    description: "Enterprise-grade Private AI and consumer narrative tech.",
    url: 'https://www.arrislink.com',
    siteName: 'Arrislink',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Arrislink Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Arrislink - Private AI & Narrative Technology",
    description: "Enterprise-grade Private AI deployment and consumer AI narrative products.",
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

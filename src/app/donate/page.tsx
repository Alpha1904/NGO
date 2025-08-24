import { Metadata } from 'next';
import CampaignProgressSection from "@/components/Donate/CampaignProgress";
import DonationFormSection from "@/components/Donate/DonationForm";
import DonateHeroSection from "@/components/Donate/Hero";
import ImpactPerAmountSection from "@/components/Donate/ImpactPerAmout";
import UrgencyIndicatorsSection from "@/components/Donate/Urgency";

export const metadata: Metadata = {
  title: 'Donate Now - NGO Aid',
  description: 'Support our humanitarian efforts with a secure donation. Make an impact with your contribution today.',
  keywords: 'donate, humanitarian aid, charity, NGO, emergency relief, global impact',
  
  openGraph: {
    title: 'Donate to NGO Aid',
    description: 'Make an impact with your contribution today.',
    url: 'https://ngoaid.org/donate',
    siteName: 'NGO Aid',
    type: 'website',
    images: [
      {
        url: 'https://ngoaid.org/images/donate-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'People being helped by humanitarian aid efforts',
      },
    ],
  },
  
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  alternates: {
    canonical: 'https://ngoaid.org/donate',
  },
};

export default function DonatePage() {
  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DonateAction",
            "name": "Donate to NGO Aid",
            "description": "Support humanitarian projects worldwide.",
            "url": "https://ngoaid.org/donate",
            "recipient": {
              "@type": "NGO",
              "name": "NGO Aid",
              "url": "https://ngoaid.org",
              "description": "Global humanitarian organization providing aid and development assistance to communities in need.",
            }
          })
        }}
      />
      
      <main className="flex flex-col">
        <DonateHeroSection />
        <DonationFormSection />
        <ImpactPerAmountSection />
        <CampaignProgressSection />
        <UrgencyIndicatorsSection />
      </main>
    </>
  );
}
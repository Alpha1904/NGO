import ContactDetailsSection from "@/components/contact/ContactDetail";
import ContactFormSection from "@/components/contact/ContactForm";
import ContactHeroSection from "@/components/contact/Hero";


export default function ContactPage() {
  return (
    <main className="flex flex-col">
      <ContactHeroSection />
      <ContactFormSection />
      <ContactDetailsSection />
    </main>
  );
}
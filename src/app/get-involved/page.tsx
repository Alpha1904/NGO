import EventRegistrationSection from "@/components/get-Involved/EventRegister";
import EventsCalendarSection from "@/components/get-Involved/EventsCalendar";
import GetInvolvedHeroSection from "@/components/get-Involved/Hero";
import UserAccountsSection from "@/components/get-Involved/UserAccounts";
import VolunteerSignUpSection from "@/components/get-Involved/VolunteerSignUp";


export default function GetInvolvedPage() {
  return (
    <main className="flex flex-col">
      <GetInvolvedHeroSection />
      <EventsCalendarSection />
      <EventRegistrationSection />
      <VolunteerSignUpSection />
      <UserAccountsSection /> 
    </main>
  );
}
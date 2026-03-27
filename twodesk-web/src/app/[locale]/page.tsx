import Hero from "@/components/home/hero";
import Services from "@/components/home/services";
import Statistics from "@/components/home/statistics";
import Works from "@/components/home/works";
import Process from "@/components/home/process";
import AboutTeaser from "@/components/home/about-teaser";
import BlogPreview from "@/components/home/blog-preview";
import ContactCta from "@/components/home/contact-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Statistics />
      <Works />
      <Process />
      <AboutTeaser />
      <BlogPreview />
      <ContactCta />
    </>
  );
}

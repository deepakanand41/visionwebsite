import Hero from '../components/Hero';
import Services from '../components/Services';
import Destinations from '../components/Destinations';
import WhyChooseUs from '../components/WhyChooseUs';
import Accreditations from '../components/Accreditations';
import Testimonials from '../components/Testimonials';
import Statistics from '../components/Statistics';
import EnquiryForm from '../components/EnquiryForm';
import FAQ from '../components/FAQ';

export default function Home() {
  return (
    <main>
      <Hero />
      <EnquiryForm />
      <Services />
      <Destinations />
      <WhyChooseUs />
      <Statistics />
      <Accreditations />
      <Testimonials />
      <FAQ />
    </main>
  );
}

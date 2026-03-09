import OpeningGate     from '@/components/sections/OpeningGate';
import Navbar          from '@/components/ui/Navbar';
import HeroSection     from '@/components/sections/HeroSection';
import OpeningSection  from '@/components/sections/OpeningSection';
import CoupleStory     from '@/components/sections/CoupleStory';
import EventDetails    from '@/components/sections/EventDetails';
import Gallery         from '@/components/sections/Gallery';
import RSVPForm        from '@/components/sections/RSVPForm';
import Wishes          from '@/components/sections/Wishes';
import DigitalEnvelope from '@/components/sections/DigitalEnvelope';
import MusicPlayer     from '@/components/ui/MusicPlayer';
import ThemeToggle     from '@/components/ui/ThemeToggle';
import Footer          from '@/components/sections/Footer';
import PetalAnimation  from '@/components/ui/PetalAnimation';

export default function HomePage() {
  return (
    <>
      <OpeningGate />
      <div id="main-content">
        <Navbar />
        <PetalAnimation />
        <main>
          <HeroSection />
          <OpeningSection />
          <CoupleStory />
          <EventDetails />
          <Gallery />
          <RSVPForm />
          <Wishes />
          <DigitalEnvelope />
        </main>
        <Footer />
        <MusicPlayer />
        <div className="fixed bottom-6 right-6 z-50">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}

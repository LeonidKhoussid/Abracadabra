import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import Recommendations from './components/Recommendations';
import SmartBanner from './components/SmartBanner';
import MapSection from './components/MapSection';
import AssociationMembers from './components/AssociationMembers';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans bg-[#f8fbff] min-h-screen">
      <Header />
      <HeroSection />
      <FilterBar />
      <Recommendations />
      <SmartBanner />
      <MapSection />
      <AssociationMembers />
      <Footer />
    </div>
  );
}

export default App;

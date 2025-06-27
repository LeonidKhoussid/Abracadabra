export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 py-12 bg-gradient-to-r from-blue-100 to-white">
      <div>
        <h1 className="text-5xl font-bold text-blue-700 mb-4">Ищете дом?<br /><span className="text-blue-500">Начните с Домли</span></h1>
        <p className="text-lg text-gray-600 mb-6">Ваш уютный уголок ближе, чем вы думаете</p>
        {/* FilterBar will be placed here */}
      </div>
      <div className="hidden md:block w-1/2">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="ЖК" className="rounded-2xl shadow-lg w-full h-auto object-cover" />
      </div>
    </section>
  );
} 
export default function MapSection() {
  return (
    <section className="px-8 py-8">
      <div className="rounded-xl overflow-hidden shadow-lg">
        {/* TODO: Integrate react-leaflet or Yandex Maps here */}
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
          Карта будет здесь
        </div>
      </div>
    </section>
  );
} 
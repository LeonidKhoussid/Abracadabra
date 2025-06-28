const properties = [
  {
    title: 'Жк "Тёплые края"',
    address: 'г. Краснодар, улица им. Александра Гикало, 11',
    type: 'Квартиры',
    price: 'от 4млн',
    img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80',
  },
  // Add more cards as needed
];

export default function Recommendations() {
  return (
    <section className="px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">Могут подойти</h2>
      <div className="flex gap-4 overflow-x-auto">
        {properties.map((p, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4 min-w-[250px]">
            <img src={p.img} alt={p.title} className="rounded-lg mb-2 w-full h-40 object-cover" />
            <div className="font-semibold text-lg mb-1">{p.title}</div>
            <div className="text-gray-500 text-sm mb-1">{p.address}</div>
            <div className="text-gray-400 text-xs mb-1">{p.type}</div>
            <div className="font-bold text-blue-700">{p.price}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 
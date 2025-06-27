export default function SmartBanner() {
  return (
    <section className="px-8 py-8">
      <div className="bg-gradient-to-r from-blue-100 to-white rounded-xl p-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">Получайте умные рекомендации от <span className="text-blue-600">Домли</span></h3>
          <p className="text-gray-600 mb-4">на основе вашего поиска и интересующих категорий</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Войти</button>
        </div>
        <div className="hidden md:block w-1/3">
          <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80" alt="Рекомендации" className="rounded-lg shadow-lg w-full h-auto object-cover" />
        </div>
      </div>
    </section>
  );
} 
 
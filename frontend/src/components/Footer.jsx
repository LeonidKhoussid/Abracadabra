export default function Footer() {
  return (
    <footer className="bg-blue-50 px-8 py-8 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-blue-600">Домли</span>
          </div>
          <div className="text-gray-700">сюда придумать слоган или еще что-то</div>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="text-blue-700 font-bold mb-2">Способ Покупки</div>
          <ul className="text-blue-700 space-y-1">
            <li>Ипотека</li>
            <li>Рассрочка</li>
            <li>Материнский капитал</li>
            <li>Покупка на всю стоимость</li>
          </ul>
          <div className="text-blue-700 font-bold mt-4">Контакты</div>
        </div>
      </div>
    </footer>
  );
} 
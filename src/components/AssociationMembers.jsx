const members = [
  'ССК', 'AVA GROUP', 'Инсити Девелопмент', 'ТОЧНО', 'Семья', 'DOGMA', 'ПОБЕДА', 'ДЕСО',
  'НЕОМЕТРИЯ', 'АФК', 'ДЕВЕЛОПМЕНТ ЮГ', 'ART GROUP', 'ЕВРОПЕЯ', 'ЛЕНДЕКС', 'БЭЛ Девелопмент', 'LIVINGSTON'
];

export default function AssociationMembers() {
  return (
    <section className="px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">Участники Ассоциации</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {members.map((name, i) => (
          <div key={i} className="bg-white rounded-lg shadow flex items-center justify-center h-20 font-bold text-gray-700 text-center">
            {name}
          </div>
        ))}
      </div>
    </section>
  );
} 
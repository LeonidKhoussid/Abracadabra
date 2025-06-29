const members = [
  {
    name: 'ССК',
    url: 'https://ssk.ru',
  },
  {
    name: 'AVA GROUP',
    url: 'https://ava-group.ru',
  },
  {
    name: 'Инсити Девелопмент',
    url: 'https://incity.ru',
  },
  {
    name: 'ТОЧНО',
    url: 'https://tochno.ru',
  },
  {
    name: 'Семья',
    url: 'https://semya.ru',
  },
  {
    name: 'DOGMA',
    url: 'https://dogma.ru',
  },
  {
    name: 'ПОБЕДА',
    url: 'https://pobeda.ru',
  },
  {
    name: 'ДЕСО',
    url: 'https://deso.ru',
  },
  {
    name: 'НЕОМЕТРИЯ',
    url: 'https://neometria.ru',
  },
  {
    name: 'АФК',
    url: 'https://afk.ru',
  },
  {
    name: 'ДЕВЕЛОПМЕНТ ЮГ',
    url: 'https://development-yug.ru',
  },
  {
    name: 'ART GROUP',
    url: 'https://art-group.ru',
  },
  {
    name: 'ЕВРОПЕЯ',
    url: 'https://europa.ru',
  },
  {
    name: 'ЛЕНДЕКС',
    url: 'https://lendex.ru',
  },
  {
    name: 'БЭЛ Девелопмент',
    url: 'https://bel-development.ru',
  },
  {
    name: 'LIVINGSTON',
    url: 'https://livingston.ru',
  }
];

export default function AssociationMembers() {
  return (
    <section className="px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">Участники Ассоциации</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {members.map((member, i) => (
          <a
            key={i}
            href={member.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow flex items-center justify-center h-20 hover:shadow-lg transition-shadow duration-200 p-2"
          >
          {member.name}
          </a>
        ))}
      </div>
    </section>
  );
} 
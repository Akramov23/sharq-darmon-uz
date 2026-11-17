// Sharq Darmon — catalog and page content.
window.SD = {
  // Header button → B2B demo, opened on the Telegram-bot registration screen (real bot: @sharqdarmon_bot).
  bot: 'https://sharq-darmon-demo.vercel.app/?start=bot',
  categories: [
    { id: 'antiviral', name: 'Противовирусные', icon: 'shield' },
    { id: 'heart', name: 'Сердце и давление', icon: 'heart' },
    { id: 'pain', name: 'Обезболивающие и противовоспалительные', short: 'Обезболивающие', icon: 'activity' },
    { id: 'cold', name: 'Простуда, кашель и иммунитет', short: 'Простуда и кашель', icon: 'thermometer' },
    { id: 'allergy', name: 'Аллергия и воспаление', short: 'Аллергия', icon: 'leaf' },
    { id: 'antibiotics', name: 'Антибиотики и противомикробные', short: 'Антибиотики', icon: 'pill' },
    { id: 'digestion', name: 'Пищеварение и печень', short: 'Пищеварение', icon: 'droplet' },
    { id: 'endocrine', name: 'Диабет и щитовидная железа', short: 'Эндокринология', icon: 'chart' },
    { id: 'uro', name: 'Урология и гинекология', short: 'Урология и гинекология', icon: 'users' },
    { id: 'neuro', name: 'Нервная система', icon: 'brain' },
    { id: 'vitamins', name: 'Витамины и минералы', icon: 'vitamins' },
  ],

  // products come from catalog.js (generated from the PDF catalog)
  products: [],

  forms: { tablets: 'Таблетки', capsules: 'Капсулы', supp: 'Суппозитории', sachet: 'Порошок / саше', dragee: 'Драже' },

  trust: [
    ['factory', 'Собственное производство', 'Завод в Ташкенте'],
    ['users', 'Медпредставители', 'Во всех регионах Узбекистана'],
    ['shieldCheck', 'Контроль качества', 'На всех этапах производства'],
    ['pill', '95 препаратов в каталоге', '67 в производстве, 28 в регистрации'],
  ],

  // substance suppliers (as listed in the PDF catalog)
  partners: [['Hetero', 'partner3.png'], ['Colorcon', 'partner2.png'], ['Arshine', 'pdf/arshine.png'], ['BASF', 'partner4.png']],
  // distributors and pharmacy chains
  clients: [['Dori Darmon', 'partner1.png'], ['Pharm Luxe Invest', 'partner5.png'], ['Garmoniya Farm', 'partner6.png'], ['Grand Pharm', 'client-grandpharm.jpg'], ['Meros Pharm', 'client-meros.png'], ['Whole Pharm', 'client-wholepharm.png'], ['Malxam Servis', 'client-malxam.jpg'], ['Top-Pharm', 'client-toppharm.png']],

  regions: ['Ташкент', 'Ташкентская область', 'Андижанская область', 'Бухарская область', 'Джизакская область', 'Кашкадарьинская область', 'Навоийская область', 'Наманганская область', 'Самаркандская область', 'Сурхандарьинская область', 'Сырдарьинская область', 'Ферганская область', 'Хорезмская область', 'Республика Каракалпакстан'],

  footer: [
    ['Каталог', [['Простуда и ОРЗ', '#/catalog/cold'], ['Антибиотики', '#/catalog/antibiotics'], ['Противовирусные', '#/catalog/antiviral'], ['Сердце и давление', '#/catalog/heart'], ['Витамины', '#/catalog/vitamins'], ['Все категории', '#/catalog']]],
    ['Контрактное производство', [['Таблетки', '#/tabletting'], ['Капсулы', '#/capsulation'], ['Саше пакеты', '#/sachet'], ['Суппозитории', '#/suppository'], ['Тел.: +998 97 758 02 22', 'tel:+998977580222']]],
    ['Компания', [['О компании', '#/about'], ['Производство', '#/about'], ['Прайс-лист', '#/price-list'], ['Новости', '#/news'], ['Акции', '#/promo'], ['Карьера', '#/career'], ['Медпредставители / Торговые представители', '#/medreps'], ['Обратная связь', '#/feedback'], ['Контакты', '#/contacts']]],
  ],
};

// Sharq Darmon — Uzbek (Latin) translation layer.
// The site is written in Russian; in UZ mode product data is swapped from catalog-uz.js
// and rendered text nodes / attributes are translated through the dictionary and patterns below.
(function () {
  let lang = 'ru';
  { const m = location.pathname.match(/^\/(uz|en)(\/|$)/); lang = m ? m[1] : 'ru'; }
  document.documentElement.lang = lang;

  let GROUPS = {
    'Альфа-адреноблокатор': 'Alfa-adrenoblokator',
    'Антиагрегантные средства': 'Antiagregant vositalar',
    'Антибиотики': 'Antibiotiklar',
    'Антибиотики (антибактериальное синтетическое средство)': 'Antibiotiklar (sintetik antibakterial vosita)',
    'Антибиотики (комбинированный)': 'Antibiotiklar (kombinatsiyalangan)',
    'Антигипертензивное средство': 'Qon bosimini tushiruvchi vosita',
    'Антидепрессанты': 'Antidepressantlar',
    'Антисептическое средство': 'Antiseptik vosita',
    'Витаминные препараты': 'Vitamin preparatlari',
    'Витаминные препараты (витаминно-минеральный комплекс)': 'Vitamin preparatlari (vitamin-mineral kompleks)',
    'Гепатопротектор': 'Gepatoprotektor',
    'Гипогликемические средства': 'Qandni pasaytiruvchi vositalar',
    'Глюкокортикостероидный препарат': 'Glyukokortikosteroid preparat',
    'Диуретическое средство растительного происхождения': 'O‘simlik asosidagi siydik haydovchi vosita',
    'Иммуностимулятор растительного происхождения': 'O‘simlik asosidagi immunostimulyator',
    'Кардио препарат (минеральный)': 'Kardio preparat (mineral)',
    'Муколитики и отхаркивающие': 'Mukolitiklar va balg‘am ko‘chiruvchilar',
    'Нестероидные противовоспалительные средства': 'Nosteroid yallig‘lanishga qarshi vositalar',
    'Ноотропный препарат': 'Nootrop preparat',
    'Препарат гормонов щитовидной железы': 'Qalqonsimon bez gormoni preparati',
    'Препарат для лечения ожирения': 'Semizlikni davolash preparati',
    'Препарат йода для профилактики и лечения щитовидной железы': 'Qalqonsimon bez kasalliklarining oldini olish va davolash uchun yod preparati',
    'Препараты для лечения простатита': 'Prostatitni davolash preparatlari',
    'Препараты для лечения эректильной дисфункции': 'Erektil disfunksiyani davolash preparatlari',
    'Препараты ингибитора АПФ': 'APF ingibitori preparatlari',
    'Противоаллергические средства': 'Allergiyaga qarshi vositalar',
    'Противовирусные препараты': 'Virusga qarshi preparatlar',
    'Противогельминтное средство': 'Gijjaga qarshi vosita',
    'Противогеморроидальное средство растительного происхождения': 'O‘simlik asosidagi gemorroyga qarshi vosita',
    'Противогрибковые препараты': 'Zamburug‘ga qarshi preparatlar',
    'Противомикробное и противопротозойное средство': 'Mikrob va sodda jonivorlarga qarshi vosita',
    'Противорвотное средство': 'Qusishga qarshi vosita',
    'Противоязвенное средство': 'Yaraga qarshi vosita',
    'Сердечно-сосудистые (антагонист рецепторов ангиотензина II)': 'Yurak-qon tomir (angiotenzin II retseptorlari antagonisti)',
    'Сердечно-сосудистые (бета-адреноблокатор)': 'Yurak-qon tomir (beta-adrenoblokator)',
    'Сердечно-сосудистые (блокатор кальциевых каналов)': 'Yurak-qon tomir (kalsiy kanallari blokatori)',
    'Слабительные средства': 'Surgi vositalar',
    'Сосудистое средство (блокатор кальциевых каналов)': 'Qon tomir vositasi (kalsiy kanallari blokatori)',
    'Спазмолитическое средство': 'Spazmolitik vosita',
    'Средства от простуды и гриппа': 'Shamollash va grippga qarshi vositalar',
    'Средство для лечения расстройств опорно-двигательного аппарата': 'Tayanch-harakat apparati kasalliklarini davolash vositasi',
    'Средство против диареи': 'Diareyaga qarshi vosita',
  };

  let META = [
    [/Порошок для приготовления суспензии/g, 'Suspenziya tayyorlash uchun kukun'], [/Порошок для приготовления раствора/g, 'Eritma tayyorlash uchun kukun'],
    [/со вкусом лимона/g, 'limon ta’mli'], [/Суппозитории ректальные/g, 'Rektal suppozitoriylar'], [/Суппозитории вагинальные/g, 'Vaginal suppozitoriylar'],
    [/Суппозитории/g, 'Suppozitoriylar'], [/Таблетки вагинальные/g, 'Vaginal tabletkalar'], [/Таблетки п\/о/g, 'Plyonka qobiqli tabletkalar'],
    [/Таблетки кишечнорастворимые/g, 'Ichakda eriydigan tabletkalar'], [/Таблетки жевательные/g, 'Chaynaladigan tabletkalar'],
    [/Таблетки с модифицированным высвобождением/g, 'Modifikatsiyalangan ajraluvchi tabletkalar'], [/Таблетки для имплантации/g, 'Implantatsiya uchun tabletkalar'],
    [/Таблетки/g, 'Tabletkalar'], [/таблетки/g, 'tabletkalar'], [/Капсулы/g, 'Kapsulalar'], [/Драже/g, 'Draje'], [/саше/g, 'sashe'],
    [/для детей/g, 'bolalar uchun'], [/(\d) мес/g, '$1 oy'], [/ лет/g, ' yosh'], [/ и /g, ' va '], [/мкг/g, 'mkg'], [/мг/g, 'mg'], [/(\d) г\b|(\d) г(?=[ ,)]|$)/g, (m, a, b) => `${a || b} g`],
    [/ЕД/g, 'TB'], [/МЕ/g, 'XB'],
  ];
  const meta = s => META.reduce((t, [re, to]) => t.replace(re, to), s);

  let T = {
    // header, navigation, footer
    'К содержимому': 'Asosiy qismga', 'Фармацевтический завод Sharq Darmon · Ташкент': 'Sharq Darmon farmatsevtika zavodi · Toshkent',
    'Перечень продукции': 'Mahsulotlar ro‘yxati', 'О Нас': 'Biz haqimizda', 'Заказ через бот': 'Bot orqali buyurtma', 'Заказ через Telegram-бот': 'Telegram-bot orqali buyurtma', 'Акции': 'Aksiyalar', 'Акция': 'Aksiya', 'Все новости': 'Barcha yangiliklar', 'Все акции': 'Barcha aksiyalar', 'Сейчас акций нет': 'Hozircha aksiyalar yo‘q', 'Следите за новостями — о новых акциях мы сообщаем здесь и в Instagram.': 'Yangiliklarni kuzatib boring — yangi aksiyalar haqida shu yerda va Instagram’da xabar beramiz.', 'Предыдущая акция': 'Oldingi aksiya', 'Следующая акция': 'Keyingi aksiya', 'Скоро': 'Tez orada', 'Заказ через Telegram-бот скоро появится. Пока оформить заказ поможет оператор.': 'Telegram-bot orqali buyurtma berish tez orada ishga tushadi. Hozircha buyurtmani operator rasmiylashtirib beradi.', 'Связаться с оператором': 'Operator bilan bog‘lanish', 'Отдел продаж — аптекам и оптовым покупателям': 'Savdo bo‘limi — dorixonalar va ulgurji xaridorlar uchun', 'Задать вопрос на сайте': 'Saytda savol berish', 'Контакты': 'Kontaktlar', 'Каталог': 'Katalog', 'Поиск': 'Qidiruv', 'Найти': 'Topish',
    'Продукция': 'Mahsulotlar', 'Быстрые ссылки': 'Tezkor havolalar', 'Sharq Darmon — на главную': 'Sharq Darmon — bosh sahifa',
    'Название препарата, действующее вещество или симптом': 'Preparat nomi, ta’sir qiluvchi modda yoki alomat',
    'Весь каталог': 'Butun katalog', 'Навигационная цепочка': 'Navigatsiya', 'Главная': 'Bosh sahifa', 'Закрыть': 'Yopish',
    'Фармацевтический завод в Ташкенте. Собственное производство лекарственных средств по стандартам GMP.': 'Toshkentdagi farmatsevtika zavodi. GMP standartlari bo‘yicha dori vositalarini o‘zimiz ishlab chiqaramiz.',
    'Ташкент, Бектемирский район, ул. Х. Байкаро, 27 А': 'Toshkent, Bektemir tumani, X. Boyqaro ko‘chasi, 27 A',
    'Простуда и ОРЗ': 'Shamollash va O‘RK', 'Витамины': 'Vitaminlar', 'Все категории': 'Barcha toifalar', 'Таблетки': 'Tabletkalar', 'Капсулы': 'Kapsulalar',
    'Саше пакеты': 'Sashe paketlar', 'Суппозитории': 'Suppozitoriylar', 'Тел.: +998 97 758 02 22': 'Tel.: +998 97 758 02 22', 'Компания': 'Kompaniya',
    'Производство': 'Ishlab chiqarish', 'Новости': 'Yangiliklar', 'Карьера': 'Karyera', 'Обратная связь': 'Fikr-mulohaza', 'Контрактное производство': 'Shartnoma asosida ishlab chiqarish',
    'О компании': 'Kompaniya haqida', 'Медпредставители': 'Tibbiy vakillar', 'Прайс-лист': 'Prays-list',
    '© 2026 ООО «Sharq Darmon»': '© 2026 «Sharq Darmon» MChJ',
    'Имеются противопоказания. Перед применением проконсультируйтесь со специалистом.': 'Qarshi ko‘rsatmalar mavjud. Qo‘llashdan oldin mutaxassis bilan maslahatlashing.',
    'Лицензия № [номер лицензии]': 'Litsenziya № [litsenziya raqami]',
    // categories
    'Противовирусные': 'Virusga qarshi', 'Сердце и давление': 'Yurak va qon bosimi', 'Обезболивающие и противовоспалительные': 'Og‘riq qoldiruvchi va yallig‘lanishga qarshi',
    'Простуда, кашель и иммунитет': 'Shamollash, yo‘tal va immunitet', 'Аллергия и воспаление': 'Allergiya va yallig‘lanish', 'Антибиотики и противомикробные': 'Antibiotiklar va mikroblarga qarshi',
    'Пищеварение и печень': 'Hazm qilish va jigar', 'Диабет и щитовидная железа': 'Diabet va qalqonsimon bez', 'Урология и гинекология': 'Urologiya va ginekologiya',
    'Нервная система': 'Asab tizimi', 'Витамины и минералы': 'Vitaminlar va minerallar', 'Обезболивающие': 'Og‘riq qoldiruvchi', 'Простуда и кашель': 'Shamollash va yo‘tal',
    'Аллергия': 'Allergiya', 'Пищеварение': 'Hazm qilish', 'Эндокринология': 'Endokrinologiya', 'Антибиотики': 'Antibiotiklar',
    // home
    'Часто ищут:': 'Ko‘p qidiriladi:', 'Часто ищут': 'Ko‘p qidiriladi', 'Флустоп': 'Flustop', 'Ибумиг': 'Ibumig', 'Цетиризин': 'Setirizin', 'Омепразол': 'Omeprazol', 'Ацикловир': 'Atsiklovir', 'Парацетамол': 'Paratsetamol',
    'Собственное производство в Ташкенте': 'Toshkentdagi o‘z ishlab chiqarishimiz', 'Лекарства напрямую': 'Dori-darmonlar to‘g‘ridan-to‘g‘ri', 'от производителя': 'ishlab chiqaruvchidan',
    'Каталог препаратов': 'Preparatlar katalogi', 'Собственное производство': 'O‘z ishlab chiqarishimiz', 'Завод в Ташкенте': 'Toshkentdagi zavod',
    'Во всех регионах Узбекистана': 'O‘zbekistonning barcha hududlarida', 'Контроль качества': 'Sifat nazorati', 'На всех этапах производства': 'Ishlab chiqarishning barcha bosqichlarida',
    'Почему выбирают нас ?': 'Nega bizni tanlashadi?', 'Мы стремимся повысить уровень жизни населения нашей страны, поставляя на производство высококачественные компоненты для лекарственных средств.': 'Biz dori vositalari uchun yuqori sifatli komponentlardan foydalanib, mamlakatimiz aholisining hayot darajasini oshirishga intilamiz.',
    'Собственное': 'O‘z', 'производство': 'ishlab chiqarishimiz', 'Полный цикл выпуска лекарств на заводе в Ташкенте — от сырья до упаковки.': 'Toshkentdagi zavodda dori-darmonlarni xomashyodan qadoqgacha to‘liq siklda ishlab chiqaramiz.',
    'Оптовые': 'Ulgurji', 'продажи': 'savdo', 'Наша компания производит фарм-изделия, а значит — первые руки и самые выгодные цены.': 'Kompaniyamiz dori vositalarini o‘zi ishlab chiqaradi — demak, birinchi qo‘ldan va eng qulay narxlarda.',
    'Надежный': 'Ishonchli', 'партнер': 'hamkor', '5 лет на рынке Узбекистана — мы закрепили себя как надёжный партнёр.': 'O‘zbekiston bozorida 5 yil — o‘zimizni ishonchli hamkor sifatida ko‘rsatdik.',
    'Мировые': 'Jahon', 'стандарты': 'standartlari', '«Sharq Darmon» — современное производство, полностью соответствующее международным европейским стандартам.': '«Sharq Darmon» — xalqaro Yevropa standartlariga to‘liq mos zamonaviy ishlab chiqarish.',
    'Фармацевтический завод ООО «Sharq Darmon»': '«Sharq Darmon» MChJ farmatsevtika zavodi',
    'Современное производство, полностью соответствующее международным, европейским правилам GMP (правилам надлежащего производства). Установленное на заводе оборудование закуплено у лучших европейских компаний.': 'Xalqaro va Yevropa GMP qoidalariga (lozim darajadagi ishlab chiqarish amaliyoti) to‘liq mos zamonaviy ishlab chiqarish. Zavod uskunalari eng yaxshi Yevropa kompaniyalaridan xarid qilingan.',
    'Категории': 'Toifalar', 'Препараты Sharq Darmon': 'Sharq Darmon preparatlari', 'Популярное': 'Ommabop', 'В регистрации': 'Ro‘yxatdan o‘tmoqda', 'Смотреть все': 'Barchasini ko‘rish', 'Подробнее': 'Batafsil',
    'Как пользоваться каталогом': 'Katalogdan qanday foydalanish kerak', 'Сайт завода — справочная информация о препаратах Sharq Darmon': 'Zavod sayti — Sharq Darmon preparatlari haqida ma’lumot',
    'Рецептурные препараты': 'Retseptli preparatlar', 'Отмечены значком «По рецепту». Отпускаются в аптеках только при наличии рецепта врача.': 'Dorixonalarda faqat shifokor retsepti bilan beriladi.',
    'Официальная инструкция': 'Rasmiy yo‘riqnoma', 'На странице каждого препарата — действующее вещество, форма выпуска и инструкция по применению.': 'Har bir preparat sahifasida — ta’sir qiluvchi modda, chiqarilish shakli va qo‘llash bo‘yicha yo‘riqnoma.',
    'Где купить': 'Qayerdan sotib olish mumkin', 'Препараты Sharq Darmon продаются в аптеках Узбекистана. О наличии в вашем городе подскажет колл-центр: +998 78 888 70 00.': 'Sharq Darmon preparatlari O‘zbekiston dorixonalarida sotiladi. Shahringizda bor-yo‘qligini call-markaz aytib beradi: +998 78 888 70 00.',
    'Информация на сайте не заменяет консультацию врача': 'Saytdagi ma’lumot shifokor maslahatining o‘rnini bosmaydi',
    'Имеются противопоказания. Перед применением препарата проконсультируйтесь со специалистом.': 'Qarshi ko‘rsatmalar mavjud. Preparatni qo‘llashdan oldin mutaxassis bilan maslahatlashing.',
    'Видео': 'Video', 'Sharq Darmon в Instagram': 'Sharq Darmon Instagram’da', 'Видео, новости завода и новые препараты — подписывайтесь на наш Instagram.': 'Videolar, zavod yangiliklari va yangi preparatlar — Instagram sahifamizga obuna bo‘ling.',
    'Смотреть в Instagram': 'Instagram’da ko‘rish', 'Видео Sharq Darmon в Instagram': 'Sharq Darmon videosi Instagram’da',
    'Для аптек и оптовых покупателей': 'Dorixonalar va ulgurji xaridorlar uchun', 'Перечень продукции завода': 'Zavod mahsulotlari ro‘yxati', 'Отдел продаж': 'Savdo bo‘limi',
    'Таблетки, капсулы, саше и суппозитории': 'Tabletkalar, kapsulalar, sashe va suppozitoriylar',
    'Выпустим препарат или БАД по вашей рецептуре на мощностях завода в Ташкенте. Тел.: +998 97 758 02 22': 'Toshkentdagi zavod quvvatlarida sizning retsepturangiz bo‘yicha preparat yoki BFQ ishlab chiqaramiz. Tel.: +998 97 758 02 22',
    'Подробнее об услугах': 'Xizmatlar haqida batafsil', 'Поставщики субстанций': 'Substansiya yetkazib beruvchilar', 'Сырьё и вспомогательные вещества для производства': 'Ishlab chiqarish uchun xomashyo va yordamchi moddalar', 'Партнёры и аптечные сети': 'Hamkorlar va dorixona tarmoqlari', 'Дистрибьюторы и аптеки, через которые препараты Sharq Darmon попадают к покупателям': 'Sharq Darmon preparatlarini xaridorlarga yetkazadigan distribyutorlar va dorixonalar', 'Работаем с поставщиками субстанций': 'Substansiya yetkazib beruvchilar bilan ishlaymiz',
    // catalog
    'Категория': 'Toifa', 'Статус': 'Holati', 'В производстве': 'Ishlab chiqarilmoqda', 'Форма выпуска': 'Chiqarilish shakli', 'Порошок / саше': 'Kukun / sashe', 'Драже': 'Draje',
    'Сбросить фильтры': 'Filtrlarni tozalash', 'Фильтры': 'Filtrlar', 'Сортировка': 'Saralash', 'Как в каталоге': 'Katalogdagidek', 'По алфавиту': 'Alifbo bo‘yicha',
    'Страницы': 'Sahifalar', 'Очистить': 'Tozalash', 'Нет препаратов с такими фильтрами': 'Bunday filtrlar bo‘yicha preparat yo‘q', 'Попробуйте убрать часть фильтров.': 'Filtrlarning bir qismini olib tashlab ko‘ring.',
    // search
    'Как мы искали': 'Qanday qidirdik', 'Поиск учитывает торговое название, действующее вещество (МНН) и частые опечатки. Если нужного препарата нет — посмотрите аналоги с тем же действующим веществом или позвоните нам: +998 78 888 70 00.': 'Qidiruv savdo nomi, ta’sir qiluvchi modda (XPN) va ko‘p uchraydigan xatolarni hisobga oladi. Kerakli preparat bo‘lmasa — xuddi shu moddali analoglarni ko‘ring yoki bizga qo‘ng‘iroq qiling: +998 78 888 70 00.',
    'Препараты с похожим действием': 'O‘xshash ta’sirli preparatlar', 'Проверьте написание или найдите товар по действующему веществу.': 'Yozilishini tekshiring yoki preparatni ta’sir qiluvchi modda bo‘yicha qidiring.',
    // product page
    'Действующее вещество': 'Ta’sir qiluvchi modda', 'Группа': 'Guruh', 'Производитель': 'Ishlab chiqaruvchi', 'ООО «Sharq Darmon», Ташкент': '«Sharq Darmon» MChJ, Toshkent',
    'Задать вопрос': 'Savol berish', 'Перед применением': 'Qo‘llashdan oldin', 'Имеются противопоказания. Проконсультируйтесь с врачом и прочитайте инструкцию.': 'Qarshi ko‘rsatmalar mavjud. Shifokor bilan maslahatlashing va yo‘riqnomani o‘qing.',
    'Произведено в Ташкенте': 'Toshkentda ishlab chiqarilgan', 'Стандарты GMP': 'GMP standartlari', 'Описание': 'Tavsif', 'Показания': 'Ko‘rsatmalar', 'Способ применения': 'Qo‘llash usuli',
    'Активное вещество и свойства': 'Faol modda va xususiyatlari', 'Применяется при': 'Qo‘llaniladi', 'Способ применения и дозы': 'Qo‘llash usuli va dozalari',
    'Информация из каталога продукции Sharq Darmon. Дозировку назначает врач.': 'Ma’lumot Sharq Darmon mahsulotlar katalogidan olingan. Dozani shifokor belgilaydi.',
    'Каталог продукции': 'Mahsulotlar katalogi', 'Каталог продукции, PDF': 'Mahsulotlar katalogi, PDF', 'Перед применением проконсультируйтесь с врачом. Имеются противопоказания.': 'Qo‘llashdan oldin shifokor bilan maslahatlashing. Qarshi ko‘rsatmalar mavjud.',
    'Другие препараты': 'Boshqa preparatlar', 'Фото 1': '1-rasm', 'Фото 2': '2-rasm', 'Фото 3': '3-rasm', 'О препарате': 'Preparat haqida', 'Препарат в регистрации': 'Preparat ro‘yxatdan o‘tmoqda',
    'Подробная информация и инструкция появятся после завершения государственной регистрации.': 'Batafsil ma’lumot va yo‘riqnoma davlat ro‘yxatidan o‘tgandan keyin paydo bo‘ladi.',
    // about
    'Здоровье в каждом шаге — надёжность в каждой капле': 'Har qadamda salomatlik — har tomchida ishonch',
    'Компания «Sharq Darmon» — один из конкурентоспособных отечественных производителей лекарственных средств на рынке Республики Узбекистан. Главная задача компании — обеспечение населения качественными и доступными лекарственными средствами.': '«Sharq Darmon» kompaniyasi — O‘zbekiston Respublikasi bozoridagi raqobatbardosh mahalliy dori vositalari ishlab chiqaruvchilaridan biri. Kompaniyaning asosiy vazifasi — aholini sifatli va arzon dori vositalari bilan ta’minlash.',
    'начало строительства завода в Бектемирском районе Ташкента': 'Toshkentning Bektemir tumanida zavod qurilishi boshlandi', 'запуск производства: Флустоп, Тримиг, Котрисепт, Дикломол': 'ishlab chiqarish boshlandi: Flustop, Trimig, Kotrisept, Diklomol',
    'наименований лекарственных средств выпускается сегодня': 'nomdagi dori vositalari bugun ishlab chiqariladi', 'высококвалифицированных сотрудников': 'yuqori malakali xodimlar',
    'Производство и качество': 'Ishlab chiqarish va sifat', 'Твёрдые и мягкие формы': 'Qattiq va yumshoq shakllar',
    'Таблетки, саше и капсулы, а также суппозитории и мази — по международным стандартам GMP. Несколько групп препаратов выпускаются одновременно в полном цикле.': 'Tabletkalar, sashe va kapsulalar, shuningdek suppozitoriylar va malhamlar — xalqaro GMP standartlari bo‘yicha. Bir nechta preparat guruhlari bir vaqtda to‘liq siklda ishlab chiqariladi.',
    'Многоступенчатый контроль': 'Ko‘p bosqichli nazorat', 'Продукция проходит проверки на всех этапах производства. По качеству, эффективности и безопасности она соответствует аналогам европейских компаний.': 'Mahsulot ishlab chiqarishning barcha bosqichlarida tekshiriladi. Sifati, samaradorligi va xavfsizligi bo‘yicha Yevropa kompaniyalari analoglariga mos keladi.',
    'Команда специалистов': 'Mutaxassislar jamoasi', 'Фармацевты, медики, химики и инженеры; инженерная служба контролирует работу автоматизированного импортного оборудования. В разработке и регистрации — более 20 новых препаратов.': 'Farmatsevtlar, shifokorlar, kimyogarlar va muhandislar; muhandislik xizmati avtomatlashtirilgan import uskunalari ishini nazorat qiladi. 20 dan ortiq yangi preparat ishlab chiqilmoqda va ro‘yxatdan o‘tmoqda.',
    'Сертификат': 'Sertifikat', 'Сертификат GMP № GMP-04:2024': 'GMP sertifikati № GMP-04:2024',
    'Завод «Sharq Darmon» соответствует требованиям O‘zDSt 2766:2018 «Надлежащая производственная практика — GMP». Сертификат выдан ГУП «Центр надлежащих практик» по результатам фармацевтической инспекции.': '«Sharq Darmon» zavodi O‘zDSt 2766:2018 «Zarur ishlab chiqarish amaliyoti — GMP» talablariga mos keladi. Sertifikat farmatsevtik inspeksiya natijalariga ko‘ra «Zarur amaliyotlar markazi» DUK tomonidan berilgan.',
    'Мы уверены: лекарства должны быть доступны каждому, кто в них нуждается, — вне зависимости от дохода, состояния национальной экономики и системы здравоохранения.': 'Ishonamiz: dori-darmonlar daromad, milliy iqtisodiyot va sog‘liqni saqlash tizimi holatidan qat’i nazar, unga muhtoj bo‘lgan har bir kishi uchun ochiq bo‘lishi kerak.',
    'Наш девиз: «Здоровая семья — наша забота!»': 'Shiorimiz: «Sog‘lom oila — bizning g‘amxo‘rligimiz!»', 'Наши партнёры': 'Hamkorlarimiz', 'Нам доверяют аптечные сети': 'Bizga dorixona tarmoqlari ishonadi',
    'Сотрудники на производственной линии завода Sharq Darmon': 'Sharq Darmon zavodi ishlab chiqarish liniyasidagi xodimlar', 'Сертификат GMP № GMP-04:2024 ООО «Sharq Darmon»': '«Sharq Darmon» MChJ GMP sertifikati № GMP-04:2024',
    // contacts
    'Колл-центр': 'Call-markaz', 'Справки о наличии и заказах': 'Mavjudlik va buyurtmalar bo‘yicha ma’lumot', 'Аптекам — оптовые закупки': 'Dorixonalar uchun — ulgurji xaridlar',
    'Электронная почта': 'Elektron pochta', 'Адрес завода': 'Zavod manzili', 'Ташкент, Бектемирский район,': 'Toshkent, Bektemir tumani,', 'ул. Байкаро, 27 А': 'Boyqaro ko‘chasi, 27 A',
    'Ташкент, ул. Х. Байкаро, 27 А': 'Toshkent, X. Boyqaro ko‘chasi, 27 A', 'Построить маршрут': 'Yo‘nalish tuzish', 'Sharq Darmon на Яндекс Картах': 'Sharq Darmon Yandex Xaritalarda', 'Задайте вопрос': 'Savol bering', 'Имя': 'Ism', 'Телефон': 'Telefon',
    'Перезвоним в рабочее время': 'Ish vaqtida qo‘ng‘iroq qilamiz', 'Вопрос': 'Savol', 'Отправить': 'Yuborish', 'Время работы': 'Ish vaqti',
    'Отдел продаж принимает звонки с 9:00 до 18:00, понедельник — суббота.': 'Savdo bo‘limi qo‘ng‘iroqlarni 9:00 dan 18:00 gacha qabul qiladi, dushanba — shanba.',
    'Как к вам обращаться': 'Sizga qanday murojaat qilaylik', 'Например, есть ли в наличии Ацикловир SD': 'Masalan, Ацикловир SD bormi',
    // feedback
    'Вопрос о препарате, наличии, заказе или сотрудничестве — ответим в течение рабочего дня.': 'Preparat, uning mavjudligi, buyurtma yoki hamkorlik bo‘yicha savol — ish kuni davomida javob beramiz.',
    'Телефон или e-mail': 'Telefon yoki e-mail', 'Тема обращения': 'Murojaat mavzusi', 'Вопрос о наличии препарата': 'Preparat mavjudligi haqida savol', 'Вопрос о заказе': 'Buyurtma haqida savol',
    'Оптовые закупки': 'Ulgurji xaridlar', 'Сотрудничество': 'Hamkorlik', 'Жалоба или предложение': 'Shikoyat yoki taklif', 'Сообщение': 'Xabar', 'Прикрепить файл': 'Fayl biriktirish',
    'Фото рецепта или документа · JPG, PNG, PDF до 10 МБ': 'Retsept yoki hujjat surati · JPG, PNG, PDF, 10 MB gacha', 'Согласен на обработку персональных данных': 'Shaxsiy ma’lumotlarimni qayta ishlashga roziman',
    'Отправить сообщение': 'Xabar yuborish', 'Быстрее по телефону': 'Telefon orqali tezroq', '+998 78 888 70 00 — колл-центр': '+998 78 888 70 00 — call-markaz', 'Срок ответа': 'Javob muddati',
    'В течение рабочего дня': 'Ish kuni davomida', 'Конфиденциально': 'Maxfiy', 'Данные используются только для ответа на обращение': 'Ma’lumotlar faqat murojaatga javob berish uchun ishlatiladi',
    'Азиз Каримов': 'Aziz Karimov', 'Подскажите, когда появится Ацикловир SD 200 мг?': 'Ацикловир SD 200 mg qachon paydo bo‘ladi?',
    // career
    'Карьера в Sharq Darmon': 'Sharq Darmon’da karyera', 'Мы растём и ищем людей, которые хотят развиваться в фармацевтике. Обучение, карьерный рост и стабильная компания с собственным производством.': 'Biz o‘sib bormoqdamiz va farmatsevtikada rivojlanishni xohlovchi insonlarni izlaymiz. O‘qitish, karyera o‘sishi va o‘z ishlab chiqarishiga ega barqaror kompaniya.',
    'Открытые вакансии · 2': 'Ochiq vakansiyalar · 2', 'Медицинский представитель': 'Tibbiy vakil', '12 регионов Узбекистана': 'O‘zbekistonning 12 ta hududi', 'Откликнуться': 'Ariza topshirish',
    'Ташкент': 'Toshkent', 'Ташкентская': 'Toshkent viloyati', 'Андижанская': 'Andijon', 'Бухарская': 'Buxoro', 'Джизакская': 'Jizzax', 'Кашкадарьинская': 'Qashqadaryo', 'Навоийская': 'Navoiy',
    'Наманганская': 'Namangan', 'Самаркандская': 'Samarqand', 'Сурхандарьинская': 'Surxondaryo', 'Сырдарьинская': 'Sirdaryo', 'Ферганская': 'Farg‘ona', 'Хорезмская': 'Xorazm', 'Каракалпакстан': 'Qoraqalpog‘iston',
    'Задачи': 'Vazifalar', 'Развитие спроса на продукцию компании среди врачей и аптек': 'Shifokorlar va dorixonalar orasida kompaniya mahsulotlariga talabni rivojlantirish', 'Требования': 'Talablar',
    'Медицинское образование (высшее или среднее)': 'Tibbiy ma’lumot (oliy yoki o‘rta)', 'Опыт работы от 1 года': '1 yildan ortiq ish tajribasi', 'Навыки общения и продаж': 'Muloqot va savdo ko‘nikmalari',
    'Обучаемость, честность, ориентация на результат': 'O‘rganishga moyillik, halollik, natijaga yo‘naltirilganlik', 'Мы предлагаем': 'Biz taklif qilamiz', 'Работу в стабильной компании': 'Barqaror kompaniyada ish',
    'Высокую зарплату — по итогам собеседования': 'Yuqori maosh — suhbat natijalariga ko‘ra', 'Профессиональное обучение и тренинги': 'Kasbiy o‘qitish va treninglar', 'Служебный автомобиль при выполнении плана': 'Rejani bajarganda xizmat avtomobili',
    'Торговый представитель': 'Savdo vakili', 'Район обсуждается на собеседовании': 'Hudud suhbatda kelishiladi', 'Обязанности': 'Majburiyatlar', 'Выполнение ежемесячного плана продаж': 'Oylik savdo rejasini bajarish',
    'Обеспечение продукцией закреплённых торговых точек': 'Biriktirilgan savdo nuqtalarini mahsulot bilan ta’minlash', 'Ежедневный объезд точек по утверждённому маршруту': 'Tasdiqlangan yo‘nalish bo‘yicha nuqtalarni har kuni aylanib chiqish',
    'Расширение клиентской базы, мерчандайзинг, заключение договоров': 'Mijozlar bazasini kengaytirish, merchandayzing, shartnomalar tuzish', 'Знание русского и узбекского языков': 'Rus va o‘zbek tillarini bilish',
    'Желание расти и развиваться': 'O‘sish va rivojlanish istagi', 'Условия': 'Shartlar', 'Оклад + процент + бонус': 'Maosh + foiz + bonus', 'Карьерный рост и дружный коллектив': 'Karyera o‘sishi va ahil jamoa',
    'График 6/1, пн–сб 9:00–18:00': 'Ish tartibi 6/1, du–sh 9:00–18:00', 'Вопросы по вакансиям': 'Vakansiyalar bo‘yicha savollar', 'Шахзод · +998 77 001 71 23 · sharq-darmon@mail.ru · звонки с 9:00 до 18:00': 'Shahzod · +998 77 001 71 23 · sharq-darmon@mail.ru · qo‘ng‘iroqlar 9:00 dan 18:00 gacha',
    // product list
    'Скачать таблицу (CSV)': 'Jadvalni yuklab olish (CSV)', 'Каталог, PDF': 'Katalog, PDF', 'Найти в перечне': 'Ro‘yxatdan qidirish', 'Наименование': 'Nomi', 'Аптекам и дистрибьюторам': 'Dorixonalar va distribyutorlarga',
    'Цены и условия поставки — в отделе продаж: +998 78 888 70 00, sharq-darmon@mail.ru.': 'Narxlar va yetkazib berish shartlari — savdo bo‘limida: +998 78 888 70 00, sharq-darmon@mail.ru.', 'Название или действующее вещество': 'Nomi yoki ta’sir qiluvchi modda',
    // medreps
    'Медпредставители / Торговые представители': 'Tibbiy vakillar / Savdo vakillari',
    'Медицинские и торговые представители': 'Tibbiy va savdo vakillari',
    'Медицинские и торговые представители Sharq Darmon работают с аптеками и клиниками во всех регионах. Выберите регион, чтобы связаться с представителем.': 'Sharq Darmon tibbiy va savdo vakillari barcha hududlarda dorixonalar va klinikalar bilan ishlaydi. Vakil bilan bog‘lanish uchun hududni tanlang.',
    'Медицинские представители': 'Tibbiy vakillar', 'Представители Sharq Darmon работают с аптеками и клиниками во всех регионах. Выберите регион, чтобы связаться с представителем.': 'Sharq Darmon vakillari barcha hududlarda dorixonalar va klinikalar bilan ishlaydi. Vakil bilan bog‘lanish uchun hududni tanlang.',
    'Контакт через колл-центр': 'Call-markaz orqali bog‘lanish', 'Ташкентская область': 'Toshkent viloyati', 'Андижанская область': 'Andijon viloyati', 'Бухарская область': 'Buxoro viloyati', 'Джизакская область': 'Jizzax viloyati',
    'Кашкадарьинская область': 'Qashqadaryo viloyati', 'Навоийская область': 'Navoiy viloyati', 'Наманганская область': 'Namangan viloyati', 'Самаркандская область': 'Samarqand viloyati', 'Сурхандарьинская область': 'Surxondaryo viloyati',
    'Сырдарьинская область': 'Sirdaryo viloyati', 'Ферганская область': 'Farg‘ona viloyati', 'Хорезмская область': 'Xorazm viloyati', 'Республика Каракалпакстан': 'Qoraqalpog‘iston Respublikasi',
    'Хотите стать медицинским представителем?': 'Tibbiy vakil bo‘lishni xohlaysizmi?', 'Открыт набор во всех регионах — обучение и служебный автомобиль.': 'Barcha hududlarda qabul ochiq — o‘qitish va xizmat avtomobili.', 'Смотреть вакансию': 'Vakansiyani ko‘rish',
    // contract manufacturing
    'Производство таблеток по вашей рецептуре': 'Sizning retsepturangiz bo‘yicha tabletkalar ishlab chiqarish', 'Выпустим таблетированные лекарственные средства и БАД под вашей маркой на современном оборудовании завода в Ташкенте.': 'Toshkentdagi zavodning zamonaviy uskunalarida sizning brendingiz ostida tabletka shaklidagi dori vositalari va BFQ ishlab chiqaramiz.',
    'Обсудить проект': 'Loyihani muhokama qilish', 'Что мы предлагаем': 'Nimalarni taklif qilamiz', 'Таблетки по рецептуре заказчика': 'Buyurtmachi retsepturasi bo‘yicha tabletkalar',
    'Таблетированные формы по вашей рецептуре — от подбора состава до готовой продукции.': 'Sizning retsepturangiz bo‘yicha tabletka shakllari — tarkibni tanlashdan tayyor mahsulotgacha.', 'Упаковка и фасовка': 'Qadoqlash va fasovka',
    'Блистеры, флаконы и банки ПЭТ, маркировка под вашим логотипом.': 'Blister, flakon va PET bankalar, logotipingiz bilan markirovka.', 'Многоступенчатый контроль на всех этапах по стандартам GMP.': 'GMP standartlari bo‘yicha barcha bosqichlarda ko‘p bosqichli nazorat.',
    'Как мы работаем': 'Qanday ishlaymiz', 'Знакомство': 'Tanishuv', 'Вы приезжаете на завод и рассказываете об идее будущего продукта.': 'Zavodga kelasiz va bo‘lajak mahsulot g‘oyasi haqida gapirib berasiz.', 'Рекомендации': 'Tavsiyalar',
    'Мы предлагаем рецептуру, форму выпуска и упаковку.': 'Biz retseptura, chiqarilish shakli va qadoqni taklif qilamiz.', 'Объём услуги': 'Xizmat hajmi', 'Частичная или полная поддержка — часть задач можно оставить за собой.': 'Qisman yoki to‘liq ko‘mak — vazifalarning bir qismini o‘zingizda qoldirishingiz mumkin.',
    'Выпуск': 'Ishlab chiqarish', 'Производим и упаковываем продукцию под вашей маркой.': 'Mahsulotni sizning brendingiz ostida ishlab chiqaramiz va qadoqlaymiz.',
    'Обсудить проект: +998 97 758 02 22. Справки о препаратах — колл-центр +998 78 888 70 00.': 'Loyihani muhokama qilish: +998 97 758 02 22. Preparatlar bo‘yicha ma’lumot — call-markaz +998 78 888 70 00.',
    'Капсулирование под вашей маркой': 'Sizning brendingiz ostida kapsulalash', 'Капсула защищает действующие вещества от внешней среды, обеспечивает точную дозировку и маскирует вкус и запах. Возьмём на себя производство, если у вас есть продукт и рынок сбыта.': 'Kapsula ta’sir qiluvchi moddalarni tashqi muhitdan himoya qiladi, aniq dozani ta’minlaydi va ta’m hamda hidni yashiradi. Mahsulotingiz va sotuv bozoringiz bo‘lsa, ishlab chiqarishni o‘z zimmamizga olamiz.',
    'Твёрдые капсулы': 'Qattiq kapsulalar', 'Цилиндрические капсулы из двух частей, плотно входящих одна в другую.': 'Bir-biriga zich kiradigan ikki qismdan iborat silindrsimon kapsulalar.', 'Мягкие капсулы': 'Yumshoq kapsulalar',
    'Цельные капсулы разной формы (шар, овал, облонг) с жидким или пастообразным содержимым.': 'Suyuq yoki pastasimon tarkibli turli shakldagi (shar, oval, oblong) yaxlit kapsulalar.', 'Полный цикл': 'To‘liq sikl',
    'Частичная или полная поддержка: от идеи до готовой продукции на полке.': 'Qisman yoki to‘liq ko‘mak: g‘oyadan tokchadagi tayyor mahsulotgacha.', 'Фасовка порошков в саше-пакеты': 'Kukunlarni sashe-paketlarga qadoqlash',
    'Порошки и гранулы для приготовления растворов и суспензий в удобных одноразовых саше-пакетах — точная доза в каждой упаковке.': 'Eritma va suspenziya tayyorlash uchun kukun va granulalar qulay bir martalik sashe-paketlarda — har bir qadoqda aniq doza.',
    'Порошки и гранулы': 'Kukunlar va granulalar', 'Лекарственные средства и БАД в форме порошка или гранул по вашей рецептуре.': 'Sizning retsepturangiz bo‘yicha kukun yoki granula shaklidagi dori vositalari va BFQ.', 'Дозированная фасовка': 'Dozalangan qadoqlash',
    'Каждый саше-пакет содержит одну точную дозу, герметичная упаковка защищает от влаги.': 'Har bir sashe-paketda bitta aniq doza bor, germetik qadoq namlikdan himoya qiladi.', 'Дизайн упаковки': 'Qadoq dizayni',
    'Печать саше-пакетов и вторичной упаковки под вашей маркой.': 'Sashe-paketlar va ikkilamchi qadoqni brendingiz ostida chop etish.', 'Производство суппозиториев': 'Suppozitoriylar ishlab chiqarish',
    'Ректальные и вагинальные суппозитории по рецептуре заказчика: подбор основы, литьё в контурную упаковку и контроль качества на заводе в Ташкенте.': 'Buyurtmachi retsepturasi bo‘yicha rektal va vaginal suppozitoriylar: asosni tanlash, kontur qadoqqa quyish va Toshkentdagi zavodda sifat nazorati.',
    'Подбор основы': 'Asosni tanlash', 'Подберём основу под действующее вещество и нужную скорость высвобождения.': 'Ta’sir qiluvchi modda va kerakli ajralish tezligiga mos asos tanlaymiz.', 'Контурная упаковка': 'Kontur qadoq',
    'Литьё суппозиториев сразу в ячейковую ПВХ/ПЭ упаковку.': 'Suppozitoriylarni to‘g‘ridan-to‘g‘ri PVX/PE uyachali qadoqqa quyish.', 'Проверка массы, однородности и времени растворения каждой серии.': 'Har bir seriyaning massasi, bir xilligi va erish vaqtini tekshirish.',
    // news, 404, modal
    'Новости компании': 'Kompaniya yangiliklari', 'Новостей пока нет': 'Hozircha yangiliklar yo‘q', 'Здесь будут появляться новости о новых препаратах, производстве и компании. А пока посмотрите новинки в каталоге.': 'Bu yerda yangi preparatlar, ishlab chiqarish va kompaniya haqidagi yangiliklar paydo bo‘ladi. Hozircha katalogdagi yangiliklarni ko‘ring.',
    'Новинки каталога': 'Katalog yangiliklari', 'Отклик на вакансию': 'Vakansiyaga ariza', 'Регион': 'Hudud', 'Отмена': 'Bekor qilish', 'Например, Самаркандская область': 'Masalan, Samarqand viloyati', 'Коротко о продукте': 'Mahsulot haqida qisqacha',
    'Страница не найдена': 'Sahifa topilmadi', 'Возможно, ссылка устарела. Начните с главной или каталога.': 'Havola eskirgan bo‘lishi mumkin. Bosh sahifa yoki katalogdan boshlang.', 'На главную': 'Bosh sahifaga',
    // toasts & validation
    'Сообщение отправлено — ответим в течение рабочего дня': 'Xabar yuborildi — ish kuni davomida javob beramiz', 'Вопрос отправлен — перезвоним в рабочее время': 'Savol yuborildi — ish vaqtida qo‘ng‘iroq qilamiz',
    'Заявка отправлена — мы перезвоним в рабочее время': 'Ariza yuborildi — ish vaqtida qo‘ng‘iroq qilamiz', 'Таблица скачивается': 'Jadval yuklab olinmoqda', 'Заполните это поле': 'Ushbu maydonni to‘ldiring',
    'Введите номер полностью: +998 90 123 45 67': 'Raqamni to‘liq kiriting: +998 90 123 45 67', 'Номер подтверждён': 'Raqam tasdiqlandi',
    // page titles
    'Sharq Darmon — фармацевтический завод в Ташкенте, производство лекарств': 'Sharq Darmon — Toshkentdagi farmatsevtika zavodi, dori-darmon ishlab chiqarish', 'Sharq Darmon — лекарства напрямую от производителя': 'Sharq Darmon — dori-darmonlar to‘g‘ridan-to‘g‘ri ishlab chiqaruvchidan', 'Медпредставители — контрактное производство': 'Tibbiy vakillar',
    'Таблетки — контрактное производство': 'Tabletkalar — shartnoma asosida ishlab chiqarish', 'Капсулы — контрактное производство': 'Kapsulalar — shartnoma asosida ishlab chiqarish',
    'Саше — контрактное производство': 'Sashe — shartnoma asosida ishlab chiqarish', 'Суппозитории — контрактное производство': 'Suppozitoriylar — shartnoma asosida ishlab chiqarish', 'Видео о заводе': 'Zavod haqida video', 'Страница': 'Sahifa',
  };
  Object.assign(T, GROUPS);

  const plural = n => `${n} ta preparat`;
  let P = [
    [/^(.+), фото (\d+)$/, (m, n, k) => `${n}, foto ${k}`],
    [/^Акция до (.+)$/, (m, d) => `Aksiya ${d} gacha`],
    [/^Не удалось отправить\. Позвоните нам: (.+)$/, (m, p) => `Yuborib bo‘lmadi. Bizga qo‘ng‘iroq qiling: ${p}`],
    [/^(\d+) препарат(ов|а)?$/, (m, n) => plural(n)],
    [/^(\d+) препаратов в каталоге$/, (m, n) => `Katalogda ${n} ta preparat`],
    [/^(\d+) в производстве, (\d+) в регистрации$/, (m, a, b) => `${a} tasi ishlab chiqariladi, ${b} tasi ro‘yxatdan o‘tmoqda`],
    [/^Фармацевтический завод Sharq Darmon в Ташкенте: (\d+) препаратов собственного производства по стандартам GMP\. Действующие вещества, показания и способ применения — в каталоге\.$/, (m, n) => `Toshkentdagi Sharq Darmon farmatsevtika zavodi: GMP standartlari bo‘yicha o‘zimiz ishlab chiqaradigan ${n} ta preparat. Ta’sir qiluvchi moddalar, ko‘rsatmalar va qo‘llash usuli — katalogda.`],
    [/^(\d+) препаратов в производстве и (\d+) в регистрации: таблетки, капсулы, суппозитории и саше\. Условия поставки — в отделе продаж\.$/, (m, a, b) => `${a} ta preparat ishlab chiqariladi va ${b} tasi ro‘yxatdan o‘tmoqda: tabletkalar, kapsulalar, suppozitoriylar va sashe. Yetkazib berish shartlari — savdo bo‘limida.`],
    [/^(\d+) препаратов в производстве · (\d+) в регистрации · по каталогу продукции Sharq Darmon$/, (m, a, b) => `${a} tasi ishlab chiqariladi · ${b} tasi ro‘yxatdan o‘tmoqda · Sharq Darmon mahsulotlar katalogi bo‘yicha`],
    [/^Все · (\d+)$/, (m, n) => `Barchasi · ${n}`], [/^В производстве · (\d+)$/, (m, n) => `Ishlab chiqarilmoqda · ${n}`], [/^В регистрации · (\d+)$/, (m, n) => `Ro‘yxatdan o‘tmoqda · ${n}`],
    [/^(.+), упаковка$/, (m, n) => `${n}, qadoq`],
    [/^(\d+) \/ 1000 символов$/, (m, n) => `${n} / 1000 belgi`],
    [/^Результаты по запросу «(.+)»$/, (m, q) => `«${q}» bo‘yicha natijalar`],
    [/^Найдено по названию и действующему веществу: (\d+) препарат(ов|а)?$/, (m, n) => `Nomi va ta’sir qiluvchi modda bo‘yicha topildi: ${n} ta preparat`],
    [/^По запросу «(.+)» ничего не найдено$/, (m, q) => `«${q}» bo‘yicha hech narsa topilmadi`],
    [/^Возможно, вы имели в виду «(.+)»\. Проверьте написание или найдите товар по действующему веществу\.$/, (m, q) => `Balki «${q}» ni nazarda tutgandirsiz. Yozilishini tekshiring yoki ta’sir qiluvchi modda bo‘yicha qidiring.`],
    [/^Показать «(.+)»$/, (m, q) => `«${q}» ni ko‘rsatish`],
    [/^(.+) продаётся в аптеках Узбекистана\. О наличии в вашем городе подскажет колл-центр завода\.$/, (m, n) => `${n} O‘zbekiston dorixonalarida sotiladi. Shahringizda bor-yo‘qligini zavod call-markazi aytib beradi.`],
    [/^(.+) проходит государственную регистрацию и пока не поступил в продажу\. Узнать о сроках можно в колл-центре завода\.$/, (m, n) => `${n} davlat ro‘yxatidan o‘tmoqda va hali sotuvga chiqmagan. Muddatlarni zavod call-markazidan bilib olish mumkin.`],
    [/^(.+) — (.+)\. Действующее вещество: (.+)\.$/, (m, n, f, s) => `${n} — ${f}. Ta’sir qiluvchi modda: ${s}.`],
    [/^Описание взято из официального каталога Sharq Darmon, стр\. (\d+)\.$/, (m, n) => `Tavsif Sharq Darmon rasmiy katalogining ${n}-sahifasidan olingan.`],
    [/^(.+) — (Sharq Darmon)$/, (m, a, b) => `${T[a] || a} — ${b}`],
    [/^(.+) · (.+)$/, (m, a, b) => (T[a] || GROUPS[a]) ? `${T[a] || a} · ${T[b] || b}` : null],
  ];

  // English tables come from i18n-en.js and replace the Uzbek ones.
  window.SD_I18N_UZ = { T, GROUPS }; // read by the admin panel's text editor
  if (lang === 'en' && window.SD_I18N_EN) { ({ T, GROUPS, META, P } = window.SD_I18N_EN); Object.assign(T, GROUPS); }

  // Texts edited in the admin panel: { 'Russian original': { ru, uz, en } }.
  const RU = {};
  for (const [k, v] of Object.entries(window.SD_TEXTS || {})) {
    if (lang === 'ru') { if (v.ru && v.ru !== k) RU[k] = v.ru; } else if (v[lang]) T[k] = v[lang];
  }
  if (lang === 'ru') { T = RU; P = []; }
  const SWAP = window.SD_CONTACT_SWAP || [];
  const ACTIVE = (lang !== 'ru' || Object.keys(RU).length > 0 || SWAP.length > 0) && !location.pathname.startsWith('/admin');

  function tr(s) {
    const t = s.trim();
    if (!t) return null;
    let out;
    if (/[Ѐ-ӿ]/.test(t)) {
      out = T[t];
      if (out === undefined) for (const [re, fn] of P) { const m = t.match(re); if (m) { out = fn(...m); if (out != null) break; } }
    }
    let res = out == null ? t : out;
    for (const [a, b] of SWAP) if (res.includes(a)) res = res.split(a).join(b);
    if (res === t) return null;
    return s.replace(t, res);
  }
  const ATTRS = ['placeholder', 'aria-label', 'alt', 'title'];
  function translate(root) {
    if (!ACTIVE || !root) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = []; let n; while ((n = w.nextNode())) nodes.push(n);
    for (const node of nodes) { if (node.parentElement?.closest('script,style')) continue; const r = tr(node.nodeValue); if (r != null) node.nodeValue = r; }
    root.querySelectorAll?.('[placeholder],[aria-label],[alt],[title]').forEach(el => ATTRS.forEach(a => { const v = el.getAttribute(a); if (v) { const r = tr(v); if (r != null) el.setAttribute(a, r); } }));
  }

  // Cyrillic → Latin for product names (Uzbek Latin rules; English uses kh/zh).
  const LAT = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: lang === 'en' ? 'zh' : 'j', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f',
    х: lang === 'en' ? 'kh' : 'x', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sh', ъ: '', ы: 'i', ь: '', э: 'e', ю: 'yu', я: 'ya' };
  const latin = s => s.replace(/[а-яё]/gi, ch => { const l = LAT[ch.toLowerCase()]; return ch === ch.toLowerCase() ? l : l.charAt(0).toUpperCase() + l.slice(1); });
  // Swap product data before app.js reads it.
  const CAT_TR = lang === 'en' ? window.SD_CATALOG_EN : lang === 'uz' ? window.SD_CATALOG_UZ : null;
  if (CAT_TR && window.SD_CATALOG) {
    for (const p of window.SD_CATALOG) {
      const u = CAT_TR[p.id] || {};
      p.ru = p.name; p.name = u.name || latin(p.name);
      p.meta = u.meta || meta(p.meta); if (p.group) p.group = u.group || GROUPS[p.group] || p.group;
      for (const k of ['inn', 'props', 'use', 'dose']) if (u[k] !== undefined) p[k] = u[k];
    }
  }

  // Translate everything the app renders, including toasts, dialogs and live updates.
  if (ACTIVE) {
    const run = muts => { for (const m of muts) { if (m.type === 'characterData') { const r = tr(m.target.nodeValue); if (r != null) m.target.nodeValue = r; } else m.addedNodes.forEach(nd => { if (nd.nodeType === 3) { const r = tr(nd.nodeValue); if (r != null) nd.nodeValue = r; } else if (nd.nodeType === 1) translate(nd); }); } };
    new MutationObserver(run).observe(document.body, { childList: true, subtree: true, characterData: true });
    const title = document.querySelector('title');
    const fixTitle = () => { const r = tr(document.title); if (r != null) document.title = r; };
    new MutationObserver(fixTitle).observe(title, { childList: true, characterData: true, subtree: true });
    fixTitle();
  }

  window.SD_I18N = {
    lang, translate, tr: s => (ACTIVE ? (tr(s) ?? s) : s),
    set(l) { try { localStorage.setItem('sd:lang', l); } catch {} const p = location.pathname.replace(/^\/(uz|en)(?=\/|$)/, ''); location.href = (l === 'ru' ? '' : '/' + l) + (p || '/'); },
    missing() { const out = new Set(); const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { const t = n.nodeValue.trim(); if (/[Ѐ-ӿ]/.test(t) && !n.parentElement.closest('script,style')) out.add(t); } return [...out]; },
  };
})();

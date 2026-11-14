// Sharq Darmon — storefront with real paths (/, /uz/, /en/) and prerendered HTML for search engines.
(function () {
  const D = window.SD;
  const LANG = window.SD_I18N ? window.SD_I18N.lang : 'ru';
  D.products = window.SD_CATALOG;
  const MADE = D.products.filter(p => !p.reg).length, REG = D.products.length - MADE;
  const S = D.settings || {};
  const PHONE = S.phone || '+998 78 888 70 00';
  // uploaded files live at /img/..., bundled ones under /assets/
  // Content, uploaded images and forms live on the admin server (Netlify); the pages may be hosted elsewhere.
  const API = ((document.querySelector('script[src*="/api/content.js"]') || {}).src || '').replace(/\/api\/content\.js.*$/, '');
  const src = f => (!f ? '' : f.startsWith('/img/') ? API + f : /^(\/|https?:)/.test(f) ? f : '/assets/' + f);
  const L = o => (o && (o[LANG] || o.ru)) || '';
  const fmtDate = d => (d ? String(d).slice(0, 10).split('-').reverse().join('.') : '');
  D.trust = D.trust.map(t => (t[0] === 'pill' ? ['pill', `${D.products.length} препаратов в каталоге`, `${MADE} в производстве, ${REG} в регистрации`] : t));
  const PROMO_FOR = {};
  (D.promos || []).forEach(x => { if (x.link && !/[/:]/.test(x.link)) PROMO_FOR[x.link] = PROMO_FOR[x.link] || x; });
  const P = Object.fromEntries(D.products.map(p => [p.id, p]));
  D.categories.forEach(c => { c.examples = D.products.filter(p => p.cat === c.id && !p.reg).slice(0, 2).map(p => p.name).join(', '); });
  const CAT = Object.fromEntries(D.categories.map(c => [c.id, c]));
  const SITE = 'https://sharq-darmon.uz';
  const LBASE = l => (l === 'ru' ? '' : '/' + l);
  const BASE = LBASE(LANG);
  // '#/product/x' or 'product/x' → '/uz/product/x/'
  const toPath = (h, base = BASE) => { const r = String(h).replace(/^#?\/?/, '').replace(/\/+$/, ''); return base + '/' + (r ? r + '/' : ''); };
  // Old shared links with #/... keep working.
  if (/^#\//.test(location.hash)) history.replaceState(null, '', toPath(location.hash));

  /* ---------- icons ---------- */
  const ICONS = {
    truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
    factory: '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>',
    shieldCheck: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    pill: '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    minus: '<path d="M5 12h14"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    pin: '<path d="M20 10c0 5-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    menu: '<path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/>',
    thermometer: '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',
    activity: '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
    brain: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v13"/>',
    vitamins: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 16v-4"/><path d="M12 16V8"/><path d="M17 16v-7"/>',
    box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
    filter: '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>',
  };
  const icon = (n, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;

  /* ---------- helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const plural = (n, one, few, many) => { const a = n % 10, b = n % 100; return a === 1 && b !== 11 ? one : a >= 2 && a <= 4 && (b < 10 || b >= 20) ? few : many; };
  const goods = n => `${n} ${plural(n, 'препарат', 'препарата', 'препаратов')}`;
  const store = {
    get(k, d) { try { const v = localStorage.getItem('sd:' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem('sd:' + k, JSON.stringify(v)); } catch {} },
  };
  const norm = s => s.toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]/g, '');

  /* ---------- shared fragments ---------- */
  const img = (p, cls = '') => p.img ? `<img src="${src(p.img)}" alt="${esc(p.name)}, упаковка" loading="lazy" class="${cls}">` : `<div class="ph">${icon('pill')}<span>Фото скоро появится</span></div>`;
  const crumbs = list => `<nav class="crumbs wrap" aria-label="Навигационная цепочка"><a href="#/">Главная</a>${list.map(([t, h]) => `${icon('chevron')}${h ? `<a href="${h}">${esc(t)}</a>` : `<span>${esc(t)}</span>`}`).join('')}</nav>`;

  function card(p) {
    return `<article class="card" data-card="${p.id}">
      <a class="media" href="#/product/${p.id}" aria-label="${esc(p.name)}">${img(p)}${p.reg ? `<span class="pill pill-reg">В регистрации</span>` : PROMO_FOR[p.id] ? `<span class="pill pill-promo">Акция</span>` : ''}</a>
      <span class="meta">${esc(p.meta)}</span>
      <a class="name" href="#/product/${p.id}">${esc(p.name)}</a>
      <span class="inn">${esc(p.inn)}</span>
      <span class="group">${esc(p.group || CAT[p.cat].name)}</span>
      <div class="cart-slot"><a class="add more" href="#/product/${p.id}">Подробнее${icon('chevron')}</a></div>
    </article>`;
  }
  const grid = (list, cls = '') => `<div class="grid ${cls}">${list.map(card).join('')}</div>`;

  const trust = () => `<div class="trust">${D.trust.map(([i, b, s]) => `<div>${icon(i)}<span><b>${b}</b><small>${s}</small></span></div>`).join('')}</div>`;
  const logos = (list, cls = '') => `<div class="logos ${cls}">${list.map(([n, f]) => `<div><img src="${src(f)}" alt="${esc(n)}" loading="lazy"></div>`).join('')}</div>`;
  const rxInfo = () => `<ol class="rxsteps">
      <li><span class="n">${icon('file')}</span><b>Рецептурные препараты</b><p>Отмечены значком «По рецепту». Отпускаются в аптеках только при наличии рецепта врача.</p></li>
      <li><span class="n">${icon('info')}</span><b>Официальная инструкция</b><p>На странице каждого препарата — действующее вещество, форма выпуска и инструкция по применению.</p></li>
      <li><span class="n">${icon('phone')}</span><b>Где купить</b><p>Препараты Sharq Darmon продаются в аптеках Узбекистана. О наличии в вашем городе подскажет колл-центр: +998 78 888 70 00.</p></li>
    </ol>
    <div class="alert" role="note" style="margin-top:24px">${icon('info')}<div><b>Информация на сайте не заменяет консультацию врача</b><p>Имеются противопоказания. Перед применением препарата проконсультируйтесь со специалистом.</p></div></div>`;
  const b2b = () => `<div class="b2b">
      <div class="wholesale">
        <span class="eyebrow">Для аптек и оптовых покупателей</span>
        <h3>Перечень продукции завода</h3>
        <p>${MADE} препаратов в производстве и ${REG} в регистрации: таблетки, капсулы, суппозитории и саше. Условия поставки — в отделе продаж.</p>
        <div class="btns"><a class="btn btn-white btn-sm" href="#/price-list">${icon('file')}Перечень продукции</a><a class="btn btn-ghost-white btn-sm" href="#/contacts">${icon('phone')}Отдел продаж</a></div>
      </div>
      <div class="contract">
        <div class="text"><span class="eyebrow">Контрактное производство</span><h3>Таблетки, капсулы, саше и суппозитории</h3><p>Выпустим препарат или БАД по вашей рецептуре на мощностях завода в Ташкенте. Тел.: +998 77 001 71 23</p><a class="btn btn-outline btn-sm" href="#/tabletting">Подробнее об услугах${icon('chevron')}</a></div>
        <div class="photo" role="img" aria-label="Таблетки"></div>
      </div>
    </div>`;
  const REEL = (S.reel || 'https://www.instagram.com/reel/De8gmqKoN5Y/').split('?')[0].replace(/\/?$/, '/');
  const reel = () => `<div class="reel">
      <div class="reel-text"><span class="eyebrow" style="color:var(--teal)">Видео</span><h2 class="h2" style="margin:8px 0 12px">Sharq Darmon в Instagram</h2>
        <p>Видео, новости завода и новые препараты — подписывайтесь на наш Instagram.</p>
        <a class="btn btn-outline btn-sm" href="${esc(REEL)}" target="_blank" rel="noopener">Смотреть в Instagram${icon('chevron')}</a></div>
      <div class="reel-frame"><iframe src="${esc(REEL)}embed" title="Видео Sharq Darmon в Instagram" loading="lazy" allowfullscreen scrolling="no"></iframe></div>
    </div>`;
  const promoHref = x => (!x.link ? '' : /^https?:/.test(x.link) ? x.link : P[x.link] ? '#/product/' + x.link : x.link.startsWith('/') || x.link.startsWith('#') ? x.link : '');
  const promoCard = x => { const h = promoHref(x), ext = /^https?:/.test(h);
    return `<article class="promo">${x.img ? `<div class="promo-img"><img src="${src(x.img)}" alt="${esc(L(x.title))}" loading="lazy"></div>` : ''}<div class="promo-body"><span class="pill pill-promo">${x.until ? `Акция до ${fmtDate(x.until)}` : 'Акция'}</span><h3>${esc(L(x.title))}</h3>${x.text ? `<p>${esc(L(x.text))}</p>` : ''}${h ? `<a class="btn btn-primary btn-sm" href="${esc(h)}"${ext ? ' target="_blank" rel="noopener"' : ''}>Подробнее${icon('chevron')}</a>` : ''}</div></article>`; };
  const promoSlide = x => { const h = promoHref(x), ext = /^https?:/.test(h);
    return `<article class="pslide${x.img ? '' : ' no-img'}"><div class="pslide-text"><span class="pill pill-promo">${x.until ? `Акция до ${fmtDate(x.until)}` : 'Акция'}</span><h3>${esc(L(x.title))}</h3>${x.text ? `<p>${esc(L(x.text))}</p>` : ''}${h ? `<a class="btn btn-white btn-sm" href="${esc(h)}"${ext ? ' target="_blank" rel="noopener"' : ''}>Подробнее${icon('chevron')}</a>` : ''}</div>${x.img ? `<div class="pslide-img"><img src="${src(x.img)}" alt="${esc(L(x.title))}" loading="lazy"></div>` : ''}</article>`; };
  const promos = () => (D.promos && D.promos.length ? `<section class="section" style="padding-top:8px"><div class="wrap"><div class="sec-head"><h2>Акции</h2><span class="spacer"></span><a class="link" href="#/promo">Все акции${icon('chevron')}</a></div>
      <div class="pslider" data-slider><div class="pslider-track">${D.promos.map(promoSlide).join('')}</div>
      ${D.promos.length > 1 ? `<button class="pslider-btn prev" type="button" data-slide="-1" aria-label="Предыдущая акция">${icon('chevron')}</button><button class="pslider-btn next" type="button" data-slide="1" aria-label="Следующая акция">${icon('chevron')}</button>
        <div class="pslider-dots">${D.promos.map((_, i) => `<button type="button" data-dot="${i}" aria-label="${i + 1}" aria-current="${i === 0}"></button>`).join('')}</div>` : ''}</div></div></section>` : '');
  const NEWS = D.news || [];
  const paras = t => String(t || '').split(/\n\s*\n|\r\n\s*\r\n/).map(x => x.trim()).filter(Boolean).map(x => `<p>${esc(x).replace(/\n/g, '<br>')}</p>`).join('');
  const newsCard = n => `<a class="news-card" href="#/news/${n.id}">${n.img ? `<span class="news-img"><img src="${src(n.img)}" alt="${esc(L(n.title))}" loading="lazy"></span>` : ''}<span class="news-body"><small>${fmtDate(n.date)}</small><b>${esc(L(n.title))}</b><span>${esc(String(L(n.text)).replace(/\s+/g, ' ').slice(0, 160))}${String(L(n.text)).length > 160 ? '…' : ''}</span></span></a>`;
  const popularChips = (list, cls = 'chip') => list.map(t => `<a class="${cls}" href="#/search/${encodeURIComponent(t)}">${t}</a>`).join('');

  /* ---------- views ---------- */
  const V = {};
  const HOME_POP = ((S.homePopular && S.homePopular.length ? S.homePopular : ['flustop', 'fenigam', 'ibumig', 'cetirizin', 'omeprazol', 'kalcij', 'azitromicin', 'kardiomig']).filter(id => P[id])).slice(0, 12);

  V.home = () => {
    const pop = HOME_POP.map(id => P[id]);
    return `
    <section class="hero">
      <div class="hero-card hero-video-card">
        <video class="hero-video" src="/assets/hero-lab.mp4?v=2" poster="/assets/hero-lab.jpg" autoplay muted loop playsinline preload="metadata" aria-hidden="true"></video>
        <div class="hero-inner">
          <div class="chips"><span>Часто ищут:</span>${popularChips(S.chips && S.chips.length ? S.chips : ['Флустоп', 'Ибумиг', 'Цетиризин', 'Омепразол', 'Ацикловир'])}</div>
          <div>
            <span class="eyebrow">Собственное производство в Ташкенте</span>
            <h1><b>Лекарства напрямую</b><span>от производителя</span></h1>
            <p>Фармацевтический завод Sharq Darmon в Ташкенте: ${MADE} препаратов собственного производства по стандартам GMP. Действующие вещества, показания и способ применения — в каталоге.</p>
            <div class="ctas"><a class="btn btn-white" href="#/catalog">Каталог препаратов${icon('chevron')}</a><a class="btn btn-ghost-white" href="#/about">О компании</a></div>
          </div>
        </div>
      </div>
      <div class="curve"><div class="wrap">${trust()}</div></div>
    </section>
    ${promos()}

    <section class="section why"><div class="wrap">
      <h2>Почему выбирают нас ?</h2>
      <p class="sub">Мы стремимся повысить уровень жизни населения нашей страны, поставляя на производство высококачественные компоненты для лекарственных средств.</p>
      <div class="steps">
        <div class="step"><h3>Собственное<br>производство</h3><p>Полный цикл выпуска лекарств на заводе в Ташкенте — от сырья до упаковки.</p><span class="num">01</span></div>
        <div class="step"><h3>Оптовые<br>продажи</h3><p>Наша компания производит фарм-изделия, а значит — первые руки и самые выгодные цены.</p><span class="num">02</span></div>
        <div class="step"><h3>Надежный<br>партнер</h3><p>5 лет на рынке Узбекистана — мы закрепили себя как надёжный партнёр.</p><span class="num">03</span></div>
        <div class="step"><h3>Мировые<br>стандарты</h3><p>«Sharq Darmon» — современное производство, полностью соответствующее международным европейским стандартам.</p><span class="num">04</span></div>
      </div>
      <div class="alert" role="note" style="margin-top:28px">${icon('info')}<div><b>Фармацевтический завод ООО «Sharq Darmon»</b><p>Современное производство, полностью соответствующее международным, европейским правилам GMP (правилам надлежащего производства). Установленное на заводе оборудование закуплено у лучших европейских компаний.</p></div></div>
    </div></section>

    <section class="section" style="padding-top:8px"><div class="wrap">
      <div class="sec-head"><h2>Категории</h2><span class="spacer"></span><a class="link" href="#/catalog">Весь каталог${icon('chevron')}</a></div>
      <div class="cats">${D.categories.map(c => `<a class="cat" href="#/catalog/${c.id}"><span class="ibox">${icon(c.icon)}</span><span><b>${c.name}</b><small>${c.examples}</small></span></a>`).join('')}</div>
    </div></section>

    <section class="section" style="padding-top:16px"><div class="wrap">
      <div class="sec-head"><h2>Препараты Sharq Darmon</h2>
        <div class="tabs bare" role="tablist"><button role="tab" type="button" data-hometab="pop" aria-selected="true">Популярное</button><button role="tab" type="button" data-hometab="reg" aria-selected="false">В регистрации</button></div>
        <span class="spacer"></span><a class="link" href="#/catalog">Смотреть все${icon('chevron')}</a></div>
      <div id="home-grid">${grid(pop)}</div>
    </div></section>

    <section class="section rxhow" id="rx"><div class="wrap">
      <h2 class="h2" style="margin-bottom:6px">Как пользоваться каталогом</h2>
      <p style="margin:0 0 24px;color:var(--muted)">Сайт завода — справочная информация о препаратах Sharq Darmon</p>
      ${rxInfo()}
    </div></section>

    ${(D.news || []).length ? `<section class="section" style="padding-top:0"><div class="wrap"><div class="sec-head"><h2>Новости компании</h2><span class="spacer"></span><a class="link" href="#/news">Все новости${icon('chevron')}</a></div><div class="news-grid">${D.news.slice(0, 3).map(newsCard).join('')}</div></div></section>` : ''}
    <section class="section"><div class="wrap">${reel()}</div></section>
    <section class="section" style="padding-top:0"><div class="wrap">${b2b()}</div></section>
    <section class="section" style="padding-top:0"><div class="wrap"><h2 class="h2">Поставщики субстанций</h2><p class="sub-note">Сырьё и вспомогательные вещества для производства</p>${logos(D.partners, 'logos-4')}<h2 class="h2" style="margin-top:48px">Партнёры и аптечные сети</h2><p class="sub-note">Дистрибьюторы и аптеки, через которые препараты Sharq Darmon попадают к покупателям</p>${logos(D.clients, 'logos-4')}</div></section>`;
  };

  /* catalog + category */
  const filt = { cats: new Set(), stock: new Set(), forms: new Set(), sort: 'cat', page: 1 };
  function filtered() {
    let list = D.products.filter(p =>
      (!filt.cats.size || filt.cats.has(p.cat)) &&
      (!filt.stock.size || filt.stock.has(p.reg ? 'reg' : 'made')) &&
      (!filt.forms.size || filt.forms.has(p.form)));
    const s = { cat: (a, b) => (a.reg ? 1 : 0) - (b.reg ? 1 : 0) || a.page - b.page, name: (a, b) => a.name.localeCompare(b.name, 'ru') }[filt.sort];
    return list.slice().sort(s);
  }
  const PER = 12;
  function catalogBody() {
    const list = filtered();
    const pages = Math.max(1, Math.ceil(list.length / PER));
    filt.page = Math.min(filt.page, pages);
    const shown = list.slice((filt.page - 1) * PER, filt.page * PER);
    const chips = [
      ...[...filt.cats].map(c => [`cats:${c}`, CAT[c].short || CAT[c].name]),
      ...[...filt.stock].map(s => [`stock:${s}`, s === 'reg' ? 'В регистрации' : 'В производстве']),
      ...[...filt.forms].map(f => [`forms:${f}`, D.forms[f]]),
    ];
    return `<div class="toolbar">
        <button class="chip filters-toggle" type="button" data-toggle-filters>${icon('filter')}Фильтры</button>
        ${chips.map(([k, t]) => `<button class="chip" type="button" aria-pressed="true" data-unfilter="${k}">${icon('check')}${esc(t)}</button>`).join('')}
        ${chips.length ? `<button class="link" type="button" data-reset-filters style="font-size:14px">Очистить</button>` : ''}
        <span class="spacer"></span><label for="sort">Сортировка</label>
        <div class="select"><select id="sort" data-sort>${[['cat', 'Как в каталоге'], ['name', 'По алфавиту']].map(([v, t]) => `<option value="${v}"${filt.sort === v ? ' selected' : ''}>${t}</option>`).join('')}</select>${icon('down')}</div>
      </div>
      ${shown.length ? grid(shown, 'cols-3') : `<div class="state" style="margin:0;max-width:none"><div class="round">${icon('filter')}</div><h1 style="font-size:22px">Нет товаров с такими фильтрами</h1><p>Попробуйте убрать часть фильтров.</p><button class="btn btn-outline" type="button" data-reset-filters>Сбросить фильтры</button></div>`}
      ${pages > 1 ? `<nav class="pager" aria-label="Страницы">${Array.from({ length: pages }, (_, i) => `<button type="button" data-page="${i + 1}" aria-current="${filt.page === i + 1}">${i + 1}</button>`).join('')}</nav>` : ''}`;
  }
  function filterBox(group, legend, opts) {
    return `<fieldset><legend>${legend}</legend>${opts.map(([v, t]) => {
      const n = D.products.filter(p => ({ cats: p.cat === v, stock: (p.reg ? 'reg' : 'made') === v, forms: p.form === v })[group]).length;
      return `<label class="check"><input type="checkbox" data-filter="${group}:${v}"${filt[group].has(v) ? ' checked' : ''}>${t}<span class="count">${n}</span></label>`;
    }).join('')}</fieldset>`;
  }
  function catalogView(catId) {
    filt.cats = new Set(catId ? [catId] : []);
    filt.page = 1;
    const title = catId ? CAT[catId].name : 'Каталог препаратов';
    return `${crumbs(catId ? [['Каталог', '#/catalog'], [title]] : [['Каталог']])}
    <div class="wrap">
      <div class="page-title"><h1>${title}</h1><small id="cat-count">${goods(filtered().length)}</small></div>
      <div class="catalog">
        <aside class="filters" id="filters" aria-label="Фильтры">
          ${filterBox('cats', 'Категория', D.categories.map(c => [c.id, c.short || c.name]))}
          ${filterBox('stock', 'Статус', [['made', 'В производстве'], ['reg', 'В регистрации']])}
          ${filterBox('forms', 'Форма выпуска', Object.entries(D.forms))}
          <button class="btn btn-outline btn-sm" type="button" data-reset-filters>Сбросить фильтры</button>
        </aside>
        <div id="catalog-body">${catalogBody()}</div>
      </div>
    </div>`;
  }
  function refreshCatalog() {
    const b = $('#catalog-body'); if (!b) return;
    b.innerHTML = catalogBody();
    $('#cat-count').textContent = goods(filtered().length);
    $$('[data-filter]').forEach(i => { const [g, v] = i.dataset.filter.split(':'); i.checked = filt[g].has(v); });
  }
  V.catalog = () => catalogView(null);
  V.category = id => CAT[id] ? catalogView(id) : V.notfound();

  /* search */
  function searchList(q) {
    const n = norm(q);
    if (!n) return [];
    return D.products.filter(p => norm(p.name + p.inn + (CAT[p.cat]?.name || '')).includes(n));
  }
  function closest(q) {
    const n = norm(q);
    let best = null, score = 0;
    for (const p of D.products) {
      const a = norm(p.name);
      let s = 0; for (let i = 0; i < Math.min(a.length, n.length); i++) if (a[i] === n[i]) s++; else break;
      const common = [...new Set(n)].filter(ch => a.includes(ch)).length / new Set(n).size;
      s += common * 4;
      if (s > score) { score = s; best = p; }
    }
    return score >= 4 ? best : null;
  }
  V.search = q => {
    q = decodeURIComponent(q || '');
    const list = searchList(q);
    const input = $('#search'); if (input) input.value = q;
    if (!list.length) {
      const g = closest(q);
      return `${crumbs([['Поиск']])}<div class="wrap"><div class="state">
        <div class="round">${icon('search')}</div>
        <h1 style="font-size:22px">По запросу «${esc(q)}» ничего не найдено</h1>
        <p>${g ? `Возможно, вы имели в виду «${esc(g.name)}». ` : ''}Проверьте написание или найдите товар по действующему веществу.</p>
        <div class="btns"><a class="btn btn-outline" href="#/catalog">Весь каталог</a>${g ? `<a class="btn btn-primary" href="#/search/${encodeURIComponent(g.name)}">Показать «${esc(g.name)}»</a>` : ''}</div>
      </div>
      <div style="text-align:center;margin-bottom:72px"><p style="color:var(--ink-2);margin:0 0 14px">Часто ищут</p><div class="chips" style="justify-content:center">${popularChips(['Цетиризин SD', 'Лоратадин SD', 'Ибумиг', 'Парацетамол', 'Омепразол SD'])}</div></div></div>`;
    }
    const cats = new Set(list.map(p => p.cat));
    const similar = D.products.filter(p => cats.has(p.cat) && !list.includes(p)).slice(0, 4);
    return `${crumbs([['Поиск']])}<div class="wrap">
      <div class="page-title" style="flex-direction:column;gap:4px;align-items:flex-start"><h1>Результаты по запросу «${esc(q)}»</h1><small style="font-size:14px">Найдено по названию и действующему веществу: ${list.length} ${plural(list.length, 'препарат', 'препарата', 'препаратов')}</small></div>
      <div class="grid">${list.map(card).join('')}<div class="panel soft" style="grid-column:span ${list.length < 3 ? 4 - list.length : 1};align-self:start"><b style="display:block;margin-bottom:8px">Как мы искали</b><p style="margin:0;color:var(--ink-2);line-height:1.55;font-size:13.5px">Поиск учитывает торговое название, действующее вещество (МНН) и частые опечатки. Если нужного препарата нет — посмотрите аналоги с тем же действующим веществом или позвоните нам: +998 78 888 70 00.</p></div></div>
      ${similar.length ? `<h2 class="h2" style="margin-top:48px">Препараты с похожим действием</h2>${grid(similar)}` : ''}
      <div style="height:72px"></div></div>`;
  };

  /* product */
  V.product = id => {
    const p = P[id]; if (!p) return V.notfound();
    const c = CAT[p.cat];
    const related = D.products.filter(x => x.id !== p.id && x.cat === p.cat).sort((a, b) => (a.reg ? 1 : 0) - (b.reg ? 1 : 0)).slice(0, 4);
    return `${crumbs([['Каталог', '#/catalog'], ...(c ? [[c.name, '#/catalog/' + c.id]] : []), [p.name]])}
    <div class="wrap" style="padding-top:24px">
      <div class="pdp">
        <div class="gallery">
          <div class="main" id="pdp-main">${img(p)}</div>
          ${p.img ? `<div class="thumbs">${[0, 1, 2].map(i => `<button type="button" data-thumb="${i}" aria-current="${i === 0}" aria-label="Фото ${i + 1}"><img src="${src(p.img)}" alt="${esc(p.name)}, фото ${i + 1}" style="${i === 1 ? 'transform:scaleX(-1)' : i === 2 ? 'transform:rotate(-8deg) scale(.9)' : ''}"></button>`).join('')}</div>` : ''}
        </div>
        <div>
          <div style="display:flex;gap:8px">${p.reg ? '<span class="pill pill-reg">В регистрации</span>' : `<span class="pill pill-new">${esc(p.group)}</span>`}</div>
          <h1>${esc(p.name)}</h1>
          <p class="sub">${esc(p.meta.replace(/ · /g, ' ').replace(/^(\S+)/, '$1'))} · ${esc(p.group || '')}</p>
          <dl class="specs"><dt>Действующее вещество</dt><dd>${esc(p.inn)}</dd><dt>Форма выпуска</dt><dd>${esc(p.meta)}</dd><dt>Группа</dt><dd>${esc(p.group || CAT[p.cat].name)}</dd><dt>Производитель</dt><dd>ООО «Sharq Darmon», Ташкент</dd><dt>Статус</dt><dd>${p.reg ? 'В регистрации' : 'В производстве'}</dd></dl>
          ${PROMO_FOR[p.id] ? `<div class="promo-note">${icon('info')}<div><b>${esc(L(PROMO_FOR[p.id].title))}</b>${PROMO_FOR[p.id].text ? `<p>${esc(L(PROMO_FOR[p.id].text))}</p>` : ''}${PROMO_FOR[p.id].until ? `<small>Акция до ${fmtDate(PROMO_FOR[p.id].until)}</small>` : ''}</div></div>` : ''}
          <div class="buybox">
            <b style="font-size:17px">Где купить</b>
            <p style="margin:0;color:var(--ink-2);line-height:1.55">${p.reg ? `${esc(p.name)} проходит государственную регистрацию и пока не поступил в продажу. Узнать о сроках можно в колл-центре завода.` : `${esc(p.name)} продаётся в аптеках Узбекистана. О наличии в вашем городе подскажет колл-центр завода.`}</p>
            <div class="row"><span class="btn btn-primary">${icon('phone')}+998 78 888 70 00</span><a class="btn btn-outline" href="#/feedback">Задать вопрос</a></div>
            <div class="alert" role="note">${icon('info')}<div><b>Перед применением</b><p>Имеются противопоказания. Проконсультируйтесь с врачом и прочитайте инструкцию.</p></div></div>
            <div class="perks"><span>${icon('factory')}Произведено в Ташкенте</span><span>${icon('shieldCheck')}Стандарты GMP</span></div>
          </div>
        </div>
      </div>
      <div class="tabs" role="tablist" style="margin-top:16px">${(p.reg ? [['instr', 'О препарате']] : [['instr', 'Описание'], ['use', 'Показания'], ['dose', 'Способ применения']]).map(([k, t], i) => `<button role="tab" type="button" data-pdptab="${k}" aria-selected="${i === 0}">${t}</button>`).join('')}</div>
      <div class="pdp-tabs" style="padding:24px 0 8px">
        <div class="prose" id="pdp-tab">${pdpTab(p, 'instr')}</div>
        <aside class="panel soft" style="align-self:start"><b style="display:block;margin-bottom:14px;font-size:16px">Каталог продукции</b><p style="margin:0 0 12px;color:var(--ink-2);font-size:14px;line-height:1.5">Описание взято из официального каталога Sharq Darmon, стр. ${p.page}.</p><div class="docs"><a class="btn btn-outline btn-sm" href="assets/sharq-darmon-catalog.pdf" target="_blank" rel="noopener">${icon('download')}Каталог продукции, PDF</a></div><p style="font-size:13px;color:var(--muted);margin:14px 0 0">Перед применением проконсультируйтесь с врачом. Имеются противопоказания.</p></aside>
      </div>
      <h2 class="h2" style="margin-top:40px">Другие препараты</h2>${grid(related)}<div style="height:72px"></div>
    </div>`;
  };
  function pdpTab(p, k) {
    const list = t => `<ul>${t.split(/;\s*/).filter(Boolean).map(x => `<li>${esc(x.charAt(0).toUpperCase() + x.slice(1))}</li>`).join('')}</ul>`;
    if (p.reg) return `<h3>Препарат в регистрации</h3><p>${esc(p.name)} — ${esc(p.meta.toLowerCase())}. Действующее вещество: ${esc(p.inn)}.</p><p>Подробная информация и инструкция появятся после завершения государственной регистрации.</p>`;
    if (k === 'instr') return `<h3>Активное вещество и свойства</h3><p><b>${esc(p.inn)}.</b> ${esc(p.props ? p.props.charAt(0).toUpperCase() + p.props.slice(1) : '')}${p.props && !/[.!]$/.test(p.props) ? '.' : ''}</p><h3>Форма выпуска</h3><p>${esc(p.meta)}</p>`;
    if (k === 'use') return `<h3>Применяется при</h3>${list(p.use)}`;
    return `<h3>Способ применения и дозы</h3>${list(p.dose)}<p style="font-size:13px;color:var(--muted)">Информация из каталога продукции Sharq Darmon. Дозировку назначает врач.</p>`;
  }

  /* company pages */
  V.about = () => `${crumbs([['О компании']])}<div class="wrap">
    <div class="svc-hero" style="padding-top:24px"><div><span class="eyebrow">О компании</span>
      <h1>Здоровье в каждом шаге — надёжность в каждой капле</h1>
      <p>Компания «Sharq Darmon» — один из конкурентоспособных отечественных производителей лекарственных средств на рынке Республики Узбекистан. Главная задача компании — обеспечение населения качественными и доступными лекарственными средствами.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-primary" href="#/catalog">Каталог препаратов${icon('chevron')}</a><a class="btn btn-outline" href="#/contacts">Контакты</a></div></div>
      <div class="photo" style="background-image:url('/assets/pdf/factory.webp');background-size:contain;background-color:#fff" role="img" aria-label="Сотрудники на производственной линии завода Sharq Darmon"></div></div>
    <div class="stats">
      <div><b>2013</b><span>начало строительства завода в Бектемирском районе Ташкента</span></div>
      <div><b>2015</b><span>запуск производства: Флустоп, Тримиг, Котрисепт, Дикломол</span></div>
      <div><b>80+</b><span>наименований лекарственных средств выпускается сегодня</span></div>
      <div><b>100+</b><span>высококвалифицированных сотрудников</span></div>
    </div></div>
    <section class="section rxhow" style="margin-top:48px"><div class="wrap"><h2 class="h2">Производство и качество</h2><div class="offer">
      <div style="background:#fff"><span class="ibox">${icon('factory')}</span><b>Твёрдые и мягкие формы</b><p>Таблетки, саше и капсулы, а также суппозитории и мази — по международным стандартам GMP. Несколько групп препаратов выпускаются одновременно в полном цикле.</p></div>
      <div style="background:#fff"><span class="ibox">${icon('shieldCheck')}</span><b>Многоступенчатый контроль</b><p>Продукция проходит проверки на всех этапах производства. По качеству, эффективности и безопасности она соответствует аналогам европейских компаний.</p></div>
      <div style="background:#fff"><span class="ibox">${icon('users')}</span><b>Команда специалистов</b><p>Фармацевты, медики, химики и инженеры; инженерная служба контролирует работу автоматизированного импортного оборудования. В разработке и регистрации — более 20 новых препаратов.</p></div>
    </div></div></section>
    <section class="section"><div class="wrap"><div class="split" style="padding-bottom:0;align-items:center">
      <div><span class="eyebrow" style="color:var(--teal)">Сертификат</span><h2 class="h2" style="margin-top:8px">Сертификат GMP № GMP-04:2024</h2>
        <p class="lead" style="font-size:16px">Завод «Sharq Darmon» соответствует требованиям O‘zDSt 2766:2018 «Надлежащая производственная практика — GMP». Сертификат выдан ГУП «Центр надлежащих практик» по результатам фармацевтической инспекции.</p>
        <blockquote class="quote" style="margin:28px 0 0"><p>Мы уверены: лекарства должны быть доступны каждому, кто в них нуждается, — вне зависимости от дохода, состояния национальной экономики и системы здравоохранения.</p><small>Наш девиз: «Здоровая семья — наша забота!»</small></blockquote></div>
      <img src="/assets/pdf/gmp-cert.webp" alt="Сертификат GMP № GMP-04:2024 ООО «Sharq Darmon»" style="width:100%;max-width:420px;justify-self:center;border:1px solid var(--line);border-radius:12px;box-shadow:0 20px 40px -24px rgba(15,23,42,.4)" loading="lazy">
    </div></div></section>
    <section class="section" style="padding-top:0"><div class="wrap">${reel()}</div></section>
    <section class="section" style="padding-top:0"><div class="wrap"><h2 class="h2">Поставщики субстанций</h2><p class="sub-note">Сырьё и вспомогательные вещества для производства</p>${logos(D.partners, 'logos-4')}<h2 class="h2" style="margin-top:48px">Партнёры и аптечные сети</h2><p class="sub-note">Дистрибьюторы и аптеки, через которые препараты Sharq Darmon попадают к покупателям</p>${logos(D.clients, 'logos-4')}</div></section>`;

  V.contacts = () => `${crumbs([['Контакты']])}<div class="wrap">
    <div class="page-title"><h1>Контакты</h1></div>
    <div class="contact-cards">
      <div><span class="ibox">${icon('phone')}</span><small>Колл-центр</small><b>+998 78 888 70 00</b><small>Справки о наличии и заказах</small></div>
      <div><span class="ibox">${icon('user')}</span><small>Отдел продаж</small><b>+998 77 001 71 23</b><small>Аптекам — оптовые закупки</small></div>
      <div><span class="ibox">${icon('mail')}</span><small>Электронная почта</small><b>sharq-darmon@mail.ru</b><small>sharq-darmon.uz</small></div>
      <div><span class="ibox">${icon('pin')}</span><small>Адрес завода</small><b>Ташкент, Бектемирский район,</b><small>ул. Байкаро, 27 А</small></div>
    </div>
    <div class="split contact-split">
      <div class="map map-live">
        <iframe src="https://yandex.uz/map-widget/v1/?ll=69.350802%2C41.243281&z=16&oid=74307780560&ol=biz&lang=${LANG === 'en' ? 'en_US' : LANG === 'uz' ? 'uz_UZ' : 'ru_RU'}" title="Sharq Darmon на Яндекс Картах" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>
        <a class="btn btn-white btn-sm map-route" href="https://yandex.uz/maps/org/sharq_darmon/74307780560/?ll=69.350802%2C41.243281&z=16&rtext=~41.243281%2C69.350802" target="_blank" rel="noopener">${icon('pin')}Построить маршрут${icon('chevron')}</a>
      </div>
      <form class="panel" data-form="question" novalidate style="display:flex;flex-direction:column;gap:16px">
        <h2 style="margin:0;font-size:19px">Задайте вопрос</h2>
        <div class="field"><label for="q-name">Имя <i>*</i></label><input id="q-name" name="name" placeholder="Как к вам обращаться" required></div>
        <div class="field"><label for="q-phone">Телефон <i>*</i></label><input id="q-phone" name="phone" type="tel" placeholder="+998 __ ___ __ __" required data-phone><span class="hint">Перезвоним в рабочее время</span></div>
        <div class="field"><label for="q-msg">Вопрос</label><textarea id="q-msg" name="msg" style="min-height:90px" placeholder="Например, есть ли в наличии Ацикловир SD"></textarea></div>
        <button class="btn btn-primary btn-block" type="submit">Отправить</button>
      </form>
    </div>
    <div class="alert" role="note" style="margin-bottom:72px">${icon('clock')}<div><b>Время работы</b><p>Отдел продаж принимает звонки с 9:00 до 18:00, понедельник — суббота.</p></div></div>
  </div>`;

  V.feedback = () => `${crumbs([['Обратная связь']])}<div class="wrap">
    <div class="split">
      <form data-form="feedback" novalidate>
        <div class="page-title"><h1>Обратная связь</h1></div>
        <p class="lead">Вопрос о препарате, наличии, заказе или сотрудничестве — ответим в течение рабочего дня.</p>
        <div class="form-grid">
          <div class="field"><label for="f-name">Имя <i>*</i></label><input id="f-name" name="name" autocomplete="name" placeholder="Азиз Каримов" required></div>
          <div class="field"><label for="f-contact">Телефон или e-mail <i>*</i></label><input id="f-contact" name="contact" placeholder="+998 90 123 45 67" required></div>
          <div class="field full"><label for="f-topic">Тема обращения <i>*</i></label><div class="select"><select id="f-topic" name="topic" style="width:100%;height:48px;font-size:15px">${['Вопрос о наличии препарата', 'Вопрос о заказе', 'Оптовые закупки', 'Сотрудничество', 'Жалоба или предложение'].map(t => `<option>${t}</option>`).join('')}</select>${icon('down')}</div></div>
          <div class="field full"><label for="f-msg">Сообщение <i>*</i></label><textarea id="f-msg" name="msg" maxlength="1000" placeholder="Подскажите, когда появится Ацикловир SD 200 мг?" required></textarea><span class="hint" id="f-count">0 / 1000 символов</span></div>
          <label class="dropzone full" style="grid-column:1/-1" id="drop"><input type="file" id="f-file" accept=".jpg,.jpeg,.png,.pdf" class="sr-only">${icon('file')}<span><b id="file-label">Прикрепить файл</b><small>Фото рецепта или документа · JPG, PNG, PDF до 10 МБ</small></span></label>
          <label class="check full" style="grid-column:1/-1"><input type="checkbox" name="agree" checked required>Согласен на обработку персональных данных</label>
        </div>
        <button class="btn btn-primary" type="submit" style="margin-top:24px">Отправить сообщение</button>
      </form>
      <div class="info-cards" style="padding-top:32px">
        <div class="info-card"><b><span class="ibox">${icon('phone')}</span>Быстрее по телефону</b><p>+998 78 888 70 00 — колл-центр</p></div>
        <div class="info-card"><b><span class="ibox">${icon('clock')}</span>Срок ответа</b><p>В течение рабочего дня</p></div>
        <div class="info-card"><b><span class="ibox">${icon('shieldCheck')}</span>Конфиденциально</b><p>Данные используются только для ответа на обращение</p></div>
      </div>
    </div></div>`;

  const regionsList = D.regions.slice(0, 12);
  V.career = () => `${crumbs([['Карьера']])}<div class="wrap">
    <div class="page-title"><h1>Карьера в Sharq Darmon</h1></div>
    <p class="lead" style="max-width:none">Мы растём и ищем людей, которые хотят развиваться в фармацевтике. Обучение, карьерный рост и стабильная компания с собственным производством.</p>
    <h2 class="h2" style="margin-top:36px">Открытые вакансии · 2</h2>
    <article class="vacancy"><header><div><h2>Медицинский представитель</h2><span class="where">${icon('pin')}${D.regions.length - 2} регионов Узбекистана</span></div><button class="btn btn-primary btn-sm" type="button" data-apply="Медицинский представитель">Откликнуться${icon('chevron')}</button></header>
      <div class="chips">${D.regions.filter(r => r !== 'Республика Каракалпакстан').map(r => `<span class="chip">${r.replace(' область', '')}</span>`).join('')}<span class="chip">Каракалпакстан</span></div>
      <div class="cols3"><div><h3>Задачи</h3><ul class="ticks"><li>${icon('check')}Развитие спроса на продукцию компании среди врачей и аптек</li></ul></div>
        <div><h3>Требования</h3><ul class="ticks"><li>${icon('check')}Медицинское образование (высшее или среднее)</li><li>${icon('check')}Опыт работы от 1 года</li><li>${icon('check')}Навыки общения и продаж</li><li>${icon('check')}Обучаемость, честность, ориентация на результат</li></ul></div>
        <div><h3>Мы предлагаем</h3><ul class="ticks"><li>${icon('check')}Работу в стабильной компании</li><li>${icon('check')}Высокую зарплату — по итогам собеседования</li><li>${icon('check')}Профессиональное обучение и тренинги</li><li>${icon('check')}Служебный автомобиль при выполнении плана</li></ul></div></div></article>
    <article class="vacancy"><header><div><h2>Торговый представитель</h2><span class="where">${icon('pin')}Район обсуждается на собеседовании</span></div><button class="btn btn-primary btn-sm" type="button" data-apply="Торговый представитель">Откликнуться${icon('chevron')}</button></header>
      <div class="cols3"><div><h3>Обязанности</h3><ul class="ticks"><li>${icon('check')}Выполнение ежемесячного плана продаж</li><li>${icon('check')}Обеспечение продукцией закреплённых торговых точек</li><li>${icon('check')}Ежедневный объезд точек по утверждённому маршруту</li><li>${icon('check')}Расширение клиентской базы, мерчандайзинг, заключение договоров</li></ul></div>
        <div><h3>Требования</h3><ul class="ticks"><li>${icon('check')}Знание русского и узбекского языков</li><li>${icon('check')}Желание расти и развиваться</li></ul></div>
        <div><h3>Условия</h3><ul class="ticks"><li>${icon('check')}Оклад + процент + бонус</li><li>${icon('check')}Карьерный рост и дружный коллектив</li><li>${icon('check')}График 6/1, пн–сб 9:00–18:00</li></ul></div></div></article>
    <div class="panel soft" style="display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:72px"><div><b style="display:block;margin-bottom:4px">Вопросы по вакансиям</b><span style="color:var(--muted);font-size:13.5px">Шахзод · +998 77 001 71 23 · sharq-darmon@mail.ru · звонки с 9:00 до 18:00</span></div><span class="btn btn-outline btn-sm">${icon('phone')}+998 77 001 71 23</span></div>
  </div>`;

  V.medreps = () => `${crumbs([['Медпредставители / Торговые представители']])}<div class="wrap">
    <div class="page-title"><h1>Медицинские и торговые представители</h1></div>
    <p class="lead" style="max-width:none">Медицинские и торговые представители Sharq Darmon работают с аптеками и клиниками во всех регионах. Выберите регион, чтобы связаться с представителем.</p>
    <div class="regions">${D.regions.map(r => `<div><b>${icon('pin')}${r}</b><small>Контакт через колл-центр</small><a href="tel:+${PHONE.replace(/\D/g, '')}">+998 78 888 70 00</a></div>`).join('')}</div>
    <div class="banner"><div><h2>Хотите стать медицинским представителем?</h2><p>Открыт набор во всех регионах — обучение и служебный автомобиль.</p></div><a class="btn btn-white btn-sm" href="#/career">Смотреть вакансию${icon('chevron')}</a></div>
  </div>`;

  const SERVICES = {
    tabletting: { tab: 'Таблетки', title: 'Производство таблеток по вашей рецептуре', photo: 'tablets.jpg',
      lead: 'Выпустим таблетированные лекарственные средства и БАД под вашей маркой на современном оборудовании завода в Ташкенте.',
      offer: [['pill', 'Таблетки по рецептуре заказчика', 'Таблетированные формы по вашей рецептуре — от подбора состава до готовой продукции.'], ['box', 'Упаковка и фасовка', 'Блистеры, флаконы и банки ПЭТ, маркировка под вашим логотипом.'], ['shieldCheck', 'Контроль качества', 'Многоступенчатый контроль на всех этапах по стандартам GMP.']] },
    capsulation: { tab: 'Капсулы', title: 'Капсулирование под вашей маркой', photo: 'capsules.jpg',
      lead: 'Капсула защищает действующие вещества от внешней среды, обеспечивает точную дозировку и маскирует вкус и запах. Возьмём на себя производство, если у вас есть продукт и рынок сбыта.',
      offer: [['pill', 'Твёрдые капсулы', 'Цилиндрические капсулы из двух частей, плотно входящих одна в другую.'], ['droplet', 'Мягкие капсулы', 'Цельные капсулы разной формы (шар, овал, облонг) с жидким или пастообразным содержимым.'], ['chart', 'Полный цикл', 'Частичная или полная поддержка: от идеи до готовой продукции на полке.']] },
    sachet: { tab: 'Саше пакеты', title: 'Фасовка порошков в саше-пакеты', icon: 'box',
      lead: 'Порошки и гранулы для приготовления растворов и суспензий в удобных одноразовых саше-пакетах — точная доза в каждой упаковке.',
      offer: [['box', 'Порошки и гранулы', 'Лекарственные средства и БАД в форме порошка или гранул по вашей рецептуре.'], ['vitamins', 'Дозированная фасовка', 'Каждый саше-пакет содержит одну точную дозу, герметичная упаковка защищает от влаги.'], ['file', 'Дизайн упаковки', 'Печать саше-пакетов и вторичной упаковки под вашей маркой.']] },
    suppository: { tab: 'Суппозитории', title: 'Производство суппозиториев', icon: 'pill',
      lead: 'Ректальные и вагинальные суппозитории по рецептуре заказчика: подбор основы, литьё в контурную упаковку и контроль качества на заводе в Ташкенте.',
      offer: [['droplet', 'Подбор основы', 'Подберём основу под действующее вещество и нужную скорость высвобождения.'], ['box', 'Контурная упаковка', 'Литьё суппозиториев сразу в ячейковую ПВХ/ПЭ упаковку.'], ['shieldCheck', 'Контроль качества', 'Проверка массы, однородности и времени растворения каждой серии.']] },
  };
  const service = kind => {
    const sv = SERVICES[kind];
    return `${crumbs([['Контрактное производство', '#/tabletting'], [sv.tab]])}<div class="wrap">
    <div class="tabs" style="margin-top:20px">${Object.entries(SERVICES).map(([k, v]) => `<a href="#/${k}" aria-selected="${k === kind}">${v.tab}</a>`).join('')}</div>
    <div class="svc-hero"><div><span class="eyebrow">Контрактное производство</span>
      <h1>${sv.title}</h1><p>${sv.lead}</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-primary" type="button" data-apply="${sv.tab}" data-kind="project">Обсудить проект${icon('chevron')}</button><span class="btn btn-outline">${icon('phone')}+998 77 001 71 23</span></div></div>
      ${sv.photo ? `<div class="photo" style="background-image:url('/assets/${sv.photo}')" role="img" aria-label="${sv.tab}"></div>` : `<div class="photo svc-art" aria-hidden="true">${icon(sv.icon)}</div>`}</div>
    <h2 class="h2">Что мы предлагаем</h2>
    <div class="offer">${sv.offer.map(([i, b, p]) => `<div><span class="ibox">${icon(i)}</span><b>${b}</b><p>${p}</p></div>`).join('')}</div>
    <div class="process"><h2>Как мы работаем</h2><ol>${[['Знакомство', 'Вы приезжаете на завод и рассказываете об идее будущего продукта.'], ['Рекомендации', 'Мы предлагаем рецептуру, форму выпуска и упаковку.'], ['Объём услуги', 'Частичная или полная поддержка — часть задач можно оставить за собой.'], ['Выпуск', 'Производим и упаковываем продукцию под вашей маркой.']].map(([b, p], i) => `<li><span class="n">${i + 1}</span><b>${b}</b><p>${p}</p></li>`).join('')}</ol></div>
    <div class="alert" role="note" style="margin-bottom:72px">${icon('phone')}<div><b>Контрактное производство</b><p>Обсудить проект: +998 77 001 71 23. Справки о препаратах — колл-центр +998 78 888 70 00.</p></div></div></div>`;
  };
  V.tabletting = () => service('tabletting');
  V.capsulation = () => service('capsulation');
  V.sachet = () => service('sachet');
  V.suppository = () => service('suppository');

  V.news = id => {
    if (id) {
      const n = NEWS.find(x => x.id === id); if (!n) return V.notfound();
      return `${crumbs([['Новости', '#/news'], [L(n.title)]])}<div class="wrap news-article"><small class="news-date">${fmtDate(n.date)}</small><h1>${esc(L(n.title))}</h1>${n.img ? `<img class="news-hero" src="${src(n.img)}" alt="${esc(L(n.title))}">` : ''}<div class="prose">${paras(L(n.text))}</div><a class="btn btn-outline" href="#/news" style="margin:32px 0 72px">Все новости</a></div>`;
    }
    if (NEWS.length) return `${crumbs([['Новости']])}<div class="wrap"><div class="page-title"><h1>Новости компании</h1></div><div class="news-grid">${NEWS.map(newsCard).join('')}</div><div style="height:72px"></div></div>`;
    return V.newsEmpty();
  };
  V.promo = () => `${crumbs([['Акции']])}<div class="wrap"><div class="page-title"><h1>Акции</h1></div>
    ${D.promos && D.promos.length ? `<div class="promos">${D.promos.map(promoCard).join('')}</div><div style="height:72px"></div>`
      : `<div class="state" style="max-width:none;margin-top:0"><div class="round">${icon('info')}</div><h2 style="font-size:20px">Сейчас акций нет</h2><p>Следите за новостями — о новых акциях мы сообщаем здесь и в Instagram.</p><div class="btns"><a class="btn btn-outline" href="#/news">Новости</a><a class="btn btn-primary" href="#/catalog">Каталог препаратов${icon('chevron')}</a></div></div>`}</div>`;
  V.newsEmpty = () => `${crumbs([['Новости']])}<div class="wrap"><div class="page-title"><h1>Новости компании</h1></div>
    <div class="state" style="max-width:none;margin-top:0"><div class="round">${icon('file')}</div><h2 style="font-size:20px">Новостей пока нет</h2><p>Здесь будут появляться новости о новых препаратах, производстве и компании. А пока посмотрите новинки в каталоге.</p><div class="btns"><a class="btn btn-outline" href="#/about">О компании</a><a class="btn btn-primary" href="#/catalog">Новинки каталога${icon('chevron')}</a></div></div></div>`;

  /* product list (replaces the price list: the catalog has no prices) */
  const pl = { q: '', f: 'all' };
  const plMatch = (p, f) => f === 'all' || (f === 'made' && !p.reg) || (f === 'reg' && p.reg);
  function priceRows() {
    const n = norm(pl.q);
    const rows = D.products.map((p, i) => ({ p, no: i + 1 })).filter(({ p }) => plMatch(p, pl.f) && (!n || norm(p.name + p.meta + p.inn + (p.group || '')).includes(n)));
    return { total: rows.length, html: rows.length ? rows.map(({ p, no }) => `<tr><td style="color:var(--muted)">${no}</td><td><a href="#/product/${p.id}" style="color:var(--navy);font-weight:500">${esc(p.name)}</a></td><td>${esc(p.meta)}</td><td>${esc(p.inn)}</td><td>${p.reg ? '<span class="pill pill-reg">В регистрации</span>' : '<span class="stock">В производстве</span>'}</td></tr>`).join('') : `<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--muted)">Ничего не найдено по запросу «${esc(pl.q)}»</td></tr>` };
  }
  function refreshPrice() { const b = $('#pl-body'); if (b) b.innerHTML = priceRows().html; }
  V['price-list'] = () => `${crumbs([['Перечень продукции']])}<div class="wrap">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap;margin:24px 0">
      <div><h1 style="margin:0 0 6px;font-size:clamp(28px,3vw,38px);letter-spacing:-0.6px">Перечень продукции</h1><span style="color:var(--ink-2)">${MADE} препаратов в производстве · ${REG} в регистрации · по каталогу продукции Sharq Darmon</span></div>
      <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-outline" type="button" data-xlsx>${icon('download')}Скачать таблицу (CSV)</button><a class="btn btn-primary" href="assets/sharq-darmon-catalog.pdf" target="_blank" rel="noopener">${icon('file')}Каталог, PDF</a></div></div>
    <div class="toolbar"><div class="search" style="flex:0 1 340px;height:44px;border-width:1px;border-color:var(--line-2)">${icon('search')}<label class="sr-only" for="pl-q">Найти в перечне</label><input id="pl-q" type="search" placeholder="Название или действующее вещество" value="${esc(pl.q)}"></div>
      ${[['all', `Все · ${D.products.length}`], ['made', `В производстве · ${MADE}`], ['reg', `В регистрации · ${REG}`]].map(([k, t]) => `<button class="chip" type="button" data-plf="${k}" aria-pressed="${pl.f === k}">${pl.f === k ? icon('check') : ''}${t}</button>`).join('')}</div>
    <div class="table-wrap"><table class="price-table"><thead><tr><th>№</th><th>Наименование</th><th>Форма выпуска</th><th>Действующее вещество</th><th>Статус</th></tr></thead><tbody id="pl-body">${priceRows().html}</tbody></table></div>
    <div class="alert" role="note" style="margin:24px 0 72px">${icon('phone')}<div><b>Аптекам и дистрибьюторам</b><p>Цены и условия поставки — в отделе продаж: +998 78 888 70 00, sharq-darmon@mail.ru.</p></div></div></div>`;

  /* ---------- layout ---------- */
  function shell() {
    document.body.insertAdjacentHTML('afterbegin', `
      <a class="sr-only" href="#main">К содержимому</a>
      <div class="utility"><div class="wrap">
        <div class="grow">${icon('factory')}<span>Фармацевтический завод Sharq Darmon · Ташкент</span></div>
        <a class="hide-sm" href="#/promo">Акции</a><a class="hide-sm" href="#/news">Новости</a><a class="hide-sm" href="#/price-list">Перечень продукции</a><a class="hide-sm" href="#/about">О Нас</a><a class="hide-sm" href="#/contacts">Контакты</a>
        <span class="phone">${icon('phone')}+998 78 888 70 00</span>
        <div class="lang" role="group" aria-label="Язык">${[['ru', 'RU'], ['uz', 'UZ'], ['en', 'EN']].map(([k, t]) => `<button type="button" data-lang="${k}" aria-pressed="${LANG === k}" lang="${k}">${t}</button>`).join('')}</div>
      </div></div>
      <header class="header" id="header"><div class="wrap">
        <a class="logo" href="#/" aria-label="Sharq Darmon — на главную"><img src="/assets/logo.png" alt="Sharq Darmon"></a>
        <button class="catalog-btn" type="button" data-mega aria-expanded="false">${icon('menu')}<span>Каталог</span></button>
        <form class="search" role="search" id="search-form" autocomplete="off">${icon('search')}<label class="sr-only" for="search">Поиск</label><input id="search" type="search" placeholder="Название препарата, действующее вещество или симптом" aria-autocomplete="list" aria-controls="suggest"><button type="submit">Найти</button><div class="suggest" id="suggest" role="listbox" hidden></div></form>
        <nav class="actions" aria-label="Быстрые ссылки">
          <a href="#/price-list">${icon('file')}<span>Продукция</span></a>
          <a href="#/contacts">${icon('phone')}<span>Контакты</span></a>
        </nav>
        ${S.botReady ? `<a class="bot-btn" href="${esc(D.bot)}${D.bot.includes('?') ? '&' : '?'}lang=${LANG === 'uz' ? 'uz' : 'ru'}" target="_blank" rel="noopener" aria-label="Заказ через Telegram-бот">${icon('send')}<span>Заказ через бот</span></a>`
          : `<button class="bot-btn" type="button" data-botsoon aria-label="Заказ через Telegram-бот">${icon('send')}<span>Заказ через бот</span></button>`}
      </div>
      <div class="megamenu" id="mega" hidden><div class="wrap">${D.categories.map(c => `<a href="#/catalog/${c.id}"><span class="ibox">${icon(c.icon)}</span><span><b style="font-weight:500">${c.name}</b><br><small style="color:var(--muted-2)">${c.examples}</small></span></a>`).join('')}<a href="#/catalog"><span class="ibox">${icon('box')}</span><b style="font-weight:500">Весь каталог</b></a><a href="#/price-list"><span class="ibox">${icon('file')}</span><b style="font-weight:500">Перечень продукции</b></a><a href="#/promo"><span class="ibox">${icon('checkCircle')}</span><b style="font-weight:500">Акции</b></a><a href="#/news"><span class="ibox">${icon('info')}</span><b style="font-weight:500">Новости</b></a></div></div>
      </header>
      <main id="main" tabindex="-1"></main>
      <footer class="footer"><div class="wrap"><div class="cols">
        <div class="about"><a class="flogo" href="#/" aria-label="Sharq Darmon"><img src="/assets/logo.png" alt="Sharq Darmon"></a>
          <p>Фармацевтический завод в Ташкенте. Собственное производство лекарственных средств по стандартам GMP.</p>
          <div class="contacts"><div>${icon('phone')}<span>+998 78 888 70 00</span></div><div>${icon('mail')}<span>sharq-darmon@mail.ru</span></div><div>${icon('pin')}<span>Ташкент, Бектемирский район, ул. Х. Байкаро, 27 А</span></div></div></div>
        ${D.footer.map(([h, items]) => `<nav aria-label="${h}"><h4>${h}</h4><ul>${items.map(([t, u]) => `<li><a href="${u}">${t}</a></li>`).join('')}</ul></nav>`).join('')}
      </div><div class="bottom"><span>© 2026 ООО «Sharq Darmon»</span><span>Имеются противопоказания. Перед применением проконсультируйтесь со специалистом.</span>${S.license ? `<span class="lic">${esc(S.license)}</span>` : ''}</div></div></footer>`);
  }

  /* ---------- overlays ---------- */
  function toast(msg) {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.innerHTML = icon('checkCircle') + `<span>${esc(msg)}</span>`;
    t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2400);
  }
  let lastFocus = null;
  function overlay(html, label) {
    closeOverlay(true);
    lastFocus = document.activeElement;
    document.body.insertAdjacentHTML('beforeend', `<div class="scrim" data-close></div>${html}`);
    const box = $('.drawer, .modal');
    box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', label);
    document.body.style.overflow = 'hidden';
    (box.querySelector('[autofocus]') || box.querySelector('button, a, input'))?.focus();
  }
  function closeOverlay(silent) {
    $$('.scrim, .drawer, .modal').forEach(e => e.remove());
    document.body.style.overflow = '';
    if (!silent && lastFocus) lastFocus.focus?.();
  }
  // Telegram ordering is not live yet: show "coming soon" + how to reach an operator.
  function botModal() {
    const SALES = S.phoneSales || '+998 77 001 71 23', tel = p => `tel:+${String(p).replace(/\D/g, '')}`;
    overlay(`<div class="modal bot-modal"><header><h2>Заказ через Telegram-бот</h2><button class="x" type="button" data-close aria-label="Закрыть">${icon('x')}</button></header>
      <div class="body"><div class="bot-soon"><span class="ibox">${icon('send')}</span><div><span class="pill pill-promo">Скоро</span><p>Заказ через Telegram-бот скоро появится. Пока оформить заказ поможет оператор.</p></div></div>
        <b class="bot-ops-title">Связаться с оператором</b>
        <div class="bot-ops">
          <a class="btn btn-primary btn-block" href="${tel(PHONE)}">${icon('phone')}${esc(PHONE)}</a><small>Колл-центр</small>
          <a class="btn btn-outline btn-block" href="${tel(SALES)}">${icon('phone')}${esc(SALES)}</a><small>Отдел продаж — аптекам и оптовым покупателям</small>
          <a class="btn btn-outline btn-block" href="#/contacts" data-close>${icon('mail')}Задать вопрос на сайте</a>
        </div></div></div>`, 'Заказ через Telegram-бот');
  }
  function applyModal(title, kind) {
    overlay(`<div class="modal"><header><h2>${kind === 'project' ? 'Обсудить проект' : 'Отклик на вакансию'}</h2><button class="x" type="button" data-close aria-label="Закрыть">${icon('x')}</button></header>
      <form data-form="apply" novalidate><div class="body" style="display:flex;flex-direction:column;gap:14px"><span>${esc(title)}</span>
        <div class="field"><label for="a-name">Имя <i>*</i></label><input id="a-name" name="name" required autofocus></div>
        <div class="field"><label for="a-phone">Телефон <i>*</i></label><input id="a-phone" name="phone" type="tel" placeholder="+998 __ ___ __ __" required data-phone></div>
        ${kind === 'project' ? '<div class="field"><label for="a-msg">Коротко о продукте</label><textarea id="a-msg" style="min-height:80px"></textarea></div>' : '<div class="field"><label for="a-region">Регион</label><input id="a-region" placeholder="Например, Самаркандская область"></div>'}
      </div><footer><button class="btn btn-outline btn-sm" type="button" data-close>Отмена</button><button class="btn btn-primary btn-sm" type="submit">Отправить</button></footer></form></div>`, title);
  }

  /* ---------- router ---------- */
  const OLD_PILLS = { '6-aciklovir-sd-200-mg': 'acyclovir', '7-bisorol-5-ml': 'bisorol', '8-diklofenak-sd': 'diklofenak', '10-kardio-mig-sd': 'kardiomig', '12-cipro-sd': 'cipro', '13-loperamid-sd': 'loperamid', '14-zitro-sd': 'azitromicin', '15-cena-mig': 'senamig', '16-tri-mig': 'trimig', '17-flustop': 'flustop', '18-cetirizin-sd': 'cetirizin', '42-ekstraprost-sd': 'ekstraprost', '48-adelfan-sd': 'adelfan', '49-amitriptilin-sd': 'amitriptilin', '50-ammarilin-sd': 'ammarilin', '52-gepvir': 'gepvir', '54-diabetomig-sd': 'diabetomig', '55-zoksomig-sd': 'zoksomig', '56-albendazol-sd': 'albendazol', '58-yodomig-sd': 'yodomig', '59-kamagramig-sd': 'kamagramig', '61-lozamig-sd': 'lozamig', '62-magniy-b6': 'magnij', '63-metoklopromid-sd': 'metoklopramid', '64-metfomig-sd': 'metfomig', '65-nimesulid-sd': 'nimesulid', '66-nitopomig-sd': 'nitopomig', '67-nosh-na': 'neoshna', '68-omeprazol-sd-kapsuly': 'omeprazol', '69-pangim-sd': 'neopangam', '71-polimig-sd': 'polimig', '72-prednizalon-sd': 'prednizolon', '73-senadeksin-sd-tabl-10': 'senadeksin', '74-serramig-sd': 'serramig', '75-tenofovir-sd': 'tenofovir', '76-tranba-mig': 'tranba', '77-trihomig-sd': 'trihomig', '78-fenigam': 'fenigam', '79-elitroks-sd': 'eltiroks' };
  const OLD_CATS = { 'protivovirusnoe-sredstvo': 'antiviral', 'protivogripkovoe-sredstvo': 'cold', orz: 'cold', 'otharkivayuschee-sredstvo': 'cold', antibiotiki: 'antibiotics', 'antibakterialnoe-sredstvo': 'antibiotics', 'antiallergicheskoe-sredstvo': 'allergy', 'antiagregantnoe-sredstvo': 'heart', 'antigipertenzivnoe-sredstvo': 'heart', 'protivovospalitelnye-sredstva': 'pain', 'protivovospolitelnoe-sredstvo': 'pain', 'zharoponizhayuschee-sredstvo': 'pain', 'protiv-diarei': 'digestion', slabitelnoe: 'digestion', 'slabitelnoe-sredstvo': 'digestion', 'sredstvo-dlya-lecheniya-erektilnoy-disfunkcii': 'uro', vitaminy: 'vitamins', 'regulyator-kalciya-i-fosfora': 'vitamins' };
  const OLD_PAGES = { 'o-nas.html': 'about', 'kontakty.html': 'contacts', 'career.html': 'career', 'medpredstaviteli.html': 'medreps', 'tabletirovanie.html': 'tabletting', 'kapsulirovanie.html': 'capsulation', 'suppozitorii.html': 'suppository', 'prayslist.html': 'price-list', 'price.xlsx': 'price-list', 'index.html': '', 'rss.xml': '' };
  function legacyPath(p) {
    const seg = p.replace(/^\/+/, '').split('/');
    if (seg[0] === 'pills') { const id = OLD_PILLS[(seg[1] || '').replace(/\.html$/, '')]; return id ? 'product/' + id : 'catalog'; }
    if (OLD_CATS[seg[0]]) return 'catalog/' + OLD_CATS[seg[0]];
    if (seg[0] === 'suppozitorii' && seg[1]) return 'catalog';
    if (seg.length === 1 && seg[0] in OLD_PAGES) return OLD_PAGES[seg[0]];
    if (/^20\d\d$/.test(seg[0])) return 'news';
    if (seg[0] === 'index.php') return /do=feedback/.test(location.search) ? 'feedback' : '';
    return null;
  }
  { const lp = !BASE && legacyPath(location.pathname); if (lp != null && lp !== false) location.replace('/' + (lp ? lp.replace(/\/$/, '') + '/' : '')); }
  function route() {
    let p = location.pathname.replace(/index\.html$/, '');
    if (BASE && (p === BASE || p.startsWith(BASE + '/'))) p = p.slice(BASE.length);
    const h = p.replace(/^\/+|\/+$/g, '');
    const [name, ...rest] = h.split('/');
    const arg = rest.join('/');
    if (!name) return { name: 'home' };
    if (name === 'catalog' && arg) return { name: 'category', arg };
    return { name, arg };
  }
  const TITLES = { home: 'Sharq Darmon — фармацевтический завод в Ташкенте, производство лекарств', catalog: 'Каталог препаратов', category: 'Каталог', search: 'Поиск', product: 'Препарат', about: 'О компании', contacts: 'Контакты', feedback: 'Обратная связь', career: 'Карьера', medreps: 'Медицинские и торговые представители', tabletting: 'Таблетки — контрактное производство', capsulation: 'Капсулы — контрактное производство', sachet: 'Саше — контрактное производство', suppository: 'Суппозитории — контрактное производство', video: 'Видео о заводе', news: 'Новости', promo: 'Акции', 'price-list': 'Перечень продукции' };
  V.notfound = () => `<div class="wrap" style="padding:72px 0 96px;text-align:center"><div class="page-title"><h1>Страница не найдена</h1></div>
    <p style="color:var(--muted);margin:12px auto 28px;max-width:520px">Возможно, ссылка устарела. Начните с главной или каталога.</p>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a class="btn btn-primary" href="#/">На главную</a><a class="btn btn-outline" href="#/catalog">Каталог</a></div></div>`;

  /* ---------- head: title, description, canonical, hreflang, Open Graph, JSON-LD ---------- */
  const tr = s => (window.SD_I18N ? window.SD_I18N.tr(s) : s);
  const DESC_ALL = {
    ru: {
      home: 'Sharq Darmon (Шарк Дармон) — фармацевтический завод в Ташкенте: производство лекарств по стандартам GMP. Каталог препаратов для аптек и дистрибьюторов, контрактное производство.',
      catalog: 'Каталог препаратов Sharq Darmon: противовирусные, антибиотики, обезболивающие, сердечно-сосудистые, витамины и другие лекарства производства Узбекистана.',
      about: 'Sharq Darmon — фармацевтический завод в Бектемирском районе Ташкента. Производство по стандартам GMP, сертификаты, история компании.',
      contacts: 'Контакты Sharq Darmon: Ташкент, Бектемирский район, ул. Хусейна Байкары, 27А. Телефон +998 78 888 70 00, контрактное производство +998 77 001 71 23.',
      feedback: 'Обратная связь с фармацевтическим заводом Sharq Darmon: вопросы о препаратах, сотрудничестве и качестве продукции.',
      career: 'Вакансии Sharq Darmon: медицинские и торговые представители во всех регионах Узбекистана.',
      medreps: 'Медицинские и торговые представители Sharq Darmon по регионам Узбекистана — контакты для аптек и клиник.',
      tabletting: 'Контрактное производство таблеток на заводе Sharq Darmon в Ташкенте по стандартам GMP.',
      capsulation: 'Контрактное производство капсул на заводе Sharq Darmon в Ташкенте по стандартам GMP.',
      sachet: 'Контрактное производство саше-пакетов на заводе Sharq Darmon в Ташкенте.',
      suppository: 'Контрактное производство суппозиториев на заводе Sharq Darmon в Ташкенте.',
      news: 'Новости фармацевтического завода Sharq Darmon.',
      promo: 'Акции и специальные предложения Sharq Darmon для аптек и покупателей.',
      'price-list': 'Перечень продукции Sharq Darmon: все препараты, формы выпуска, действующие вещества и статус регистрации.',
    },
    uz: {
      home: 'Sharq Darmon — Toshkentdagi farmatsevtika zavodi: GMP standartlari bo‘yicha dori-darmon ishlab chiqarish. Dorixonalar va distribyutorlar uchun preparatlar katalogi, kontrakt ishlab chiqarish.',
      catalog: 'Sharq Darmon preparatlari katalogi: virusga qarshi, antibiotiklar, og‘riq qoldiruvchi, yurak-qon tomir, vitaminlar va O‘zbekistonda ishlab chiqarilgan boshqa dorilar.',
      about: 'Sharq Darmon — Toshkentning Bektemir tumanidagi farmatsevtika zavodi. GMP standartlari bo‘yicha ishlab chiqarish, sertifikatlar, kompaniya tarixi.',
      contacts: 'Sharq Darmon kontaktlari: Toshkent, Bektemir tumani, Husayn Boyqaro ko‘chasi, 27A. Telefon +998 78 888 70 00, kontrakt ishlab chiqarish +998 77 001 71 23.',
      feedback: 'Sharq Darmon farmatsevtika zavodi bilan aloqa: preparatlar, hamkorlik va mahsulot sifati bo‘yicha savollar.',
      career: 'Sharq Darmon vakansiyalari: O‘zbekistonning barcha hududlarida tibbiy va savdo vakillari.',
      medreps: 'Sharq Darmon tibbiy va savdo vakillari hududlar bo‘yicha — dorixonalar va klinikalar uchun kontaktlar.',
      tabletting: 'Toshkentdagi Sharq Darmon zavodida GMP standartlari bo‘yicha tabletkalarni kontrakt asosida ishlab chiqarish.',
      capsulation: 'Toshkentdagi Sharq Darmon zavodida GMP standartlari bo‘yicha kapsulalarni kontrakt asosida ishlab chiqarish.',
      sachet: 'Toshkentdagi Sharq Darmon zavodida sashe-paketlarni kontrakt asosida ishlab chiqarish.',
      suppository: 'Toshkentdagi Sharq Darmon zavodida suppozitoriylarni kontrakt asosida ishlab chiqarish.',
      news: 'Sharq Darmon farmatsevtika zavodi yangiliklari.',
      promo: 'Sharq Darmon aksiyalari va dorixonalar hamda xaridorlar uchun maxsus takliflar.',
      'price-list': 'Sharq Darmon mahsulotlari ro‘yxati: barcha preparatlar, chiqarilish shakli, ta’sir qiluvchi moddalar va ro‘yxatdan o‘tish holati.',
    },
    en: {
      home: 'Sharq Darmon is a pharmaceutical plant in Tashkent, Uzbekistan: GMP-standard drug manufacturing, a product catalogue for pharmacies and distributors, and contract manufacturing.',
      catalog: 'Sharq Darmon product catalogue: antivirals, antibiotics, painkillers, cardiovascular drugs, vitamins and other medicines made in Uzbekistan.',
      about: 'Sharq Darmon is a pharmaceutical plant in the Bektemir district of Tashkent. GMP-standard production, certificates and company history.',
      contacts: 'Sharq Darmon contacts: 27A Husayn Boyqaro street, Bektemir district, Tashkent. Phone +998 78 888 70 00, contract manufacturing +998 77 001 71 23.',
      feedback: 'Contact the Sharq Darmon pharmaceutical plant: questions about our medicines, partnership and product quality.',
      career: 'Careers at Sharq Darmon: medical and sales representatives in every region of Uzbekistan.',
      medreps: 'Sharq Darmon medical and sales representatives by region of Uzbekistan — contacts for pharmacies and clinics.',
      tabletting: 'Contract tablet manufacturing at the Sharq Darmon GMP plant in Tashkent.',
      capsulation: 'Contract capsule manufacturing at the Sharq Darmon GMP plant in Tashkent.',
      sachet: 'Contract sachet manufacturing at the Sharq Darmon plant in Tashkent.',
      suppository: 'Contract suppository manufacturing at the Sharq Darmon plant in Tashkent.',
      news: 'News from the Sharq Darmon pharmaceutical plant.',
      promo: 'Sharq Darmon promotions and special offers for pharmacies and customers.',
      'price-list': 'Sharq Darmon product list: all medicines, dosage forms, active substances and registration status.',
    },
  };
  const DESC = DESC_ALL[LANG];

  const ORG = { '@type': 'Organization', '@id': SITE + '/#org', name: 'Sharq Darmon', alternateName: ['Шарк Дармон', 'Шарқ Дармон', 'ООО «Sharq Darmon»', 'Sharq Darmon MChJ'], url: SITE + '/', logo: SITE + '/assets/logo.png',
    telephone: '+998788887000', email: 'sharq-darmon@mail.ru',
    address: { '@type': 'PostalAddress', streetAddress: 'ул. Хусейна Байкары, 27А', addressLocality: 'Ташкент', addressRegion: 'Бектемирский район', addressCountry: 'UZ' },
    contactPoint: [{ '@type': 'ContactPoint', telephone: '+998788887000', contactType: 'customer service', areaServed: 'UZ', availableLanguage: ['ru', 'uz', 'en'] },
      { '@type': 'ContactPoint', telephone: '+998770017123', contactType: 'sales', name: 'Контрактное производство' }] };
  function headTag(sel, make) { let el = document.head.querySelector(sel); if (!el) { el = make(); document.head.appendChild(el); } return el; }
  const meta = (attr, key, val) => headTag(`meta[${attr}="${key}"]`, () => { const m = document.createElement('meta'); m.setAttribute(attr, key); return m; }).setAttribute('content', val);
  const clip = (t, n = 160) => { t = String(t).replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n - 1).replace(/[\s,.;:—-]+\S*$/, '') + '…' : t; };
  function setHead(r, title) {
    const p = r.name === 'product' ? P[r.arg] : null, c = r.name === 'category' ? CAT[r.arg] : null;
    const nw = r.name === 'news' && r.arg ? NEWS.find(x => x.id === r.arg) : null;
    const ok = (r.name === 'home' || (DESC[r.name] && !['search'].includes(r.name)) || p || c || r.name === 'catalog') && !(r.name === 'news' && r.arg && !nw);
    const rest = r.name === 'home' ? '' : r.name === 'category' ? 'catalog/' + r.arg : r.arg ? r.name + '/' + r.arg : r.name;
    const url = l => SITE + toPath(rest, LBASE(l));
    let desc = DESC[r.name] || DESC.home;
    if (nw) desc = String(L(nw.text) || L(nw.title));
    else if (p) {
      desc = `${p.name}${p.inn ? ' (' + p.inn + ')' : ''} — ${p.meta}. ${p.use || p.props || ''}`;
      if (desc.length < 120) desc += { ru: ' Производитель — Sharq Darmon, Ташкент.', uz: ' Ishlab chiqaruvchi — Sharq Darmon, Toshkent.', en: ' Manufacturer: Sharq Darmon, Tashkent.' }[LANG];
      if (p.reg && desc.length < 150) desc += { ru: ' Проходит государственную регистрацию.', uz: ' Davlat ro‘yxatidan o‘tmoqda.', en: ' Currently in state registration.' }[LANG];
    }
    else if (c) desc = `${tr(c.name)}: ${D.products.filter(x => x.cat === c.id).map(x => x.name).slice(0, 8).join(', ')} — ${DESC.catalog}`;
    desc = clip(desc);
    document.documentElement.lang = LANG;
    meta('name', 'description', desc);
    meta('name', 'robots', ok ? 'index, follow' : 'noindex, follow');
    headTag('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' })).href = url(LANG);
    for (const l of ['ru', 'uz', 'en', 'x-default']) headTag(`link[rel="alternate"][hreflang="${l}"]`, () => { const a = document.createElement('link'); a.rel = 'alternate'; a.hreflang = l; return a; }).href = url(l === 'x-default' ? 'ru' : l);
    meta('property', 'og:type', p ? 'product' : 'website');
    meta('property', 'og:site_name', 'Sharq Darmon');
    meta('property', 'og:title', title);
    meta('property', 'og:description', desc);
    meta('property', 'og:url', url(LANG));
    const ogImg = (p && p.img) || (nw && nw.img) || 'hero-lab.jpg';
    meta('property', 'og:image', /^https?:/.test(ogImg) ? ogImg : SITE + src(ogImg));
    meta('property', 'og:locale', { ru: 'ru_RU', uz: 'uz_UZ', en: 'en_US' }[LANG]);
    meta('name', 'twitter:card', 'summary_large_image');
    const ld = [ORG];
    if (r.name === 'home') ld.push({ '@type': 'WebSite', name: 'Sharq Darmon', url: SITE + '/', inLanguage: LANG, publisher: { '@id': SITE + '/#org' } });
    if (r.name === 'contacts') ld.push({ '@type': 'LocalBusiness', name: 'Sharq Darmon', image: SITE + '/assets/hero-lab.jpg', telephone: ORG.telephone, address: ORG.address,
      geo: { '@type': 'GeoCoordinates', latitude: 41.243281, longitude: 69.350802 }, openingHours: 'Mo-Sa 09:00-18:00', parentOrganization: { '@id': SITE + '/#org' } });
    if (p) ld.push({ '@type': 'Drug', name: p.name, url: url(LANG), description: desc, image: p.img ? SITE + src(p.img) : undefined,
      activeIngredient: p.inn || undefined, dosageForm: p.meta || undefined, drugClass: p.group || undefined, manufacturer: { '@id': SITE + '/#org' } });
    if (nw) ld.push({ '@type': 'NewsArticle', headline: L(nw.title), datePublished: nw.date, image: nw.img ? SITE + src(nw.img) : undefined, inLanguage: LANG, publisher: { '@id': SITE + '/#org' }, mainEntityOfPage: url(LANG) });
    if (p || c) ld.push({ '@type': 'BreadcrumbList', itemListElement: [[tr('Главная'), ''], [tr('Каталог'), 'catalog'], ...(p ? [[CAT[p.cat] ? CAT[p.cat].name : '', 'catalog/' + p.cat], [p.name, rest]] : [[c.name, rest]])]
      .map(([n, h], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE + toPath(h) })) });
    headTag('script#ld', () => Object.assign(document.createElement('script'), { id: 'ld', type: 'application/ld+json' })).textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': ld });
  }

  function render() {
    const r = route();
    const view = V[r.name] || V.notfound;
    const main = $('#main');
    main.innerHTML = view(r.arg);
    const nw = r.name === 'news' && r.arg ? NEWS.find(x => x.id === r.arg) : null;
    const sub = nw ? L(nw.title) : r.name === 'product' && P[r.arg] ? P[r.arg].name : r.name === 'category' && CAT[r.arg] ? CAT[r.arg].name : TITLES[r.name];
    const PT = { ru: 'инструкция, показания', uz: 'yo‘riqnoma, qo‘llanilishi', en: 'uses and dosage' };
    document.title = r.name === 'home' ? TITLES.home : r.name === 'product' && P[r.arg] ? `${P[r.arg].name} — ${PT[LANG]} | Sharq Darmon` : `${sub || 'Страница не найдена'} — Sharq Darmon`;
    setHead(V[r.name] ? r : { name: 'notfound' }, tr(document.title));
    if (r.name !== 'search') { const s = $('#search'); if (s && document.activeElement !== s) s.value = ''; }
  }
  function go(path) { if (path !== location.pathname + location.search) history.pushState(null, '', path); onNav(); }
  // Internal links: no page reload, real URL in the address bar.
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target || a.hasAttribute('download')) return;
    const href = a.getAttribute('href');
    if (!href.startsWith('/') || href.startsWith('//') || href.startsWith('/assets/') || /\.[a-z0-9]+$/i.test(href)) return;
    e.preventDefault(); go(href);
  });
  // Templates still write '#/route'; turn every such link into a real path.
  const fixLinks = root => root.querySelectorAll && root.querySelectorAll('a[href^="#/"]').forEach(a => a.setAttribute('href', toPath(a.getAttribute('href'))));
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType === 1) { if (n.matches('a[href^="#/"]')) n.setAttribute('href', toPath(n.getAttribute('href'))); fixLinks(n); } }))).observe(document.body, { childList: true, subtree: true });
  window.addEventListener('popstate', () => onNav(true));
  function onNav(back) { closeOverlay(true); $('#mega').hidden = true; render(); if (!back) window.scrollTo({ top: 0, behavior: 'instant' }); $('#main').focus({ preventScroll: true }); }

  /* ---------- events ---------- */
  document.addEventListener('click', e => {
    const t = e.target.closest('button, a, [data-close]');
    if (!t) { if (!e.target.closest('#search-form')) $('#suggest').hidden = true; if (!e.target.closest('.header')) { $('#mega').hidden = true; $('[data-mega]').setAttribute('aria-expanded', 'false'); } return; }
    const d = t.dataset;
    if ('close' in d) { closeOverlay(); return; }
    if ('mega' in d) { const m = $('#mega'); m.hidden = !m.hidden; t.setAttribute('aria-expanded', !m.hidden); return; }
    if (d.thumb) { const p = P[route().arg]; $$('[data-thumb]').forEach(b => b.setAttribute('aria-current', b === t)); $('#pdp-main').innerHTML = `<img src="${src(p.img)}" alt="${esc(p.name)}" style="${t.querySelector('img').getAttribute('style')}">`; return; }
    if (d.pdptab) { $$('[data-pdptab]').forEach(b => b.setAttribute('aria-selected', b === t)); $('#pdp-tab').innerHTML = pdpTab(P[route().arg], d.pdptab); return; }
        if (d.hometab) {
      $$('[data-hometab]').forEach(b => b.setAttribute('aria-selected', b === t));
      const list = d.hometab === 'pop' ? HOME_POP.map(id => P[id]) : D.products.filter(p => p.reg).slice(0, 8);
      $('#home-grid').innerHTML = grid(list); return;
    }
    if (d.unfilter) { const [g, v] = d.unfilter.split(':'); filt[g].delete(v); filt.page = 1; refreshCatalog(); return; }
    if ('resetFilters' in d) { ['cats', 'stock', 'forms'].forEach(g => filt[g].clear()); filt.page = 1; refreshCatalog(); return; }
    if (d.page) { filt.page = +d.page; refreshCatalog(); $('#catalog-body').scrollIntoView({ behavior: 'smooth' }); return; }
    if ('toggleFilters' in d) { $('#filters').classList.toggle('open'); return; }
    if (d.plf) { pl.f = d.plf; render(); return; }
    if ('xlsx' in d) { downloadCsv(); return; }
    if ('botsoon' in d) { botModal(); return; }
    if (d.apply) { applyModal(d.apply, d.kind); return; }
    if (d.lang) { if (d.lang !== LANG) { try { localStorage.setItem('sd:lang', d.lang); } catch {} const r = location.pathname.slice(BASE.length).replace(/^\/+/, ''); location.href = LBASE(d.lang) + '/' + r + location.search; } return; }
  });

  document.addEventListener('change', e => {
    const t = e.target;
    if (t.dataset.filter) { const [g, v] = t.dataset.filter.split(':'); t.checked ? filt[g].add(v) : filt[g].delete(v); filt.page = 1; refreshCatalog(); }
    if ('sort' in t.dataset) { filt.sort = t.value; refreshCatalog(); }
    if (t.name === 'delivery') {
      $$('.choice label').forEach(l => { const r = l.querySelector('input[name=delivery]'); l.querySelector('.check input').checked = r.checked; });
      const pick = t.value === 'pickup';
      $('#addr').hidden = pick; $('#c-addr').required = !pick; $('#ship-label').textContent = pick ? 'Самовывоз с завода' : 'Доставка курьером';
    }
    if (t.id === 'f-file') { const f = t.files[0]; if (f) $('#file-label').textContent = f.size > 10e6 ? 'Файл больше 10 МБ — выберите другой' : f.name; }
  });

  /* search with suggestions */
  let sel = -1;
  document.addEventListener('input', e => {
    const t = e.target;
    if (t.id === 'search') {
      const list = searchList(t.value).slice(0, 6); sel = -1;
      const box = $('#suggest');
      box.hidden = !list.length || !t.value.trim();
      box.innerHTML = list.map(p => `<a href="#/product/${p.id}" role="option">${p.img ? `<img src="/assets/${p.img}" alt="">` : `<span class="ph"></span>`}<span><b>${esc(p.name)}</b><small>${esc(p.inn)}</small></span><span class="price" style="font-weight:400;color:var(--muted-2);font-size:12.5px">${p.reg ? 'В регистрации' : esc(D.forms[p.form])}</span></a>`).join('');
    }
    if (t.id === 'pl-q') { pl.q = t.value; refreshPrice(); }
    if (t.id === 'f-msg') $('#f-count').textContent = `${t.value.length} / 1000 символов`;
    if ('phone' in t.dataset) {
      const dgt = t.value.replace(/\D/g, '').replace(/^998/, '').slice(0, 9);
      const parts = [dgt.slice(0, 2), dgt.slice(2, 5), dgt.slice(5, 7), dgt.slice(7, 9)].filter(Boolean);
      t.value = '+998 ' + parts.join(' ');
      const f = t.closest('.field'); f.classList.toggle('valid', dgt.length === 9); f.classList.remove('invalid');
      const h = f.querySelector('.hint'); if (h && dgt.length === 9) h.textContent = 'Номер подтверждён';
    }
    if (t.closest('.field.invalid') && t.value.trim()) t.closest('.field').classList.remove('invalid');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeOverlay(); $('#suggest').hidden = true; $('#mega').hidden = true; }
    if (e.target.id === 'search' && !$('#suggest').hidden && ['ArrowDown', 'ArrowUp'].includes(e.key)) {
      e.preventDefault(); const items = $$('#suggest a'); sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items.forEach((a, i) => a.classList.toggle('active', i === sel));
    }
    if (e.key === 'Tab' && $('.drawer, .modal')) {
      const f = $$('.drawer button, .drawer a, .modal button, .modal a, .modal input, .modal textarea').filter(x => x.offsetParent);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
      else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
    }
  });
  document.addEventListener('dragover', e => { const z = e.target.closest('.dropzone'); if (z) { e.preventDefault(); z.classList.add('drag'); } });
  document.addEventListener('dragleave', e => { e.target.closest?.('.dropzone')?.classList.remove('drag'); });
  document.addEventListener('drop', e => { const z = e.target.closest('.dropzone'); if (!z) return; e.preventDefault(); z.classList.remove('drag'); const f = e.dataTransfer.files[0]; if (f) $('#file-label').textContent = f.name; });

  function validate(form) {
    let ok = true;
    $$('[required]', form).forEach(i => {
      if (i.closest('[hidden]')) return;
      const bad = i.type === 'checkbox' ? !i.checked : 'phone' in i.dataset ? i.value.replace(/\D/g, '').length !== 12 : !i.value.trim();
      const f = i.closest('.field'); if (f) { f.classList.toggle('invalid', bad); const h = f.querySelector('.hint'); if (h && bad) h.textContent = 'phone' in i.dataset ? 'Введите номер полностью: +998 90 123 45 67' : 'Заполните это поле'; }
      if (bad && ok) { i.focus(); ok = false; }
    });
    return ok;
  }
  document.addEventListener('submit', e => {
    const f = e.target; e.preventDefault();
    if (f.id === 'search-form') {
      const q = $('#search').value.trim(); $('#suggest').hidden = true;
      const items = $$('#suggest a'); if (sel >= 0 && items[sel]) { go(items[sel].getAttribute('href')); return; }
      if (q) go(toPath('search/' + encodeURIComponent(q))); return;
    }
    if (!validate(f)) return;
    const kind = f.dataset.form;
    const val = q => { const el = f.querySelector(q); return el ? el.value.trim() : ''; };
    const payload = {
      kind: kind === 'apply' ? (f.querySelector('#a-msg') ? 'project' : 'apply') : kind,
      name: val('[name=name]'), phone: val('[name=phone]') || val('[name=contact]'),
      topic: val('[name=topic]') || (kind === 'apply' ? (f.querySelector('.body > span') || {}).textContent || '' : ''),
      msg: [val('textarea'), val('#a-region') && 'Регион: ' + val('#a-region')].filter(Boolean).join('\n'),
      page: location.href, lang: LANG,
    };
    const btn = f.querySelector('[type=submit]'); if (btn) btn.disabled = true;
    fetch(API + '/api/form', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(r => { if (!r.ok) throw new Error(); afterSend(f, kind); })
      .catch(() => toast(`Не удалось отправить. Позвоните нам: ${PHONE}`))
      .finally(() => { if (btn) btn.disabled = false; });
  });
  function afterSend(f, kind) {
    if (kind === 'apply') { closeOverlay(); toast('Заявка отправлена — мы перезвоним в рабочее время'); return; }
    f.reset(); $$('.field', f).forEach(x => x.classList.remove('valid', 'invalid'));
    if ($('#f-count')) $('#f-count').textContent = '0 / 1000 символов';
    if ($('#file-label')) $('#file-label').textContent = 'Прикрепить файл';
    toast(kind === 'feedback' ? 'Сообщение отправлено — ответим в течение рабочего дня' : 'Вопрос отправлен — перезвоним в рабочее время');
  }

  function downloadCsv() {
    const rows = [['№', 'Наименование', 'Форма выпуска', 'Действующее вещество', 'Группа', 'Статус'], ...D.products.map((p, i) => [i + 1, p.name, p.meta, p.inn, p.group || CAT[p.cat].name, p.reg ? 'В регистрации' : 'В производстве'])];
    const csv = '﻿' + rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(';')).join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); a.download = 'sharq-darmon-produkciya.csv'; a.click();
    toast('Таблица скачивается');
  }

  /* promotions slider: arrows, dots, swipe (native scroll-snap) and autoplay */
  const slideTo = (sl, i) => { const tr = sl.querySelector('.pslider-track'), n = tr.children.length; i = (i + n) % n; tr.scrollTo({ left: i * tr.clientWidth, behavior: 'smooth' }); };
  const slideIdx = sl => { const tr = sl.querySelector('.pslider-track'); return Math.round(tr.scrollLeft / Math.max(1, tr.clientWidth)); };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-slide], [data-dot]'); if (!b) return;
    const sl = b.closest('[data-slider]'); if (!sl) return;
    sl.dataset.touched = Date.now();
    slideTo(sl, b.dataset.dot != null ? +b.dataset.dot : slideIdx(sl) + +b.dataset.slide);
  });
  document.addEventListener('scroll', e => {
    const tr = e.target.classList && e.target.classList.contains('pslider-track') ? e.target : null; if (!tr) return;
    const i = Math.round(tr.scrollLeft / Math.max(1, tr.clientWidth));
    tr.parentElement.querySelectorAll('[data-dot]').forEach((d, k) => d.setAttribute('aria-current', k === i));
  }, true);
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(() => {
    const sl = $('[data-slider]'); if (!sl || document.hidden || sl.matches(':hover') || Date.now() - (+sl.dataset.touched || 0) < 8000) return;
    if (sl.querySelector('.pslider-track').children.length > 1) slideTo(sl, slideIdx(sl) + 1);
  }, 6000);

  window.addEventListener('scroll', () => $('#header').classList.toggle('scrolled', scrollY > 40), { passive: true });

  document.querySelectorAll('body > :not(script)').forEach(n => n.remove());
  shell();
  fixLinks(document);
  render();
})();

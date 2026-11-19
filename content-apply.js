// Turns the content saved in the admin panel (window.SD_CONTENT from /api/content.js)
// into the globals the site already uses: SD.*, SD_CATALOG, SD_CATALOG_UZ/EN, SD_TEXTS.
// Without content (function unavailable) the static data.js / catalog*.js stay in place.
(function () {
  const C = window.SD_CONTENT;
  if (!C || !Array.isArray(C.products)) return;
  const SD = window.SD;
  const texts = {};
  for (const [k, v] of Object.entries(C.texts || {})) texts[k] = Object.assign({}, v);
  const addT = o => { if (o && o.ru) { const t = (texts[o.ru] = texts[o.ru] || {}); if (o.uz) t.uz = t.uz || o.uz; if (o.en) t.en = t.en || o.en; } };

  SD.categories = C.categories.map(c => { addT(c.name); addT(c.short); return { id: c.id, icon: c.icon || 'pill', name: c.name.ru, short: (c.short && c.short.ru) || undefined }; });
  const cats = new Set(SD.categories.map(c => c.id));
  const UZ = {}, EN = {};
  window.SD_CATALOG = C.products.filter(p => !p.hidden && cats.has(p.cat) && p.ru && p.ru.name).map((p, i) => {
    const r = p.ru;
    for (const [l, M] of [['uz', UZ], ['en', EN]]) {
      const t = p[l] || {}, o = {};
      for (const k of ['name', 'meta', 'group', 'inn', 'props', 'use', 'dose', 'orig', 'analog']) if (t[k]) o[k] = t[k];
      M[p.id] = o;
    }
    const o = { id: p.id, name: r.name, page: p.page || i + 1, meta: r.meta || '', inn: r.inn || '', cat: p.cat, form: p.form || 'tablets', img: p.img || '' };
    for (const k of ['group', 'props', 'use', 'dose', 'orig', 'analog']) if (r[k]) o[k] = r[k];
    if (p.dist) o.dist = true; else if (p.reg) o.reg = true; else if (p.stock) o.stock = true;
    if (p.popular) o.popular = true;
    return o;
  });
  window.SD_CATALOG_UZ = UZ;
  window.SD_CATALOG_EN = EN;

  const s = (SD.settings = C.settings || {});
  if (s.bot) SD.bot = s.bot;
  if (Array.isArray(C.partners)) SD.partners = C.partners.filter(x => x.img).map(x => [x.name, x.img]);
  if (Array.isArray(C.clients)) SD.clients = C.clients.filter(x => x.img).map(x => [x.name, x.img]);
  const today = new Date().toISOString().slice(0, 10);
  SD.promos = (C.promos || []).filter(x => x.active !== false && (!x.until || x.until >= today) && x.title && x.title.ru);
  SD.news = (C.news || []).filter(x => x.published !== false && x.title && x.title.ru).sort((a, b) => String(b.date).localeCompare(String(a.date)));
  window.SD_TEXTS = texts;
  // Phones / e-mail changed in the admin panel replace the old ones in every text on the site.
  window.SD_CONTACT_SWAP = [['+998 78 888 70 00', s.phone], ['+998 77 001 71 23', s.phoneSales], ['+998 97 758 02 22', s.phoneContract], ['sharq-darmon@mail.ru', s.email]].filter(([a, b]) => b && b !== a);
})();

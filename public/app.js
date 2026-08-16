// ══════════════════ DEMO DATA (used by "See the demo" — untouched from the original prototype) ══════════════════
const TRIPS_DEMO = {
  colombia2024: { label: "Colombia '24", color: '#e8520a', emoji: '🇨🇴' },
  colombia2025: { label: "Colombia '25", color: '#7c3aed', emoji: '🇨🇴' },
  yosemite2023: { label: "Yosemite '23", color: '#16a34a', emoji: '🏕️' },
};
const CATS = {
  food:         { icon: '🍽️', label: 'Food',      color: '#e8520a' },
  nature:       { icon: '🌿', label: 'Nature',    color: '#16a34a' },
  culture:      { icon: '🏛️', label: 'Culture',   color: '#7c3aed' },
  market:       { icon: '🛍️', label: 'Market',    color: '#f59e0b' },
  nightlife:    { icon: '🎵', label: 'Nightlife', color: '#ec4899' },
  activity:     { icon: '🚲', label: 'Activity',  color: '#0ea5e9' },
  stay:         { icon: '🏨', label: 'Stay',      color: '#64748b' },
  transport:    { icon: '✈️', label: 'Transport', color: '#94a3b8' },
  neighborhood: { icon: '🏘️', label: 'Area',      color: '#a78bfa' },
};
const PLACES_DEMO = [
  { id:1,  trip:'colombia2024', name:'Fossetta',                    cat:'food',         lat:40.7282, lng:-73.9942, note:'NYC (pre-trip research)' },
  { id:2,  trip:'colombia2024', name:'Sarajevo Grill',              cat:'food',         lat:40.7580, lng:-73.9957, note:'NYC (pre-trip research)' },
  { id:3,  trip:'colombia2024', name:'Jongro BBQ',                  cat:'food',         lat:40.7503, lng:-73.9895, note:'NYC (pre-trip research)' },
  { id:4,  trip:'colombia2024', name:'Ábaco Libros y Café',         cat:'food',         lat:10.4238, lng:-75.5471, note:'' },
  { id:5,  trip:'colombia2024', name:'Torre Fuerte',                cat:'culture',      lat:10.4267, lng:-75.5416, note:'' },
  { id:6,  trip:'colombia2024', name:'Soloio Cafe',                 cat:'food',         lat:10.4228, lng:-75.5478, note:'' },
  { id:7,  trip:'colombia2024', name:'Cabo San Juan del Guia',      cat:'nature',       lat:11.3244, lng:-74.0294, note:'' },
  { id:8,  trip:'colombia2024', name:'Tayrona Park Entrance',       cat:'nature',       lat:11.3070, lng:-74.0369, note:'' },
  { id:9,  trip:'colombia2024', name:'El Totumo',                   cat:'nature',       lat:10.7043, lng:-75.2584, note:'Volcanic mud bath' },
  { id:10, trip:'colombia2024', name:'Gaelia Beach',                cat:'nature',       lat:10.3800, lng:-75.5100, note:'' },
  { id:11, trip:'colombia2024', name:'Cartagena Airport (CTG)',     cat:'transport',    lat:10.4424, lng:-75.5132, note:'' },
  { id:12, trip:'colombia2024', name:'Rosario Islands',             cat:'nature',       lat:10.1628, lng:-75.7731, note:'' },
  { id:13, trip:'colombia2024', name:'Ciudad Perdida Trek',         cat:'activity',     lat:11.0407, lng:-73.9252, note:'' },
  { id:14, trip:'colombia2024', name:'Ciudad Perdida',              cat:'culture',      lat:11.0350, lng:-73.9220, note:'Lost City — ancient ruins' },
  { id:15, trip:'colombia2024', name:'Santa Marta',                 cat:'neighborhood', lat:11.2408, lng:-74.2116, note:'' },
  { id:16, trip:'colombia2024', name:'Parque Nacional Tayrona',     cat:'nature',       lat:11.3070, lng:-74.0100, note:'' },
  { id:17, trip:'colombia2024', name:'Barranquilla',                cat:'neighborhood', lat:10.9685, lng:-74.7813, note:'' },
  { id:18, trip:'colombia2024', name:'Cartagena',                   cat:'neighborhood', lat:10.3910, lng:-75.4794, note:'' },
  { id:19, trip:'colombia2025', name:'Bogota Bike Tours',           cat:'activity',     lat:4.6097,  lng:-74.0817, note:'' },
  { id:20, trip:'colombia2025', name:'4.40 Music Hall',             cat:'nightlife',    lat:4.6480,  lng:-74.0540, note:'' },
  { id:21, trip:'colombia2025', name:'Andino Shopping Mall',        cat:'market',       lat:4.6658,  lng:-74.0528, note:"Catalina's recommendation" },
  { id:22, trip:'colombia2025', name:'El Goce Pagano',              cat:'nightlife',    lat:4.6480,  lng:-74.0580, note:'Driver-recommended salsa spot 💃' },
  { id:23, trip:'colombia2025', name:'El Dorado Airport (BOG)',     cat:'transport',    lat:4.7016,  lng:-74.1469, note:'' },
  { id:24, trip:'colombia2025', name:'Sabaneta',                    cat:'neighborhood', lat:6.1511,  lng:-75.6161, note:'' },
  { id:25, trip:'colombia2025', name:'Plaza Cisneros',              cat:'culture',      lat:6.2442,  lng:-75.5812, note:'Medellín' },
  { id:26, trip:'colombia2025', name:'Porton de Provenza',          cat:'food',         lat:6.2076,  lng:-75.5684, note:'El Poblado' },
  { id:27, trip:'colombia2025', name:'Santafé Mall',                cat:'market',       lat:6.1895,  lng:-75.5784, note:'' },
  { id:28, trip:'colombia2025', name:'Jose Maria Cordova Airport',  cat:'transport',    lat:6.1645,  lng:-75.4231, note:'' },
  { id:29, trip:'colombia2025', name:"Restaurante Mondongo's",      cat:'food',         lat:6.2100,  lng:-75.5673, note:'El Poblado' },
  { id:30, trip:'colombia2025', name:'Medellín Es Sabor-Champi',    cat:'food',         lat:6.2100,  lng:-75.5690, note:'' },
  { id:31, trip:'colombia2025', name:'Lineal La Frontera Park',     cat:'nature',       lat:6.1870,  lng:-75.5760, note:'Run club' },
  { id:32, trip:'colombia2025', name:'Salvo Patria',                cat:'food',         lat:6.2494,  lng:-75.5623, note:'' },
  { id:33, trip:'colombia2025', name:'Crepes & Waffles Las Aguas',  cat:'food',         lat:4.6013,  lng:-74.0702, note:'' },
  { id:34, trip:'colombia2025', name:'Restaurante Abbiocco',        cat:'food',         lat:6.2085,  lng:-75.5680, note:'Bella strongly recommends ⭐' },
  { id:35, trip:'colombia2025', name:'Plaza Botero',                cat:'culture',      lat:6.2517,  lng:-75.5636, note:'Medellín' },
  { id:36, trip:'colombia2025', name:'San Javier',                  cat:'culture',      lat:6.2451,  lng:-75.5989, note:'Remarkable slum-to-park transformation' },
  { id:37, trip:'colombia2025', name:'Museum of Antioquia',         cat:'culture',      lat:6.2516,  lng:-75.5634, note:'' },
  { id:38, trip:'colombia2025', name:'Museo Nacional de Colombia',  cat:'culture',      lat:4.6146,  lng:-74.0693, note:'' },
  { id:39, trip:'colombia2025', name:'MAMBO (Modern Art Museum)',   cat:'culture',      lat:4.6003,  lng:-74.0716, note:'Bogotá' },
  { id:40, trip:'colombia2025', name:'Museo Quinta de Bolívar',     cat:'culture',      lat:4.6002,  lng:-74.0638, note:"Bolívar's home · Free Wed afternoons" },
  { id:41, trip:'colombia2025', name:'El Chato',                    cat:'food',         lat:4.6589,  lng:-74.0599, note:'' },
  { id:42, trip:'colombia2025', name:'Tierra Chapinero',            cat:'food',         lat:4.6477,  lng:-74.0590, note:'' },
  { id:43, trip:'colombia2025', name:'Parque de la 93',             cat:'neighborhood', lat:4.6760,  lng:-74.0513, note:'' },
  { id:44, trip:'colombia2025', name:'La Perseverancia Market',     cat:'market',       lat:4.6171,  lng:-74.0617, note:'Food market' },
  { id:45, trip:'colombia2025', name:'San Victorino',               cat:'market',       lat:4.5988,  lng:-74.0777, note:'Street market' },
  { id:46, trip:'colombia2025', name:'Museo de Arte Miguel Urrutia',cat:'culture',      lat:4.6013,  lng:-74.0697, note:'' },
  { id:47, trip:'colombia2025', name:'Café Matuca',                 cat:'food',         lat:4.6070,  lng:-74.0700, note:'' },
  { id:48, trip:'colombia2025', name:'University of the Andes',     cat:'culture',      lat:4.5996,  lng:-74.0656, note:'Great architecture — downhill walk' },
  { id:49, trip:'colombia2025', name:'Santuario Ntra Sra del Carmen',cat:'culture',     lat:4.6104,  lng:-74.0676, note:'' },
  { id:50, trip:'colombia2025', name:'Gold Museum',                 cat:'culture',      lat:4.6019,  lng:-74.0712, note:'' },
  { id:51, trip:'colombia2025', name:'Santa Fe (neighborhood)',     cat:'neighborhood', lat:4.5994,  lng:-74.0823, note:'⚠️ Unsafe — avoid' },
  { id:52, trip:'colombia2025', name:'Plaza de Bolívar',            cat:'culture',      lat:4.5981,  lng:-74.0759, note:'' },
  { id:53, trip:'colombia2025', name:'Usaquén Flea Market',         cat:'market',       lat:4.7025,  lng:-74.0313, note:"Bogotá's best artisan market" },
  { id:54, trip:'colombia2025', name:'Botero Museum',               cat:'culture',      lat:4.5981,  lng:-74.0755, note:'' },
  { id:55, trip:'colombia2025', name:'Monserrate',                  cat:'culture',      lat:4.6053,  lng:-74.0567, note:'Go for sunset · Buy tickets early!' },
  { id:56, trip:'colombia2025', name:'La Candelaria',               cat:'neighborhood', lat:4.5983,  lng:-74.0760, note:'Old town' },
  { id:57, trip:'colombia2025', name:'Viajero Bogota Hostel & Spa', cat:'stay',         lat:4.6258,  lng:-74.0786, note:'' },
  { id:58, trip:'colombia2025', name:'Viajero Hostel Medellín',     cat:'stay',         lat:6.2094,  lng:-75.5681, note:'Rooftop bar' },
  { id:59, trip:'colombia2025', name:'THEATRON',                    cat:'nightlife',    lat:4.6447,  lng:-74.0619, note:"One of South America's biggest clubs" },
  { id:60, trip:'yosemite2023', name:'Yosemite Falls',              cat:'nature',       lat:37.7654, lng:-119.5960, note:'Round trip 6h · Worth every step' },
  { id:61, trip:'yosemite2023', name:'South Entrance',              cat:'transport',    lat:37.5098, lng:-119.6463, note:'' },
  { id:62, trip:'yosemite2023', name:'Airbnb (Koon Hollar)',        cat:'stay',         lat:37.4990, lng:-119.9765, note:'' },
  { id:63, trip:'yosemite2023', name:'Glacier Point',               cat:'nature',       lat:37.7308, lng:-119.5736, note:'Face-to-face with Half Dome' },
  { id:64, trip:'yosemite2023', name:'Swinging Bridge Trail',       cat:'nature',       lat:37.7419, lng:-119.5927, note:'' },
  { id:65, trip:'yosemite2023', name:'Yosemite Valley View',        cat:'nature',       lat:37.7230, lng:-119.6479, note:'Great for sunset' },
  { id:66, trip:'yosemite2023', name:'El Capitan',                  cat:'nature',       lat:37.7341, lng:-119.6378, note:'' },
  { id:67, trip:'yosemite2023', name:'Mirror Lake Trail',           cat:'nature',       lat:37.7441, lng:-119.5544, note:'' },
  { id:68, trip:'yosemite2023', name:'Bridalveil Fall',             cat:'nature',       lat:37.7165, lng:-119.6516, note:'Drive-up viewpoint' },
  { id:69, trip:'yosemite2023', name:'Tunnel View',                 cat:'nature',       lat:37.7186, lng:-119.6785, note:'Driveable' },
];

// ══════════════════ LIVE STATE (populated by the demo, an import, or a shared link) ══════════════════
let TRIPS = {};
let places = [];
let ratings = {};
const state = { trip: 'all', cat: 'all', query: '', activeId: null, viewer: false };

function escapeHtml(s){ return (s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function slugify(s) {
  const base = (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 24);
  return base || ('trip' + Date.now());
}
const TRIP_COLORS = ['#e8520a', '#7c3aed', '#16a34a', '#0ea5e9', '#ec4899', '#f59e0b'];
function colorFor(slug) {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return TRIP_COLORS[h % TRIP_COLORS.length];
}

// ══════════════════ MAP ══════════════════
let map, mapInited = false;
const markers = {};

function initMap() {
  map = L.map('map', { zoomControl: true }).setView([12, -82], 4);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap · © CARTO', subdomains: 'abcd', maxZoom: 19
  }).addTo(map);
  rebuildMarkers();
}

function rebuildMarkers() {
  Object.values(markers).forEach(m => map.removeLayer(m));
  Object.keys(markers).forEach(k => delete markers[k]);
  places.forEach(p => {
    const m = L.marker([p.lat, p.lng], { icon: makeIcon(p) })
      .bindPopup('', { maxWidth: 250 })
      .bindTooltip(p.name, { direction: 'top', offset: [0, -26], className: 'pin-tip' });
    m.on('tooltipopen', () => m.setTooltipContent(tooltipHtml(p)));
    m.on('popupopen',   () => m.setPopupContent(popupHtml(p)));
    m.on('click', () => {
      state.activeId = p.id;
      render();
      const el = document.getElementById('card-' + p.id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    m.addTo(map);
    markers[p.id] = m;
  });
}

function makeIcon(p) {
  const cat = CATS[p.cat] || CATS.food;
  const r = ratings[p.id];
  const faded = r.visited === 'skipped';
  return L.divIcon({
    className: '',
    html: `<div style="width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);
      background:${faded ? '#ccc' : cat.color};border:2.5px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,${faded ? 0.1 : 0.28});
      display:flex;align-items:center;justify-content:center;">
      <span style="transform:rotate(45deg);font-size:12px;line-height:1;">${cat.icon}</span></div>`,
    iconSize: [28, 28], iconAnchor: [14, 28], popupAnchor: [0, -30],
  });
}

function tooltipHtml(p) {
  const r = ratings[p.id];
  const stars = (r.visited === 'went' && r.rating > 0)
    ? ` <span style="color:#fbbf24;">${'★'.repeat(r.rating)}</span>` : '';
  return `${escapeHtml(p.name)}${stars}`;
}

function popupHtml(p) {
  const r = ratings[p.id];
  const stars = (r.visited === 'went' && r.rating > 0)
    ? `<div style="font-size:14px;letter-spacing:1px;margin-top:5px;color:#f59e0b;">${'★'.repeat(r.rating)}<span style="color:#e8e4de;">${'★'.repeat(5 - r.rating)}</span></div>`
    : '';
  const comment = (r.comment && r.comment.trim())
    ? `<div style="font-size:11.5px;color:#555;margin-top:6px;line-height:1.45;border-left:2px solid #e8520a;padding-left:8px;">${escapeHtml(r.comment)}</div>`
    : '';
  const badge = r.visited === 'went' ? ' · <span style="color:#16a34a;">visited</span>'
             : r.visited === 'skipped' ? ' · <span style="color:#94a3b8;">skipped</span>' : '';
  return `<div style="font-family:-apple-system,sans-serif;min-width:150px;max-width:230px;">
    <div style="font-weight:700;font-size:13px;margin-bottom:2px;">${escapeHtml(p.name)}</div>
    <div style="font-size:11px;color:#999;">${CATS[p.cat]?.label} · ${TRIPS[p.trip]?.label}${badge}</div>
    ${stars}${comment}
  </div>`;
}

function fitTrip(trip) {
  const pts = places.filter(p => trip === 'all' || p.trip === trip).map(p => [p.lat, p.lng]);
  if (!pts.length) return;
  if (pts.length === 1) { map.setView(pts[0], 13, { animate: true }); }
  else { map.fitBounds(pts, { padding: [60, 60], maxZoom: trip === 'all' ? 6 : 12, animate: true }); }
}

// ══════════════════ FILTER / SEARCH ══════════════════
function visible() {
  const q = state.query.trim().toLowerCase();
  return places.filter(p =>
    (state.trip === 'all' || p.trip === state.trip) &&
    (state.cat === 'all' || p.cat === state.cat) &&
    (!q || p.name.toLowerCase().includes(q) || (p.note || '').toLowerCase().includes(q) || (ratings[p.id].comment || '').toLowerCase().includes(q))
  );
}
function catCounts() {
  const scope = places.filter(p => state.trip === 'all' || p.trip === state.trip);
  const c = { all: scope.length };
  scope.forEach(p => { c[p.cat] = (c[p.cat] || 0) + 1; });
  return c;
}

// ══════════════════ RENDER ══════════════════
function renderTripTabs() {
  const tabs = [{ key: 'all', label: 'All Trips', color: '#1a1a1a', emoji: '' }]
    .concat(Object.keys(TRIPS).map(t => ({ key: t, label: TRIPS[t].label, color: TRIPS[t].color, emoji: TRIPS[t].emoji })));
  document.getElementById('tripTabs').innerHTML = tabs.map(t => {
    const active = state.trip === t.key;
    return `<button class="trip-tab ${active ? 'active' : ''}" data-trip="${t.key}"
      style="${active ? `background:${t.color}` : ''}">${t.emoji ? t.emoji + ' ' : ''}${t.label}</button>`;
  }).join('');
}
function renderFilters() {
  const counts = catCounts();
  const cats = Object.keys(CATS).filter(c => counts[c]);
  const chips = [{ key: 'all', label: 'All', icon: '' }]
    .concat(cats.map(c => ({ key: c, label: CATS[c].label, icon: CATS[c].icon })));
  document.getElementById('filters').innerHTML = chips.map(c => {
    const active = state.cat === c.key;
    return `<button class="filter-chip ${active ? 'active' : ''}" data-cat="${c.key}">${c.icon ? c.icon + ' ' : ''}${c.label} <span class="chip-count">${counts[c.key] || 0}</span></button>`;
  }).join('');
}

function render() {
  const show = visible();
  const showIds = new Set(show.map(p => p.id));

  places.forEach(p => {
    const m = markers[p.id];
    const inView = showIds.has(p.id);
    if (inView && !map.hasLayer(m)) m.addTo(map);
    if (!inView && map.hasLayer(m)) map.removeLayer(m);
    m.setIcon(makeIcon(p));
    if (m.isPopupOpen && m.isPopupOpen()) m.setPopupContent(popupHtml(p));
  });

  if (state.viewer) {
    document.getElementById('stats').textContent = `${show.length} places visited`;
  } else {
    const ratedN = Object.values(ratings).filter(r => r.visited !== null).length;
    document.getElementById('stats').textContent = `${show.length} places · ${ratedN} rated`;
  }

  renderFilters();

  const list = document.getElementById('placeList');
  if (!show.length) {
    list.innerHTML = '<div class="empty-state">No places match your search.</div>';
  } else {
    list.innerHTML = show.map(p => {
      const r = ratings[p.id];
      const active = state.activeId === p.id;
      const tripColor = TRIPS[p.trip]?.color;
      const went = r.visited === 'went';
      const stars = went
        ? `<div class="stars">${[1,2,3,4,5].map(n =>
            `<span class="star ${r.rating >= n ? 'on' : ''}"${state.viewer ? '' : ` onclick="setRating(event,${p.id},${n})"`}>★</span>`).join('')}</div>`
        : '';

      let body;
      if (state.viewer) {
        body = (r.comment && r.comment.trim()) ? `<div class="comment-static">${escapeHtml(r.comment)}</div>` : '';
      } else if (went) {
        body = `<div class="comment-wrap">
             <textarea class="comment-input" rows="2" placeholder="Add a memory from this place…"
               onclick="event.stopPropagation()" oninput="setComment(${p.id}, this.value)">${escapeHtml(r.comment)}</textarea>
           </div>`;
      } else {
        body = p.note ? `<div class="card-note">${escapeHtml(p.note)}</div>` : '';
      }

      const actions = state.viewer
        ? (stars ? `<div class="card-actions">${stars}</div>` : '')
        : `<div class="card-actions" onclick="event.stopPropagation()">
            <div class="visited-toggle">
              <button class="v-btn went ${went ? 'on' : ''}" onclick="setVisited(event,${p.id},'went')">✓ Went</button>
              <button class="v-btn skip ${r.visited === 'skipped' ? 'on' : ''}" onclick="setVisited(event,${p.id},'skipped')">✗ Skipped</button>
            </div>
            ${stars}
          </div>`;

      return `
        <div class="place-card ${active ? 'highlighted' : ''}" id="card-${p.id}" onclick="selectCard(${p.id})">
          <div class="card-top">
            <span class="cat-icon">${CATS[p.cat]?.icon || '📍'}</span>
            <span class="card-name">${escapeHtml(p.name)}</span>
            <div class="trip-dot" style="background:${tripColor}" title="${TRIPS[p.trip]?.label}"></div>
          </div>
          ${actions}
          ${body}
        </div>`;
    }).join('');
  }
  renderTaste();
}

function selectCard(id) {
  state.activeId = id;
  const p = places.find(x => x.id === id);
  if (p) { map.setView([p.lat, p.lng], 14, { animate: true }); markers[id].openPopup(); }
  render();
}
function setVisited(e, id, val) {
  if (state.viewer) return;
  e.stopPropagation();
  ratings[id].visited = ratings[id].visited === val ? null : val;
  if (ratings[id].visited !== 'went') ratings[id].rating = 0;   // comment is kept
  render();
}
function setRating(e, id, val) {
  if (state.viewer) return;
  e.stopPropagation();
  ratings[id].rating = ratings[id].rating === val ? 0 : val;
  render();
}
function setComment(id, val) {
  if (state.viewer) return;
  ratings[id].comment = val;   // no re-render (keeps textarea focus); refresh popup if open
  const m = markers[id];
  if (m && m.isPopupOpen && m.isPopupOpen()) m.setPopupContent(popupHtml(places.find(p => p.id === id)));
}

function renderTaste() {
  const el = document.getElementById('tasteContent');
  const rated = places.filter(p => ratings[p.id].visited === 'went' && ratings[p.id].rating > 0);
  if (!rated.length) {
    el.innerHTML = '<div class="taste-empty">Rate places you visited to build your profile.</div>';
    return;
  }
  const bycat = {};
  rated.forEach(p => {
    if (!bycat[p.cat]) bycat[p.cat] = { sum: 0, n: 0 };
    bycat[p.cat].sum += ratings[p.id].rating; bycat[p.cat].n++;
  });
  const rows = Object.entries(bycat).map(([cat, d]) => ({ cat, avg: d.sum / d.n })).sort((a, b) => b.avg - a.avg);
  el.innerHTML = rows.map(r => `
    <div class="taste-row">
      <span class="taste-lbl">${CATS[r.cat]?.icon} ${CATS[r.cat]?.label}</span>
      <div class="taste-track"><div class="taste-fill" style="width:${(r.avg / 5) * 100}%"></div></div>
      <span class="taste-val">${r.avg.toFixed(1)}★</span>
    </div>`).join('');
}

// ══════════════════ LISTENERS (delegated) ══════════════════
document.getElementById('tripTabs').addEventListener('click', e => {
  const b = e.target.closest('.trip-tab'); if (!b) return;
  state.trip = b.dataset.trip; state.cat = 'all'; state.activeId = null;
  renderTripTabs(); fitTrip(state.trip); render();
});
document.getElementById('filters').addEventListener('click', e => {
  const b = e.target.closest('.filter-chip'); if (!b) return;
  state.cat = b.dataset.cat; state.activeId = null; render();
});
document.getElementById('searchInput').addEventListener('input', e => {
  state.query = e.target.value; state.activeId = null; render();
});

// ══════════════════ SHOW APP / DEMO ══════════════════
function showApp() {
  document.getElementById('landing').classList.add('hide');
  document.getElementById('review').classList.remove('show');
  document.getElementById('statusScreen').classList.remove('show');
  document.getElementById('app').classList.add('show');
  document.body.classList.add('in-app');
  document.body.classList.toggle('viewer-mode', state.viewer);
  document.getElementById('shareBtn').style.display = state.viewer ? 'none' : '';
  document.getElementById('viewerBadge').innerHTML = state.viewer
    ? `<div class="viewer-badge">👀 Shared map · <a href="/">Make your own</a></div>` : '';

  if (!mapInited) { initMap(); mapInited = true; } else { rebuildMarkers(); }
  renderTripTabs();
  setTimeout(() => { map.invalidateSize(); fitTrip(state.trip); render(); }, 60);
}

function enterDemo() {
  TRIPS = JSON.parse(JSON.stringify(TRIPS_DEMO));
  places = PLACES_DEMO.map(p => ({ ...p }));
  ratings = {};
  places.forEach(p => { ratings[p.id] = { visited: null, rating: 0, comment: p.note || '' }; });
  state.viewer = false; state.trip = 'all'; state.cat = 'all'; state.query = ''; state.activeId = null;
  showApp();
}

// ══════════════════ SHARE ══════════════════
let currentShareUrl = null;

function buildMapPayload() {
  const usedTrips = new Set(places.map(p => p.trip));
  const trips = {};
  usedTrips.forEach(t => { if (TRIPS[t]) trips[t] = TRIPS[t]; });
  return {
    trips,
    places: places.map(p => ({ ...p, ...ratings[p.id] })),
  };
}

function openShare() {
  currentShareUrl = null;
  document.getElementById('modalLinkRow').classList.remove('show');
  const statusEl = document.getElementById('modalStatus');
  statusEl.textContent = ''; statusEl.classList.remove('err');
  const btn = document.getElementById('modalPrimaryBtn');
  btn.disabled = false; btn.textContent = 'Create link'; btn.onclick = createShareLink;

  const went = places.filter(p => ratings[p.id].visited === 'went');
  const trips = [...new Set(went.map(p => p.trip))].map(t => TRIPS[t]?.label).join(', ') || 'None yet';
  const fav = (() => {
    const bycat = {};
    went.filter(p => ratings[p.id].rating > 0).forEach(p => {
      if (!bycat[p.cat]) bycat[p.cat] = { sum: 0, n: 0 };
      bycat[p.cat].sum += ratings[p.id].rating; bycat[p.cat].n++;
    });
    const best = Object.entries(bycat).sort((a, b) => (b[1].sum / b[1].n) - (a[1].sum / a[1].n))[0];
    return best ? `${CATS[best[0]]?.icon} ${CATS[best[0]]?.label}` : '—';
  })();
  const notes = went.filter(p => ratings[p.id].comment && ratings[p.id].comment.trim()).length;
  document.getElementById('modalSummary').innerHTML = `
    <b>Your snapshot</b>
    📍 ${went.length} places visited across ${[...new Set(went.map(p => p.trip))].length || 0} trip(s)<br/>
    🗺️ Trips: ${trips}<br/>
    ❤️ Top category: ${fav}<br/>
    📝 Notes kept: ${notes}
  `;
  document.getElementById('modalOverlay').classList.add('show');
}

async function createShareLink() {
  const btn = document.getElementById('modalPrimaryBtn');
  const statusEl = document.getElementById('modalStatus');
  btn.disabled = true; btn.innerHTML = '<span class="spinner"></span>Creating…';
  statusEl.textContent = ''; statusEl.classList.remove('err');
  try {
    const res = await fetch('/api/maps', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildMapPayload()),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Something went wrong.');
    currentShareUrl = data.url;
    const input = document.getElementById('modalLinkInput');
    input.value = data.url;
    document.getElementById('modalLinkRow').classList.add('show');
    statusEl.textContent = 'Anyone with this link can view your map.';
    btn.disabled = false; btn.textContent = 'Copy link'; btn.onclick = copyShareLink;
    input.select();
  } catch (e) {
    statusEl.textContent = e.message; statusEl.classList.add('err');
    btn.disabled = false; btn.textContent = 'Try again'; btn.onclick = createShareLink;
  }
}

function copyShareLink() {
  if (!currentShareUrl) return;
  const btn = document.getElementById('modalPrimaryBtn');
  const restore = () => setTimeout(() => { btn.textContent = 'Copy link'; }, 1400);
  navigator.clipboard.writeText(currentShareUrl).then(() => {
    btn.textContent = 'Copied ✓'; restore();
  }).catch(() => {
    document.getElementById('modalLinkInput').select();
  });
}

function closeShare(e) {
  if (!e || e.target === document.getElementById('modalOverlay'))
    document.getElementById('modalOverlay').classList.remove('show');
}

// ══════════════════ UPLOAD ══════════════════
let pickedFile = null; // { fileName, rows: [{name, note, url}] }

const dropEl = document.getElementById('drop');
const fileInput = document.getElementById('file');

['dragover', 'dragenter'].forEach(ev => dropEl.addEventListener(ev, e => { e.preventDefault(); dropEl.classList.add('over'); }));
['dragleave', 'drop'].forEach(ev => dropEl.addEventListener(ev, e => { e.preventDefault(); dropEl.classList.remove('over'); }));
dropEl.addEventListener('drop', e => { if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });
fileInput.addEventListener('change', e => { if (e.target.files[0]) handleFile(e.target.files[0]); });

function showDropResult(html) {
  const el = document.getElementById('dropResult');
  el.innerHTML = html;
  el.classList.toggle('show', !!html);
}

function handleFile(file) {
  if (!file.name.toLowerCase().endsWith('.csv')) {
    showDropResult(`<span class="err">That's not a .csv — export the "Saved" data from Google Takeout and try again.</span>`);
    return;
  }
  Papa.parse(file, {
    header: true, skipEmptyLines: true,
    complete: (res) => {
      const rows = res.data
        .filter(r => (r.Title || '').trim())
        .map(r => ({ name: (r.Title || '').trim(), note: (r.Note || '').trim(), url: (r.URL || '').trim() }));
      if (!rows.length) {
        showDropResult(`<span class="err">No places found in that file. Make sure it's the CSV from Google Takeout "Saved".</span>`);
        return;
      }
      pickedFile = { fileName: file.name, rows };
      document.getElementById('dropTitle').textContent = `✓ ${file.name}`;
      document.getElementById('dropSub').textContent = `${rows.length} saved place${rows.length === 1 ? '' : 's'} found — click to choose a different file`;
      dropEl.classList.add('has-file');
      showDropResult('');
      const labelInput = document.getElementById('tripLabel');
      if (!labelInput.value) labelInput.value = file.name.replace(/\.csv$/i, '').replace(/[_-]+/g, ' ').trim();
      document.getElementById('importForm').classList.add('show');
    },
    error: () => showDropResult(`<span class="err">Couldn't read that file. Make sure it's the CSV from Google Takeout "Saved".</span>`),
  });
}

async function submitImport(e) {
  e.preventDefault();
  if (!pickedFile) return false;
  const label = document.getElementById('tripLabel').value.trim();
  const region = document.getElementById('tripRegion').value.trim().toUpperCase();
  if (!label) return false;
  const trip = slugify(label);

  const btn = document.getElementById('importSubmit');
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span>Finding ${pickedFile.rows.length} places… this can take a minute`;
  showDropResult('');

  try {
    const res = await fetch('/api/import', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trip, label, region: region || undefined, rows: pickedFile.rows }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Import failed.');
    startReview({ trip, label, region }, data.places);
  } catch (err) {
    showDropResult(`<span class="err">${escapeHtml(err.message)}</span>`);
    btn.disabled = false;
    btn.textContent = 'Find my places on the map';
  }
  return false;
}

// ══════════════════ REVIEW SCREEN ══════════════════
let draft = null;     // { trip, label, region, places: [...resolved from /api/import] }
let draftGo = {};     // id -> boolean (went vs skipped) — only set for rows with coordinates

function startReview(meta, resolvedPlaces) {
  draft = { ...meta, places: resolvedPlaces };
  draftGo = {};
  resolvedPlaces.forEach(p => { if (p.lat != null && p.lng != null) draftGo[p.id] = true; });
  document.getElementById('landing').classList.add('hide');
  document.getElementById('review').classList.add('show');
  renderReview();
}

function cancelImport() {
  draft = null; draftGo = {}; pickedFile = null;
  document.getElementById('review').classList.remove('show');
  document.getElementById('landing').classList.remove('hide');
  dropEl.classList.remove('has-file');
  document.getElementById('dropTitle').textContent = 'Drop your Google Takeout CSV here';
  document.getElementById('dropSub').innerHTML = 'or <span class="linklike">browse your files</span>';
  document.getElementById('importForm').classList.remove('show');
  document.getElementById('tripLabel').value = '';
  document.getElementById('tripRegion').value = '';
  fileInput.value = '';
  showDropResult('');
}

function renderReview() {
  const resolved = draft.places.filter(p => p.lat != null && p.lng != null);
  const unresolved = draft.places.filter(p => p.lat == null || p.lng == null);

  document.getElementById('reviewHeadline').textContent = `Review "${draft.label}"`;
  document.getElementById('reviewSub').textContent =
    `We matched ${resolved.length} of ${draft.places.length} places. Uncheck anything you didn't actually visit — it'll still be on the map, just faded out.`;

  let html = '';

  if (unresolved.length) {
    html += `<div class="review-section">
      <div class="review-section-title"><span class="n">${unresolved.length}</span> needs a second look</div>
      ${unresolved.map(p => `
        <div class="flag-group">
          <div class="review-row" style="border-bottom:none;">
            <div class="review-row-body">
              <div class="review-row-name">${escapeHtml(p.name)}<span class="review-badge">no confident match</span></div>
              ${p.note ? `<div class="review-row-meta">${escapeHtml(p.note)}</div>` : ''}
              <div class="review-fix">
                <input type="text" class="fix-input" data-id="${p.id}" value="${escapeHtml(p.name)}">
                <button class="retry-btn" data-id="${p.id}">Retry</button>
              </div>
            </div>
          </div>
        </div>`).join('')}
    </div>`;
  }

  const byCity = {};
  resolved.forEach(p => { const c = p.city || 'Other'; (byCity[c] ||= []).push(p); });
  const cities = Object.keys(byCity).sort((a, b) => byCity[b].length - byCity[a].length);

  if (cities.length) {
    html += `<div class="review-section">
      <div class="review-section-title"><span class="n">${resolved.length}</span> matched</div>
      ${cities.map(city => `
        <div class="review-city-group">
          <div class="review-city-head">${escapeHtml(city)} <span class="count">${byCity[city].length}</span>
            <button class="toggle-all" data-city="${escapeHtml(city)}">select all / none</button>
          </div>
          ${byCity[city].map(p => `
            <div class="review-row" data-city="${escapeHtml(city)}">
              <input type="checkbox" class="review-check" data-id="${p.id}" ${draftGo[p.id] ? 'checked' : ''}>
              <div class="review-row-body">
                <div class="review-row-name">${escapeHtml(p.name)}${p.needsReview ? '<span class="review-badge">low confidence</span>' : ''}</div>
                <div class="review-row-meta">${CATS[p.cat]?.icon || ''} ${CATS[p.cat]?.label || ''}${p.note ? ' · ' + escapeHtml(p.note) : ''}</div>
              </div>
            </div>`).join('')}
        </div>`).join('')}
    </div>`;
  }

  document.getElementById('reviewBody').innerHTML = html;
  renderReviewSummary();
}

function renderReviewSummary() {
  const resolved = draft.places.filter(p => p.lat != null && p.lng != null);
  const included = resolved.filter(p => draftGo[p.id]);
  const total = draft.places.length;
  let text = `<b>${resolved.length}</b> place${resolved.length === 1 ? '' : 's'} will be on your map`;
  text += included.length !== resolved.length ? ` · <b>${included.length}</b> marked visited` : ' · all marked visited';
  if (total > resolved.length) text += ` · ${total - resolved.length} unresolved`;
  document.getElementById('reviewSummary').innerHTML = text;
  document.getElementById('reviewContinue').disabled = resolved.length === 0;
}

document.getElementById('reviewBody').addEventListener('change', e => {
  if (e.target.classList.contains('review-check')) {
    draftGo[Number(e.target.dataset.id)] = e.target.checked;
    renderReviewSummary();
  }
});
document.getElementById('reviewBody').addEventListener('click', e => {
  const toggleBtn = e.target.closest('.toggle-all');
  if (toggleBtn) {
    const city = toggleBtn.dataset.city;
    const boxes = [...document.querySelectorAll('.review-row[data-city]')]
      .filter(r => r.dataset.city === city)
      .map(r => r.querySelector('.review-check'));
    const allOn = boxes.every(b => b.checked);
    boxes.forEach(b => { b.checked = !allOn; draftGo[Number(b.dataset.id)] = !allOn; });
    renderReviewSummary();
    return;
  }
  const retryBtn = e.target.closest('.retry-btn');
  if (retryBtn) retryRow(Number(retryBtn.dataset.id));
});

async function retryRow(id) {
  const p = draft.places.find(x => x.id === id);
  if (!p) return;
  const input = document.querySelector(`.fix-input[data-id="${id}"]`);
  const btn = document.querySelector(`.retry-btn[data-id="${id}"]`);
  const newName = (input?.value || p.name).trim();
  if (!newName) return;
  btn.disabled = true; btn.textContent = '…';
  try {
    const res = await fetch('/api/import', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trip: draft.trip, label: draft.label, region: draft.region, rows: [{ name: newName, note: p.note, url: '' }] }),
    });
    const data = await res.json();
    if (!res.ok || !data.places?.length) throw new Error(data.error || 'No match.');
    const resolved = data.places[0];
    Object.assign(p, { name: newName, lat: resolved.lat, lng: resolved.lng, city: resolved.city, cat: resolved.cat, needsReview: resolved.needsReview });
    if (p.lat != null && p.lng != null) draftGo[p.id] = true;
    renderReview();
  } catch (err) {
    btn.disabled = false; btn.textContent = 'Retry';
    if (input) input.title = err.message;
  }
}

function confirmImport() {
  const resolved = draft.places.filter(p => p.lat != null && p.lng != null);
  if (!resolved.length) return;
  const trip = draft.trip;

  TRIPS = { [trip]: { label: draft.label, color: colorFor(trip), emoji: '📍' } };
  places = resolved.map(p => ({ id: p.id, trip, name: p.name, cat: p.cat, lat: p.lat, lng: p.lng, note: p.note, city: p.city }));
  ratings = {};
  resolved.forEach(p => {
    ratings[p.id] = { visited: draftGo[p.id] ? 'went' : 'skipped', rating: 0, comment: p.note || '' };
  });

  state.viewer = false; state.cat = 'all'; state.query = ''; state.activeId = null;
  state.trip = Object.keys(TRIPS).length === 1 ? trip : 'all';
  document.getElementById('searchInput').value = '';
  document.getElementById('review').classList.remove('show');
  draft = null; draftGo = {}; pickedFile = null;
  showApp();
}

// ══════════════════ VIEWER MODE (loading a shared link) ══════════════════
function showStatus(title, sub, isError) {
  document.getElementById('statusTitle').textContent = title;
  document.getElementById('statusSub').textContent = sub || '';
  document.getElementById('statusCta').style.display = isError ? 'inline-block' : 'none';
  document.getElementById('statusScreen').classList.add('show');
}

function loadViewerData(data) {
  TRIPS = data.trips || {};
  places = (data.places || []).filter(p => p.visited === 'went');
  ratings = {};
  places.forEach(p => { ratings[p.id] = { visited: p.visited, rating: p.rating || 0, comment: p.comment || '' }; });
  const tripKeys = Object.keys(TRIPS);
  state.viewer = true; state.cat = 'all'; state.query = ''; state.activeId = null;
  state.trip = tripKeys.length === 1 ? tripKeys[0] : 'all';
  showApp();
}

// ══════════════════ BOOT ══════════════════
(async () => {
  const id = new URLSearchParams(location.search).get('m');
  if (!id) return;
  document.getElementById('landing').classList.add('hide');
  showStatus('Loading map…', '');
  try {
    const res = await fetch(`/api/maps/${encodeURIComponent(id)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Map not found.');
    if (!data.places || !data.places.some(p => p.visited === 'went')) {
      showStatus('This map has no visited places yet.', 'The person who made it hasn’t marked anything as visited.', true);
      return;
    }
    loadViewerData(data);
  } catch (e) {
    showStatus("This map link doesn't exist or was removed.", '', true);
  }
})();

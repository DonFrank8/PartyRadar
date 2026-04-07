const SUPABASE_URL = "https://dwyhpirtbjfmohcnhdak.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable__H_WNdy1NIfoQbQfyNILKQ_Qb8wQfgn";

const DEFAULT_CENTER = [51.1657, 10.4515];
const DEFAULT_ZOOM = 6;

const demoEvents = [
  {
    id: "demo-1",
    name: "Latin Night Marbella",
    location_name: "Max Beach",
    city: "Mijas Costa",
    event_date: "2026-07-12",
    event_time: "20:30",
    genre: "Latin",
    price_text: "25 EUR",
    description: "Open-Air Latin Night mit lokalen Dance-Artists.",
    lat: 36.4959,
    lng: -4.7345
  },
  {
    id: "demo-2",
    name: "Salsa Party",
    location_name: "Ocean Club",
    city: "Marbella",
    event_date: "2026-07-13",
    event_time: "19:00",
    genre: "Salsa",
    price_text: "30 EUR",
    description: "Salsa Floor mit DJ Set und Show-Acts.",
    lat: 36.4879,
    lng: -4.953
  },
  {
    id: "demo-3",
    name: "Rock Night",
    location_name: "Fuengirola Port Stage",
    city: "Fuengirola",
    event_date: "2026-07-14",
    event_time: "21:30",
    genre: "Rock",
    price_text: "18 EUR",
    description: "Live Band Show mit regionalen Rock-Bands.",
    lat: 36.5336,
    lng: -4.6207
  },
  {
    id: "demo-4",
    name: "Bachata Sunset Session",
    location_name: "Plaza del Mar",
    city: "Estepona",
    event_date: "2026-07-15",
    event_time: "20:00",
    genre: "Bachata",
    price_text: "22 EUR",
    description: "Bachata Social mit Workshop und DJ Set.",
    lat: 36.4292,
    lng: -5.1474
  }
];

const state = {
  allEvents: [],
  filteredEvents: [],
  selectedEventId: null,
  sourceLabel: "Unbekannt",
  availableGenres: [],
  activeGenres: new Set(),
  debug: {
    enabled: true,
    tableName: "events",
    supabaseLoadedCount: 0,
    hasError: false,
    errorMessage: "Kein Fehler",
    fallbackReason: "Noch nicht geladen"
  }
};

const GENRE_ORDER = [
  "Latin",
  "Salsa",
  "Bachata",
  "Reggaeton",
  "Flamenco",
  "Rock",
  "Pop",
  "Electro",
  "House",
  "Techno",
  "R&B",
  "Hip-Hop",
  "Jazz",
  "Live Band",
  "DJ Set"
];

const GENRE_ICON_MAP = {
  Latin: "💃",
  Salsa: "🕺",
  Bachata: "💞",
  Reggaeton: "🔥",
  Flamenco: "🌹",
  Rock: "🎸",
  Pop: "🎤",
  Electro: "⚡",
  House: "🏠",
  Techno: "🔊",
  "R&B": "🎶",
  "Hip-Hop": "🧢",
  Jazz: "🎷",
  "Live Band": "🥁",
  "DJ Set": "🎛️"
};

const dom = {
  status: document.getElementById("status"),
  eventList: document.getElementById("eventList"),
  eventDetails: document.getElementById("eventDetails"),
  resultCount: document.getElementById("resultCount"),
  searchInput: document.getElementById("searchInput"),
  cityFilter: document.getElementById("cityFilter"),
  genreFilterGroup: document.getElementById("genreFilterGroup"),
  resetFilters: document.getElementById("resetFilters"),
  debugPanel: document.getElementById("debugPanel"),
  debugLoadedCount: document.getElementById("debugLoadedCount"),
  debugErrorState: document.getElementById("debugErrorState"),
  debugTableName: document.getElementById("debugTableName"),
  debugFallbackReason: document.getElementById("debugFallbackReason")
};

let map;
let markersLayer;
const markersByEventId = new Map();

function setStatus(message, tone = "loading") {
  dom.status.className = `status status--${tone}`;
  dom.status.textContent = message;
}

function updateDebugPanel() {
  if (!dom.debugPanel) return;
  dom.debugPanel.classList.remove("debug-panel--error");
  dom.debugPanel.classList.add("debug-panel--active");

  if (dom.debugTableName) dom.debugTableName.textContent = state.debug.tableName;
  if (dom.debugLoadedCount) dom.debugLoadedCount.textContent = String(state.debug.supabaseLoadedCount);
  if (dom.debugErrorState) {
    dom.debugErrorState.textContent = state.debug.hasError ? `Ja - ${state.debug.errorMessage}` : "Nein";
  }
  if (dom.debugFallbackReason) dom.debugFallbackReason.textContent = state.debug.fallbackReason;
  if (state.debug.hasError) dom.debugPanel.classList.add("debug-panel--error");
}

function normalizeEvent(event, index) {
  const lat = Number(event.lat ?? event.latitude ?? null);
  const lng = Number(event.lng ?? event.longitude ?? null);
  return {
    id: String(event.id ?? `event-${index}`),
    name: event.name || event.title || "Unbenanntes Event",
    location_name: event.location_name || event.location || "Unbekannte Location",
    city: event.city || event.location_city || "",
    event_date: event.event_date || event.date || "",
    event_time: event.event_time || event.time || "",
    genre: event.genre || event.music_genre || "",
    price_text: event.price_text || event.price || "Eintritt frei",
    description: event.description || "Keine Beschreibung vorhanden.",
    lat: Number.isFinite(lat) ? lat : null,
    lng: Number.isFinite(lng) ? lng : null
  };
}

function splitGenres(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  return String(value)
    .split(/[,/|;]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function sortGenres(genres) {
  return [...genres].sort((a, b) => {
    const ai = GENRE_ORDER.indexOf(a);
    const bi = GENRE_ORDER.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.localeCompare(b, "de");
  });
}

function collectUniqueGenres(events) {
  const set = new Set();
  events.forEach((event) => {
    splitGenres(event.genre).forEach((genre) => set.add(genre));
  });
  return sortGenres(set);
}

function iconForGenre(genre) {
  return GENRE_ICON_MAP[genre] || "🎵";
}

function formatDate(dateString) {
  if (!dateString) return "Datum folgt";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
}

function formatPrice(priceText) {
  if (!priceText) return "Eintritt frei";
  const normalized = String(priceText).trim().toLowerCase();
  if (normalized === "free" || normalized === "0" || normalized === "0 eur") return "Eintritt frei";
  return String(priceText);
}

function eventSearchText(event) {
  return [event.name, event.location_name, event.city, event.genre, event.description].join(" ").toLowerCase();
}

function renderGenreFilter() {
  if (!dom.genreFilterGroup) return;
  dom.genreFilterGroup.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.className = "genre-chip genre-chip--all";
  if (state.activeGenres.size === 0) allButton.classList.add("is-active");
  allButton.dataset.genre = "__all__";
  allButton.textContent = "Alle";
  dom.genreFilterGroup.append(allButton);

  state.availableGenres.forEach((genre) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "genre-chip";
    if (state.activeGenres.has(genre)) button.classList.add("is-active");
    button.dataset.genre = genre;
    button.innerHTML = `<span class="genre-chip__icon">${iconForGenre(genre)}</span><span>${genre}</span>`;
    dom.genreFilterGroup.append(button);
  });
}

function updateFilterOptions() {
  const cities = [...new Set(state.allEvents.map((event) => event.city).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "de")
  );

  dom.cityFilter.innerHTML = '<option value="">Alle Städte</option>';
  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    dom.cityFilter.append(option);
  });

  state.availableGenres = collectUniqueGenres(state.allEvents);

  state.activeGenres.forEach((genre) => {
    if (!state.availableGenres.includes(genre)) state.activeGenres.delete(genre);
  });

  renderGenreFilter();
}

function getActiveFilters() {
  return {
    search: dom.searchInput.value.trim().toLowerCase(),
    city: dom.cityFilter.value,
    genres: new Set(state.activeGenres)
  };
}

function eventMatchesGenres(event, activeGenres) {
  if (!activeGenres.size) return true;
  const eventGenres = splitGenres(event.genre);
  return eventGenres.some((genre) => activeGenres.has(genre));
}

function statusToneForSource() {
  return state.sourceLabel.startsWith("Demo-Fallback") ? "warning" : "ok";
}

function applyFilters() {
  const filters = getActiveFilters();

  state.filteredEvents = state.allEvents.filter((event) => {
    if (filters.city && event.city !== filters.city) return false;
    if (!eventMatchesGenres(event, filters.genres)) return false;
    if (filters.search && !eventSearchText(event).includes(filters.search)) return false;
    return true;
  });

  if (state.selectedEventId && !state.filteredEvents.some((event) => event.id === state.selectedEventId)) {
    state.selectedEventId = null;
    renderEventDetails(null);
  }

  renderEventList();
  renderMapMarkers();
  setStatus(
    `${state.filteredEvents.length} von ${state.allEvents.length} Events (${state.sourceLabel}).`,
    statusToneForSource()
  );
}

function createEventCard(event) {
  const card = document.createElement("article");
  card.className = "event-card";
  card.dataset.eventId = event.id;

  const header = document.createElement("div");
  header.className = "event-card__header";
  header.innerHTML = `
    <h4>${event.name}</h4>
    <span>${event.genre || "Genre offen"}</span>
  `;

  const meta = document.createElement("div");
  meta.className = "event-card__meta";
  meta.innerHTML = `
    <span>${event.location_name}${event.city ? `, ${event.city}` : ""}</span>
    <span>${formatDate(event.event_date)}${event.event_time ? `, ${event.event_time} Uhr` : ""}</span>
    <span>${formatPrice(event.price_text)}</span>
  `;

  card.append(header, meta);
  card.addEventListener("click", () => selectEvent(event.id, { flyTo: true, openPopup: true }));
  return card;
}

function renderEventList() {
  dom.eventList.innerHTML = "";
  dom.resultCount.textContent = `${state.filteredEvents.length} Treffer`;

  if (!state.filteredEvents.length) {
    dom.eventList.innerHTML = '<p class="event-list__empty">Keine Events gefunden.</p>';
    dom.eventDetails.className = "event-details event-details--empty";
    dom.eventDetails.textContent = "Keine Events gefunden.";
    return;
  }

  state.filteredEvents.forEach((event) => {
    const card = createEventCard(event);
    if (event.id === state.selectedEventId) card.classList.add("event-card--active");
    dom.eventList.append(card);
  });
}

function initMap() {
  map = L.map("map", { zoomControl: true }).setView(DEFAULT_CENTER, DEFAULT_ZOOM);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  markersLayer = L.layerGroup().addTo(map);
  window.setTimeout(() => map.invalidateSize(), 250);
}

function markerPopupHtml(event) {
  return `
    <div class="popup">
      <strong>${event.name}</strong><br>
      <span>${event.location_name}${event.city ? `, ${event.city}` : ""}</span><br>
      <span>${formatDate(event.event_date)}${event.event_time ? `, ${event.event_time} Uhr` : ""}</span><br>
      <span>${event.genre || "Genre offen"} - ${formatPrice(event.price_text)}</span>
    </div>
  `;
}

function renderMapMarkers() {
  markersLayer.clearLayers();
  markersByEventId.clear();
  const bounds = [];

  state.filteredEvents.forEach((event) => {
    if (event.lat === null || event.lng === null) return;
    const marker = L.marker([event.lat, event.lng], { title: event.name })
      .bindPopup(markerPopupHtml(event))
      .on("click", () => selectEvent(event.id, { flyTo: false, openPopup: false }));
    markersLayer.addLayer(marker);
    markersByEventId.set(event.id, marker);
    bounds.push([event.lat, event.lng]);
  });

  if (bounds.length) map.fitBounds(bounds, { padding: [30, 30], maxZoom: 13 });
  else map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
}

function renderEventDetails(event) {
  if (!event) {
    dom.eventDetails.className = "event-details event-details--empty";
    dom.eventDetails.textContent = "Wähle ein Event in der Liste oder auf der Karte aus.";
    return;
  }

  dom.eventDetails.className = "event-details";
  dom.eventDetails.innerHTML = `
    <h4>${event.name}</h4>
    <ul>
      <li><strong>Location:</strong> ${event.location_name}${event.city ? `, ${event.city}` : ""}</li>
      <li><strong>Datum:</strong> ${formatDate(event.event_date)}${event.event_time ? `, ${event.event_time} Uhr` : ""}</li>
      <li><strong>Genre:</strong> ${event.genre || "Genre offen"}</li>
      <li><strong>Preis:</strong> ${formatPrice(event.price_text)}</li>
    </ul>
    <p>${event.description || "Keine Beschreibung vorhanden."}</p>
  `;
}

function selectEvent(eventId, options = { flyTo: false, openPopup: false }) {
  state.selectedEventId = eventId;
  const event = state.filteredEvents.find((item) => item.id === eventId);

  document.querySelectorAll(".event-card").forEach((card) => {
    card.classList.toggle("event-card--active", card.dataset.eventId === eventId);
  });

  renderEventDetails(event || null);
  if (!event) return;

  const marker = markersByEventId.get(event.id);
  if (marker && event.lat !== null && event.lng !== null) {
    if (options.flyTo) map.flyTo([event.lat, event.lng], 13, { duration: 0.6 });
    if (options.openPopup) marker.openPopup();
  }
}

function resetFilters() {
  dom.searchInput.value = "";
  dom.cityFilter.value = "";
  state.activeGenres.clear();
  renderGenreFilter();
  state.selectedEventId = null;
  applyFilters();
  renderEventDetails(null);
}

function bindEvents() {
  dom.searchInput.addEventListener("input", applyFilters);
  dom.cityFilter.addEventListener("change", applyFilters);
  dom.resetFilters.addEventListener("click", resetFilters);

  dom.genreFilterGroup.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-genre]");
    if (!button) return;
    const { genre } = button.dataset;

    if (genre === "__all__") state.activeGenres.clear();
    else if (state.activeGenres.has(genre)) state.activeGenres.delete(genre);
    else state.activeGenres.add(genre);

    renderGenreFilter();
    applyFilters();
  });
}

async function fetchEventsFromSupabase() {
  if (!SUPABASE_URL || !SUPABASE_URL.includes("supabase.co")) {
    throw new Error("Supabase-URL ist ungültig.");
  }
  if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY.includes("[hier deinen anon key einsetzen]")) {
    throw new Error("Supabase-Anon-Key fehlt. Bitte in app.js eintragen.");
  }

  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const tableName = state.debug.tableName || "events";
  const { data, error } = await client.from(tableName).select("*").order("event_date", { ascending: true });

  console.log("[PartyRadar Debug] Supabase table:", tableName);
  console.log("[PartyRadar Debug] Supabase data:", data);
  console.log("[PartyRadar Debug] Supabase error:", error);

  if (error) throw new Error(error.message);
  return (data || []).map(normalizeEvent);
}

async function loadEvents() {
  setStatus("Lade Events aus Supabase...", "loading");
  state.debug.hasError = false;
  state.debug.errorMessage = "Kein Fehler";
  state.debug.fallbackReason = "Noch keine Entscheidung";
  state.debug.supabaseLoadedCount = 0;
  updateDebugPanel();

  try {
    const data = await fetchEventsFromSupabase();
    state.debug.supabaseLoadedCount = data.length;
    state.debug.hasError = false;
    state.debug.errorMessage = "Kein Fehler";

    if (!data.length) {
      state.allEvents = demoEvents.map(normalizeEvent);
      state.sourceLabel = "Demo-Fallback (Keine Daten aus Supabase)";
      state.debug.fallbackReason = "Keine Daten aus Supabase";
      setStatus("Keine Daten aus Supabase. Demo-Events geladen.", "warning");
      updateDebugPanel();
      return;
    }

    state.allEvents = data;
    state.sourceLabel = "Supabase";
    state.debug.fallbackReason = "Kein Fallback - Daten aus Supabase aktiv";
    setStatus(`Supabase verbunden. ${data.length} Events geladen.`, "ok");
    updateDebugPanel();
  } catch (error) {
    console.error("Supabase Fehler:", error);
    state.allEvents = demoEvents.map(normalizeEvent);
    state.sourceLabel = "Demo-Fallback (Supabase Fehler)";
    state.debug.hasError = true;
    state.debug.errorMessage = error.message;
    state.debug.fallbackReason = "Supabase Fehler - Demo-Fallback aktiv";
    setStatus(`Supabase nicht verfügbar: ${error.message}. Demo-Events aktiv.`, "warning");
    updateDebugPanel();
  }
}

async function startApp() {
  initMap();
  bindEvents();
  await loadEvents();
  updateFilterOptions();
  applyFilters();
  renderEventDetails(null);
}

startApp();

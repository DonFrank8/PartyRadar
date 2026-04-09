const SUPABASE_URL = "https://dwyhpirtbjfmohcnhdak.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable__H_WNdy1NIfoQbQfyNILKQ_Qb8wQfgn";
const ENABLE_AUTO_GEOCODING = true;
const GEOCODING_PROVIDER = "nominatim";
const GEOCODING_MIN_INTERVAL_MS = 850;
const GEOCODING_MAX_RETRIES = 2;
const MAPBOX_ACCESS_TOKEN = (window.PARTYRADAR_MAPBOX_TOKEN || "").toString().trim();
const EVENT_IMAGES_BUCKET = "event-images";
const MAX_EVENT_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_EVENT_IMAGE_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const DEFAULT_NAVIGATION_PROVIDER = "google";

window.PARTYRADAR_CACHE_BUSTER = window.PARTYRADAR_CACHE_BUSTER || Date.now();

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
    genre: "Bachata, DJ Set",
    price_text: "22 EUR",
    description: "Bachata Social mit Workshop und DJ Set.",
    lat: 36.4292,
    lng: -5.1474
  }
];

const GENRE_ORDER = [
  "Latin",
  "Salsa",
  "Rock",
  "Electro",
  "House",
  "Techno",
  "R&B",
  "Flamenco",
  "DJ",
  "Live Music",
  "Jazz",
  "Pop",
  "Bachata",
  "Reggaeton",
  "Hip-Hop",
  "Live Band",
  "DJ Set"
];

const GENRE_ICON_MAP = {
  Latin: "💃",
  Salsa: "🕺",
  Rock: "🎸",
  Electro: "⚡",
  House: "🏠",
  Techno: "🔊",
  "R&B": "🎶",
  Flamenco: "🌹",
  DJ: "🎛️",
  "Live Music": "🥁",
  Jazz: "🎷",
  Pop: "🎤",
  Bachata: "💞",
  Reggaeton: "🔥",
  "Hip-Hop": "🧢",
  "Live Band": "🥁",
  "DJ Set": "🎛️"
};

const NAVIGATION_URL_BUILDERS = {
  google: {
    byCoordinates: ({ lat, lng }) =>
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${lat},${lng}`)}&travelmode=driving`,
    byAddress: (query) =>
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}&travelmode=driving`
  },
  apple: {
    byCoordinates: ({ lat, lng }) =>
      `https://maps.apple.com/?daddr=${encodeURIComponent(`${lat},${lng}`)}&dirflg=d`,
    byAddress: (query) => `https://maps.apple.com/?daddr=${encodeURIComponent(query)}&dirflg=d`
  },
  waze: {
    byCoordinates: ({ lat, lng }) => `https://waze.com/ul?ll=${encodeURIComponent(`${lat},${lng}`)}&navigate=yes`,
    byAddress: (query) => `https://waze.com/ul?q=${encodeURIComponent(query)}&navigate=yes`
  }
};

const I18N = {
  de: {
    hero_title: "Finde, wo Musik wirklich passiert.",
    hero_subtitle: "Lokale Acts, Events und besondere Orte – alles auf einer Karte.",
    hero_chip_fallback: "Live Musik entdecken",
    hero_chip_curated: "Kuratiert fuer Sommernaechte & City-Vibes",
    hero_chip_quality: "Live, lokal und jede Woche neu",
    filters_title: "Suche & Filter",
    filters_subtitle: "Suche nach Event, Stadt und Datum. Verfeinere danach ueber Genres.",
    filter_search: "Suche",
    filter_search_placeholder: "Event, Stadt, Location, Genre...",
    filter_city: "Stadt",
    filter_city_all: "Alle Städte",
    filter_date: "Datum",
    filter_date_all: "Alle Daten",
    filter_genre: "Genres",
    filter_genre_all: "Alle Genres",
    filter_reset: "Alle Filter zurücksetzen",
    list_title: "Event-Liste",
    result_count: "{count} Treffer",
    status_loading: "Lade Events aus Supabase...",
    status_connected: "Supabase verbunden. {count} Events geladen.",
    status_no_data: "Keine Daten aus Supabase. Demo-Events geladen.",
    status_error: "Supabase nicht verfügbar: {message}. Demo-Events aktiv.",
    status_filtered: "{shown} von {total} Events ({source}).",
    source_supabase: "Supabase",
    source_demo_no_data: "Demo-Fallback (Keine Daten aus Supabase)",
    source_demo_error: "Demo-Fallback (Supabase Fehler)",
    no_events_found: "Keine Events gefunden.",
    details_empty: "Wähle ein Event in der Liste oder auf der Karte aus.",
    details_location: "Location",
    details_date: "Datum",
    details_genre: "Genre",
    details_price: "Preis",
    details_navigate: "Route starten",
    details_free: "Eintritt frei",
    details_no_description: "Keine Beschreibung vorhanden.",
    details_time_fallback: "Uhrzeit folgt",
    navigation_unavailable: "Für dieses Event sind keine Navigationsdaten vorhanden.",
    button_all: "Alle",
    submit_cta: "Event einreichen",
    form_title: "Event einreichen",
    form_hint: "Dein Event wird eingereicht und vor Veröffentlichung geprüft.",
    form_submit: "Event einreichen",
    form_loading: "Speichere...",
    form_success: "Dein Event wurde eingereicht und wird vor der Veröffentlichung geprüft.",
    form_error_generic: "Event konnte nicht gespeichert werden.",
    form_error_rls_submit:
      "Zugriff durch Datenbank-Sicherheitsregel (RLS) blockiert. Bitte supabase-rls.sql ausführen/aktualisieren, damit pending Einreichungen erlaubt sind.",
    form_error_geocoding_failed: "Adresse konnte nicht geokodiert werden. Bitte Eingabe prüfen.",
    form_error_image_required: "Bitte ein Hauptbild auswählen.",
    form_error_image_type: "Bitte ein gültiges Bild (JPG, PNG oder WebP) auswählen.",
    form_error_image_size: "Das Bild ist zu groß. Maximal 5 MB erlaubt.",
    form_error_image_upload: "Bild-Upload fehlgeschlagen. Bitte erneut versuchen.",
    form_error_image_cleanup: "Hinweis: Das hochgeladene Bild konnte nicht automatisch bereinigt werden.",
    form_error_required: "Bitte Pflichtfelder ausfüllen.",
    form_error_email: "Bitte eine gültige E-Mail-Adresse angeben.",
    form_error_geocode_pending: "Adresse gespeichert. Koordinaten werden bei der Freigabe ergänzt.",
    form_section_event_details: "Event Details",
    form_section_submitter_details: "Deine Angaben",
    form_label_name: "Event Name",
    form_label_location_name: "Location",
    form_label_address: "Adresse",
    form_label_postal_code: "PLZ",
    form_label_city: "Stadt",
    form_label_country: "Land",
    form_label_event_date: "Datum",
    form_label_event_time: "Uhrzeit",
    form_label_genre: "Genre",
    form_label_price_text: "Preis (EUR)",
    form_label_description: "Beschreibung",
    form_label_main_image: "Hauptbild (optional)",
    form_label_submitted_by: "Dein Name (Einreicher)",
    form_label_contact_email: "Kontakt E-Mail",
    form_hint_main_image: "1 Bild (JPG/PNG/WebP), max. 5 MB",
    form_hint_price_eur: "Bitte Betrag in Euro angeben, z. B. 25 oder 25 EUR.",
    form_placeholder_name: "z. B. Summer Beats Night",
    form_placeholder_location_name: "z. B. Beach Club",
    form_placeholder_address: "z. B. Paseo Marítimo 1",
    form_placeholder_postal_code: "z. B. 29660",
    form_placeholder_city: "z. B. Marbella",
    form_placeholder_country: "z. B. Spanien",
    form_placeholder_event_time: "z. B. 20:30",
    form_placeholder_genre: "z. B. Latin, DJ Set",
    form_placeholder_price_text: "z. B. 25 EUR",
    form_placeholder_description: "Kurzbeschreibung des Events",
    create_title: "Neues Event",
    create_toggle: "Event hinzufügen",
    create_name: "Name",
    create_location: "Location",
    create_postal_code: "PLZ",
    create_city: "Stadt",
    create_country: "Land",
    create_date: "Datum",
    create_time: "Uhrzeit",
    create_genre: "Genre",
    create_price: "Preistext",
    create_lat: "Latitude",
    create_lng: "Longitude",
    create_description: "Beschreibung",
    create_submit: "Speichern"
  },
  en: {
    hero_title: "Find where music truly happens.",
    hero_subtitle: "Local artists, events and unique places – all on one map.",
    hero_chip_fallback: "Discover live music",
    hero_chip_curated: "Curated for summer nights and city vibes",
    hero_chip_quality: "Live, local, and updated every week",
    filters_title: "Search & filters",
    filters_subtitle: "Search by event, city, and date, then refine by genre.",
    filter_search: "Search",
    filter_search_placeholder: "Event, city, venue, genre...",
    filter_city: "City",
    filter_city_all: "All cities",
    filter_date: "Date",
    filter_date_all: "All dates",
    filter_genre: "Genres",
    filter_genre_all: "All genres",
    filter_reset: "Reset all filters",
    list_title: "Event list",
    result_count: "{count} results",
    status_loading: "Loading events from Supabase...",
    status_connected: "Supabase connected. {count} events loaded.",
    status_no_data: "No data from Supabase. Demo events loaded.",
    status_error: "Supabase unavailable: {message}. Demo events active.",
    status_filtered: "{shown} of {total} events ({source}).",
    source_supabase: "Supabase",
    source_demo_no_data: "Demo fallback (No data from Supabase)",
    source_demo_error: "Demo fallback (Supabase error)",
    no_events_found: "No events found.",
    details_empty: "Select an event in the list or on the map.",
    details_location: "Location",
    details_date: "Date",
    details_genre: "Genre",
    details_price: "Price",
    details_navigate: "Start route",
    details_free: "Free entry",
    details_no_description: "No description available.",
    details_time_fallback: "Time TBD",
    navigation_unavailable: "No navigation data is available for this event.",
    button_all: "All",
    submit_cta: "Submit event",
    form_title: "Submit event",
    form_hint: "Your event will be reviewed before publication.",
    form_submit: "Submit event",
    form_loading: "Saving...",
    form_success: "Your event was submitted and will be reviewed before it is published.",
    form_error_generic: "Event could not be saved.",
    form_error_rls_submit:
      "Permission denied by database security (RLS). Please run/update supabase-rls.sql to allow pending event submissions.",
    form_error_geocoding_failed: "Address could not be geocoded. Please check your input.",
    form_error_image_required: "Please select a main image.",
    form_error_image_type: "Please upload a valid image (JPG, PNG, or WebP).",
    form_error_image_size: "The image is too large. Maximum is 5 MB.",
    form_error_image_upload: "Image upload failed. Please try again.",
    form_error_image_cleanup: "Note: Uploaded image could not be cleaned up automatically.",
    form_error_required: "Please fill in required fields.",
    form_error_email: "Please enter a valid email address.",
    form_error_geocode_pending: "Address saved. Coordinates can be added during moderation.",
    form_section_event_details: "Event Details",
    form_section_submitter_details: "Your Details",
    form_label_name: "Event Name",
    form_label_location_name: "Location",
    form_label_address: "Address",
    form_label_postal_code: "Postal code",
    form_label_city: "City",
    form_label_country: "Country",
    form_label_event_date: "Date",
    form_label_event_time: "Time",
    form_label_genre: "Genre",
    form_label_price_text: "Price (EUR)",
    form_label_description: "Description",
    form_label_main_image: "Main image (optional)",
    form_label_submitted_by: "Your Name (Submitter)",
    form_label_contact_email: "Contact email",
    form_hint_main_image: "1 image (JPG/PNG/WebP), max. 5 MB",
    form_hint_price_eur: "Please enter amount in euros, e.g. 25 or 25 EUR.",
    form_placeholder_name: "e.g. Summer Beats Night",
    form_placeholder_location_name: "e.g. Beach Club",
    form_placeholder_address: "e.g. Paseo Maritimo 1",
    form_placeholder_postal_code: "e.g. 29660",
    form_placeholder_city: "e.g. Marbella",
    form_placeholder_country: "e.g. Spain",
    form_placeholder_event_time: "e.g. 20:30",
    form_placeholder_genre: "e.g. Latin, DJ Set",
    form_placeholder_price_text: "e.g. 25 EUR",
    form_placeholder_description: "Short event description",
    create_title: "New event",
    create_toggle: "Add event",
    create_name: "Name",
    create_location: "Location",
    create_postal_code: "Postal code",
    create_city: "City",
    create_country: "Country",
    create_date: "Date",
    create_time: "Time",
    create_genre: "Genre",
    create_price: "Price text",
    create_lat: "Latitude",
    create_lng: "Longitude",
    create_description: "Description",
    create_submit: "Save"
  },
  es: {
    hero_title: "Descubre dónde realmente suena la música.",
    hero_subtitle: "Artistas locales, eventos y lugares únicos – todo en un solo mapa.",
    hero_chip_fallback: "Descubre música en vivo",
    hero_chip_curated: "Curado para noches de verano y city vibes",
    hero_chip_quality: "En vivo, local y actualizado cada semana",
    filters_title: "Busqueda y filtros",
    filters_subtitle: "Busca por evento, ciudad y fecha, y afina por genero.",
    filter_search: "Buscar",
    filter_search_placeholder: "Evento, ciudad, local, género...",
    filter_city: "Ciudad",
    filter_city_all: "Todas las ciudades",
    filter_date: "Fecha",
    filter_date_all: "Todas las fechas",
    filter_genre: "Géneros",
    filter_genre_all: "Todos los géneros",
    filter_reset: "Restablecer filtros",
    list_title: "Lista de eventos",
    result_count: "{count} resultados",
    status_loading: "Cargando eventos de Supabase...",
    status_connected: "Supabase conectado. {count} eventos cargados.",
    status_no_data: "Sin datos de Supabase. Eventos demo cargados.",
    status_error: "Supabase no disponible: {message}. Demo activa.",
    status_filtered: "{shown} de {total} eventos ({source}).",
    source_supabase: "Supabase",
    source_demo_no_data: "Fallback demo (Sin datos de Supabase)",
    source_demo_error: "Fallback demo (Error de Supabase)",
    no_events_found: "No se encontraron eventos.",
    details_empty: "Selecciona un evento en la lista o en el mapa.",
    details_location: "Ubicación",
    details_date: "Fecha",
    details_genre: "Género",
    details_price: "Precio",
    details_navigate: "Iniciar ruta",
    details_free: "Entrada gratuita",
    details_no_description: "No hay descripción disponible.",
    details_time_fallback: "Hora por confirmar",
    navigation_unavailable: "No hay datos de navegación disponibles para este evento.",
    button_all: "Todos",
    submit_cta: "Enviar evento",
    form_title: "Enviar evento",
    form_hint: "Tu evento será revisado antes de publicarse.",
    form_submit: "Enviar evento",
    form_loading: "Guardando...",
    form_success: "Tu evento fue enviado y será revisado antes de publicarse.",
    form_error_generic: "No se pudo guardar el evento.",
    form_error_rls_submit:
      "Permiso denegado por la seguridad de base de datos (RLS). Ejecuta/actualiza supabase-rls.sql para permitir envíos en estado pending.",
    form_error_geocoding_failed: "No se pudo geocodificar la dirección. Revisa los datos.",
    form_error_image_required: "Selecciona una imagen principal.",
    form_error_image_type: "Sube una imagen válida (JPG, PNG o WebP).",
    form_error_image_size: "La imagen es demasiado grande. Máximo 5 MB.",
    form_error_image_upload: "La carga de imagen falló. Inténtalo de nuevo.",
    form_error_image_cleanup: "Nota: la imagen subida no se pudo limpiar automáticamente.",
    form_error_required: "Completa los campos obligatorios.",
    form_error_email: "Ingresa un correo electrónico válido.",
    form_error_geocode_pending: "Dirección guardada. Las coordenadas se pueden completar durante la moderación.",
    form_section_event_details: "Detalles del evento",
    form_section_submitter_details: "Tus datos",
    form_label_name: "Nombre del evento",
    form_label_location_name: "Ubicación",
    form_label_address: "Dirección",
    form_label_postal_code: "Código postal",
    form_label_city: "Ciudad",
    form_label_country: "País",
    form_label_event_date: "Fecha",
    form_label_event_time: "Hora",
    form_label_genre: "Género",
    form_label_price_text: "Precio (EUR)",
    form_label_description: "Descripción",
    form_label_main_image: "Imagen principal (opcional)",
    form_label_submitted_by: "Tu nombre (remitente)",
    form_label_contact_email: "Correo de contacto",
    form_hint_main_image: "1 imagen (JPG/PNG/WebP), máx. 5 MB",
    form_hint_price_eur: "Introduce el importe en euros, p. ej. 25 o 25 EUR.",
    form_placeholder_name: "p. ej. Summer Beats Night",
    form_placeholder_location_name: "p. ej. Beach Club",
    form_placeholder_address: "p. ej. Paseo Marítimo 1",
    form_placeholder_postal_code: "p. ej. 29660",
    form_placeholder_city: "p. ej. Marbella",
    form_placeholder_country: "p. ej. España",
    form_placeholder_event_time: "p. ej. 20:30",
    form_placeholder_genre: "p. ej. Latin, DJ Set",
    form_placeholder_price_text: "p. ej. 25 EUR",
    form_placeholder_description: "Descripción breve del evento",
    create_title: "Nuevo evento",
    create_toggle: "Añadir evento",
    create_name: "Nombre",
    create_location: "Ubicación",
    create_postal_code: "Código postal",
    create_city: "Ciudad",
    create_country: "País",
    create_date: "Fecha",
    create_time: "Hora",
    create_genre: "Género",
    create_price: "Precio",
    create_lat: "Latitud",
    create_lng: "Longitud",
    create_description: "Descripción",
    create_submit: "Guardar"
  }
};

const LOCALE_MAP = {
  de: "de-DE",
  en: "en-US",
  es: "es-ES"
};

const SUPPORTED_LANGUAGES = [
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" }
];

const state = {
  allEvents: [],
  filteredEvents: [],
  selectedEventId: null,
  sourceType: "unknown",
  availableGenres: [],
  availableDates: [],
  activeGenres: new Set(),
  lang: "de",
  debug: {
    enabled: Boolean(window.PARTYRADAR_DEV_DEBUG),
    tableName: "events",
    supabaseLoadedCount: 0,
    hasError: false,
    errorMessage: "",
    fallbackReason: ""
  }
};

const dom = {
  htmlRoot: document.documentElement,
  languageSwitch: document.getElementById("languageSwitch"),
  submitModal: document.getElementById("submitModal"),
  openSubmitModal: document.getElementById("openSubmitModal"),
  closeSubmitModal: document.getElementById("closeSubmitModal"),
  status: document.getElementById("status"),
  eventList: document.getElementById("eventList"),
  eventDetails: document.getElementById("eventDetails"),
  resultCount: document.getElementById("resultCount"),
  filtersForm: document.getElementById("filtersForm"),
  searchInput: document.getElementById("searchInput"),
  cityFilter: document.getElementById("cityFilter"),
  dateFilter: document.getElementById("dateFilter"),
  genreFilterGroup: document.getElementById("genreFilterGroup"),
  clearGenresButton: document.getElementById("clearGenresButton"),
  resetFilters: document.getElementById("resetFilters"),
  eventForm: document.getElementById("eventForm"),
  formFeedback: document.getElementById("formFeedback"),
  formSubmitButton: document.getElementById("formSubmitButton"),
  formName: document.getElementById("formName"),
  formLocationName: document.getElementById("formLocationName"),
  formAddress: document.getElementById("formAddress"),
  formPostalCode: document.getElementById("formPostalCode"),
  formCity: document.getElementById("formCity"),
  formCountry: document.getElementById("formCountry"),
  formDate: document.getElementById("formDate"),
  formTime: document.getElementById("formTime"),
  formGenre: document.getElementById("formGenre"),
  formPrice: document.getElementById("formPrice"),
  formMainImage: document.getElementById("formMainImage"),
  formSubmittedBy: document.getElementById("formSubmittedBy"),
  formContactEmail: document.getElementById("formContactEmail"),
  formDescription: document.getElementById("formDescription")
};

let map;
let markersLayer;
const markersByEventId = new Map();
const markerEventsById = new Map();

function resolveLanguage(langValue) {
  return I18N[langValue] ? langValue : "de";
}

function availableLanguageCodes() {
  return SUPPORTED_LANGUAGES.map((language) => language.code);
}

function resolveLanguageFromBrowser(defaultLang = "de") {
  const candidates = [
    navigator.language,
    ...(Array.isArray(navigator.languages) ? navigator.languages : [])
  ]
    .filter(Boolean)
    .map((lang) => String(lang).toLowerCase());

  for (const candidate of candidates) {
    const shortCode = candidate.split("-")[0];
    if (availableLanguageCodes().includes(shortCode)) {
      return shortCode;
    }
  }

  return defaultLang;
}

function t(key, params = {}) {
  const table = I18N[state.lang] || I18N.de;
  const fallback = I18N.de[key] || key;
  const template = table[key] || fallback;
  return Object.entries(params).reduce(
    (text, [paramKey, paramValue]) => text.replaceAll(`{${paramKey}}`, String(paramValue)),
    template
  );
}

function applyStaticTranslations() {
  dom.htmlRoot.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  renderLanguageControls();
}

function renderLanguageControls() {
  if (dom.languageSwitch) {
    dom.languageSwitch.innerHTML = "";
    SUPPORTED_LANGUAGES.forEach((language) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "language-switch__button";
      button.dataset.langSwitch = language.code;
      button.textContent = language.short;
      const isActive = language.code === state.lang;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
      dom.languageSwitch.append(button);
    });
  }
}

function switchLanguage(nextLangCode) {
  const nextLang = resolveLanguage(nextLangCode);
  if (nextLang === state.lang) return;
  state.lang = nextLang;
  applyStaticTranslations();
  updateFilterOptions();
  applyFiltersFromQuery();
  applyFilters();
  if (state.selectedEventId) {
    const selected = state.filteredEvents.find((event) => event.id === state.selectedEventId) || null;
    renderEventDetails(selected);
  } else {
    renderEventDetails(null);
  }
  updateUrlFromFilters();
}

function getLocale() {
  return LOCALE_MAP[state.lang] || LOCALE_MAP.de;
}

function setStatus(message, tone = "loading") {
  dom.status.className = `status status--${tone}`;
  dom.status.textContent = message;
}

function setResultCount(count) {
  dom.resultCount.textContent = t("result_count", { count });
}

function setFormFeedback(message, tone = "info") {
  if (!dom.formFeedback) return;
  dom.formFeedback.hidden = !message;
  dom.formFeedback.textContent = message || "";
  dom.formFeedback.className = "add-event-message";
  if (message && tone === "error") dom.formFeedback.classList.add("is-error");
  if (message && tone === "success") dom.formFeedback.classList.add("is-success");
}

function isRlsInsertError(error) {
  const text = String(error?.message || "").toLowerCase();
  return text.includes("row-level security policy");
}

function setFormSubmitting(isSubmitting) {
  if (!dom.formSubmitButton) return;
  dom.formSubmitButton.disabled = isSubmitting;
  dom.formSubmitButton.textContent = isSubmitting ? t("form_loading") : t("form_submit");
}

function normalizeStatus(statusValue) {
  const normalized = String(statusValue || "").trim().toLowerCase();
  if (normalized === "approved") return "approved";
  if (normalized === "rejected") return "rejected";
  if (normalized === "pending") return "pending";
  return "approved";
}

function isApprovedEvent(event) {
  return normalizeStatus(event.status) === "approved";
}

function parseCoordinateValue(rawValue) {
  if (rawValue === null || rawValue === undefined || rawValue === "") return null;
  const normalized = String(rawValue).trim().replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeEvent(event, index) {
  const lat = parseCoordinateValue(event.lat ?? event.latitude ?? event.latitude_decimal ?? null);
  const lng = parseCoordinateValue(event.lng ?? event.longitude ?? event.longitude_decimal ?? null);
  const address = String(event.address || event.street || "").trim();
  const postal_code = String(event.postal_code || event.zip || "").trim();
  const geocodingQuery = String(event.geocoding_query || "").trim();
  const composedAddress = [address, postal_code, event.city, event.country]
    .filter(Boolean)
    .join(", ");
  const normalizedGeocodingQuery = geocodingQuery || composedAddress;
  return {
    id: String(event.id ?? `event-${index}`),
    name: event.name || event.title || "Untitled Event",
    location_name: event.location_name || event.location || "Unknown venue",
    address: event.address || event.street || "",
    postal_code,
    city: event.city || event.location_city || "",
    country: event.country || event.country_name || "",
    event_date: event.event_date || event.date || "",
    event_time: event.event_time || event.time || "",
    genre: event.genre || event.music_genre || "",
    price_text: event.price_text || event.price || t("details_free"),
    description: event.description || t("details_no_description"),
    image_url: event.image_url || event.image || "",
    address,
    status: normalizeStatus(event.status),
    contact_email: event.contact_email || "",
    submitted_by: event.submitted_by || "",
    verification_notes: event.verification_notes || "",
    geocoding_query: normalizedGeocodingQuery || "",
    lat,
    lng
  };
}

function readFormPayload() {
  const normalizePriceText = (rawValue) => {
    const raw = String(rawValue || "").trim();
    if (!raw) return "";
    if (/(€|\beur\b)/i.test(raw)) return raw;
    if (/[a-zA-Z]/.test(raw)) return raw;
    return `${raw} EUR`;
  };

  return {
    name: dom.formName.value.trim(),
    location_name: dom.formLocationName.value.trim(),
    address: dom.formAddress?.value.trim() || "",
    postal_code: dom.formPostalCode?.value.trim() || "",
    city: dom.formCity.value.trim(),
    country: dom.formCountry.value.trim(),
    event_date: dom.formDate.value,
    event_time: dom.formTime.value,
    genre: dom.formGenre.value.trim(),
    price_text: normalizePriceText(dom.formPrice.value),
    main_image: dom.formMainImage?.files?.[0] || null,
    submitted_by: dom.formSubmittedBy.value.trim(),
    contact_email: dom.formContactEmail.value.trim(),
    description: dom.formDescription.value.trim(),
    image_url: null,
    lat: null,
    lng: null
  };
}

function validateFormPayload(payload) {
  const requiredFilled =
    payload.name &&
    payload.location_name &&
    payload.address &&
    payload.postal_code &&
    payload.city &&
    payload.country &&
    payload.event_date &&
    payload.genre &&
    payload.submitted_by &&
    payload.contact_email;
  if (!requiredFilled) {
    return { valid: false, message: t("form_error_required") };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(payload.contact_email)) {
    return { valid: false, message: t("form_error_email") };
  }
  if (payload.main_image) {
    if (!ALLOWED_EVENT_IMAGE_MIME_TYPES.has(payload.main_image.type)) {
      return { valid: false, message: t("form_error_image_type") };
    }
    if (payload.main_image.size > MAX_EVENT_IMAGE_BYTES) {
      return { valid: false, message: t("form_error_image_size") };
    }
  }
  return { valid: true, message: "" };
}

function clearEventForm() {
  if (!dom.eventForm) return;
  dom.eventForm.reset();
  if (dom.formMainImage) dom.formMainImage.value = "";
}

function buildInsertPayload(payload) {
  // Address is collected now; geocoding can later resolve this into coordinates.
  const geocoding_query = buildGeocodingQuery(payload);

  return {
    name: payload.name,
    location_name: payload.location_name,
    address: payload.address || null,
    postal_code: payload.postal_code || null,
    city: payload.city,
    country: payload.country || null,
    event_date: payload.event_date,
    event_time: payload.event_time || null,
    genre: payload.genre,
    price_text: payload.price_text || null,
    description: payload.description || null,
    image_url: payload.image_url || null,
    contact_email: payload.contact_email,
    submitted_by: payload.submitted_by,
    status: "pending",
    verification_notes: null,
    geocoding_query: geocoding_query || null,
    lat: payload.lat,
    lng: payload.lng
  };
}

function sanitizeFileName(fileName) {
  const raw = String(fileName || "").trim();
  const normalized = raw.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalized.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function fileExtension(fileName) {
  const parts = String(fileName || "").split(".");
  if (parts.length < 2) return "jpg";
  const ext = String(parts.pop() || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  return ext || "jpg";
}

function buildEventImagePath(file) {
  const date = new Date();
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const safeBase = sanitizeFileName((file?.name || "event-image").replace(/\.[^.]+$/, ""));
  const ext = fileExtension(file?.name);
  const random = Math.random().toString(36).slice(2, 10);
  return `pending/${yyyy}/${mm}/${dd}/${Date.now()}-${random}-${safeBase}.${ext}`;
}

async function uploadEventImage(client, file) {
  const path = buildEventImagePath(file);
  const { error: uploadError } = await client.storage
    .from(EVENT_IMAGES_BUCKET)
    .upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false
    });

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl }
  } = client.storage.from(EVENT_IMAGES_BUCKET).getPublicUrl(path);

  if (!publicUrl) {
    throw new Error("Could not resolve public image URL");
  }

  return { path, publicUrl };
}

async function deleteUploadedEventImage(client, storagePath) {
  if (!storagePath) return;
  const { error } = await client.storage.from(EVENT_IMAGES_BUCKET).remove([storagePath]);
  if (error) throw error;
}

async function geocodeAddressWithNominatim(query) {
  const endpoint = new URL("https://nominatim.openstreetmap.org/search");
  endpoint.searchParams.set("format", "jsonv2");
  endpoint.searchParams.set("limit", "1");
  endpoint.searchParams.set("q", query);

  const response = await fetch(endpoint.toString(), {
    headers: {
      Accept: "application/json",
      "Accept-Language": "de,en,es",
      "User-Agent": "PartyRadar/1.0 (event-submission geocoding)"
    }
  });

  if (!response.ok) {
    throw new Error(`Geocoding HTTP ${response.status}`);
  }

  const data = await response.json();
  const first = Array.isArray(data) ? data[0] : null;
  if (!first) return null;

  const lat = Number(first.lat);
  const lng = Number(first.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}

async function geocodeAddressWithMapbox(query) {
  if (!MAPBOX_ACCESS_TOKEN) {
    return null;
  }

  const endpoint = new URL(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`
  );
  endpoint.searchParams.set("access_token", MAPBOX_ACCESS_TOKEN);
  endpoint.searchParams.set("limit", "1");
  endpoint.searchParams.set("types", "address,place,poi");
  endpoint.searchParams.set("language", "de,en,es");

  const response = await fetch(endpoint.toString(), {
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Mapbox geocoding HTTP ${response.status}`);
  }

  const data = await response.json();
  const first = Array.isArray(data?.features) ? data.features[0] : null;
  if (!first || !Array.isArray(first.center) || first.center.length < 2) return null;

  const lng = Number(first.center[0]);
  const lat = Number(first.center[1]);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}

function buildGeocodingQuery(payload) {
  return [
    payload.address,
    payload.postal_code,
    payload.city,
    payload.country
  ]
    .filter(Boolean)
    .join(", ");
}

function normalizeCountryForGeocoding(countryValue) {
  const raw = String(countryValue || "").trim();
  if (!raw) return "";

  const normalized = raw.toLowerCase();
  if (["deutschland", "germany", "alemania"].includes(normalized)) return "Germany";
  if (["spanien", "spain", "espana", "españa"].includes(normalized)) return "Spain";
  if (["frankreich", "france", "francia"].includes(normalized)) return "France";
  if (["italien", "italy", "italia"].includes(normalized)) return "Italy";
  if (["österreich", "oesterreich", "austria", "austria"].includes(normalized)) return "Austria";
  if (["schweiz", "switzerland", "suiza"].includes(normalized)) return "Switzerland";
  if (["niederlande", "netherlands", "paises bajos", "países bajos", "holland"].includes(normalized)) {
    return "Netherlands";
  }
  return raw;
}

function buildGeocodingQueries(payload) {
  const address = String(payload.address || "").trim();
  const postalCode = String(payload.postal_code || "").trim();
  const city = String(payload.city || "").trim();
  const country = normalizeCountryForGeocoding(payload.country);

  const queries = [
    [address, postalCode, city, country],
    [address, city, country],
    [postalCode, city, country],
    [city, postalCode, country],
    [city, country]
  ]
    .map((parts) => parts.filter(Boolean).join(", "))
    .filter(Boolean);

  return [...new Set(queries)];
}

const GEOCODING_PROVIDERS = {
  nominatim: geocodeAddressWithNominatim,
  mapbox: geocodeAddressWithMapbox
};

let lastGeocodingRequestAt = 0;

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function geocodingRateLimitWait() {
  if (!GEOCODING_MIN_INTERVAL_MS) return;
  const elapsed = Date.now() - lastGeocodingRequestAt;
  if (elapsed >= GEOCODING_MIN_INTERVAL_MS) return;
  await sleep(GEOCODING_MIN_INTERVAL_MS - elapsed);
}

async function geocodeWithRetry(provider, query) {
  const maxAttempts = Math.max(1, GEOCODING_MAX_RETRIES + 1);
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await geocodingRateLimitWait();
      const result = await provider(query);
      lastGeocodingRequestAt = Date.now();
      return result;
    } catch (error) {
      lastGeocodingRequestAt = Date.now();
      if (attempt >= maxAttempts) throw error;
      await sleep(250 * attempt);
    }
  }
  return null;
}

async function resolveCoordinatesForPayload(payload) {
  if (!ENABLE_AUTO_GEOCODING) return payload;
  const queries = buildGeocodingQueries(payload);
  if (!queries.length) {
    throw new Error("Missing geocoding address fields");
  }

  const provider = GEOCODING_PROVIDERS[GEOCODING_PROVIDER];
  if (!provider) {
    throw new Error("Geocoding provider unavailable");
  }

  try {
    for (const query of queries) {
      const coordinates = await geocodeWithRetry(provider, query);
      if (!coordinates) continue;
      return {
        ...payload,
        geocoding_query: query,
        lat: coordinates.lat,
        lng: coordinates.lng
      };
    }
    throw new Error("No geocoding result");
  } catch (error) {
    devDebugLog("[PartyRadar Debug] Geocoding failed:", error);
    throw new Error(error?.message || "Geocoding failed");
  }
}

function supabaseErrorText(error) {
  return [error?.message, error?.details, error?.hint]
    .filter(Boolean)
    .join(" | ");
}

function devDebugLog(...args) {
  if (!state.debug.enabled) return;
  console.log(...args);
}

function normalizeColumnName(rawColumn) {
  if (!rawColumn) return "";
  const cleaned = String(rawColumn).replace(/["']/g, "").trim();
  if (!cleaned) return "";
  const pathParts = cleaned.split(".");
  return pathParts[pathParts.length - 1].trim();
}

function extractMissingColumnFromSupabaseError(error) {
  const errorText = supabaseErrorText(error);
  if (!errorText) return null;

  const matchers = [
    /could not find the ['"]([^'"]+)['"] column/i,
    /could not find column ['"]([^'"]+)['"]/i,
    /column ["']([^"']+)["'] does not exist/i
  ];

  for (const pattern of matchers) {
    const match = errorText.match(pattern);
    const normalized = normalizeColumnName(match?.[1]);
    if (normalized) return normalized;
  }

  return null;
}

async function insertEventWithSchemaFallback(client, payload) {
  const tableName = "events";
  // Avoid returning inserted rows here because strict SELECT RLS policies
  // (e.g. only approved events) can reject the return payload even when
  // the INSERT itself is valid.
  const tryInsert = async (row) => client.from(tableName).insert([row]);
  const fallbackPayload = { ...payload };
  const removedColumns = new Set();
  const schemaFallbackPriority = [
    "address",
    "postal_code",
    "geocoding_query",
    "verification_notes",
    "submitted_by",
    "contact_email",
    "status",
    "country",
    "event_time",
    "price_text",
    "description"
  ];
  let lastResult = null;
  const maxAttempts = Object.keys(fallbackPayload).length + 1;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const result = await tryInsert(fallbackPayload);
    lastResult = result;
    if (!result.error) return result;

    const errorText = supabaseErrorText(result.error);
    let missingColumn = extractMissingColumnFromSupabaseError(result.error);
    if (!missingColumn && /schema cache/i.test(errorText)) {
      missingColumn = schemaFallbackPriority.find(
        (key) => Object.prototype.hasOwnProperty.call(fallbackPayload, key) && !removedColumns.has(key)
      );
    }
    if (!missingColumn) return result;
    if (!Object.prototype.hasOwnProperty.call(fallbackPayload, missingColumn)) return result;
    if (removedColumns.has(missingColumn)) return result;

    removedColumns.add(missingColumn);
    delete fallbackPayload[missingColumn];
    console.warn(`[PartyRadar Debug] Retrying insert without missing column: ${missingColumn}`);
  }

  return lastResult || { data: null, error: { message: "Insert failed" } };
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
    return a.localeCompare(b, getLocale());
  });
}

function collectUniqueGenres(events) {
  const set = new Set();
  events.forEach((event) => splitGenres(event.genre).forEach((genre) => set.add(genre)));
  return sortGenres(set);
}

function collectUniqueDates(events) {
  return [...new Set(events.map((event) => event.event_date).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );
}

function iconForGenre(genre) {
  return GENRE_ICON_MAP[genre] || "🎵";
}

function formatDate(dateString, includeWeekday = true) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  };
  if (includeWeekday) options.weekday = "short";
  return new Intl.DateTimeFormat(getLocale(), options).format(date);
}

function formatDateTime(event) {
  const base = formatDate(event.event_date, true);
  const timePart = event.event_time ? event.event_time : t("details_time_fallback");
  return `${base} ${timePart}`;
}

function formatPrice(priceText) {
  if (!priceText) return t("details_free");
  const normalized = String(priceText).trim().toLowerCase();
  if (normalized === "free" || normalized === "0" || normalized === "0 eur") return t("details_free");
  return String(priceText);
}

function formatEventPlace(event) {
  const parts = [event.location_name, event.address, event.city].filter(Boolean);
  return parts.length ? parts.join(", ") : "-";
}

function buildNavigationAddressQuery(event) {
  const strictAddressQuery = [event.address, event.city, event.country]
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .join(", ");
  if (strictAddressQuery) return strictAddressQuery;

  // Fallback for legacy records where only geocoding_query/postal data exists.
  return [event.geocoding_query, event.address, event.postal_code, event.city, event.country, event.location_name]
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .join(", ");
}

function resolveNavigationDestination(event) {
  if (Number.isFinite(event?.lat) && Number.isFinite(event?.lng)) {
    return {
      type: "coordinates",
      lat: event.lat,
      lng: event.lng
    };
  }

  const addressQuery = buildNavigationAddressQuery(event);
  if (!addressQuery) return null;

  return {
    type: "address",
    query: addressQuery
  };
}

function buildNavigationUrl(event, providerName = DEFAULT_NAVIGATION_PROVIDER) {
  const destination = resolveNavigationDestination(event);
  if (!destination) return "";

  const provider = NAVIGATION_URL_BUILDERS[providerName] || NAVIGATION_URL_BUILDERS.google;
  if (destination.type === "coordinates") return provider.byCoordinates(destination);
  return provider.byAddress(destination.query);
}

function openNavigationForEvent(event, providerName = DEFAULT_NAVIGATION_PROVIDER) {
  const url = buildNavigationUrl(event, providerName);
  if (!url) {
    setStatus(t("navigation_unavailable"), "warning");
    return;
  }

  const openedWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (!openedWindow) {
    window.location.href = url;
  }
}

function eventSearchText(event) {
  return [event.name, event.location_name, event.address, event.city, event.genre, event.description]
    .join(" ")
    .toLowerCase();
}

function sourceLabel() {
  if (state.sourceType === "supabase") return t("source_supabase");
  if (state.sourceType === "demo-no-data") return t("source_demo_no_data");
  if (state.sourceType === "demo-error") return t("source_demo_error");
  return "-";
}

function sourceTone() {
  return state.sourceType === "supabase" ? "ok" : "warning";
}

function getGenreByLowerMap() {
  const mapByLower = new Map();
  state.availableGenres.forEach((genre) => mapByLower.set(genre.toLowerCase(), genre));
  return mapByLower;
}

function normalizeRequestedGenres(rawGenres) {
  const mapByLower = getGenreByLowerMap();
  const selected = [];
  rawGenres.forEach((genre) => {
    const mapped = mapByLower.get(genre.toLowerCase().trim());
    if (mapped) selected.push(mapped);
  });
  return [...new Set(selected)];
}

function readQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    lang: params.get("lang") || "",
    q: params.get("q") || "",
    city: params.get("city") || "",
    date: params.get("date") || "",
    genres: (params.get("genres") || "")
      .split(",")
      .map((genre) => genre.trim())
      .filter(Boolean)
  };
}

function updateUrlFromFilters() {
  const params = new URLSearchParams();
  const search = dom.searchInput.value.trim();
  const city = dom.cityFilter.value;
  const date = dom.dateFilter.value;

  if (state.lang !== "de") params.set("lang", state.lang);
  if (search) params.set("q", search);
  if (city) params.set("city", city);
  if (date) params.set("date", date);
  if (state.activeGenres.size) params.set("genres", [...state.activeGenres].join(","));

  const queryString = params.toString();
  const nextUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
  window.history.replaceState({}, "", nextUrl);
}

function supabaseClient() {
  return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

function renderGenreFilter() {
  if (!dom.genreFilterGroup) return;
  dom.genreFilterGroup.innerHTML = "";
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
    a.localeCompare(b, getLocale())
  );
  state.availableDates = collectUniqueDates(state.allEvents);
  state.availableGenres = collectUniqueGenres(state.allEvents);

  dom.cityFilter.innerHTML = "";
  const allCitiesOption = document.createElement("option");
  allCitiesOption.value = "";
  allCitiesOption.textContent = t("filter_city_all");
  dom.cityFilter.append(allCitiesOption);
  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    dom.cityFilter.append(option);
  });

  dom.dateFilter.innerHTML = "";
  const allDatesOption = document.createElement("option");
  allDatesOption.value = "";
  allDatesOption.textContent = t("filter_date_all");
  dom.dateFilter.append(allDatesOption);
  state.availableDates.forEach((date) => {
    const option = document.createElement("option");
    option.value = date;
    option.textContent = formatDate(date, false);
    dom.dateFilter.append(option);
  });

  state.activeGenres.forEach((genre) => {
    if (!state.availableGenres.includes(genre)) state.activeGenres.delete(genre);
  });
  renderGenreFilter();
}

function applyFiltersFromQuery() {
  const query = readQueryParams();
  if (query.q) dom.searchInput.value = query.q;
  if (query.city && [...dom.cityFilter.options].some((option) => option.value === query.city)) {
    dom.cityFilter.value = query.city;
  }
  if (query.date && [...dom.dateFilter.options].some((option) => option.value === query.date)) {
    dom.dateFilter.value = query.date;
  }
  state.activeGenres = new Set(normalizeRequestedGenres(query.genres));
  renderGenreFilter();
}

function getActiveFilters() {
  return {
    search: dom.searchInput.value.trim().toLowerCase(),
    city: dom.cityFilter.value,
    date: dom.dateFilter.value,
    genres: new Set([...state.activeGenres].map((genre) => genre.toLowerCase()))
  };
}

function eventMatchesGenres(event, activeGenresLower) {
  if (!activeGenresLower.size) return true;
  const eventGenresLower = splitGenres(event.genre).map((genre) => genre.toLowerCase());
  return eventGenresLower.some((genre) => activeGenresLower.has(genre));
}

function applyFilters() {
  const filters = getActiveFilters();
  state.filteredEvents = state.allEvents.filter((event) => {
    if (filters.city && event.city !== filters.city) return false;
    if (filters.date && event.event_date !== filters.date) return false;
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
    t("status_filtered", {
      shown: state.filteredEvents.length,
      total: state.allEvents.length,
      source: sourceLabel()
    }),
    sourceTone()
  );
  updateUrlFromFilters();
}

function createEventCard(event) {
  const card = document.createElement("article");
  card.className = "event-card";
  card.dataset.eventId = event.id;
  const navigationUrl = buildNavigationUrl(event);
  card.innerHTML = `
    <div class="event-card__header">
      <h4>${event.name}</h4>
      <span>${event.genre || "-"}</span>
    </div>
    <div class="event-card__meta">
      <span>${formatEventPlace(event)}</span>
      <span>${formatDateTime(event)}</span>
      <span>${formatPrice(event.price_text)}</span>
    </div>
    <div class="event-card__actions">
      <button
        type="button"
        class="button-secondary button-secondary--primary event-card__navigate"
        data-action="navigate-from-list"
        ${navigationUrl ? "" : "disabled"}
      >
        ${t("details_navigate")}
      </button>
    </div>
  `;
  card.addEventListener("click", (clickEvent) => {
    const target = clickEvent.target instanceof Element ? clickEvent.target : null;
    const navigateButton = target?.closest("button[data-action='navigate-from-list']");
    if (navigateButton) {
      clickEvent.preventDefault();
      clickEvent.stopPropagation();
      openNavigationForEvent(event);
      return;
    }

    selectEvent(event.id, { flyTo: true, openPopup: true, scrollIntoView: false });
  });
  return card;
}

function renderEventList() {
  dom.eventList.innerHTML = "";
  setResultCount(state.filteredEvents.length);

  if (!state.filteredEvents.length) {
    dom.eventList.innerHTML = `<p class="event-list__empty">${t("no_events_found")}</p>`;
    dom.eventDetails.className = "event-details event-details--empty";
    dom.eventDetails.textContent = t("no_events_found");
    return;
  }

  state.filteredEvents.forEach((event) => {
    const card = createEventCard(event);
    if (event.id === state.selectedEventId) card.classList.add("event-card--active");
    dom.eventList.append(card);
  });
}

function createMarkerIcon(event, active = false) {
  const primaryGenre = splitGenres(event.genre)[0] || "";
  return L.divIcon({
    className: "marker-pin-wrap",
    html: `<div class="marker-pin ${active ? "marker-pin--active" : ""}"><span>${iconForGenre(primaryGenre)}</span></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -28]
  });
}

function syncActiveMarker(eventId) {
  markersByEventId.forEach((marker, id) => {
    const event = markerEventsById.get(id);
    marker.setIcon(createMarkerIcon(event, id === eventId));
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
  const locationLine = [event.location_name, event.address, event.city].filter(Boolean).join(", ");
  const navigationUrl = buildNavigationUrl(event);
  const navigationLink = navigationUrl
    ? `<a class="popup__route-link" href="${navigationUrl}" target="_blank" rel="noopener noreferrer">${t("details_navigate")}</a>`
    : "";
  return `
    <div class="popup">
      <strong>${event.name}</strong><br>
      <span>${locationLine || "-"}</span><br>
      <span>${formatDateTime(event)}</span><br>
      <span>${event.genre || "-"} - ${formatPrice(event.price_text)}</span>
      ${navigationLink}
    </div>
  `;
}

function renderMapMarkers() {
  markersLayer.clearLayers();
  markersByEventId.clear();
  markerEventsById.clear();
  const bounds = [];

  state.filteredEvents.forEach((event) => {
    if (event.lat === null || event.lng === null) return;
    const marker = L.marker([event.lat, event.lng], {
      title: event.name,
      icon: createMarkerIcon(event, false)
    })
      .bindPopup(markerPopupHtml(event))
      .on("click", () => selectEvent(event.id, { flyTo: false, openPopup: false, scrollIntoView: true }));

    markersLayer.addLayer(marker);
    markersByEventId.set(event.id, marker);
    markerEventsById.set(event.id, event);
    bounds.push([event.lat, event.lng]);
  });

  if (bounds.length) map.fitBounds(bounds, { padding: [30, 30], maxZoom: 13 });
  else map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);

  syncActiveMarker(state.selectedEventId);
}

function renderEventDetails(event) {
  if (!event) {
    dom.eventDetails.className = "event-details event-details--empty";
    dom.eventDetails.textContent = t("details_empty");
    return;
  }

  dom.eventDetails.className = "event-details event-details--filled";
  const locationName = String(event.location_name || "").trim();
  const addressLine = [event.address, event.postal_code, event.city, event.country]
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .join(", ");
  const fallbackLocationLine = [locationName, event.address, event.city].filter(Boolean).join(", ");
  const navigationUrl = buildNavigationUrl(event);
  dom.eventDetails.innerHTML = `
    <div class="event-details__media">
      ${
        event.image_url
          ? `<img class="event-details__image" src="${event.image_url}" alt="${event.name}" loading="lazy">`
          : `<div class="event-details__image-fallback" aria-hidden="true"><span>🎵</span></div>`
      }
    </div>
    <div class="event-details__header">
      <h4>${event.name}</h4>
      <div class="event-details__badges">
        <span class="event-details__badge">${event.genre || "-"}</span>
        <span class="event-details__badge">${formatDateTime(event)}</span>
      </div>
    </div>
    <div class="event-details__actions event-details__actions--top">
      ${
        navigationUrl
          ? `
      <a
        class="button-secondary button-secondary--primary button-secondary--navigate"
        href="${navigationUrl}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ${t("details_navigate")}
      </a>
      `
          : `
      <button
        type="button"
        class="button-secondary button-secondary--primary button-secondary--navigate"
        disabled
      >
        ${t("details_navigate")}
      </button>
      `
      }
    </div>
    <div class="event-details__grid">
      <article class="event-details__card">
        <h5>${t("details_location")}</h5>
        <p>${locationName || fallbackLocationLine || "-"}</p>
        <p class="event-details__muted">${addressLine || "-"}</p>
      </article>
      <article class="event-details__card">
        <h5>${t("details_price")}</h5>
        <p>${formatPrice(event.price_text)}</p>
      </article>
    </div>
    <article class="event-details__card event-details__card--description">
      <h5>${t("form_label_description")}</h5>
      <p>${event.description || t("details_no_description")}</p>
    </article>
  `;
}

function selectEvent(eventId, options = { flyTo: false, openPopup: false, scrollIntoView: false }) {
  state.selectedEventId = eventId;
  const event = state.filteredEvents.find((item) => item.id === eventId);

  document.querySelectorAll(".event-card").forEach((card) => {
    const isActive = card.dataset.eventId === eventId;
    card.classList.toggle("event-card--active", isActive);
    if (isActive && options.scrollIntoView) {
      card.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  });

  syncActiveMarker(eventId);
  renderEventDetails(event || null);
  if (!event) return;

  const marker = markersByEventId.get(event.id);
  if (marker && event.lat !== null && event.lng !== null) {
    if (options.flyTo) map.flyTo([event.lat, event.lng], 13, { duration: 0.6 });
    if (options.openPopup) marker.openPopup();
  }
}

function clearGenreSelection() {
  state.activeGenres.clear();
  renderGenreFilter();
  applyFilters();
}

function resetFilters() {
  dom.searchInput.value = "";
  dom.cityFilter.value = "";
  dom.dateFilter.value = "";
  state.activeGenres.clear();
  renderGenreFilter();
  state.selectedEventId = null;
  applyFilters();
  renderEventDetails(null);
}

function openSubmitModal() {
  if (!dom.submitModal) return;
  dom.submitModal.hidden = false;
  dom.submitModal.setAttribute("aria-hidden", "false");
  dom.submitModal.classList.add("is-open");
  document.body.classList.add("body--modal-open");
  window.setTimeout(() => {
    dom.formName?.focus();
  }, 0);
}

function closeSubmitModal() {
  if (!dom.submitModal) return;
  dom.submitModal.hidden = true;
  dom.submitModal.setAttribute("aria-hidden", "true");
  dom.submitModal.classList.remove("is-open");
  document.body.classList.remove("body--modal-open");
}

async function reloadEventsAndRender() {
  await loadEvents();
  updateFilterOptions();
  applyFiltersFromQuery();
  applyFilters();
}

async function handleCreateEventSubmit(submitEvent) {
  submitEvent.preventDefault();
  setFormFeedback("");

  const payload = readFormPayload();
  const validation = validateFormPayload(payload);
  if (!validation.valid) {
    setFormFeedback(validation.message, "error");
    return;
  }

  setFormSubmitting(true);
  try {
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    let payloadWithCoordinates;
    let uploadedImagePath = null;
    try {
      payloadWithCoordinates = await resolveCoordinatesForPayload(payload);
    } catch (geocodingError) {
      setFormFeedback(t("form_error_geocoding_failed"), "error");
      return;
    }
    if (payload.main_image) {
      try {
        const uploadResult = await uploadEventImage(client, payload.main_image);
        uploadedImagePath = uploadResult.path;
        payloadWithCoordinates = {
          ...payloadWithCoordinates,
          image_url: uploadResult.publicUrl
        };
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        setFormFeedback(t("form_error_image_upload"), "error");
        return;
      }
    }
    const insertPayload = buildInsertPayload(payloadWithCoordinates);
    const { data, error } = await insertEventWithSchemaFallback(client, insertPayload);

    devDebugLog("[PartyRadar Debug] Event insert data:", data);
    devDebugLog("[PartyRadar Debug] Event insert error:", error);

    if (error) {
      if (uploadedImagePath) {
        try {
          await deleteUploadedEventImage(client, uploadedImagePath);
        } catch (cleanupError) {
          devDebugLog("[PartyRadar Debug] Image cleanup failed:", cleanupError);
          throw new Error(`${error.message || "Insert failed"} ${t("form_error_image_cleanup")}`.trim());
        }
      }
      throw new Error(error.message);
    }

    clearEventForm();
    setFormFeedback(t("form_success"), "success");
    await reloadEventsAndRender();
    window.setTimeout(closeSubmitModal, 1800);
  } catch (error) {
    console.error("Event speichern fehlgeschlagen:", error);
    if (isRlsInsertError(error)) {
      setFormFeedback(`${t("form_error_generic")} ${t("form_error_rls_submit")}`.trim(), "error");
      return;
    }
    setFormFeedback(`${t("form_error_generic")} ${error.message || ""}`.trim(), "error");
  } finally {
    setFormSubmitting(false);
  }
}

function bindEvents() {
  dom.filtersForm.addEventListener("submit", (event) => event.preventDefault());
  dom.searchInput.addEventListener("input", applyFilters);
  dom.cityFilter.addEventListener("change", applyFilters);
  dom.dateFilter.addEventListener("change", applyFilters);

  if (dom.languageSwitch) {
    dom.languageSwitch.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-lang-switch]");
      if (!button) return;
      switchLanguage(button.dataset.langSwitch);
    });
  }

  if (dom.openSubmitModal) {
    dom.openSubmitModal.addEventListener("click", () => {
      setFormFeedback("");
      openSubmitModal();
    });
  }
  if (dom.closeSubmitModal) {
    dom.closeSubmitModal.addEventListener("click", (event) => {
      event.preventDefault();
      closeSubmitModal();
    });
  }
  if (dom.submitModal) {
    dom.submitModal.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const clickedBackdrop = target?.classList.contains("modal");
      if (clickedBackdrop || (target && target.closest("[data-modal-close]"))) {
        closeSubmitModal();
      }
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dom.submitModal && !dom.submitModal.hidden) {
      closeSubmitModal();
    }
  });

  dom.resetFilters.addEventListener("click", resetFilters);
  dom.clearGenresButton.addEventListener("click", clearGenreSelection);
  dom.genreFilterGroup.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-genre]");
    if (!button) return;
    const { genre } = button.dataset;
    if (!genre) return;

    if (state.activeGenres.has(genre)) state.activeGenres.delete(genre);
    else state.activeGenres.add(genre);

    renderGenreFilter();
    applyFilters();
  });

  if (dom.eventForm) {
    dom.eventForm.addEventListener("submit", handleCreateEventSubmit);
  }
}

async function fetchEventsFromSupabase() {
  if (!SUPABASE_URL || !SUPABASE_URL.includes("supabase.co")) {
    throw new Error("Supabase-URL ist ungültig.");
  }
  if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY.includes("[hier deinen anon key einsetzen]")) {
    throw new Error("Supabase-Anon-Key fehlt. Bitte in app.js eintragen.");
  }

  const client = supabaseClient();
  const tableName = "events";
  const { data, error } = await client.from(tableName).select("*").order("event_date", { ascending: true });

  devDebugLog("[PartyRadar Debug] Supabase table:", tableName);
  devDebugLog("[PartyRadar Debug] Supabase data:", data);
  devDebugLog("[PartyRadar Debug] Supabase error:", error);

  if (error) throw new Error(error.message);
  return (data || []).map(normalizeEvent);
}

async function loadEvents() {
  setStatus(t("status_loading"), "loading");
  state.debug.hasError = false;
  state.debug.errorMessage = "";
  state.debug.fallbackReason = "pending";
  state.debug.supabaseLoadedCount = 0;


  try {
    const data = await fetchEventsFromSupabase();
    state.debug.supabaseLoadedCount = data.length;

    if (!data.length) {
      state.allEvents = demoEvents.map(normalizeEvent);
      state.sourceType = "demo-no-data";
      state.debug.fallbackReason = "no-data";
      setStatus(t("status_no_data"), "warning");
      return;
    }

    state.allEvents = data.filter(isApprovedEvent);
    state.sourceType = "supabase";
    state.debug.fallbackReason = "supabase";
    setStatus(t("status_connected", { count: state.allEvents.length }), "ok");
  } catch (error) {
    console.error("Supabase Fehler:", error);
    state.allEvents = demoEvents.map(normalizeEvent);
    state.sourceType = "demo-error";
    state.debug.hasError = true;
    state.debug.errorMessage = error.message;
    state.debug.fallbackReason = "error";
    setStatus(t("status_error", { message: error.message }), "warning");
  }
}

async function startApp() {
  const query = readQueryParams();
  const requestedLang = resolveLanguage(query.lang);
  state.lang = query.lang ? requestedLang : resolveLanguageFromBrowser(requestedLang);
  applyStaticTranslations();
  renderEventDetails(null);

  initMap();
  bindEvents();
  await loadEvents();
  updateFilterOptions();
  applyFiltersFromQuery();
  applyFilters();
}

startApp();

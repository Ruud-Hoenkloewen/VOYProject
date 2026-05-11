import { Link } from "react-router-dom";
import Container from "../design-system/layout/Container/Container";
import Stack from "../design-system/layout/Stack/Stack";
import Typography from "../design-system/primitives/Typography/Typography";
import EventCard from "../design-system/composites/EventCard/EventCard";
import Button from "../design-system/primitives/Button/Button";
import SearchBar from "../design-system/composites/SearchBar/SearchBar";
import EditorialHeader from "../design-system/composites/EditorialHeader/EditorialHeader";
import { useEvents } from "../hooks/useEvents";
import { useEventFilters } from "../hooks/useEventFilters";
import styles from "./EventsPage.module.css";

const GENRES = ["TODOS", "PUNK", "ROCK", "HARDCORE", "METAL", "GRUNGE", "POP", "ALTER ROCK"];

/**
 * COMPONENTE: EventsPage
 * Grilla principal de eventos con filtros por género, lugar y fecha.
 * Usa el mismo header editorial que LandingPage (sin Navbar con buscador).
 * El buscador vive en el hero, debajo del subtítulo.
 * Ruta: /events
 */
export default function EventsPage() {
  const { events, isLoading, error } = useEvents();
  const { 
    activeCategories, toggleCategory, 
    activeLugar, setActiveLugar, availableLugares,
    activeFecha, setActiveFecha, availableFechas,
    filteredEvents 
  } = useEventFilters(events);

  return (
    <>
      {/* ── HEADER EDITORIAL (compartido, scroll-aware) ─── */}
      <EditorialHeader ctaLabel="ACCEDER" ctaTo="/login" />

      <Container className={styles.pageContainer}>
        <Stack gap="xl">

          {/* ── HERO: título centrado + buscador ─────────── */}
          <div className={styles.heroSection}>
            <h1 className={styles.heroTitle}>WELCOME TO THE POGO</h1>
            <p className={styles.heroSubtitle}>LA ESCENA EMERGENTE Y UNDERGROUND</p>
            <div className={styles.heroSearch}>
              <SearchBar placeholder="Buscar bandas, lugares, fechas..." />
            </div>
          </div>

          {/* ── FILTROS ──────────────────────────────────── */}
          <div className={styles.filtersRow}>
            {/* GÉNERO */}
            <div className={styles.filterGroupLarge}>
              <Typography variant="caption" className={styles.filterLabel}>GÉNERO</Typography>
              <div className={styles.genresList}>
                {GENRES.filter(g => g !== "TODOS").map(genre => (
                  <button
                    key={genre}
                    onClick={() => toggleCategory(genre)}
                    className={`${styles.genreBtn} ${activeCategories.includes(genre) ? styles.genreBtnActive : ''}`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* LUGAR */}
            <div className={styles.filterGroupSmall}>
              <Typography variant="caption" className={styles.filterLabel}>LUGAR</Typography>
              <select 
                className={styles.filterSelect}
                value={activeLugar}
                onChange={(e) => setActiveLugar(e.target.value)}
              >
                <option value="TODOS">Todos los lugares</option>
                {availableLugares.map(lugar => (
                  <option key={lugar} value={lugar}>{lugar}</option>
                ))}
              </select>
            </div>

            {/* FECHA */}
            <div className={styles.filterGroupSmall}>
              <Typography variant="caption" className={styles.filterLabel}>FECHA</Typography>
              <select 
                className={styles.filterSelect}
                value={activeFecha}
                onChange={(e) => setActiveFecha(e.target.value)}
              >
                <option value="TODOS">Todas las fechas</option>
                {availableFechas.map(fecha => (
                  <option key={fecha} value={fecha}>{fecha}</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className={styles.errorContainer}>
              <Typography variant="body">{error}</Typography>
            </div>
          )}

          {isLoading ? (
            <div className={styles.eventsGrid}>
              {[1, 2, 3, 4, 5, 6].map(i => <EventCard key={i} isLoading={true} />)}
            </div>
          ) : filteredEvents.length === 0 && !error ? (
            <div className={styles.emptyState}>
              <Typography variant="h3">No hay nada disponible 😢</Typography>
              <Typography variant="body" tone="muted" className={styles.emptyStateText}>
                Parece que la movida está descansando temporalmente. ¡Vuelve pronto!
              </Typography>
              <Button variant="primary">Volver al inicio</Button>
            </div>
          ) : (
            <div className={styles.eventsGrid}>
              {filteredEvents.map((evt) => (
                <EventCard
                  key={evt.id}
                  id={evt.id}
                  title={evt.title}
                  date={evt.date}
                  time={evt.time}
                  venue={evt.venue}
                  price={evt.price}
                  genres={evt.genres}
                  status={evt.estado || evt.status}
                  statusTone={(evt.estado || evt.status) === "AGOTADO" ? "danger" : (evt.estado || evt.status) === "ÚLTIMAS ENTRADAS" ? "warning" : "success"}
                  highlighted={evt.highlighted}
                  imageUrl={evt.imageUrl}
                />
              ))}
            </div>
          )}
        </Stack>
      </Container>
    </>
  );
}

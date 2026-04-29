import Container from "../design-system/layout/Container/Container";
import Stack from "../design-system/layout/Stack/Stack";
import Typography from "../design-system/primitives/Typography/Typography";
import EventCard from "../design-system/composites/EventCard/EventCard";
import { useEvents } from "../hooks/useEvents";
import styles from "./Home.module.css";

/**
 * COMPONENTE: Events
 * Vista secundaria que muestra el catálogo completo de eventos sin los filtros principales.
 * Reutiliza las clases CSS de Home para mantener consistencia visual (DRY).
 */
export default function Events() {
  const { events, isLoading, error } = useEvents();

  return (
    <Container className={styles.pageContainer}>
      <Stack gap="xl">
        <Typography variant="h2" as="h1" style={{ color: 'var(--ds-color-text)' }}>
          Catálogo de Eventos
        </Typography>

        {error && (
          <div className={styles.errorContainer}>
            <Typography variant="body">{error}</Typography>
          </div>
        )}

        <div className={styles.eventsGrid}>
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map(i => <EventCard key={i} isLoading={true} />)
          ) : (
            events.map((evt) => (
              <EventCard
                key={evt.id}
                id={evt.id}
                title={evt.title}
                date={evt.date}
                time={evt.time}
                venue={evt.venue}
                price={evt.price}
                genres={evt.genres}
                status={evt.status}
                statusTone={evt.statusTone}
                highlighted={evt.highlighted}
                imageUrl={evt.imageUrl}
              />
            ))
          )}
        </div>
      </Stack>
    </Container>
  );
}
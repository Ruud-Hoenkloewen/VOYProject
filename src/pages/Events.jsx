import Container from "../design-system/layout/Container/Container";
import Stack from "../design-system/layout/Stack/Stack";
import Typography from "../design-system/primitives/Typography/Typography";
import EventCard from "../design-system/composites/EventCard/EventCard";
import { mockEvents } from "../data/mockEvents";

export default function Events() {
  const events = mockEvents;

  return (
    <Container style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <Stack gap="xl">
        <Typography variant="h2" as="h1" style={{ color: 'var(--ds-color-text)' }}>
          Catálogo de Eventos
        </Typography>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 'var(--spacing-lg)'
        }}>
          {events.map((evt) => (
            <EventCard
              key={evt.id}
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
          ))}
        </div>
      </Stack>
    </Container>
  );
}
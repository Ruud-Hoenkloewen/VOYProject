import Container from "../design-system/layout/Container/Container";
import Stack from "../design-system/layout/Stack/Stack";
import Typography from "../design-system/primitives/Typography/Typography";
import EventCard from "../design-system/composites/EventCard/EventCard";
import Button from "../design-system/primitives/Button/Button";
import { mockEvents } from "../data/mockEvents";

export default function Home() {
  // Simulando que extraemos los eventos de alguna API o store
  const events = mockEvents;

  return (
    <Container style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <Stack gap="xl">
        <Typography variant="h2" as="h1">
          Lo último en la movida Under
        </Typography>

        {events.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            background: 'var(--color-bg-elevated)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)'
          }}>
            <Typography variant="h3">No hay nada disponible 😢</Typography>
            <Typography variant="body" tone="muted" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
              Parece que la movida está descansando temporalmente. ¡Vuelve pronto!
            </Typography>
            <Button variant="primary">Volver al inicio</Button>
          </div>
        ) : (
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
        )}
      </Stack>
    </Container>
  );
}

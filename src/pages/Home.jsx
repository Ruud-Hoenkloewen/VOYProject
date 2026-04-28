
import { useState } from "react";
import Container from "../design-system/layout/Container/Container";
import Stack from "../design-system/layout/Stack/Stack";
import Typography from "../design-system/primitives/Typography/Typography";
import EventCard from "../design-system/composites/EventCard/EventCard";
import Button from "../design-system/primitives/Button/Button";
import { useEvents } from "../hooks/useEvents";

const GENRES = ["TODOS", "PUNK", "ROCK", "INDIE", "TECHNO", "ELECTRÓNICA", "METAL", "HARDCORE", "GRUNGE"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("TODOS");
  const { events, isLoading, error } = useEvents();

  const filteredEvents = activeCategory === "TODOS" 
    ? events 
    : events.filter(evt => evt.genres.includes(activeCategory));

  return (

    <Container style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <Stack gap="xl">
        <div className="tabs-container">
          <style>{`
            .tabs-container {
              display: flex;
              gap: 2px;
              overflow-x: auto;
              padding: 0 10px 10px 0;
              scrollbar-width: none;
              ms-overflow-style: none;
            }
            .tabs-container::-webkit-scrollbar { display: none; }
            .tab-btn {
              background-color: #1a1a1c;
              border: none;
              color: #b3b3b3;
              font-weight: 800;
              font-size: 0.85rem;
              padding: 10px 24px;
              text-transform: uppercase;
              cursor: pointer;
              transform: skewX(-15deg);
              transition: background-color 0.2s, color 0.2s;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              white-space: nowrap;
            }
            .tab-btn span {
               transform: skewX(15deg);
               letter-spacing: 0.5px;
            }
            .tab-btn:hover {
              background-color: #2a2a2c;
              color: #fff;
            }
            .tab-btn.active {
              background-color: #d500f9;
              color: #fff;
              border-bottom: 4px solid #9c00b8;
            }
          `}</style>
          {GENRES.map((genre) => (
            <button
              key={genre}
              className={`tab-btn ${activeCategory === genre ? 'active' : ''}`}
              onClick={() => setActiveCategory(genre)}
            >
              <span>{genre}</span>
            </button>
          ))}
        </div>

        <div className="hero-title-section" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Typography variant="display" as="h1">
            <span style={{ color: '#ffffff' }}>MOVIDA </span>
            <span style={{ 
              background: 'linear-gradient(90deg, #caff04 0%, #aaff00 30%, #d800ff 70%, #d500f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              TUCUMANA
            </span>
          </Typography>
          <Typography variant="caption" as="p" style={{ 
            textTransform: 'uppercase', 
            letterSpacing: '0.25em',
            fontWeight: '600',
            color: 'var(--ds-color-text-muted)'
          }}>
            LA ESCENA EMERGENTE Y UNDERGROUND
          </Typography>
        </div>

        {error && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-critical)' }}>
            <Typography variant="body">{error}</Typography>
          </div>
        )}

        {isLoading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--spacing-lg)'
          }}>
            {[1, 2, 3, 4, 5, 6].map(i => <EventCard key={i} isLoading={true} />)}
          </div>
        ) : filteredEvents.length === 0 && !error ? (
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
            {filteredEvents.map((evt) => (
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

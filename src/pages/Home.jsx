
import { useState, useEffect } from "react";
import Container from "../design-system/layout/Container/Container";
import Stack from "../design-system/layout/Stack/Stack";
import Typography from "../design-system/primitives/Typography/Typography";
import EventCard from "../design-system/composites/EventCard/EventCard";
import Button from "../design-system/primitives/Button/Button";
import Navbar from "../design-system/composites/Navbar/Navbar";
import { mockEvents } from "../data/mockEvents";

const GENRES = ["TODOS", "PUNK", "ROCK", "INDIE", "TECHNO", "ELECTRÓNICA", "METAL", "HARDCORE", "GRUNGE"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("TODOS");

  // 🔍 buscador
  const [search, setSearch] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);

  const events = mockEvents;

  // ⏱ debounce + filtro
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.trim() === "") {
        setFilteredEvents(events);
      } else {
        const result = events.filter((evt) =>
          evt.title.toLowerCase().includes(search.toLowerCase()) ||
          evt.venue.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredEvents(result);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, events]);

  return (
    <>
      {/* 🔥 NAVBAR */}
      <Navbar search={search} setSearch={setSearch} />

      <Container style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <Stack gap="xl">

          {/* 🎛️ FILTROS */}
          <div className="tabs-container">
            <style>{`
              .tabs-container {
                display: flex;
                gap: 2px;
                overflow-x: auto;
                padding: 0 10px 10px 0;
                scrollbar-width: none;
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
              }

              .tab-btn.active {
                background-color: #d500f9;
                color: #fff;
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

          {/* 🎨 TITULO */}
          <div className="hero-title-section">
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
          </div>

          {/* ❌ SIN RESULTADOS */}
          {filteredEvents.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 1rem',
              border: '1px dashed #333',
              borderRadius: '10px'
            }}>
              <Typography variant="h3">
                NO HAY AGITE ACÁ 😢
              </Typography>

              <Typography style={{ marginTop: '1rem' }}>
                No encontramos eventos con estos filtros. Probá otra búsqueda o género.
              </Typography>

              <Button
                variant="primary"
                style={{ marginTop: '1.5rem' }}
                onClick={() => {
                  setSearch("");
                  setActiveCategory("TODOS");
                }}
              >
                Limpiar filtros
              </Button>
            </div>

          ) : (

            /* 🧩 GRID */
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'var(--spacing-lg)'
            }}>
              {filteredEvents.map((evt) => (
                <EventCard key={evt.id} {...evt} />
              ))}
            </div>

          )}

        </Stack>
      </Container>
    </>
  );
}

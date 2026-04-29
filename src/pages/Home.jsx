import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../design-system/layout/Container/Container";
import Stack from "../design-system/layout/Stack/Stack";
import Typography from "../design-system/primitives/Typography/Typography";
import EventCard from "../design-system/composites/EventCard/EventCard";
import Button from "../design-system/primitives/Button/Button";
import { useEvents } from "../hooks/useEvents";

const GENRES = ["TODOS", "PUNK", "ROCK", "HARDCORE", "METAL", "GRUNGE", "POP", "ALTER ROCK"];

export default function Home() {
  // US1: Convertido a array para soportar selección múltiple
  const [activeCategories, setActiveCategories] = useState(["TODOS"]);
  const { events, isLoading, error } = useEvents();
  
  // US1: Leemos el query parameter de la barra de búsqueda global
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("q") || "").toLowerCase();

  // MANEJADOR: Permite selección múltiple y usa "TODOS" como botón de reset
  const toggleCategory = (genre) => {
    if (genre === "TODOS") {
      setActiveCategories(["TODOS"]); // Reset
      return;
    }

    setActiveCategories((prev) => {
      const withoutTodos = prev.filter(c => c !== "TODOS");
      if (withoutTodos.includes(genre)) {
        const newSelection = withoutTodos.filter(c => c !== genre);
        return newSelection.length === 0 ? ["TODOS"] : newSelection; // Si vacía, reset
      } else {
        return [...withoutTodos, genre];
      }
    });
  };

  // LOGICA: Filtrado exhaustivo por búsqueda de texto y múltiples categorías
  const filteredEvents = events.filter((evt) => {
    // 1. Filtro de Búsqueda (busca en título, lugar o artistas)
    const matchesSearch = searchQuery === "" || 
      evt.title.toLowerCase().includes(searchQuery) ||
      (evt.venue && evt.venue.toLowerCase().includes(searchQuery)) ||
      (evt.artists && evt.artists.some(a => a.nombre && a.nombre.toLowerCase().includes(searchQuery)));
      
    // 2. Filtro de Categoría Múltiple (Soluciona el bug de mayúsculas/minúsculas)
    const matchesCategories = activeCategories.includes("TODOS") ||
      (evt.genres && evt.genres.some(g => activeCategories.includes(g.toUpperCase())));

    return matchesSearch && matchesCategories;
  });

  return (

    <Container style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <Stack gap="xl">
        <div className="hero-title-section" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem', marginBottom: '1rem' }}>
          <Typography variant="display" as="h1">
            <span style={{ color: '#ffffff' }}>WELCOME TO THE POGO</span>
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

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          {/* GÉNERO */}
          <div style={{ flex: '2 1 400px' }}>
            <Typography variant="caption" style={{ textTransform: 'uppercase', color: 'var(--ds-color-text-secondary)', marginBottom: '1rem', display: 'block' }}>GÉNERO</Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {GENRES.filter(g => g !== "TODOS").map(genre => (
                <button
                  key={genre}
                  onClick={() => toggleCategory(genre)}
                  style={{
                    background: 'transparent',
                    border: `1px solid ${activeCategories.includes(genre) ? '#d500f9' : '#d9d9d9'}`,
                    color: activeCategories.includes(genre) ? '#d500f9' : '#d9d9d9',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
          
          {/* LUGAR */}
          <div style={{ flex: '1 1 200px' }}>
            <Typography variant="caption" style={{ textTransform: 'uppercase', color: 'var(--ds-color-text-secondary)', marginBottom: '1rem', display: 'block' }}>LUGAR</Typography>
            <select style={{ width: '100%', background: '#1a1a1c', border: '1px solid #333', color: '#fff', padding: '0.5rem', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' }}>
              <option>Todos los lugares</option>
            </select>
          </div>

          {/* FECHA */}
          <div style={{ flex: '1 1 200px' }}>
            <Typography variant="caption" style={{ textTransform: 'uppercase', color: 'var(--ds-color-text-secondary)', marginBottom: '1rem', display: 'block' }}>FECHA</Typography>
            <select style={{ width: '100%', background: '#1a1a1c', border: '1px solid #333', color: '#fff', padding: '0.5rem', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' }}>
              <option>Todas las fechas</option>
            </select>
          </div>
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
            gap: '2rem'
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
            gap: '2rem'
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
  );
}

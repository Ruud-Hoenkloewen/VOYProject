import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * HOOK: useEventFilters
 * Encapsula la lógica de negocio para filtrar eventos dinámicamente.
 * 
 * @param {Array} events - Lista original de eventos desde la API.
 * @returns {Object} { activeCategories, toggleCategory, filteredEvents }
 */
export function useEventFilters(events = []) {
  // Estado para las categorías seleccionadas (soporta multiselección)
  const [activeCategories, setActiveCategories] = useState(["TODOS"]);
  
  // Extrae el valor de 'q' de la URL para la búsqueda global (Navbar)
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("q") || "").toLowerCase();

  /**
   * Alterna la selección de un género musical en el filtro.
   * Si se hace clic en "TODOS", resetea la selección.
   * Si se deseleccionan todos, vuelve automáticamente a "TODOS".
   * 
   * @param {string} genre - El género a alternar.
   */
  const toggleCategory = (genre) => {
    if (genre === "TODOS") {
      setActiveCategories(["TODOS"]);
      return;
    }

    setActiveCategories((prev) => {
      const withoutTodos = prev.filter(c => c !== "TODOS");
      
      if (withoutTodos.includes(genre)) {
        // Quita el género si ya estaba
        const newSelection = withoutTodos.filter(c => c !== genre);
        return newSelection.length === 0 ? ["TODOS"] : newSelection;
      } else {
        // Añade el género si no estaba
        return [...withoutTodos, genre];
      }
    });
  };

  /**
   * Motor de filtrado en tiempo real.
   * Evalúa la búsqueda por texto (título, venue, artistas) y las categorías seleccionadas.
   * Utiliza memoización implícita en cada renderizado (se puede envolver en useMemo si la lista crece mucho).
   */
  const filteredEvents = events.filter((evt) => {
    // 1. Coincidencias de texto libre
    const matchesSearch = searchQuery === "" || 
      evt.title.toLowerCase().includes(searchQuery) ||
      (evt.venue && evt.venue.toLowerCase().includes(searchQuery)) ||
      (evt.artists && evt.artists.some(a => a.nombre && a.nombre.toLowerCase().includes(searchQuery)));
      
    // 2. Coincidencias de género (case-insensitive)
    const matchesCategories = activeCategories.includes("TODOS") ||
      (evt.genres && evt.genres.some(g => activeCategories.includes(g.toUpperCase())));

    return matchesSearch && matchesCategories;
  });

  return {
    activeCategories,
    toggleCategory,
    filteredEvents
  };
}

import { useState, useEffect } from 'react';
import { fetchEvents } from '../services/eventService';

export const useEvents = (params = {}) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Convertimos params a string para usarlo de dependencia de forma segura
  const paramsString = JSON.stringify(params);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true);
        const data = await fetchEvents(params);
        setEvents(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message || "Error al cargar los eventos");
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, [paramsString]);

  return { events, isLoading, error };
};

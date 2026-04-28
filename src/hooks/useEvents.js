import { useState, useEffect } from 'react';
import { fetchEvents } from '../services/eventService';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true);
        const data = await fetchEvents();
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
  }, []);

  return { events, isLoading, error };
};

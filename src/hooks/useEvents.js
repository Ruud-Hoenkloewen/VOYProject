
import { useEffect, useState } from "react";
import api from "../services/api";

export default function useEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return { events };
}

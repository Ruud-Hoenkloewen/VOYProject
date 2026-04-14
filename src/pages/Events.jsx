
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

export default function Events() {
  return (
    <div>
      <h1>Eventos</h1>
      <SearchBar />
      <Filters />
      <EventCard />
    </div>
  );
}

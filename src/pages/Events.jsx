import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";

const events = [
  {
    id: 1,
    title: "Rock Fest",
    date: "Viernes 20:00",
    location: "Tucumán",
    price: "3000",
    category: "Música",
    image: "https://via.placeholder.com/300",
  },
];

function Events() {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </>
  );
}

export default Events;